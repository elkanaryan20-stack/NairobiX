// The NairobiX event architecture — one place every conversion event goes
// through, so each fires exactly once per destination.
//
//   page_view            GA4 enhanced measurement (automatic, incl. client-side
//                        navigations). Never sent manually — that would double count.
//                        Meta PageView is sent by AnalyticsTracker on route change.
//   cta_click            any link to an assessment, booking or contact destination
//   assessment_start     first answer given in the Growth Assessment (once per session)
//   assessment_complete  assessment accepted by the CRM            → Meta Lead · Ads
//   booking_start        first time slot chosen (once per session)
//   booking_complete     Zoho Bookings appointment created         → Meta Schedule · Ads
//   contact_submit       general enquiry accepted by the CRM       → Meta Contact · Ads
//   generate_lead        request-a-solution / network application (pre-existing)
//
// Mark assessment_complete, booking_complete and contact_submit as Key events
// in GA4. No personal data is ever sent to GA4.

import { TRACKING } from "@/lib/tracking-config";
import { getAttributionPayload, getMetaBrowserIds } from "@/lib/attribution";

type Params = Record<string, string | number | boolean | undefined>;

const META_EVENT: Record<string, string> = {
  assessment_complete: "Lead",
  booking_complete: "Schedule",
  contact_submit: "Contact",
};

/** Global Privacy Control: when set, no advertising pixels or user data are sent. */
export function adTrackingAllowed(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl !== true;
}

/** A per-conversion ID shared by the browser Pixel and the server Conversions API for deduplication. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export function trackEvent(
  name: string,
  params: Params = {},
  options: { eventId?: string; userData?: { email?: string; phone?: string }; metaEvent?: string } = {},
) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));

  // GA4 (and GTM, via the same dataLayer).
  window.gtag?.("event", name, clean);
  if (TRACKING.gtmId) window.dataLayer?.push({ event: `nx_${name}`, ...clean });

  if (!adTrackingAllowed()) return;

  // Google Ads conversion, with enhanced-conversion user data when provided.
  const label = TRACKING.googleAdsLabels[name];
  if (TRACKING.googleAdsId && label && window.gtag) {
    if (options.userData?.email || options.userData?.phone) {
      window.gtag("set", "user_data", {
        ...(options.userData.email ? { email: options.userData.email.trim().toLowerCase() } : {}),
        ...(options.userData.phone ? { phone_number: options.userData.phone.replace(/[^\d+]/g, "") } : {}),
      });
    }
    window.gtag("event", "conversion", { send_to: `${TRACKING.googleAdsId}/${label}`, transaction_id: options.eventId });
  }

  // Meta Pixel — standard event, deduplicated against the server event by eventID.
  const metaEvent = options.metaEvent ?? META_EVENT[name];
  if (metaEvent && window.fbq) {
    window.fbq("track", metaEvent, { content_name: String(clean.form_type ?? name) }, options.eventId ? { eventID: options.eventId } : undefined);
  }
}

/** Fires an event at most once per browser session (e.g. *_start events). */
export function trackOnce(name: string, params: Params = {}) {
  try {
    const key = `nx_evt_${name}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked: fall through and send once for this page.
  }
  trackEvent(name, params);
}

/** Backwards-compatible alias for earlier call sites (proposal responses, partner forms). */
export function trackConversion(eventName: string, params?: Params) {
  trackEvent(eventName, params);
}

/**
 * The tracking context a form sends alongside its fields: attribution for the
 * CRM, and the event ID + Meta browser IDs the server needs to send the
 * matching Conversions API event. Never forwarded to Zoho as-is.
 */
export function formTrackingPayload(eventId: string) {
  return {
    Attribution: getAttributionPayload(),
    Tracking: {
      eventId,
      pageUrl: typeof window !== "undefined" ? window.location.href.split("?")[0] : "",
      adConsent: adTrackingAllowed(),
      ...(adTrackingAllowed() ? getMetaBrowserIds() : {}),
    },
  };
}
