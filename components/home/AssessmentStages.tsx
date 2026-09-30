"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

const STAGES = [
  { label: "Identify", outcome: "Where growth is getting constrained." },
  { label: "Prioritize", outcome: "What deserves attention first." },
  { label: "Plan", outcome: "What to do next." },
];

const pad = (n: number) => String(n).padStart(2, "0");

// Rail geometry: node centre sits at x 27 / y 29 within each row (sm: 31 /
// 33) — border + padding + node offset — so each connector runs from one
// node's bottom edge to the next node's top edge regardless of row height.

/**
 * What the Growth Assessment produces, as one connected progression rather
 * than three cards: a single vertical line through three nodes, one panel
 * frame. Every ~3.5s the active stage moves on — orange node and number, a
 * hairline orange edge on its row, brighter text — and the line segment
 * leading into it draws. Hover or keyboard focus pauses it; clicking a
 * stage selects it and restarts the countdown (see useAutoAdvance).
 */
export function AssessmentStages() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: STAGES.length,
    activeIndex,
    onAdvance: setActiveIndex,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <div className="rounded-lg border border-white/10 bg-black/25 p-3 sm:p-4">
        <ol aria-label="What the Growth Assessment covers">
          {STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            const carriesSignal = index === activeIndex - 1;
            return (
              <li key={stage.label} className="relative">
                {index < STAGES.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[23px] left-[26.5px] top-[35px] w-px bg-white/15 sm:-bottom-[27px] sm:left-[30.5px] sm:top-[39px]"
                  >
                    <span
                      className={`absolute inset-0 origin-top bg-[var(--color-primary)] ${
                        carriesSignal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                      style={{
                        transition: carriesSignal
                          ? "scale 450ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0s"
                          : "opacity 350ms ease-out, scale 0s linear 350ms",
                      }}
                    />
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group relative flex w-full items-start gap-5 rounded-md border px-5 py-5 text-left transition-colors duration-[400ms] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:gap-6 sm:px-6 sm:py-6 ${
                    isActive
                      ? "border-[var(--color-primary)]/35 bg-white/[0.03]"
                      : "border-transparent hover:bg-white/[0.015]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-0.5 h-3 w-3 flex-none rounded-full border transition-[background-color,border-color,box-shadow] duration-[400ms] ${
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_0_4px_rgba(249,115,22,0.14)] delay-150"
                        : "border-white/30 bg-[var(--section-bg)] group-hover:border-white/55"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-3 font-mono text-[11px] uppercase leading-4 tracking-[0.2em]">
                      <span
                        aria-hidden="true"
                        className={`transition-colors duration-[400ms] ${
                          isActive ? "text-[var(--color-primary)]" : "text-white/45"
                        }`}
                      >
                        {pad(index + 1)}
                      </span>
                      <span
                        className={`transition-colors duration-[400ms] ${
                          isActive ? "text-white" : "text-white/65 group-hover:text-white/80"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </span>
                    <span
                      className={`mt-2 block font-display text-xl tracking-tight transition-colors duration-[400ms] sm:text-[1.375rem] ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {stage.outcome}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-5 flex items-start gap-3 font-mono text-[10px] uppercase leading-4 tracking-[0.2em] text-[var(--text-tertiary)]">
        <span aria-hidden="true" className="mt-2 h-px w-3 flex-none bg-[var(--color-primary)]" />
        Structured questions. Practical output. No obligation.
      </p>
    </div>
  );
}
