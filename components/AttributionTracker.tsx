"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureAttribution, captureTouch } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { hasMarketingConsent } from "@/lib/cookie-consent";

const CTA_PATHS = ["/business-growth-audit", "/book", "/contact", "/request-solution"];

/** Consent-aware acquisition attribution and delegated CTA analytics. */
export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const captureIfAllowed = () => {
      if (!hasMarketingConsent()) return;
      captureAttribution();
      captureTouch();
    };
    captureIfAllowed();
    window.addEventListener("nairobix:consent-change", captureIfAllowed);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const destination = CTA_PATHS.find((path) => url.pathname === path);
      if (!destination || url.pathname === window.location.pathname) return;
      trackEvent("cta_click", {
        cta_text: (link.textContent || "").replace(/[→↓]/g, "").trim().slice(0, 80),
        cta_destination: destination,
        cta_location: window.location.pathname,
        cta_area: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("nairobix:consent-change", captureIfAllowed);
    };
  }, []);

  useEffect(() => {
    if (!hasMarketingConsent()) return;
    captureAttribution();
    captureTouch();
  }, [pathname]);

  return null;
}
