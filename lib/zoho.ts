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

// Zoho access tokens are valid for roughly an hour. Caching in module scope
// (mirroring lib/zoho-bookings.ts) avoids requesting a new one on every CRM
// call, which otherwise trips Zoho's OAuth rate limit under normal traffic —
// this matters more once Deals/Tasks calls stack up per proposal response.
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

type ZohoTokenResult = { ok: true; token: string } | { ok: false; error: string };

async function getZohoAccessToken(): Promise<ZohoTokenResult> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return { ok: true, token: cachedAccessToken.token };
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error: "Zoho credentials are not configured.",
    };
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
    };
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
    expires_in?: number;
  };

  if (!tokenData.access_token) {
    console.error("Zoho access token missing", tokenData);
    return {
      ok: false,
      error: "We couldn't establish a secure CRM connection right now.",
    };
  }

  const expiresInMs = (tokenData.expires_in ?? 3600) * 1000;
  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: Date.now() + expiresInMs - 60_000,
  };

  return { ok: true, token: tokenData.access_token };
}

export async function createZohoLead(data: ZohoLeadPayload) {
  const tokenResult = await getZohoAccessToken();

  if (!tokenResult.ok) {
    return tokenResult;
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
      Authorization: `Zoho-oauthtoken ${tokenResult.token}`,
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

  const responseData = (await crmResponse.json()) as {
    data?: Array<{ status?: string; code?: string; message?: string; details?: { id?: string } }>;
  };
  console.log("Zoho CRM response:", JSON.stringify(responseData, null, 2));

  // The Leads API can return an overall HTTP 200/201 while the individual
  // record entry reports status: "error" (e.g. INVALID_DATA, MANDATORY_NOT_FOUND,
  // DUPLICATE_DATA) — HTTP success alone does not mean the record, or every
  // field on it, was actually accepted by Zoho.
  const record = responseData.data?.[0];

  if (record && record.status !== "success") {
    console.error("Zoho CRM rejected the lead record", {
      code: record.code,
      message: record.message,
      details: record.details,
    });

    return {
      ok: false,
      error: `Zoho rejected the lead record (${record.code ?? "UNKNOWN"}): ${record.message ?? "no message"}.`,
    } as const;
  }

  return {
    ok: true,
    data: responseData,
  } as const;
}

// The Deal field that carries the proposal URL is a repurposed field (the
// unused "Website" field on Deals, relabeled "Growth Proposal Link" in the
// Zoho UI) — its underlying API name can't be confirmed without CRM admin
// access, so it's read from an env override rather than hardcoded, in case
// the relabel turns out to have created a genuinely new API name instead.
const PROPOSAL_LINK_FIELD = process.env.ZOHO_PROPOSAL_LINK_FIELD || "Website";

type ZohoCrmResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function zohoCrmRequest<T>(
  method: "GET" | "POST" | "PUT",
  path: string,
  body?: unknown
): Promise<ZohoCrmResult<T>> {
  const tokenResult = await getZohoAccessToken();

  if (!tokenResult.ok) {
    return tokenResult;
  }

  const apiUrl = process.env.ZOHO_API_URL || DEFAULT_ZOHO_API_URL;
  const response = await fetch(`${apiUrl}/crm/v2/${path}`, {
    method,
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenResult.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(`Zoho CRM ${method} ${path} failed`, { status: response.status, data });
    return {
      ok: false,
      error: `Zoho CRM request failed (${response.status}).`,
    };
  }

  return { ok: true, data: data as T };
}

export type ZohoDeal = {
  id: string;
  Stage?: string;
  Next_Step?: string;
  Owner?: { id?: string; name?: string; email?: string } | null;
  Contact_Name?: { id?: string; name?: string } | null;
  [field: string]: unknown;
};

/** Reads the proposal link off a Deal using the configured field name (see PROPOSAL_LINK_FIELD above). */
export function getProposalLink(deal: ZohoDeal): string | undefined {
  const value = deal[PROPOSAL_LINK_FIELD];
  return typeof value === "string" && value.trim() ? value : undefined;
}

/** GET /crm/v2/Deals/{id} — fetches only the fields the proposal response flow needs. */
export async function getZohoDeal(dealId: string): Promise<ZohoCrmResult<ZohoDeal> & { notFound?: boolean }> {
  const fields = ["Stage", "Next_Step", "Owner", "Contact_Name", PROPOSAL_LINK_FIELD].join(",");
  const result = await zohoCrmRequest<{ data?: Array<Record<string, unknown>> }>(
    "GET",
    `Deals/${encodeURIComponent(dealId)}?fields=${encodeURIComponent(fields)}`
  );

  if (!result.ok) {
    return result;
  }

  const record = result.data.data?.[0];

  if (!record) {
    return { ok: false, error: "Deal not found.", notFound: true };
  }

  return { ok: true, data: record as unknown as ZohoDeal };
}

/** PUT /crm/v2/Deals/{id} — updates only the Next Step field. */
export async function updateZohoDealNextStep(dealId: string, nextStep: string): Promise<ZohoCrmResult<true>> {
  const result = await zohoCrmRequest<{
    data?: Array<{ status?: string; code?: string; message?: string }>;
  }>("PUT", `Deals/${encodeURIComponent(dealId)}`, { data: [{ id: dealId, Next_Step: nextStep }] });

  if (!result.ok) {
    return result;
  }

  const record = result.data.data?.[0];

  if (record && record.status !== "success") {
    console.error("Zoho Deal update rejected", record);
    return { ok: false, error: `Zoho rejected the deal update (${record.code ?? "UNKNOWN"}).` };
  }

  return { ok: true, data: true };
}

/**
 * GET /crm/v2/Deals/{id}/Tasks — the Deal's related Tasks, scanned for one
 * with the given Subject. Used to make Task creation idempotent (a new
 * custom field to mark "already responded" isn't available — see
 * lib/proposal-response.ts) without relying solely on timing between the
 * Next Step update and the Task creation call below.
 */
export async function findZohoDealTaskBySubject(
  dealId: string,
  subject: string
): Promise<ZohoCrmResult<boolean>> {
  const result = await zohoCrmRequest<{ data?: Array<{ Subject?: string }> }>(
    "GET",
    `Deals/${encodeURIComponent(dealId)}/Tasks?fields=Subject&per_page=200`
  );

  // Zoho returns a non-2xx (204/no content style 400) when a related list is
  // simply empty — that's "no matching task", not a request failure.
  if (!result.ok) {
    return { ok: true, data: false };
  }

  const found = (result.data.data ?? []).some((task) => task.Subject === subject);
  return { ok: true, data: found };
}

/**
 * POST /crm/v2/Tasks — creates a Task related to a Deal via the polymorphic
 * What_Id lookup ($se_module disambiguates which module What_Id points to).
 */
export async function createZohoTask(params: {
  subject: string;
  description: string;
  dealId: string;
  ownerId?: string;
  priority?: "High" | "Normal" | "Low";
}): Promise<ZohoCrmResult<{ taskId?: string }>> {
  const taskPayload: Record<string, unknown> = {
    Subject: params.subject,
    Description: params.description,
    What_Id: params.dealId,
    $se_module: "Deals",
    Status: "Not Started",
    Priority: params.priority ?? "Normal",
  };

  if (params.ownerId) {
    taskPayload.Owner = { id: params.ownerId };
  }

  const result = await zohoCrmRequest<{
    data?: Array<{ status?: string; code?: string; message?: string; details?: { id?: string } }>;
  }>("POST", "Tasks", { data: [taskPayload] });

  if (!result.ok) {
    return result;
  }

  const record = result.data.data?.[0];

  if (!record || record.status !== "success") {
    console.error("Zoho Task creation rejected", record);
    return { ok: false, error: `Zoho rejected the task creation (${record?.code ?? "UNKNOWN"}).` };
  }

  return { ok: true, data: { taskId: record.details?.id } };
}
