"use client";

import { useEffect, useState } from "react";

const NODES = ["REQUEST", "CALENDAR", "SESSION"];

const MICROCOPY = [
  "Reserving your time with Zoho Bookings",
  "Confirming the appointment",
  "Preparing your Growth Session",
] as const;

/**
 * Shown while the consultation booking request is actually in flight —
 * the booking equivalent of AssessmentSubmissionTransition, sharing its
 * node-and-line visual grammar and honest, state-driven microcopy, but with
 * its own content: reserving a calendar slot, not reviewing a submission.
 * The parent (BookingFlow) gates how long this stays on screen on the real
 * Zoho Bookings response, never a fixed timer alone.
 */
export function SecuringSessionTransition() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex >= MICROCOPY.length - 1) return;
    const timer = setTimeout(() => {
      setStageIndex((prev) => Math.min(prev + 1, MICROCOPY.length - 1));
    }, 550);
    return () => clearTimeout(timer);
  }, [stageIndex]);

  const activeNodeCount = stageIndex === 0 ? 1 : stageIndex === 1 ? 2 : NODES.length;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center px-2 py-10 text-center sm:py-16"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
        NairobiX Growth Session
      </p>

      <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
        Securing your session<span aria-hidden="true">.....</span>
      </h2>

      <div className="mt-12 w-full max-w-md">
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
