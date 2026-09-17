"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Fades existing section content up into place the first time it scrolls
 * into view — a hierarchy cue, not a per-element effect. Wrap a section's
 * already-existing content blocks (e.g. its heading block, then its main
 * content block with a small `delay`) rather than individual children, so a
 * section reveals as itself rather than as a pile of separately-animated
 * pieces.
 *
 * Renders children fully visible until mount, so a no-JS/pre-hydration
 * render is never stuck invisible — the hidden state, and the animation
 * that undoes it, are both applied only after the observer is wired up.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "hidden" | "visible">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    setStatus("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={status === "idle" ? undefined : status}
      style={status === "visible" && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
