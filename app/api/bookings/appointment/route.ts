import { NextResponse, after } from "next/server";
import { requestContext, sendMetaEvent } from "@/lib/meta-capi";
import { submitConsultationBooking, type ConsultationBookingInput } from "@/lib/booking";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    if (!isRecord(json)) {
      return NextResponse.json({ success: false, error: "Invalid request payload." }, { status: 400 });
    }

    const result = await submitConsultationBooking(json as ConsultationBookingInput);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: result.status });
    }

    const context = requestContext(request, json);
    if (context.eventId && !context.optedOut) {
      const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
      after(() =>
        sendMetaEvent({
          eventName: "Schedule",
          eventId: context.eventId!,
          sourceUrl: context.sourceUrl,
          email: str(json.email),
          phone: str(json.phone),
          firstName: str(json.firstName),
          lastName: str(json.lastName),
          fbp: context.fbp,
          fbc: context.fbc,
          ip: context.ip,
          userAgent: context.userAgent,
        }),
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Bookings appointment route error", error);
    return NextResponse.json(
      { success: false, error: "We couldn't submit your booking right now. Please try again." },
      { status: 500 }
    );
  }
}
