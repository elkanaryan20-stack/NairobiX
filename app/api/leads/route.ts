import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    if (!isRecord(json)) {
      return NextResponse.json({ success: false, error: "Invalid form payload." }, { status: 400 });
    }

    const formType = sanitizeString(json.formType);
    const result = await submitLead(formType, json);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Lead submission route error", error);

    return NextResponse.json(
      {
        success: false,
        error: "We couldn't submit your request right now. Your information hasn't been lost. Please try again.",
      },
      { status: 500 }
    );
  }
}
