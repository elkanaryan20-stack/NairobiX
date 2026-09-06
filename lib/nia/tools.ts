import type Anthropic from "@anthropic-ai/sdk";
import { submitLead } from "@/lib/leads";
import { submitConsultationBooking, type ConsultationBookingInput } from "@/lib/booking";
import {
  fetchZohoBookingsAvailability,
  NAIROBIX_CONSULTATION_SERVICE_ID,
  NAIROBIX_CONSULTATION_STAFF_ID,
} from "@/lib/zoho-bookings";
import {
  BUDGET_READINESS_OPTIONS,
  DISCUSSION_TOPIC_OPTIONS,
  GROWTH_GOAL_OPTIONS,
  INDUSTRY_OPTIONS,
  INVESTMENT_OPTIONS,
  MARKETING_CHANNEL_OPTIONS,
  PARTNER_TYPE_OPTIONS,
  PARTNERSHIP_INTEREST_OPTIONS,
  SOLUTION_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/forms/options";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Guards every mutating tool: Claude must only set this after the visitor has explicitly confirmed. */
const CONFIRMED_FIELD = {
  confirmed: {
    type: "boolean" as const,
    description:
      "Must be exactly true. Only set this after the visitor has explicitly confirmed, in their own words in a previous message, that they want this submitted. Never set it to true speculatively or in the same turn you first offer to submit.",
  },
};

const CONFIRMED_REQUIRED = ["confirmed"];

function requiresConfirmation(input: unknown): string | null {
  if (!isRecord(input) || input.confirmed !== true) {
    return "This action requires the visitor's explicit confirmation first. Ask them to confirm in plain language, then call this tool again with confirmed set to true.";
  }
  return null;
}

function omitConfirmed(input: unknown): Record<string, unknown> {
  const data = { ...(input as Record<string, unknown>) };
  delete data.confirmed;
  return data;
}

/** Converts an ISO "YYYY-MM-DD" date into the "dd-MMM-yyyy" format Zoho Bookings expects. */
function toZohoSelectedDate(isoDate: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;
  return `${day}-${MONTHS[monthIndex]}-${year}`;
}

function normalizeTimeString(raw: string): string | null {
  const trimmed = raw.trim();
  let match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(trimmed);
  if (match) return `${match[1].padStart(2, "0")}:${match[2]}`;
  match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(trimmed);
  if (match) {
    let hour = Number(match[1]) % 12;
    if (/pm/i.test(match[3])) hour += 12;
    return `${String(hour).padStart(2, "0")}:${match[2]}`;
  }
  return null;
}

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

export const NIA_TOOLS: Anthropic.Tool[] = [
  {
    name: "check_consultation_availability",
    description:
      "Look up real available consultation time slots for a given date. Informational only — safe to call anytime without confirmation, including to explore multiple dates.",
    input_schema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "Date to check, in YYYY-MM-DD format. Must be today or a future date.",
        },
      },
      required: ["date"],
    },
  },
  {
    name: "submit_growth_audit",
    description:
      "Submit a Business Growth Audit lead to the NairobiX CRM. This is a business action — only call it after the visitor has explicitly confirmed submission in a previous message. Summarize what you collected and ask for confirmation first, as plain text, with no tool call.",
    input_schema: {
      type: "object",
      properties: {
        ...CONFIRMED_FIELD,
        First_Name: { type: "string" },
        Last_Name: { type: "string" },
        Company: { type: "string", description: "Business name" },
        Industry: { type: "string", enum: INDUSTRY_OPTIONS },
        Email: { type: "string" },
        Phone: { type: "string", description: "Phone or WhatsApp number, with country code if known" },
        Website: { type: "string", description: "Optional website or online presence URL" },
        City: { type: "string" },
        Country: { type: "string" },
        Growth_Goal: { type: "string", enum: GROWTH_GOAL_OPTIONS },
        Business_Challenge: {
          type: "string",
          description: "A concise summary, in your own words, of the business's current growth challenge",
        },
        Current_Marketing_Channels: {
          type: "array",
          items: { type: "string", enum: MARKETING_CHANNEL_OPTIONS },
          description: "Channels currently used. Use only [\"None currently\"] if none — never combine it with other values.",
        },
        Desired_Timeline: { type: "string", enum: TIMELINE_OPTIONS },
        Trial_Advertisement_Budget_Readiness: {
          type: "string",
          enum: BUDGET_READINESS_OPTIONS,
          description: "Optional — only include if discussed",
        },
      },
      required: [
        ...CONFIRMED_REQUIRED,
        "First_Name",
        "Last_Name",
        "Company",
        "Industry",
        "Email",
        "Phone",
        "City",
        "Country",
        "Growth_Goal",
        "Business_Challenge",
        "Current_Marketing_Channels",
        "Desired_Timeline",
      ],
    },
  },
  {
    name: "submit_service_request",
    description:
      "Submit a specific Service Request lead to the NairobiX CRM, for a visitor who already knows which solution they want. Business action — only call after explicit visitor confirmation.",
    input_schema: {
      type: "object",
      properties: {
        ...CONFIRMED_FIELD,
        First_Name: { type: "string" },
        Last_Name: { type: "string" },
        Company: { type: "string" },
        Email: { type: "string" },
        Phone: { type: "string" },
        Website: { type: "string", description: "Optional" },
        Solution_Needed: {
          type: "array",
          items: { type: "string", enum: SOLUTION_OPTIONS },
          description: "One or more solutions, or [\"Custom Quote\"] alone for a bespoke request",
        },
        Estimated_Investment: { type: "string", enum: INVESTMENT_OPTIONS },
        Description: { type: "string", description: "What the visitor wants built, improved, or achieved" },
        Desired_Timeline: { type: "string", enum: TIMELINE_OPTIONS },
      },
      required: [
        ...CONFIRMED_REQUIRED,
        "First_Name",
        "Last_Name",
        "Company",
        "Email",
        "Phone",
        "Solution_Needed",
        "Estimated_Investment",
        "Description",
        "Desired_Timeline",
      ],
    },
  },
  {
    name: "submit_partner_application",
    description:
      "Submit a Growth Partner application to the NairobiX CRM. Business action — only call after explicit visitor confirmation.",
    input_schema: {
      type: "object",
      properties: {
        ...CONFIRMED_FIELD,
        First_Name: { type: "string" },
        Last_Name: { type: "string" },
        Company: { type: "string" },
        Email: { type: "string" },
        Phone: { type: "string" },
        Website: { type: "string", description: "Optional" },
        City: { type: "string" },
        Country: { type: "string" },
        Partner_Type: { type: "string", enum: PARTNER_TYPE_OPTIONS },
        Partnership_Interest: {
          type: "array",
          items: { type: "string", enum: PARTNERSHIP_INTEREST_OPTIONS },
        },
        Partnership_Motivation: {
          type: "string",
          description: "Why a partnership with NairobiX would create value, in the visitor's own context",
        },
      },
      required: [
        ...CONFIRMED_REQUIRED,
        "First_Name",
        "Last_Name",
        "Company",
        "Email",
        "Phone",
        "City",
        "Country",
        "Partner_Type",
        "Partnership_Interest",
        "Partnership_Motivation",
      ],
    },
  },
  {
    name: "book_consultation",
    description:
      "Book a real 30-minute NairobiX Business Growth Consultation slot in Zoho Bookings. Only call this for a date and time previously confirmed available via check_consultation_availability, and only after the visitor has explicitly confirmed they want that slot booked.",
    input_schema: {
      type: "object",
      properties: {
        ...CONFIRMED_FIELD,
        fullName: { type: "string" },
        businessName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        website: { type: "string", description: "Optional" },
        discussionTopic: { type: "string", enum: DISCUSSION_TOPIC_OPTIONS },
        priority: { type: "string", description: "Brief summary of their current priority" },
        date: { type: "string", description: "YYYY-MM-DD, must be a date already checked for availability" },
        time: { type: "string", description: "24-hour HH:mm, must be a time already confirmed available" },
      },
      required: [
        ...CONFIRMED_REQUIRED,
        "fullName",
        "businessName",
        "email",
        "phone",
        "discussionTopic",
        "priority",
        "date",
        "time",
      ],
    },
  },
];

