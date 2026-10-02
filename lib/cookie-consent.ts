export const COOKIE_CONSENT_KEY = "nairobix:cookie-consent:v1";

type StoredChoice = { version: 1; analytics: boolean; marketing: boolean };

function readChoice(): StoredChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(window.localStorage.getItem(COOKIE_CONSENT_KEY) || "null") as Partial<StoredChoice> | null;
    if (!value || value.version !== 1 || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;
    return { version: 1, analytics: value.analytics, marketing: value.marketing };
  } catch {
    return null;
  }
}

export function hasGpcSignal(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function hasAnalyticsConsent(): boolean {
  return readChoice()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return !hasGpcSignal() && readChoice()?.marketing === true;
}
