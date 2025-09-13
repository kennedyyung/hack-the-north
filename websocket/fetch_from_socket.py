import websocket
import json

WS_URL = "wss://js2tqi90r5.execute-api.us-east-2.amazonaws.com/dev"

def on_message(ws, message):
    print("📨 Message from server:", message)

def on_error(ws, error):
    print("⚠️ Error:", error)

def on_close(ws, close_status_code, close_msg):
    print("❌ Connection closed")

def on_open(ws):
    print("✅ Connected to WebSocket:", WS_URL)

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        WS_URL,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.run_forever()


"""
Log example:
--- request header ---
GET /dev HTTP/1.1
Upgrade: websocket
Host: js2tqi90r5.execute-api.us-east-2.amazonaws.com
Origin: https://js2tqi90r5.execute-api.us-east-2.amazonaws.com
Sec-WebSocket-Key: 77oRZIJ4Gb4oIYkRi5DEDQ==
Sec-WebSocket-Version: 13
Connection: Upgrade


-----------------------
--- response header ---
HTTP/1.1 101 Switching Protocols
Date: Sat, 13 Sep 2025 11:42:29 GMT
Connection: upgrade
upgrade: websocket
sec-websocket-accept: 5AhuVvjz42NWjVciBX3oeiKI2cA=
-----------------------
Websocket connected
✅ Connected to WebSocket: wss://js2tqi90r5.execute-api.us-east-2.amazonaws.com/dev
++Rcv raw: b'\x81~\x00\x8c{"event": "MODIFY", "new": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}, "old": {"data": "this should trigger", "_id": "2"}}'
++Rcv decoded: fin=1 opcode=1 data=b'{"event": "MODIFY", "new": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}, "old": {"data": "this should trigger", "_id": "2"}}'
📨 Message from server: {"event": "MODIFY", "new": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}, "old": {"data": "this should trigger", "_id": "2"}}
++Rcv raw: b'\x81~\x00\x8d{"event": "MODIFY", "new": {"data": "this should trigger ", "_id": "2"}, "old": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}}'
++Rcv decoded: fin=1 opcode=1 data=b'{"event": "MODIFY", "new": {"data": "this should trigger ", "_id": "2"}, "old": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}}'
📨 Message from server: {"event": "MODIFY", "new": {"data": "this should trigger ", "_id": "2"}, "old": {"data": "this should trigger fdsfklsjflsdsjdf", "_id": "2"}}
++Rcv raw: b'\x81~\x016{"event": "MODIFY", "new": {"bet": "hehehe", "createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}, "old": {"createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}}'
++Rcv decoded: fin=1 opcode=1 data=b'{"event": "MODIFY", "new": {"bet": "hehehe", "createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}, "old": {"createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}}'
📨 Message from server: {"event": "MODIFY", "new": {"bet": "hehehe", "createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}, "old": {"createdAt": "2025-09-13", "data": {"subject": {"S": "hi"}, "body": {"S": "hi its me"}}, "_id": "0", "updatedAt": "2025-09-13"}}
^C⚠️ Error: 
++Sent raw: b'\x88\x82\x95\xd3\xd4\x98\x96;'
++Sent decoded: fin=1 opcode=8 data=b'\x03\xe8'
❌ Connection closed
tearing down on exception 

"""
