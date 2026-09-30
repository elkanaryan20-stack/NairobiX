"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Problem = { title: string; description: string };
type BreakPoint = { lead: string; statement: string; from: string; to: string; note: string };

const INTERVAL_MS = 4000;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Where growth gets stuck" as a diagnostic sequence: four problems read as
 * a numbered list, with a side panel showing where the connected system
 * breaks for the one in focus. Deliberately a different behaviour from the
 * solution-area line above — a vertical marker on the active row and a
 * cross-fading break diagram, on a slower 4s rhythm — so the page doesn't
 * repeat one animation three times.
 *
 * `problems` and `breakPoints` are parallel arrays (PROBLEMS_WE_SOLVE and
 * PROBLEM_BREAK_POINTS in lib/site-data.ts).
 */
export function GrowthBreakdown({ problems, breakPoints }: { problems: Problem[]; breakPoints: BreakPoint[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: problems.length,
    activeIndex,
    onAdvance: setActiveIndex,
    interval: INTERVAL_MS,
  });

  return (
    <div
      ref={containerRef}
      {...containerHandlers}
      className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-0"
    >
      <ol aria-label="Where growth gets stuck" className="border-b border-white/10">
        {problems.map((problem, index) => {
          const isActive = index === activeIndex;
          const point = breakPoints[index];
          return (
            <li key={problem.title} className="border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="group relative isolate flex w-full items-start gap-5 py-6 pl-6 pr-2 text-left focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-white/60 sm:gap-8 sm:py-7 lg:pr-10"
              >
                {/* Surface distinction: a faint wash fading off the signal. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 bg-gradient-to-r from-white/[0.035] to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* The active marker — one thin orange line, drawn down the row. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[2px] origin-top bg-[var(--color-primary)] ${
                    isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                  style={{
                    transition: isActive
                      ? "scale 500ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0s"
                      : "opacity 400ms ease-out, scale 0s linear 400ms",
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 w-6 flex-none font-mono text-[10px] tracking-[0.2em] transition-colors duration-500 ${
                    isActive ? "text-[var(--color-primary)]" : "text-white/50"
                  }`}
                >
                  {pad(index + 1)}
                </span>
                <span className="min-w-0">
                  <span className="sr-only">{problem.title}</span>
                  <span aria-hidden="true">
                    <span
                      className={`block font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? "text-white/80" : "text-white/50 group-hover:text-white/65"
                      }`}
                    >
                      {point.lead}
                    </span>
                    <span
                      className={`mt-2 block font-display text-2xl font-medium tracking-tight transition-colors duration-500 sm:text-[1.75rem] ${
                        isActive ? "text-white" : "text-white/70 group-hover:text-white/85"
                      }`}
                    >
                      {point.statement}
                    </span>
                  </span>
                  {/* Mobile keeps each description in its row, always
                      readable; desktop moves it into the side panel. */}
                  <span
                    className={`mt-3 block text-sm leading-6 transition-colors duration-500 lg:hidden ${
                      isActive ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {problem.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Every problem's panel is stacked in one grid cell, so the panel is
          always as tall as its longest entry — no layout shift. Not a live
          region: autoplay would otherwise announce every 4s. */}
      <div className="grid lg:border-l lg:border-white/10 lg:pl-12 xl:pl-16">
        {problems.map((problem, index) => {
          const isActive = index === activeIndex;
          const point = breakPoints[index];
          return (
            <div
              key={problem.title}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 flex flex-col justify-center transition-[opacity,visibility,translate] ease-out ${
                isActive
                  ? "visible translate-y-0 opacity-100 delay-150 duration-500"
                  : "invisible translate-y-1 opacity-0 duration-300"
              }`}
            >
              <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                <span className="text-[var(--color-primary)]">Break point</span>
                <span className="tabular-nums text-[var(--text-tertiary)]">
                  <span className="text-white/80">{pad(index + 1)}</span> / {pad(problems.length)}
                </span>
              </p>
              <p className="mt-6 hidden text-lg leading-8 text-[var(--text-secondary)] lg:block">
                {problem.description}
              </p>

              {/* The connected flow, broken where this problem sits. */}
              <div className="mt-8 lg:mt-12">
                <div className="flex items-center" aria-hidden="true">
                  <span className="h-[9px] w-[9px] flex-none rounded-full border border-white/40" />
                  <span className="h-px flex-1 bg-white/20" />
                  <span className="mx-1.5 h-2.5 w-px flex-none bg-[var(--color-primary)]" />
                  <span className="w-12 flex-none border-t border-dashed border-[var(--color-primary)]/70 sm:w-16" />
                  <span className="mx-1.5 h-2.5 w-px flex-none bg-[var(--color-primary)]" />
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="h-[9px] w-[9px] flex-none rounded-full border border-white/20" />
                </div>
                <p className="mt-4 grid grid-cols-3 items-start gap-3 font-mono text-[10px] uppercase leading-4 tracking-[0.18em]">
                  <span className="text-white/80">{point.from}</span>
                  <span className="text-center text-[var(--color-primary)]">{point.note}</span>
                  <span className="text-right text-white/45">{point.to}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