export type NiaToolResult = {
  content: string;
  isError: boolean;
};

/** Executes a tool call by name. All CRM/booking mutations reuse the same shared functions the website's own forms call. */
export async function executeNiaTool(name: string, input: unknown): Promise<NiaToolResult> {
  try {
    if (name === "check_consultation_availability") {
      const date = isRecord(input) && typeof input.date === "string" ? input.date : "";
      const selectedDate = toZohoSelectedDate(date);
      if (!selectedDate) {
        return { content: "Invalid date — expected YYYY-MM-DD.", isError: true };
      }

      const result = await fetchZohoBookingsAvailability({
        serviceId: NAIROBIX_CONSULTATION_SERVICE_ID,
        staffId: NAIROBIX_CONSULTATION_STAFF_ID,
        selectedDate,
      });

      if (!result.ok) {
        return { content: `Could not fetch availability: ${result.error}`, isError: true };
      }

      const times = extractAvailableTimes(result.data);
      return {
        content:
          times.length > 0
            ? `Available times on ${date} (Africa/Nairobi, 24-hour): ${times.join(", ")}`
            : `No consultation slots are available on ${date}.`,
        isError: false,
      };
    }

    if (name === "submit_growth_audit" || name === "submit_service_request" || name === "submit_partner_application") {
      const confirmationError = requiresConfirmation(input);
      if (confirmationError) return { content: confirmationError, isError: true };

      const formType =
        name === "submit_growth_audit"
          ? "business-growth-audit"
          : name === "submit_service_request"
            ? "request-solution"
            : "partner";

      const result = await submitLead(formType, omitConfirmed(input));

      if (!result.success) {
        return { content: `Submission failed: ${result.error}`, isError: true };
      }

      return { content: "Submitted successfully to the NairobiX team.", isError: false };
    }

    if (name === "book_consultation") {
      const confirmationError = requiresConfirmation(input);
      if (confirmationError) return { content: confirmationError, isError: true };

      const result = await submitConsultationBooking(omitConfirmed(input) as ConsultationBookingInput);

      if (!result.success) {
        return { content: `Booking failed: ${result.error}`, isError: true };
      }

      return {
        content: `Consultation booked successfully. Booking reference: ${result.data.bookingId ?? "confirmed"}.`,
        isError: false,
      };
    }

    return { content: `Unknown tool: ${name}`, isError: true };
  } catch (error) {
    console.error("Nia tool execution error", { tool: name, error });
    return { content: "An unexpected error occurred while executing this action.", isError: true };
  }
}
