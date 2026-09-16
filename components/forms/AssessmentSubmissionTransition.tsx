"use client";

import { useEffect, useState } from "react";

const NODES = ["BUSINESS", "MARKET", "CUSTOMERS", "SALES", "SYSTEMS"];

const MICROCOPY = [
  "Establishing your assessment record",
  "Securing your submission",
  "Preparing your growth review",
] as const;

/**
 * Stage One of the post-submission sequence — shown while the Business
 * Growth Assessment request is actually in flight. Honest, state-driven
 * copy (no claim of analysis the backend isn't doing yet) paired with the
 * same node-and-line visual grammar as ConnectedSystemStrip/SystemFlow, so
 * it reads as NairobiX's system rather than a generic spinner.
 */
export function AssessmentSubmissionTransition() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= MICROCOPY.length - 1) return;
    const timer = setTimeout(() => {
      setStageIndex((prev) => Math.min(prev + 1, MICROCOPY.length - 1));
    }, 550);
    return () => clearTimeout(timer);
  }, [stageIndex]);

  const activeNodeCount = stageIndex === 0 ? 1 : stageIndex === 1 ? 3 : NODES.length;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center px-2 py-10 text-center sm:py-16"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
        NairobiX Growth Activation
      </p>

      <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
        Connecting your assessment<span aria-hidden="true">.....</span>
      </h2>

      <div className="mt-12 w-full max-w-xl">
        <div className="relative flex items-start">
          <div className="absolute left-0 right-0 top-[5px] h-px overflow-hidden bg-white/10">
            <span className="animate-flow-travel absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-[var(--color-primary)]/80 to-transparent" />
          </div>
          <div className="relative flex w-full items-start justify-between">
            {NODES.map((label, index) => {
              const isActive = index < activeNodeCount;
              return (
                <div key={label} className="flex flex-col items-center gap-2.5 px-1">
                  <span
                    className={`h-[10px] w-[10px] rounded-full border transition-colors duration-500 ${
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                        : "border-white/20 bg-[#0b0b0d]"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-500 ${
                      isActive ? "text-white" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p key={stageIndex} className="animate-step-fade mt-12 text-sm text-[var(--text-secondary)]">
        {MICROCOPY[stageIndex]}
      </p>
    </div>
  );
}
