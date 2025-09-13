import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: process.env.AWS_TABLE_NAME,
    });

    const result = await client.send(command);

    return NextResponse.json(result.Items);
  } catch (error) {
    console.error("DynamoDB error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
