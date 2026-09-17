import { createZohoLead } from "@/lib/zoho";
import { FALLBACK_LEAD_SOURCE, isLeadSource } from "@/lib/attribution";

export const VALID_FORM_TYPES = [
  "business-growth-audit",
  "request-solution",
  "partner",
  "contact",
] as const;

export type LeadFormType = (typeof VALID_FORM_TYPES)[number];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const URL_REGEX = /^https?:\/\/.+/i;

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function validateRequiredFields(required: string[], data: Record<string, unknown>) {
  const missing: string[] = [];

  for (const field of required) {
    const value = data[field];

    if (value === undefined || value === null) {
      missing.push(field);
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        missing.push(field);
      }
      continue;
    }

    if (normalizeValue(value) === "") {
      missing.push(field);
    }
  }

  return missing;
}

function mapLeadPayload(formType: string, data: Record<string, unknown>) {
  const base: Record<string, string | string[] | undefined> = {
    First_Name: sanitizeString(data.First_Name),
    Last_Name: sanitizeString(data.Last_Name),
    Company: sanitizeString(data.Company),
    Email: sanitizeString(data.Email),
    Phone: sanitizeString(data.Phone),
    Website: sanitizeString(data.Website),
    City: sanitizeString(data.City),
    Country: sanitizeString(data.Country),
    Industry: sanitizeString(data.Industry),
    Description: sanitizeString(data.Description),
    Growth_Goal: sanitizeString(data.Growth_Goal),
    Business_Challenge: sanitizeString(data.Business_Challenge),

    Current_Marketing_Channels: Array.isArray(data.Current_Marketing_Channels)
      ? data.Current_Marketing_Channels.map((entry) => sanitizeString(entry)).filter(Boolean)
      : sanitizeString(data.Current_Marketing_Channels),

    Desired_Timeline: sanitizeString(data.Desired_Timeline),

    Trial_Advertisement_Budget_Readiness: sanitizeString(data.Trial_Advertisement_Budget_Readiness),

    Investment_Readiness: sanitizeString(data.Investment_Readiness),

    Estimated_Investment: sanitizeString(data.Estimated_Investment),

    Solution_Needed: Array.isArray(data.Solution_Needed)
      ? data.Solution_Needed.map((entry) => sanitizeString(entry)).filter(Boolean)
      : sanitizeString(data.Solution_Needed),

    // Partner_Type/Partnership_Interest/Partnership_Motivation and
    // Partner_Qualification (below) are unchanged Zoho custom field API
    // names, from before the public "NairobiX Opportunities Network"
    // rename. Renaming these keys would point the submission at fields that
    // no longer exist in Zoho, silently dropping the data — public-facing
    // wording changed instead (see the /partner and /partnership pages, and
    // PARTNERSHIP_INTEREST_OPTIONS' four engagement-type values).
    Partner_Type: sanitizeString(data.Partner_Type),

    Partnership_Interest: Array.isArray(data.Partnership_Interest)
      ? data.Partnership_Interest.map((entry) => sanitizeString(entry)).filter(Boolean)
      : sanitizeString(data.Partnership_Interest),

    Partnership_Motivation: sanitizeString(data.Partnership_Motivation),

    // The visitor's original acquisition CHANNEL (WhatsApp, Instagram, Google,
    // etc.), captured client-side from UTM params/referrer on first landing —
    // see lib/attribution.ts. This is marketing attribution, kept separate
    // from — and never written into — Zoho's Lead_Source below, which is now
    // a closed business/opportunity classification, not a channel. Never
    // assume "Website" for this: that's where the lead converted, not where
    // it came from. Re-validated here (not just trusted from the client) so
    // nothing outside the known channel list — a raw referrer domain in
    // particular — can ever reach the CRM, even from a stale client build or
    // a direct API call.
    Marketing_Channel: (() => {
      const value = sanitizeString(data.Marketing_Channel);
      return value && isLeadSource(value) ? value : FALLBACK_LEAD_SOURCE;
    })(),
  };

  // Lead_Source is now a closed 4-value CRM classification (Business
  // Opportunity / Network Opportunity / General Inquiry / Other) — fixed per
  // form, never derived from visitor input. The detailed acquisition channel
  // above (Marketing_Channel) is what varies per visitor.
  if (formType === "business-growth-audit") {
    return {
      ...base,
      Growth_Audit_Status: "New",
      Lead_Type: "Business Growth Audit",
      Lead_Source: "Business Opportunity",
      Rating: "Active",
      Trial_Eligibility: "Not Assessed",
    };
  }

  if (formType === "request-solution") {
    return {
      ...base,
      // Not one of the 9 finalized Lead Type values (no "Service Request"
      // entry) — this form isn't named in the finalized mapping, so "Other"
      // is used rather than leaving a now-invalid picklist value in place.
      Lead_Type: "Other",
      Lead_Source: "Business Opportunity",
      Rating: "Active",
    };
  }

  if (formType === "partner") {
    return {
      ...base,
      Partner_Qualification: "Unreviewed",
      Lead_Type: "Network Application",
      Lead_Source: "Network Opportunity",
      Rating: "Active",
    };
  }

  return {
    ...base,
    Lead_Type: "Website Inquiry",
    Lead_Source: "General Inquiry",
    Rating: "Active",
  };
}

