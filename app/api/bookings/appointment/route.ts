import { NextResponse } from "next/server";
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

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Bookings appointment route error", error);
    return NextResponse.json(
      { success: false, error: "We couldn't submit your booking right now. Please try again." },
      { status: 500 }
    );
  }
}
