const DEFAULT_ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com";
const DEFAULT_ZOHO_API_URL = "https://www.zohoapis.com";

export type ZohoLeadPayload = Record<string, string | string[] | undefined>;

function sanitizeText(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return undefined;
}

function sanitizeArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const cleaned = value
      .map((entry) => sanitizeText(entry))
      .filter((entry): entry is string => Boolean(entry));

    return cleaned.length > 0 ? cleaned : undefined;
  }

  return undefined;
}

function normalizeValue(value: unknown): string | string[] | undefined {
  if (Array.isArray(value)) {
    const sanitized = sanitizeArray(value);
    return sanitized && sanitized.length > 0 ? sanitized : undefined;
  }

  return sanitizeText(value);
}

function getZohoErrorMessage(response: Response, fallback: string): string {
  const statusText = response.statusText || "Request failed";
  return `${fallback} (${response.status} ${statusText})`;
}

export async function createZohoLead(data: ZohoLeadPayload) {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error: "Zoho credentials are not configured.",
    } as const;
  }

  const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL || DEFAULT_ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("Zoho token request failed", { status: tokenResponse.status, errorText });
    return {
      ok: false,
      error: "We couldn't establish a secure CRM connection right now.",
    } as const;
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string; error_description?: string };

  if (!tokenData.access_token) {
    console.error("Zoho access token missing", tokenData);
    return {
      ok: false,
      error: "We couldn't establish a secure CRM connection right now.",
    } as const;
  }

  const crmUrl = `${process.env.ZOHO_API_URL || DEFAULT_ZOHO_API_URL}/crm/v2/Leads`;
  const payload = {
    data: [
      Object.fromEntries(
        Object.entries(data)
          .filter(([, value]) => value !== undefined && value !== null && value !== "")
          .map(([key, value]) => [key, normalizeValue(value) ?? value])
      ),
    ],
  };

  const crmResponse = await fetch(crmUrl, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!crmResponse.ok) {
    const errorText = await crmResponse.text();
    console.error("Zoho CRM lead creation failed", {
      status: crmResponse.status,
      response: errorText,
    });

    return {
      ok: false,
      error: getZohoErrorMessage(crmResponse, "We couldn't submit your request right now."),
    } as const;
  }

  const responseData = await crmResponse.json();
  console.log("Zoho CRM response:", JSON.stringify(responseData, null, 2));

  return {
    ok: true,
    data: responseData,
  } as const;
}
