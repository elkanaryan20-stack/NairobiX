const DEFAULT_ZOHO_BOOKINGS_ACCOUNTS_URL = "https://accounts.zoho.com";
const DEFAULT_ZOHO_BOOKINGS_API_URL = "https://www.zohoapis.com";

// Identifies the single published "NairobiX Business Growth Consultation"
// service in Zoho Bookings. Not secret — the same service ID is already
// embedded in the public hosted booking URL in lib/site-data.ts.
export const NAIROBIX_CONSULTATION_WORKSPACE_ID = "4940054000000039011";
export const NAIROBIX_CONSULTATION_SERVICE_ID = "4940054000000039045";
export const NAIROBIX_CONSULTATION_STAFF_ID = "4940054000000039009";
export const NAIROBIX_BOOKINGS_TIMEZONE = "Africa/Nairobi";

type ZohoBookingsResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// Zoho access tokens are valid for roughly an hour. Caching them in module
// scope avoids requesting a new one on every API call, which otherwise trips
// Zoho's OAuth rate limit ("too many requests continuously") under normal
// traffic. This is a per-instance cache — safe to keep small and simple.
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getZohoBookingsAccessToken(): Promise<ZohoBookingsResult<string>> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return { ok: true, data: cachedAccessToken.token };
  }

  const clientId = process.env.ZOHO_BOOKINGS_CLIENT_ID;
  const clientSecret = process.env.ZOHO_BOOKINGS_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_BOOKINGS_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error: "Zoho Bookings credentials are not configured.",
    };
  }

  const tokenUrl = `${process.env.ZOHO_BOOKINGS_ACCOUNTS_URL || DEFAULT_ZOHO_BOOKINGS_ACCOUNTS_URL}/oauth/v2/token`;

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
    console.error("Zoho Bookings token request failed", { status: tokenResponse.status, errorText });
    return {
      ok: false,
      error: "We couldn't establish a secure Bookings connection right now.",
    };
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    expires_in?: number;
  };

  if (!tokenData.access_token) {
    console.error("Zoho Bookings access token missing", tokenData);
    return {
      ok: false,
      error: "We couldn't establish a secure Bookings connection right now.",
    };
  }

  const expiresInMs = (tokenData.expires_in ?? 3600) * 1000;
  cachedAccessToken = {
    token: tokenData.access_token,
    // Refresh a little early to avoid using a token that expires mid-request.
    expiresAt: Date.now() + expiresInMs - 60_000,
  };

  return { ok: true, data: tokenData.access_token };
}

