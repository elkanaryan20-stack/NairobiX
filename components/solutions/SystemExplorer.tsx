"use client";

import { useState } from "react";
import { SystemFlow } from "@/components/solutions/SystemFlow";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import type { SolutionDetail } from "@/lib/site-data";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

/**
 * "See the system" — pick a solution area and see the real connected system
 * and workspace preview behind it. Reuses the exact systemFlow/portalPreview
 * data already authored for the Solutions pages; no separate content to
 * keep in sync. Cycles through the solutions on its own — see useAutoAdvance.
 */
export function SystemExplorer({ solutions }: { solutions: SolutionDetail[] }) {
  const [activeId, setActiveId] = useState(solutions[0]?.id);
  const activeIndex = Math.max(0, solutions.findIndex((solution) => solution.id === activeId));
  const active = solutions[activeIndex] ?? solutions[0];

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: solutions.length,
    activeIndex,
    onAdvance: (nextIndex) => setActiveId(solutions[nextIndex]?.id),
  });

  if (!active) return null;

  return (
    <div ref={containerRef} {...containerHandlers}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Explore what NairobiX builds">
        {solutions.map((solution) => {
          const isActive = solution.id === active.id;
          return (
            <button
              key={solution.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(solution.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "border-white/15 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/30 hover:text-white"
              }`}
            >
              {solution.title}
            </button>
          );
        })}
      </div>

      <div key={active.id} className="animate-step-fade mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-base leading-7 text-[var(--text-secondary)]">{active.description}</p>
          <div className="mt-8">
            <SystemFlow nodes={active.systemFlow} />
          </div>
        </div>
        <PortalPreview preview={active.portalPreview} />
      </div>
    </div>
  );
}
