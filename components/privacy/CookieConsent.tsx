"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { TRACKING } from "@/lib/tracking-config";
import { COOKIE_CONSENT_KEY, hasGpcSignal } from "@/lib/cookie-consent";

const CONSENT_EVENT = "nairobix:consent-change";

type ConsentChoice = { version: 1; analytics: boolean; marketing: boolean };
type DraftChoice = { analytics: boolean; marketing: boolean };

type MetaPixelQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

function readChoice(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<ConsentChoice>;
    if (value.version !== 1 || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;
    const marketing = value.marketing && !hasGpcSignal();
    if (value.marketing && !marketing) {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ version: 1, analytics: value.analytics, marketing: false }));
    }
    return { version: 1, analytics: value.analytics, marketing };
  } catch {
    return null;
  }
}

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGoogleTag(id: string) {
  if (document.getElementById("nairobix-ga4") || document.getElementById("nairobix-google-ads")) return;
  appendScript(id, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id === "nairobix-ga4" ? TRACKING.ga4Id : TRACKING.googleAdsId)}`);
}

function ensureGoogleLayer(analytics: boolean, marketing: boolean) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
  if (document.documentElement.dataset.nxGoogleConsentDefault !== "true") {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    document.documentElement.dataset.nxGoogleConsentDefault = "true";
  }
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });

  if (analytics) {
    const configured = document.documentElement.dataset.nxGaConfigured === "true";
    if (!configured) {
      window.gtag("js", new Date());
      window.gtag("config", TRACKING.ga4Id, { send_page_view: false });
      document.documentElement.dataset.nxGaConfigured = "true";
      loadGoogleTag("nairobix-ga4");
    }
  }

  if (marketing && TRACKING.googleAdsId) {
    const configured = document.documentElement.dataset.nxAdsConfigured === "true";
    if (!configured) {
      window.gtag("config", TRACKING.googleAdsId, { allow_enhanced_conversions: true });
      document.documentElement.dataset.nxAdsConfigured = "true";
      loadGoogleTag("nairobix-google-ads");
    }
  }
}

function ensureMetaPixel() {
  if (!TRACKING.metaPixelId) return;
  if (!window.fbq) {
    const fbq: MetaPixelQueue = function (...args: unknown[]) {
      const queue = fbq;
      if (queue.callMethod) queue.callMethod(...args);
      else queue.queue.push(args);
    } as MetaPixelQueue;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    appendScript("nairobix-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", TRACKING.metaPixelId);
  }
  window.fbq("consent", "grant");
}

function syncTracking(choice: ConsentChoice) {
  const analytics = choice.analytics;
  const marketing = choice.marketing && !hasGpcSignal();
  if (analytics || marketing || document.documentElement.dataset.nxGaConfigured === "true" || document.documentElement.dataset.nxAdsConfigured === "true") {
    ensureGoogleLayer(analytics, marketing);
  }
  if (marketing) {
    ensureMetaPixel();
    if (TRACKING.gtmId) {
      appendScript("nairobix-google-tag-manager", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(TRACKING.gtmId)}`);
    }
  } else if (window.fbq && TRACKING.metaPixelId) {
    window.fbq("consent", "revoke");
  }
}

