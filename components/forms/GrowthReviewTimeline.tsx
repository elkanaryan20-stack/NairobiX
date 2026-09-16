"use client";

import { useEffect, useRef, useState } from "react";

export type GrowthReviewStep = {
  number: string;
  title: string;
  description: string;
  complete: boolean;
};

const DEFAULT_STEPS: GrowthReviewStep[] = [
  {
    number: "01",
    title: "Received",
    description: "Assessment successfully submitted.",
    complete: true,
  },
  {
    number: "02",
    title: "Review",
    description: "We review the information and identify relevant growth opportunities.",
    complete: false,
  },
  {
    number: "03",
    title: "Opportunities",
    description: "We map areas where marketing, sales, technology or automation may create meaningful improvements.",
    complete: false,
  },
  {
    number: "04",
    title: "Next Steps",
    description: "We'll guide you toward the most relevant next action.",
    complete: false,
  },
];

/**
 * Stage Four — "What happens next". A connected progression (same node +
 * line grammar as GrowthSystemVisualization/SystemFlow) rather than a
 * generic numbered list, staggering in once scrolled into view. Shared by
 * the Assessment and Consultation confirmation experiences — each passes
 * its own `steps` so the underlying motion/visual grammar stays identical
 * while the content stays specific to that stage of the journey.
 */
export function GrowthReviewTimeline({ steps = DEFAULT_STEPS }: { steps?: GrowthReviewStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-0">
      <div
        aria-hidden="true"
        className="absolute left-4 top-4 hidden h-px w-full bg-white/10 sm:block"
        style={{ transform: "translateY(-50%)" }}
      />
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`relative flex flex-1 items-start gap-4 transition-all duration-500 ease-out sm:flex-col sm:items-center sm:gap-2.5 sm:px-2 sm:text-center ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
        >
          <span
            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
              step.complete
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                : "border-white/15 bg-[#0b0b0d] text-[var(--text-tertiary)]"
            }`}
            aria-hidden="true"
          >
            {step.complete ? "✓" : step.number}
          </span>
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.14em] ${
                step.complete ? "text-white" : "text-[var(--text-secondary)]"
              }`}
            >
              {step.number} — {step.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
