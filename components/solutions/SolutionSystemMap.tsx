"use client";

import Link from "next/link";
import { useState } from "react";
import type { SolutionDetail } from "@/lib/site-data";

type Category = { id: string; title: string; items: SolutionDetail[] };

/**
 * A single connected architecture map across all six solutions, grouped by
 * their three capability categories. Selecting a solution reveals its own
 * authored systemFlow — the same connections already described on its
 * detail page — so the map proves "one system" using real content rather
 * than a new diagram invented for this view.
 */
export function SolutionSystemMap({ categories }: { categories: Category[] }) {
  const allSolutions = categories.flatMap((category) => category.items);
  const [activeId, setActiveId] = useState(allSolutions[0]?.id);
  const active = allSolutions.find((solution) => solution.id === activeId) ?? allSolutions[0];

  if (!active) return null;

  return (
    <div>
      <div className="relative">
        <div aria-hidden="true" className="absolute left-4 right-4 top-4 hidden h-px bg-white/10 lg:block" />
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-0">
          {categories.map((category) => (
            <div key={category.id} className="lg:flex-1">
              <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)] lg:mb-5">
                {category.title}
              </p>
              <div className="flex justify-center gap-6 lg:gap-4">
                {category.items.map((solution) => {
                  const isActive = solution.id === active.id;
                  return (
                    <button
                      key={solution.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(solution.id)}
                      className="group flex flex-1 flex-col items-center gap-2.5"
                    >
                      <span
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition ${
                          isActive
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                            : "border-white/15 bg-[#0b0b0d] text-[var(--text-secondary)] group-hover:border-white/30"
                        }`}
                      >
                        {solution.eyebrow.slice(0, 2)}
                      </span>
                      <span
                        className={`text-center text-xs font-medium leading-tight transition ${
                          isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                        }`}
                      >
                        {solution.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        key={active.id}
        className="animate-step-fade mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            How {active.title} connects
          </p>
          <Link
            href={`/solutions/${active.id}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:text-[var(--color-primary)]"
          >
            View {active.title} in full
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="mt-6">
          <SolutionFlowStrip nodes={active.systemFlow} />
        </div>
      </div>
    </div>
  );
}

/** A compact, non-interactive rendering of a solution's systemFlow for the map's detail panel. */
function SolutionFlowStrip({ nodes }: { nodes: { label: string; detail: string }[] }) {
  return (
    <ol className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
      {nodes.map((node, index) => (
        <li key={node.label} className="flex items-center gap-2.5 sm:gap-0">
          <span className="rounded-full border border-white/10 bg-[#0b0b0d] px-3 py-1.5 text-xs font-medium text-white">
            {node.label}
          </span>
          {index < nodes.length - 1 ? (
            <span aria-hidden="true" className="mx-2 hidden text-[var(--text-tertiary)] sm:inline">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