async function zohoBookingsGet<T>(
  path: string,
  params: Record<string, string>
): Promise<ZohoBookingsResult<T>> {
  const tokenResult = await getZohoBookingsAccessToken();

  if (!tokenResult.ok) {
    return tokenResult;
  }

  const apiUrl = process.env.ZOHO_BOOKINGS_API_URL || DEFAULT_ZOHO_BOOKINGS_API_URL;
  const query = new URLSearchParams(params).toString();
  const url = `${apiUrl}/bookings/v1/json/${path}${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    headers: { Authorization: `Zoho-oauthtoken ${tokenResult.data}` },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`Zoho Bookings ${path} request failed`, { status: response.status, data });
    return {
      ok: false,
      error: `Zoho Bookings ${path} request failed (${response.status}).`,
    };
  }

  // Every Zoho Bookings API response nests the actual payload one level
  // deeper, under a top-level "response" key: { response: { returnvalue, status } }.
  return { ok: true, data: (data?.response ?? data) as T };
}

/** GET /bookings/v1/json/workspaces — lists all workspaces, or one if workspaceId is given. */
export function listZohoBookingsWorkspaces(workspaceId?: string) {
  return zohoBookingsGet("workspaces", workspaceId ? { workspace_id: workspaceId } : {});
}

/** GET /bookings/v1/json/services?workspace_id=... — lists services within a workspace. */
export function listZohoBookingsServices(workspaceId: string) {
  return zohoBookingsGet("services", { workspace_id: workspaceId });
}

/** GET /bookings/v1/json/staffs?workspace_id=... — lists staff assigned within a workspace. */
export function listZohoBookingsStaff(workspaceId: string) {
  return zohoBookingsGet("staffs", { workspace_id: workspaceId });
}

/**
 * GET /bookings/v1/json/availableslots — requires service_id, selected_date, and
 * exactly one of staff_id, group_id, or resource_id.
 */
export function fetchZohoBookingsAvailability(params: {
  serviceId: string;
  selectedDate: string;
  staffId?: string;
  groupId?: string;
  resourceId?: string;
}) {
  const query: Record<string, string> = {
    service_id: params.serviceId,
    selected_date: params.selectedDate,
  };

  if (params.staffId) query.staff_id = params.staffId;
  if (params.groupId) query.group_id = params.groupId;
  if (params.resourceId) query.resource_id = params.resourceId;

  return zohoBookingsGet("availableslots", query);
}

async function zohoBookingsPost<T>(
  path: string,
  formParams: Record<string, string>
): Promise<ZohoBookingsResult<T>> {
  const tokenResult = await getZohoBookingsAccessToken();

  if (!tokenResult.ok) {
    return tokenResult;
  }

  const apiUrl = process.env.ZOHO_BOOKINGS_API_URL || DEFAULT_ZOHO_BOOKINGS_API_URL;
  const url = `${apiUrl}/bookings/v1/json/${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenResult.data}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams(formParams),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`Zoho Bookings ${path} request failed`, { status: response.status, data });
    return {
      ok: false,
      error: `Zoho Bookings ${path} request failed (${response.status}).`,
    };
  }

  return { ok: true, data: (data?.response ?? data) as T };
}

export type ZohoBookingsCustomerDetails = {
  name: string;
  email: string;
  phone_number: string;
};

type ZohoBookingsAppointmentReturnValue = {
  status?: string;
  message?: string;
  booking_id?: string;
  appointment_id?: string;
  [key: string]: unknown;
};

/**
 * POST /bookings/v1/json/appointment — creates a confirmed appointment.
 * Zoho expects form-encoded params (not JSON), with customer_details and
 * additional_fields passed as JSON-encoded strings. A 200 response does not
 * guarantee success — the nested returnvalue.status must be checked.
 */
export async function createZohoBookingsAppointment(params: {
  serviceId: string;
  staffId?: string;
  groupId?: string;
  resourceId?: string;
  fromTime: string;
  timezone: string;
  customer: ZohoBookingsCustomerDetails;
  additionalFields?: Record<string, string>;
}): Promise<ZohoBookingsResult<ZohoBookingsAppointmentReturnValue>> {
  if (!params.staffId && !params.groupId && !params.resourceId) {
    return {
      ok: false,
      error: "One of staffId, groupId, or resourceId is required.",
    };
  }

  const formParams: Record<string, string> = {
    service_id: params.serviceId,
    from_time: params.fromTime,
    timezone: params.timezone,
    customer_details: JSON.stringify(params.customer),
  };

  if (params.staffId) formParams.staff_id = params.staffId;
  if (params.groupId) formParams.group_id = params.groupId;
  if (params.resourceId) formParams.resource_id = params.resourceId;
  if (params.additionalFields) {
    formParams.additional_fields = JSON.stringify(params.additionalFields);
  }

  const result = await zohoBookingsPost<{ returnvalue?: ZohoBookingsAppointmentReturnValue }>(
    "appointment",
    formParams
  );

  if (!result.ok) {
    return result;
  }

  const returnValue = result.data.returnvalue;

  if (!returnValue || returnValue.status === "failure") {
    console.error("Zoho Bookings appointment creation failed", result.data);
    return {
      ok: false,
      error: returnValue?.message || "Zoho Bookings could not create the appointment.",
    };
  }

  return { ok: true, data: returnValue };
}
