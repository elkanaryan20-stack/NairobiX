const DEFAULT_ZOHO_BOOKINGS_ACCOUNTS_URL = "https://accounts.zoho.com";
const DEFAULT_ZOHO_BOOKINGS_API_URL = "https://www.zohoapis.com";

type ZohoBookingsResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

async function getZohoBookingsAccessToken(): Promise<ZohoBookingsResult<string>> {
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

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string };

  if (!tokenData.access_token) {
    console.error("Zoho Bookings access token missing", tokenData);
    return {
      ok: false,
      error: "We couldn't establish a secure Bookings connection right now.",
    };
  }

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

  return { ok: true, data: data as T };
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
