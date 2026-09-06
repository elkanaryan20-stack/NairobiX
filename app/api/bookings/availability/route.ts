import { NextRequest, NextResponse } from "next/server";
import {
  fetchZohoBookingsAvailability,
  NAIROBIX_CONSULTATION_SERVICE_ID,
  NAIROBIX_CONSULTATION_STAFF_ID,
} from "@/lib/zoho-bookings";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Converts an ISO "YYYY-MM-DD" date into the "dd-MMM-yyyy" format Zoho Bookings expects. */
function toZohoSelectedDate(isoDate: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;

  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;

  return `${day}-${MONTHS[monthIndex]}-${year}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Normalizes a Zoho time string ("14:00:00", "14:00", "2:00 pm") into 24-hour "HH:mm". */
function normalizeTimeString(raw: string): string | null {
  const trimmed = raw.trim();

  let match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(trimmed);
  if (match) {
    return `${match[1].padStart(2, "0")}:${match[2]}`;
  }

  match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(trimmed);
  if (match) {
    let hour = Number(match[1]) % 12;
    if (/pm/i.test(match[3])) hour += 12;
    return `${String(hour).padStart(2, "0")}:${match[2]}`;
  }

  return null;
}

/**
 * Extracts a flat list of "HH:mm" slot times from Zoho's availableslots response.
 * The exact shape of returnvalue is confirmed against the live API before this
 * route is relied on in production — this handles the shapes Zoho's API has
 * been observed to return (a plain array, or an object with a `data` array).
 */
function extractAvailableTimes(raw: unknown): string[] {
  if (!isRecord(raw)) return [];

  const returnValue = raw.returnvalue;
  let entries: unknown[] = [];

  if (Array.isArray(returnValue)) {
    entries = returnValue;
  } else if (isRecord(returnValue) && Array.isArray(returnValue.data)) {
    entries = returnValue.data;
  }

  const times: string[] = [];
  for (const entry of entries) {
    const value = typeof entry === "string" ? entry : isRecord(entry) ? entry.time : undefined;
    if (typeof value === "string") {
      const normalized = normalizeTimeString(value);
      if (normalized) times.push(normalized);
    }
  }

  return times;
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ success: false, error: "A date is required." }, { status: 400 });
  }

  const selectedDate = toZohoSelectedDate(date);

  if (!selectedDate) {
    return NextResponse.json(
      { success: false, error: "Date must be in YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  const result = await fetchZohoBookingsAvailability({
    serviceId: NAIROBIX_CONSULTATION_SERVICE_ID,
    staffId: NAIROBIX_CONSULTATION_STAFF_ID,
    selectedDate,
  });

  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 502 });
  }

  const times = extractAvailableTimes(result.data);

  return NextResponse.json({ success: true, times });
}
