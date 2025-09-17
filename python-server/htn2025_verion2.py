import json
import os
import uuid
import base64
import time
from datetime import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import google.generativeai as genai
from bs4 import BeautifulSoup
import boto3

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# DynamoDB setup
session = boto3.Session(profile_name="admin")
dynamodb = session.resource("dynamodb", region_name="us-east-2")
table = dynamodb.Table("Emails")

def load_credentials():
    with open("credentials.json", "r") as f:
        creds_json = json.load(f)
    return creds_json

def get_gmail_service():
    creds_json = load_credentials()
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_config(creds_json, SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('gmail', 'v1', credentials=creds), creds_json["gemini_api_key"]

def clean_body(payload):
    body = ""
    if 'parts' in payload:
        for part in payload['parts']:
            if part['mimeType'] == 'text/plain' and 'data' in part['body']:
                return base64.urlsafe_b64decode(part['body']['data']).decode("utf-8")
            elif part['mimeType'] == 'text/html' and 'data' in part['body']:
                html = base64.urlsafe_b64decode(part['body']['data']).decode("utf-8")
                return BeautifulSoup(html, "html.parser").get_text()
    elif 'data' in payload['body']:
        return base64.urlsafe_b64decode(payload['body']['data']).decode("utf-8")
    return body

def summarize_with_gemini(text, gemini_key):
    genai.configure(api_key=gemini_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
        You are an AI email parser. Given the following email content, extract and return only a valid JSON object with the following fields:
            - category: one of ["school","finance","shopify","work","personal","none"]
            - sender: string
            - subject: string
            - summary: string (1-3 sentences)
        Optional fields (omit if not present):
            - duedate: string (e.g., "2025-10-01")
            - money: number (negative if money was spent, positive if received)
            - priority: one of ["low", "medium", "high"]
            - participants: number of people involved
            - location: string
        Strict requirements:
        Return valid strict JSON only
        Do not include newlines
        Do not include any text outside of the JSON object
        Email:
        {text}
        """
    response = model.generate_content(prompt)
    return json.loads(response.text)

def save_email_summary(summary):
    item = {
        "_id": str(uuid.uuid4()),
        "createdAt": datetime.utcnow().isoformat(),
        "data": summary,
    }
    table.put_item(Item=item)
    print("✅ Saved:", item["_id"])
    return item

def fetch_new_emails(service, gemini_key, last_seen_id):
    query = "to:@klarity.work"
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q=query).execute()
    messages = results.get('messages', [])

    if not messages:
        return last_seen_id

    # messages come newest first
    messages = sorted(messages, key=lambda m: m['id'])  # oldest → newest
    for msg in messages:
        if last_seen_id and msg['id'] <= last_seen_id:
            continue
        msg_data = service.users().messages().get(userId='me', id=msg['id']).execute()
        payload = msg_data['payload']
        headers = payload['headers']

        subject = sender = None
        for header in headers:
            if header['name'] == 'From':
                sender = header['value']
            if header['name'] == 'Subject':
                subject = header['value']

        body = clean_body(payload)

        print("="*50)
        print(f"From: {sender}")
        print(f"Subject: {subject}")
        print(f"Body: {body[:200]}...")

        summary = summarize_with_gemini(body, gemini_key)
        print("🔹 Gemini Summary:", summary)

        save_email_summary(summary)
        last_seen_id = msg['id']

    return last_seen_id

if __name__ == '__main__':
    service, gemini_key = get_gmail_service()
    last_seen_id = None

    # initialize: find current newest message so we don’t backfill
    init_results = service.users().messages().list(userId='me', labelIds=['INBOX'], q="to:@klarity.work").execute()
    if init_results.get('messages'):
        last_seen_id = init_results['messages'][0]['id']
        print(f"📌 Starting from message id {last_seen_id} (ignoring older ones)")

    while True:
        try:
            last_seen_id = fetch_new_emails(service, gemini_key, last_seen_id)
        except Exception as e:
            print("⚠️ Error:", e)
        time.sleep(6)
        print("⏱️ Checking for new emails...")
