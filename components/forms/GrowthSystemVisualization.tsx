"use client";

import { useState } from "react";

type GrowthArea = { label: string; detail: string };

const GROWTH_AREAS: GrowthArea[] = [
  { label: "Attract", detail: "Build stronger customer acquisition channels." },
  { label: "Convert", detail: "Turn opportunities into customers through better sales systems." },
  { label: "Automate", detail: "Reduce repetitive work and improve operational efficiency." },
  { label: "Optimize", detail: "Use data and systems to improve performance." },
  { label: "Scale", detail: "Build infrastructure that supports sustainable growth." },
];

/**
 * Stage Three of the post-submission sequence — the NairobiX Growth System.
 * "Your Business" anchors a connected-node flow (same grammar as
 * SystemFlow/SolutionSystemMap) across the five areas NairobiX reviews.
 * Each node is a real button so the detail is reachable by keyboard/touch,
 * not just mouse hover.
 */
export function GrowthSystemVisualization() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = GROWTH_AREAS[activeIndex];

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white">Your Business</span>
        </div>
        <span aria-hidden="true" className="my-5 h-8 w-px bg-white/15" />
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
        <div
          aria-hidden="true"
          className="absolute left-4 top-4 hidden h-px w-full bg-white/10 sm:block"
          style={{ transform: "translateY(-50%)" }}
        />
        {GROWTH_AREAS.map((area, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={area.label} className="relative flex flex-1 flex-col items-start sm:items-center sm:px-1.5">
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="group flex items-center gap-3 sm:flex-col sm:gap-2.5"
              >
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition ${
                    isActive
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                      : "border-white/15 bg-[#0b0b0d] text-[var(--text-secondary)] group-hover:border-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm font-medium transition sm:text-center ${
                    isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                  }`}
                >
                  {area.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        key={active.label}
        className="animate-step-fade mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          {String(activeIndex + 1).padStart(2, "0")} · {active.label}
        </p>
        <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">{active.detail}</p>
      </div>
    </div>
  );
}