function getValidationRules(formType: string) {
  switch (formType) {
    case "business-growth-audit":
      return {
        required: [
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
          "Investment_Readiness",
        ],
      };

    case "request-solution":
      return {
        required: [
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
      };

    case "partner":
      return {
        required: [
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
      };

    default:
      return {
        required: ["First_Name", "Last_Name", "Company", "Email", "Phone", "Description"],
      };
  }
}

function validateForm(formType: string, data: Record<string, unknown>) {
  const rules = getValidationRules(formType);
  const missing = validateRequiredFields(rules.required, data);

  if (missing.length > 0) {
    return {
      valid: false,
      error: `Please complete the required fields: ${missing.join(", ")}.`,
    };
  }

  const email = sanitizeString(data.Email);

  if (email && !EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  const phone = sanitizeString(data.Phone);

  if (phone && !PHONE_REGEX.test(phone)) {
    return { valid: false, error: "Please enter a valid phone or WhatsApp number." };
  }

  const website = sanitizeString(data.Website);

  if (website && !URL_REGEX.test(website)) {
    return {
      valid: false,
      error: "Please enter a valid website URL, including http:// or https://.",
    };
  }

  if (formType === "business-growth-audit") {
    const channels = Array.isArray(data.Current_Marketing_Channels)
      ? data.Current_Marketing_Channels
      : [data.Current_Marketing_Channels];

    if (channels.includes("None currently") && channels.length > 1) {
      return {
        valid: false,
        error: "'None currently' cannot be selected alongside other marketing channels.",
      };
    }
  }

  if (formType === "request-solution") {
    const solutions = Array.isArray(data.Solution_Needed) ? data.Solution_Needed : [data.Solution_Needed];

    if (solutions.includes("Custom Quote") && solutions.length > 1) {
      return {
        valid: false,
        error: "'Custom Quote' must be selected on its own if you'd like to request a custom project plan.",
      };
    }
  }

  return { valid: true };
}

export type LeadSubmissionResult =
  | { success: true }
  | { success: false; error: string; status: number };

/**
 * Validates and submits a lead to Zoho CRM for the given form type. Shared by
 * the /api/leads route and Nia's CRM tools so there is a single
 * implementation of this business logic.
 */
export async function submitLead(
  formType: string,
  data: Record<string, unknown>
): Promise<LeadSubmissionResult> {
  if (!VALID_FORM_TYPES.includes(formType as LeadFormType)) {
    return { success: false, error: "Unsupported form type.", status: 400 };
  }

  const validation = validateForm(formType, data);

  if (!validation.valid) {
    return { success: false, error: validation.error ?? "Invalid submission.", status: 400 };
  }

  const payload = mapLeadPayload(formType, data);

  console.log("Payload being sent to Zoho:", JSON.stringify(payload, null, 2));

  const result = await createZohoLead(payload);

  if (!result.ok) {
    console.error("Zoho CRM submission failed", { formType, message: result.error });
    return {
      success: false,
      error: "We couldn't submit your request right now. Your information hasn't been lost. Please try again.",
      status: 500,
    };
  }

  console.log("Zoho CRM submission successful", {
    formType,
    leadId: result.data?.data?.[0]?.details?.id,
  });

  return { success: true };
}
