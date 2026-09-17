"use client";

import { useEffect, useRef } from "react";
import { dispatchNiaCue, type NiaContextReaction } from "@/lib/useNiaPersonality";

/**
 * An invisible marker placed inside a notable section (e.g. Solutions,
 * Industries, the Growth Assessment) — the first time it scrolls into view,
 * it nudges the floating Nia launcher toward a small, specific reaction, so
 * Nia reads as aware of the page rather than performing on a timer. Fires
 * once per page visit and does nothing else; layout-neutral (zero size).
 */
export function NiaSectionCue({ reaction }: { reaction: NiaContextReaction }) {
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          dispatchNiaCue(reaction);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reaction]);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none h-px w-px" />;
}
