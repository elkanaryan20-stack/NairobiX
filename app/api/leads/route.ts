import { NextResponse } from "next/server";
import { createZohoLead } from "@/lib/zoho";

const VALID_FORM_TYPES = [
  "business-growth-audit",
  "request-solution",
  "partner",
  "contact",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const URL_REGEX = /^https?:\/\/.+/i;

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function validateRequiredFields(
  required: string[],
  data: Record<string, unknown>
) {
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

function mapLeadPayload(
  formType: string,
  data: Record<string, unknown>
) {
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

    Current_Marketing_Channels: Array.isArray(
      data.Current_Marketing_Channels
    )
      ? data.Current_Marketing_Channels
          .map((entry) => sanitizeString(entry))
          .filter(Boolean)
      : sanitizeString(data.Current_Marketing_Channels),

    Desired_Timeline: sanitizeString(data.Desired_Timeline),

    Trial_Advertisement_Budget_Readiness: sanitizeString(
      data.Trial_Advertisement_Budget_Readiness
    ),

    Estimated_Investment: sanitizeString(
      data.Estimated_Investment
    ),

    Solution_Needed: Array.isArray(data.Solution_Needed)
      ? data.Solution_Needed
          .map((entry) => sanitizeString(entry))
          .filter(Boolean)
      : sanitizeString(data.Solution_Needed),

    Partner_Type: sanitizeString(data.Partner_Type),

    Partnership_Interest: Array.isArray(
      data.Partnership_Interest
    )
      ? data.Partnership_Interest
          .map((entry) => sanitizeString(entry))
          .filter(Boolean)
      : sanitizeString(data.Partnership_Interest),

    Partnership_Motivation: sanitizeString(
      data.Partnership_Motivation
    ),
  };

  if (formType === "business-growth-audit") {
    return {
      ...base,
      Growth_Audit_Status: "New",
      Lead_Type: "Business Assessment",
      Lead_Source: "Website",
      Rating: "Active",
      Trial_Eligibility: "Not Assessed",
    };
  }

  if (formType === "request-solution") {
    return {
      ...base,
      Lead_Type: "Service Request",
      Lead_Source: "Website",
      Rating: "Active",
    };
  }

  if (formType === "partner") {
    return {
      ...base,
      Partner_Qualification: "Unreviewed",
      Lead_Type: "Partner Application",
      Lead_Source: "Website",
      Rating: "Active",
    };
  }

  return {
    ...base,
    Lead_Type: "Contact",
    Lead_Source: "Website",
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
        required: [
          "First_Name",
          "Last_Name",
          "Company",
          "Email",
          "Phone",
          "Description",
        ],
      };
  }
}

function validateForm(
  formType: string,
  data: Record<string, unknown>
) {
  const rules = getValidationRules(formType);
  const missing = validateRequiredFields(
    rules.required,
    data
  );

  if (missing.length > 0) {
    return {
      valid: false,
      error: `Please complete the required fields: ${missing.join(
        ", "
      )}.`,
    };
  }

  const email = sanitizeString(data.Email);

  if (email && !EMAIL_REGEX.test(email)) {
    return {
      valid: false,
      error: "Please enter a valid email address.",
    };
  }

  const phone = sanitizeString(data.Phone);

  if (phone && !PHONE_REGEX.test(phone)) {
    return {
      valid: false,
      error: "Please enter a valid phone or WhatsApp number.",
    };
  }

  const website = sanitizeString(data.Website);

  if (website && !URL_REGEX.test(website)) {
    return {
      valid: false,
      error:
        "Please enter a valid website URL, including http:// or https://.",
    };
  }

  if (formType === "business-growth-audit") {
    const channels = Array.isArray(
      data.Current_Marketing_Channels
    )
      ? data.Current_Marketing_Channels
      : [data.Current_Marketing_Channels];

    if (
      channels.includes("None currently") &&
      channels.length > 1
    ) {
      return {
        valid: false,
        error:
          "'None currently' cannot be selected alongside other marketing channels.",
      };
    }
  }

  if (formType === "request-solution") {
    const solutions = Array.isArray(data.Solution_Needed)
      ? data.Solution_Needed
      : [data.Solution_Needed];

    if (
      solutions.includes("Custom Quote") &&
      solutions.length > 1
    ) {
      return {
        valid: false,
        error:
          "'Custom Quote' must be selected on its own if you'd like to request a custom project plan.",
      };
    }
  }

  return { valid: true };
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    if (!isRecord(json)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form payload.",
        },
        { status: 400 }
      );
    }

    const formType = sanitizeString(json.formType);

    if (
      !VALID_FORM_TYPES.includes(
        formType as (typeof VALID_FORM_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported form type.",
        },
        { status: 400 }
      );
    }

    const validation = validateForm(
      formType,
      json as Record<string, unknown>
    );

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const payload = mapLeadPayload(
      formType,
      json as Record<string, unknown>
    );

    console.log(
      "Payload being sent to Zoho:",
      JSON.stringify(payload, null, 2)
    );

    const result = await createZohoLead(payload);

    if (!result.ok) {
      console.error("Zoho CRM submission failed", {
        formType,
        message: result.error,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't submit your request right now. Your information hasn't been lost. Please try again.",
        },
        { status: 500 }
      );
    }

    console.log("Zoho CRM submission successful", {
      formType,
      leadId: result.data?.data?.[0]?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead submission route error", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't submit your request right now. Your information hasn't been lost. Please try again.",
      },
      { status: 500 }
    );
  }
}