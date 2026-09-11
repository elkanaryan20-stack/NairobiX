"use client";

import { useState } from "react";

type FlowNode = { label: string; detail: string };

/**
 * The connected-system diagram (e.g. Traffic → Meta/Google → Landing Page →
 * ... → Analytics). Each node is a real button so the detail is reachable by
 * keyboard and touch, not just mouse hover. Horizontal with a connecting
 * line on desktop; a vertical stack on mobile.
 */
export function SystemFlow({ nodes }: { nodes: FlowNode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = nodes[activeIndex];

  return (
    <div>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
        <div
          aria-hidden="true"
          className="absolute left-4 top-4 hidden h-px w-full bg-white/10 sm:block"
          style={{ transform: "translateY(-50%)" }}
        />
        {nodes.map((node, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={node.label} className="relative flex flex-1 flex-col items-start sm:items-center sm:px-1.5">
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
                  className={`text-sm font-medium leading-snug transition sm:text-center ${
                    isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"
                  }`}
                >
                  {node.label}
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
