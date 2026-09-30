"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution, captureTouch } from "@/lib/attribution";
import { adTrackingAllowed, trackEvent } from "@/lib/analytics";

// Destinations that count as a conversion CTA.
const CTA_PATHS = ["/business-growth-audit", "/book", "/contact", "/request-solution"];

/**
 * Site-wide, render-nothing tracker:
 *  - captures first-touch channel and first/last-touch campaign details;
 *  - sends Meta PageView on client-side navigations (the Pixel's own init
 *    covers the first page — GA4 page views are automatic);
 *  - records cta_click for any link to a conversion destination, via one
 *    delegated listener rather than per-button code.
 */
export function AttributionTracker() {
  const pathname = usePathname();
  // The path the Pixel last counted — its own init counts the first page.
  const countedPath = useRef(pathname);

  useEffect(() => {
    captureAttribution();
    captureTouch();

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
      const destination = CTA_PATHS.find((p) => url.pathname === p);
      if (!destination || url.pathname === window.location.pathname) return;
      trackEvent("cta_click", {
        cta_text: (link.textContent || "").replace(/[→↓]/g, "").trim().slice(0, 80),
        cta_destination: destination,
        cta_location: window.location.pathname,
        cta_area: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (pathname === countedPath.current) return;
    countedPath.current = pathname;
    if (adTrackingAllowed()) window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
