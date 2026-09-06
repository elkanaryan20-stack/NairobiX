import {
  createZohoBookingsAppointment,
  NAIROBIX_BOOKINGS_TIMEZONE,
  NAIROBIX_CONSULTATION_SERVICE_ID,
  NAIROBIX_CONSULTATION_STAFF_ID,
} from "@/lib/zoho-bookings";
import { DISCUSSION_TOPIC_OPTIONS } from "@/lib/forms/options";

export const DISCUSSION_TOPICS = DISCUSSION_TOPIC_OPTIONS;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const URL_REGEX = /^https?:\/\/.+/i;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type ConsultationBookingInput = {
  fullName: unknown;
  businessName: unknown;
  email: unknown;
  phone: unknown;
  website?: unknown;
  discussionTopic: unknown;
  priority: unknown;
  date: unknown;
  time: unknown;
};

export type ConsultationBookingResult =
  | { success: true; data: { bookingId?: string; appointmentId?: string } }
  | { success: false; error: string; status: number };

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Combines an ISO date and 24-hour time into Zoho's "dd-MMM-yyyy HH:mm:ss" from_time format. */
function toZohoFromTime(isoDate: string, time: string): string | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!dateMatch) return null;

  const [, year, month, day] = dateMatch;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;

  return `${day}-${MONTHS[monthIndex]}-${year} ${time}:00`;
}

/**
 * Validates and submits a NairobiX Business Growth Consultation booking to
 * Zoho Bookings. Shared by the /api/bookings/appointment route and Nia's
 * book_consultation tool so there is a single implementation of this logic.
 */
export async function submitConsultationBooking(
  input: ConsultationBookingInput
): Promise<ConsultationBookingResult> {
  const fullName = sanitizeString(input.fullName);
  const businessName = sanitizeString(input.businessName);
  const email = sanitizeString(input.email);
  const phone = sanitizeString(input.phone);
  const website = sanitizeString(input.website);
  const discussionTopic = sanitizeString(input.discussionTopic);
  const priority = sanitizeString(input.priority);
  const date = sanitizeString(input.date);
  const time = sanitizeString(input.time);

  const missing: string[] = [];
  if (!fullName) missing.push("full name");
  if (!businessName) missing.push("business name");
  if (!email) missing.push("email");
  if (!phone) missing.push("phone number");
  if (!discussionTopic) missing.push("discussion topic");
  if (!priority) missing.push("current priority");
  if (!date) missing.push("date");
  if (!time) missing.push("time");

  if (missing.length > 0) {
    return {
      success: false,
      error: `Please complete the required fields: ${missing.join(", ")}.`,
      status: 400,
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid email address.", status: 400 };
  }

  if (!PHONE_REGEX.test(phone)) {
    return { success: false, error: "Please enter a valid phone number.", status: 400 };
  }

  if (website && !URL_REGEX.test(website)) {
    return {
      success: false,
      error: "Please enter a valid website URL, including http:// or https://.",
      status: 400,
    };
  }

  if (!DISCUSSION_TOPICS.includes(discussionTopic as (typeof DISCUSSION_TOPICS)[number])) {
    return { success: false, error: "Please select a valid discussion topic.", status: 400 };
  }

  if (!DATE_REGEX.test(date)) {
    return { success: false, error: "Date must be in YYYY-MM-DD format.", status: 400 };
  }

  if (!TIME_REGEX.test(time)) {
    return { success: false, error: "Time must be in 24-hour HH:mm format.", status: 400 };
  }

  const fromTime = toZohoFromTime(date, time);

  if (!fromTime) {
    return { success: false, error: "Invalid date.", status: 400 };
  }

  const additionalFields: Record<string, string> = {
    "Business Name": businessName,
    "What would you like to discuss?": discussionTopic,
    "Tell us briefly about your current priority": priority,
  };

  if (website) {
    additionalFields.Website = website;
  }

  const result = await createZohoBookingsAppointment({
    serviceId: NAIROBIX_CONSULTATION_SERVICE_ID,
    staffId: NAIROBIX_CONSULTATION_STAFF_ID,
    fromTime,
    timezone: NAIROBIX_BOOKINGS_TIMEZONE,
    customer: {
      name: fullName,
      email,
      phone_number: phone,
    },
    additionalFields,
  });

  if (!result.ok) {
    console.error("Zoho Bookings appointment creation failed", { message: result.error });
    return {
      success: false,
      error:
        "We couldn't confirm that time. It may have just been booked by someone else — please choose another slot.",
      status: 502,
    };
  }

  return {
    success: true,
    data: {
      bookingId: result.data.booking_id,
      appointmentId: result.data.appointment_id,
    },
  };
}
