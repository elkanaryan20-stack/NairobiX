// Client-side first-touch acquisition attribution.
//
// Visitors often arrive via WhatsApp, Instagram, Facebook, LinkedIn, X,
// Threads, Google, etc. before landing on the site — the website URL itself
// is never the acquisition source, it's the conversion destination. This
// captures the UTM parameters (or a referrer-based guess) present on a
// visitor's FIRST page view and persists them, so a lead form submitted
// several pages later still reports the original channel to Zoho.
//
// Zoho's Lead_Source picklist is a closed, finite list (LEAD_SOURCES below).
// Nothing outside that list — and in particular no raw referrer domain —
// may ever be sent to Zoho. Anything we can't confidently map to a named
// channel is normalized to "Referral" (we know it's an external link, just
// not one of our named channels) rather than leaking the raw host.

const STORAGE_KEY = "nx_lead_source";
const MEDIUM_KEY = "nx_lead_source_medium";
const CAMPAIGN_KEY = "nx_lead_source_campaign";

export const LEAD_SOURCES = [
  "Google",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "X",
  "Threads",
  "WhatsApp",
  "Referral",
  "Direct/Organic",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

const LEAD_SOURCE_SET: ReadonlySet<string> = new Set(LEAD_SOURCES);

export function isLeadSource(value: string): value is LeadSource {
  return LEAD_SOURCE_SET.has(value);
}

export const FALLBACK_LEAD_SOURCE: LeadSource = "Direct/Organic";
const REFERRAL_LEAD_SOURCE: LeadSource = "Referral";

const REFERRER_HOST_SOURCE_MAP: Record<string, LeadSource> = {
  "wa.me": "WhatsApp",
  "whatsapp.com": "WhatsApp",
  // Link-wrapping/redirect host used when a link is opened from inside the
  // WhatsApp app (e.g. tapped from our NairobiX WhatsApp Business account).
  // Confirmed by the business owner as a WhatsApp in-app open.
  "l.wl.co": "WhatsApp",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "fb.com": "Facebook",
  "l.facebook.com": "Facebook",
  "linkedin.com": "LinkedIn",
  "lnkd.in": "LinkedIn",
  "x.com": "X",
  "twitter.com": "X",
  "t.co": "X",
  "threads.net": "Threads",
  "google.com": "Google",
};

const UTM_SOURCE_TOKEN_MAP: Record<string, LeadSource> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  ig: "Instagram",
  facebook: "Facebook",
  fb: "Facebook",
  meta: "Facebook",
  linkedin: "LinkedIn",
  x: "X",
  twitter: "X",
  threads: "Threads",
  google: "Google",
  googleads: "Google",
  referral: "Referral",
};

/** Normalizes a utm_source value to a canonical Lead Source. Never returns the raw token. */
function normalizeUtmSource(rawSource: string): LeadSource {
  const key = rawSource.trim().toLowerCase();
  return UTM_SOURCE_TOKEN_MAP[key] ?? REFERRAL_LEAD_SOURCE;
}

/** Normalizes document.referrer to a canonical Lead Source. Never returns the raw host. */
function sourceFromReferrer(referrer: string): LeadSource | null {
  if (!referrer) return null;

  try {
    const host = new URL(referrer).hostname.replace(/^www\./i, "").toLowerCase();
    if (!host || host === window.location.hostname) return null;
    return REFERRER_HOST_SOURCE_MAP[host] ?? REFERRAL_LEAD_SOURCE;
  } catch {
    return null;
  }
}

/**
 * Records first-touch attribution once per browser. Later visits/UTMs never
 * overwrite an already-captured source — we want the ORIGINAL channel that
 * brought the visitor in, not the most recent link they clicked.
 *
 * Priority: UTM source > normalized referrer > Direct/Organic.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    const source = utmSource
      ? normalizeUtmSource(utmSource)
      : sourceFromReferrer(document.referrer) ?? FALLBACK_LEAD_SOURCE;

    window.localStorage.setItem(STORAGE_KEY, source);
    if (utmMedium) window.localStorage.setItem(MEDIUM_KEY, utmMedium);
    if (utmCampaign) window.localStorage.setItem(CAMPAIGN_KEY, utmCampaign);
  } catch {
    // localStorage unavailable (private browsing, blocked storage). Forms
    // fall back to FALLBACK_LEAD_SOURCE via getLeadSource().
  }
}

/**
 * Returns the visitor's captured acquisition source, for inclusion in a lead
 * form submission. Always one of LEAD_SOURCES — a value stored before this
 * allow-list existed (e.g. a raw referrer host from an older build) is
 * discarded in favor of the fallback rather than forwarded to Zoho.
 */
export function getLeadSource(): LeadSource {
  if (typeof window === "undefined") return FALLBACK_LEAD_SOURCE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && isLeadSource(stored) ? stored : FALLBACK_LEAD_SOURCE;
  } catch {
    return FALLBACK_LEAD_SOURCE;
  }
}
