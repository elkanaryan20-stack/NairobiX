"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Stage = { step: string; description: string };

const INTERVAL_MS = 4000;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The four-stage NairobiX process as one line — horizontal on desktop,
 * vertical below lg. Unlike the solution-area line (one travelling
 * segment), the signal here accumulates: every segment up to the active
 * stage is lit, because each stage builds on the ones before it. At the
 * loop back to Understand the lit segments fade out rather than retract.
 *
 * Each stage's title is a real heading containing a button (keyboard and
 * screen-reader selection); pointer hover over the whole stage also selects
 * it. All descriptions stay visible — only emphasis changes.
 */
export function ProcessLine({ stages }: { stages: Stage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: stages.length,
    activeIndex,
    onAdvance: setActiveIndex,
    interval: INTERVAL_MS,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <ol className="grid lg:grid-cols-4">
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;
          const isReached = index <= activeIndex;
          const segmentLit = index < activeIndex;
          return (
            <li key={stage.step} className="relative pb-10 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8" onMouseEnter={() => setActiveIndex(index)}>
              {index < stages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[5.5px] top-3 w-px bg-white/15 lg:bottom-auto lg:left-1.5 lg:top-[5.5px] lg:h-px lg:w-full"
                >
                  <span
                    className={`absolute inset-0 origin-top bg-[var(--color-primary)] lg:origin-left ${
                      segmentLit ? "scale-100 opacity-100" : "scale-y-0 opacity-0 lg:scale-x-0 lg:scale-y-100"
                    }`}
                    style={{
                      transition: segmentLit
                        ? "scale 500ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0s"
                        : "opacity 450ms ease-out, scale 0s linear 450ms",
                    }}
                  />
                </span>
              ) : null}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-3 w-3 rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_0_4px_rgba(249,115,22,0.14)] delay-200"
                    : isReached
                      ? "border-[var(--color-primary)] bg-[var(--section-bg)]"
                      : "border-white/30 bg-[var(--section-bg)]"
                }`}
              />

              <h3 className="lg:mt-9">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className="group -mt-1 block rounded-sm text-left focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 lg:mt-0"
                >
                  <span
                    aria-hidden="true"
                    className={`block font-mono text-xs font-semibold tracking-[0.18em] transition-colors duration-500 ${
                      isActive ? "text-[var(--color-primary)]" : "text-white/45"
                    }`}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`mt-3 block font-display text-xl font-medium tracking-tight transition-colors duration-500 sm:text-2xl ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white/85"
                    }`}
                  >
                    {stage.step}
                  </span>
                </button>
              </h3>
              <p
                className={`mt-3 max-w-md text-sm leading-6 transition-colors duration-500 ${
                  isActive ? "text-[var(--text-secondary)]" : "text-white/55"
                }`}
              >
                {stage.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