function clearOptionalCookies() {
  const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0]);
  const optional = names.filter((name) => /^(_ga|_gid|_gat|_gcl_|_fbp$|_fbc$)/.test(name));
  for (const name of optional) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.nairobix.com; SameSite=Lax`;
  }
}

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("nairobix:open-cookie-preferences"))}
    >
      Cookie preferences
    </button>
  );
}

function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] disabled:cursor-not-allowed ${checked ? "border-[#F97316] bg-[#F97316]" : "border-white/25 bg-white/10"}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform motion-reduce:transition-none ${checked ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  );
}

export function CookieConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<DraftChoice>({ analytics: false, marketing: false });
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const lastPageRef = useRef({ pathname: "", analytics: false, marketing: false });
  const gpc = ready && hasGpcSignal();

  const applyChoice = useCallback((next: DraftChoice) => {
    const saved: ConsentChoice = { version: 1, analytics: next.analytics, marketing: next.marketing && !hasGpcSignal() };
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(saved));
    } catch {
      // The selection still applies for this visit if browser storage is unavailable.
    }
    setChoice(saved);
    setDraft({ analytics: saved.analytics, marketing: saved.marketing });
    setPreferencesOpen(false);
    requestAnimationFrame(() => openerRef.current?.focus());
    syncTracking(saved);
    if (!saved.marketing) {
      clearOptionalCookies();
      try {
        window.localStorage.removeItem("nx_lead_source");
        window.localStorage.removeItem("nx_lead_source_medium");
        window.localStorage.removeItem("nx_lead_source_campaign");
        window.localStorage.removeItem("nx_touch_v1");
      } catch {
        // Clearing optional attribution is best effort when storage is blocked.
      }
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: saved }));
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readChoice();
      setChoice(stored);
      setDraft({ analytics: stored?.analytics ?? false, marketing: stored?.marketing ?? false });
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const analytics = choice?.analytics === true;
    const marketing = choice?.marketing === true && !hasGpcSignal();
    if (choice) syncTracking(choice);

    const previous = lastPageRef.current;
    if (analytics && (pathname !== previous.pathname || !previous.analytics)) {
      window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.href.split("?")[0] });
    }
    if (marketing && (pathname !== previous.pathname || !previous.marketing)) {
      window.fbq?.("track", "PageView");
    }
    lastPageRef.current = { pathname, analytics, marketing };
  }, [choice, pathname, ready]);

  useEffect(() => {
    const open = () => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const current = readChoice();
      setDraft({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      setPreferencesOpen(true);
    };
    window.addEventListener("nairobix:open-cookie-preferences", open);
    return () => window.removeEventListener("nairobix:open-cookie-preferences", open);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== COOKIE_CONSENT_KEY && event.key !== null) return;
      const next = readChoice();
      setChoice(next);
      setDraft({ analytics: next?.analytics ?? false, marketing: next?.marketing ?? false });
      if (next) syncTracking(next);
      else if (window.fbq && TRACKING.metaPixelId) window.fbq("consent", "revoke");
      if (!next?.marketing) clearOptionalCookies();
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preferencesOpen]);

  if (!ready) return null;

  const showNotice = choice === null && !preferencesOpen;
  const showPreferences = preferencesOpen;
  if (!showNotice && !showPreferences) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className="cookie-consent fixed bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] left-3 z-[60] w-[calc(100%-1.5rem)] rounded-xl border border-white/12 bg-[#111113] p-4 text-white shadow-[0_12px_36px_rgba(0,0,0,0.42)] sm:bottom-6 sm:left-auto sm:right-24 sm:w-[min(680px,calc(100vw-7rem))] sm:p-4"
    >
      {showNotice ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <p className="text-[13px] leading-5 text-white/80">
              We use cookies and similar technologies to keep NairobiX working, understand site usage, and measure marketing performance.
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
                  setPreferencesOpen(true);
                }}
                className="rounded-sm text-[#F97316] underline decoration-[#F97316]/40 underline-offset-2 hover:decoration-[#F97316] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
              >
                Manage preferences
              </button>
              <Link href="/cookie-policy" className="rounded-sm text-white/55 underline decoration-white/20 underline-offset-2 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]">
                Cookie policy
              </Link>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <button type="button" onClick={() => applyChoice({ analytics: false, marketing: false })} className="cookie-action">
              Reject non-essential
            </button>
            <button type="button" onClick={() => applyChoice({ analytics: true, marketing: true })} className="cookie-action">
              Accept all
            </button>
          </div>
        </div>
      ) : (
        <section role="dialog" aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F97316]">Privacy settings</p>
              <h2 id="cookie-preferences-title" className="mt-1 text-sm font-semibold text-white">Cookie preferences</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close cookie preferences"
              onClick={() => {
                setPreferencesOpen(false);
                requestAnimationFrame(() => openerRef.current?.focus());
              }}
              className="rounded-md p-1 text-white/60 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <p id="cookie-preferences-description" className="mt-2 text-xs leading-5 text-white/65">
            Essential storage is always on. Choose whether NairobiX may use optional analytics and marketing technologies.
          </p>
          <div className="mt-3 divide-y divide-white/8 border-y border-white/8">
            <div className="flex items-center justify-between gap-4 py-2.5">
              <div><p className="text-xs font-medium text-white">Essential</p><p className="mt-0.5 text-[11px] text-white/50">Core site functions and your saved choice</p></div>
              <span className="text-[11px] font-medium text-white/50">Always active</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <div><p className="text-xs font-medium text-white">Analytics</p><p className="mt-0.5 text-[11px] text-white/50">Helps us understand site usage (Google Analytics)</p></div>
              <Toggle label="Allow analytics cookies" checked={draft.analytics} onChange={(analytics) => setDraft((value) => ({ ...value, analytics }))} />
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <div><p className="text-xs font-medium text-white">Marketing</p><p className="mt-0.5 text-[11px] text-white/50">Measures marketing (Meta and, when enabled, Google Ads)</p></div>
              <Toggle label={gpc ? "Marketing disabled by your Global Privacy Control signal" : "Allow marketing cookies"} checked={!gpc && draft.marketing} disabled={gpc} onChange={(marketing) => setDraft((value) => ({ ...value, marketing }))} />
            </div>
          </div>
          {gpc ? <p className="mt-2 text-[11px] leading-4 text-white/55">Your browser’s Global Privacy Control signal keeps marketing off.</p> : null}
          <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => applyChoice({ analytics: false, marketing: false })} className="cookie-action">Reject non-essential</button>
            <button type="button" onClick={() => applyChoice(draft)} className="cookie-action">Save preferences</button>
            <button type="button" onClick={() => applyChoice({ analytics: true, marketing: true })} className="cookie-action">Accept all</button>
          </div>
          <Link href="/cookie-policy" className="mt-2 inline-flex rounded-sm text-[11px] text-white/55 underline decoration-white/20 underline-offset-2 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]">Read the Cookie Policy</Link>
        </section>
      )}
    </aside>
  );
}
