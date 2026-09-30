import { NextResponse, after } from "next/server";
import { submitLead } from "@/lib/leads";
import { requestContext, sendMetaEvent, type MetaServerEvent } from "@/lib/meta-capi";

// Forms whose success is a Meta conversion (mirrors lib/analytics.ts).
const META_EVENT_FOR_FORM: Record<string, MetaServerEvent["eventName"]> = {
  "business-growth-audit": "Lead",
  "request-solution": "Lead",
  contact: "Contact",
};

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

    // Server-side conversion, sent after the response so it never slows the visitor down.
    const metaEvent = META_EVENT_FOR_FORM[formType];
    const context = requestContext(request, json);
    if (metaEvent && context.eventId && !context.optedOut) {
      after(() =>
        sendMetaEvent({
          eventName: metaEvent,
          eventId: context.eventId!,
          sourceUrl: context.sourceUrl,
          email: sanitizeString(json.Email),
          phone: sanitizeString(json.Phone),
          firstName: sanitizeString(json.First_Name),
          lastName: sanitizeString(json.Last_Name),
          fbp: context.fbp,
          fbc: context.fbc,
          ip: context.ip,
          userAgent: context.userAgent,
        }),
      );
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
