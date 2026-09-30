"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Reason = { title: string; description: string };

const INTERVAL_MS = 4800;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The "Why NairobiX" reasons as an editorial sequence separated by hairline
 * rules. Deliberately the calmest motion on the page: every ~4.8s emphasis
 * passes to the next reason — its number turns orange with a short rule
 * drawn beside it, the heading and text brighten — and nothing else moves.
 * Hover, focus or click hands emphasis to that reason and restarts the
 * countdown. All four stay fully readable throughout.
 */
export function WhyNairobixList({ reasons }: { reasons: Reason[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: reasons.length,
    activeIndex,
    onAdvance: setActiveIndex,
    interval: INTERVAL_MS,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <ol className="divide-y divide-white/10 border-t border-white/10">
        {reasons.map((reason, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={reason.title} className="py-7 first:pt-8 sm:py-8" onMouseEnter={() => setActiveIndex(index)}>
              <h3>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className="group block w-full rounded-sm text-left focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                >
                  <span aria-hidden="true" className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-semibold tracking-[0.18em] transition-colors duration-500 ${
                        isActive ? "text-[var(--color-primary)]" : "text-white/45"
                      }`}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={`h-px w-6 origin-left bg-[var(--color-primary)] ${
                        isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                      style={{
                        transition: isActive
                          ? "scale 500ms cubic-bezier(0.65, 0, 0.35, 1) 100ms, opacity 0s"
                          : "opacity 400ms ease-out, scale 0s linear 400ms",
                      }}
                    />
                  </span>
                  <span
                    className={`mt-3 block font-display text-xl font-medium tracking-tight transition-colors duration-500 sm:text-2xl ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white/85"
                    }`}
                  >
                    {reason.title}
                  </span>
                </button>
              </h3>
              <p
                className={`mt-3 max-w-[var(--max-width-prose)] text-base leading-7 transition-colors duration-500 ${
                  isActive ? "text-[var(--text-secondary)]" : "text-white/55"
                }`}
              >
                {reason.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
