"use client";

import { useState } from "react";
import type { GrowthStage } from "@/lib/site-data";

/**
 * A spatial, architecture-style view of the six-stage growth system (Attract
 * -> Capture -> Convert -> Operate -> Measure -> Optimize). Each stage keeps
 * a persistent outcome tag on the connecting line so the shape of the system
 * reads at a glance; selecting a stage expands what happens, the relevant
 * capabilities and the technology involved — closer to a systems map than a
 * generic step-by-step card list.
 */
export function GrowthSystemExplorer({ stages }: { stages: GrowthStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-4 right-4 top-4 hidden h-px bg-white/10 lg:block"
        />
        <div
          role="tablist"
          aria-label="The NairobiX growth system, by stage"
          className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-y-10 lg:flex lg:items-start lg:justify-between lg:gap-0"
        >
          {stages.map((stage, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={stage.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className="group flex flex-col items-center gap-3 lg:flex-1"
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
                  className={`text-sm font-medium leading-snug transition ${
                    isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-center text-[11px] leading-tight text-[var(--text-tertiary)]">
                  {stage.outcome}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={active.label}
        className="animate-step-fade mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            {String(activeIndex + 1).padStart(2, "0")} · {active.label}
          </p>
          <p className="mt-3 text-lg leading-8 text-white">{active.detail}</p>
          <ul className="mt-6 space-y-2.5">
            {active.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
              Technology involved
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.technology.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-[#0b0b0d] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
              Business outcome
            </p>
            <p className="mt-2 text-base font-semibold text-white">{active.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
