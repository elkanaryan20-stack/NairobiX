// Client-side first-touch acquisition attribution.
//
// Visitors often arrive via WhatsApp, Instagram, Facebook, LinkedIn, X,
// Threads, Google, etc. before landing on the site — the website URL itself
// is never the acquisition source. This captures the UTM parameters (or a
// referrer-based guess) present on a visitor's FIRST page view and persists
// them, so a lead form submitted several pages later still reports the
// original channel to Zoho instead of always reporting "Website".

const STORAGE_KEY = "nx_lead_source";
const MEDIUM_KEY = "nx_lead_source_medium";
const CAMPAIGN_KEY = "nx_lead_source_campaign";

export const FALLBACK_LEAD_SOURCE = "Direct/Organic";

const REFERRER_HOST_SOURCE_MAP: Record<string, string> = {
  "wa.me": "WhatsApp",
  "whatsapp.com": "WhatsApp",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "fb.com": "Facebook",
  "l.facebook.com": "Facebook",
  "linkedin.com": "LinkedIn",
  "lnkd.in": "LinkedIn",
  "x.com": "X (Twitter)",
  "twitter.com": "X (Twitter)",
  "t.co": "X (Twitter)",
  "threads.net": "Threads",
  "google.com": "Google",
  "bing.com": "Bing",
  "youtube.com": "YouTube",
  "tiktok.com": "TikTok",
};

const UTM_SOURCE_TOKEN_MAP: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  ig: "Instagram",
  facebook: "Facebook",
  fb: "Facebook",
  meta: "Facebook",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  twitter: "X (Twitter)",
  threads: "Threads",
  google: "Google",
  googleads: "Google",
  bing: "Bing",
  youtube: "YouTube",
  tiktok: "TikTok",
  newsletter: "Email",
  email: "Email",
};

function normalizeUtmSource(rawSource: string): string {
  const key = rawSource.trim().toLowerCase();
  return UTM_SOURCE_TOKEN_MAP[key] ?? rawSource.trim();
}

function sourceFromReferrer(referrer: string): string | null {
  if (!referrer) return null;

  try {
    const host = new URL(referrer).hostname.replace(/^www\./i, "").toLowerCase();
    if (!host || host === window.location.hostname) return null;
    return REFERRER_HOST_SOURCE_MAP[host] ?? host;
  } catch {
    return null;
  }
}

/**
 * Records first-touch attribution once per browser. Later visits/UTMs never
 * overwrite an already-captured source — we want the ORIGINAL channel that
 * brought the visitor in, not the most recent link they clicked.
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

/** Returns the visitor's captured acquisition source, for inclusion in a lead form submission. */
export function getLeadSource(): string {
  if (typeof window === "undefined") return FALLBACK_LEAD_SOURCE;

  try {
    return window.localStorage.getItem(STORAGE_KEY) || FALLBACK_LEAD_SOURCE;
  } catch {
    return FALLBACK_LEAD_SOURCE;
  }
}
