import { createHash } from "node:crypto";
import { TRACKING } from "@/lib/tracking-config";

// Meta Conversions API — server-side events that mirror the browser Pixel.
// Off unless both NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN are
// set. Each event carries the same event_id as its Pixel event, so Meta
// counts it once. Email and phone are normalized and SHA-256 hashed here;
// nothing unhashed that identifies a person is sent.

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v25.0";

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Kenyan local numbers (07…/01…) become 2547…/2541…; other numbers keep their country code. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
  return digits;
}

export type MetaServerEvent = {
  eventName: "Lead" | "Schedule" | "Contact";
  eventId: string;
  sourceUrl: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbp?: string;
  fbc?: string;
  ip?: string | null;
  userAgent?: string | null;
};

export function metaCapiEnabled() {
  return Boolean(TRACKING.metaPixelId && process.env.META_CAPI_ACCESS_TOKEN);
}

export async function sendMetaEvent(event: MetaServerEvent): Promise<void> {
  if (!metaCapiEnabled()) return;

  const userData: Record<string, unknown> = {};
  if (event.email) userData.em = [sha256(event.email.trim().toLowerCase())];
  if (event.phone) userData.ph = [sha256(normalizePhone(event.phone))];
  if (event.firstName) userData.fn = [sha256(event.firstName.trim().toLowerCase())];
  if (event.lastName) userData.ln = [sha256(event.lastName.trim().toLowerCase())];
  if (event.fbp) userData.fbp = event.fbp;
  if (event.fbc) userData.fbc = event.fbc;
  if (event.ip) userData.client_ip_address = event.ip;
  if (event.userAgent) userData.client_user_agent = event.userAgent;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.sourceUrl,
        user_data: userData,
      },
    ],
  };
  if (process.env.META_CAPI_TEST_EVENT_CODE) body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${TRACKING.metaPixelId}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) console.error("Meta Conversions API rejected event", event.eventName, response.status, await response.text());
  } catch (error) {
    console.error("Meta Conversions API request failed", event.eventName, error);
  }
}

/** Reads the request context CAPI needs; server events require affirmative Marketing consent. */
export function requestContext(request: Request, body: Record<string, unknown>) {
  const tracking = (typeof body.Tracking === "object" && body.Tracking) || {};
  const t = tracking as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v.length < 500 ? v : undefined);
  const optedOut = request.headers.get("sec-gpc") === "1" || t.adConsent !== true;
  return {
    optedOut,
    eventId: str(t.eventId),
    sourceUrl: str(t.pageUrl) ?? request.headers.get("referer") ?? "",
    fbp: str(t.fbp),
    fbc: str(t.fbc),
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: request.headers.get("user-agent"),
  };
}
