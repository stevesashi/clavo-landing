import { NextResponse } from "next/server";

const PLACEHOLDER_PAT = "your_airtable_personal_access_token";
const PLACEHOLDER_BASE = "appXXXXXXXXXXXXXX";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, selectedDates, selectedTime } = body;

    const token = process.env.AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE;

    if (
      !token || token.trim() === "" || token === PLACEHOLDER_PAT ||
      !baseId || baseId.trim() === "" || baseId === PLACEHOLDER_BASE ||
      !tableName || tableName.trim() === ""
    ) {
      console.error("Invalid Airtable env configuration");
      return NextResponse.json(
        { error: "Invalid Airtable env configuration" },
        { status: 500 }
      );
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: name,
              Email: email,
              Company: company,
              "Selected Dates": selectedDates,
              "Selected Time": selectedTime,
              "Created at": new Date().toISOString(),
            },
          },
        ],
      }),
    });

    const airtableText = await airtableRes.text();

    if (!airtableRes.ok) {
      return NextResponse.json(
        { error: "Airtable request failed", details: airtableText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("book-demo route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
