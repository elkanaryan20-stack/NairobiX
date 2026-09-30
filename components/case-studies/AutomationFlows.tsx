"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { AutomationStepKind, CaseStudy } from "@/lib/case-studies";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

// The distinction the whole section rests on.
const TERMS = [
  ["Process", "The sequence of work the business agrees to follow."],
  ["Rule", "A condition written down — “if no reply in three days”."],
  ["Workflow", "A rule connected to the actions it should cause."],
  ["Automation", "The workflow running without anyone starting it."],
  ["Technology", "The tools that carry it out."],
];

const KIND_STYLE: Record<AutomationStepKind, string> = {
  Trigger: "border-white/40 text-white",
  Rule: "border-white/25 text-white/80",
  Action: "border-white/25 text-white/80",
  Notification: "border-white/25 text-white/80",
  "Follow-up": "border-white/25 text-white/80",
  Human: "border-[var(--color-primary)] text-[var(--color-primary)]",
  Measure: "border-white/25 text-white/80",
};

export function AutomationFlows({ automation }: { automation: CaseStudy["automation"] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const workflow = automation.workflows[active];

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = automation.workflows.length;
    let next = i;
    if (event.key === "ArrowRight") next = (i + 1) % n;
    else if (event.key === "ArrowLeft") next = (i - 1 + n) % n;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-12">
      <dl className="grid gap-px bg-white/10 sm:grid-cols-5">
        {TERMS.map(([term, text]) => (
          <div key={term} className="bg-[var(--section-bg)] p-4">
            <dt className={`${MONO} text-white/70`}>{term}</dt>
            <dd className="mt-1.5 text-[13px] leading-5 text-white/55">{text}</dd>
          </div>
        ))}
      </dl>

      {automation.workflows.length > 1 ? (
        <div role="tablist" aria-label="Workflows" className="mt-10 flex flex-wrap gap-2">
          {automation.workflows.map((w, i) => (
            <button
              key={w.name}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${
                i === active ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white" : "border-white/15 text-white/65 hover:text-white"
              }`}
            >
              Workflow {i + 1} · {w.name}
            </button>
          ))}
        </div>
      ) : null}

      <div
        id={`${baseId}-panel`}
        role={automation.workflows.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={automation.workflows.length > 1 ? `${baseId}-tab-${active}` : undefined}
        className="mt-8 border border-white/10 bg-black/25 p-6 sm:p-8"
      >
        <p className="font-display text-xl text-white">{workflow.name}</p>
        <ol className="relative mt-6 grid gap-3 lg:grid-cols-7 lg:gap-0">
          {workflow.steps.map((step, i) => (
            <li key={i} className="relative flex gap-4 lg:flex-col lg:gap-0 lg:pr-4">
              {i < workflow.steps.length - 1 ? (
                <>
                  <span aria-hidden="true" className="absolute left-[7px] top-6 bottom-[-12px] w-px bg-white/15 lg:hidden" />
                  <span aria-hidden="true" className="absolute left-5 right-0 top-[7px] hidden h-px bg-white/15 lg:block" />
                </>
              ) : null}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border bg-[var(--section-bg)] lg:mt-0 ${
                  step.kind === "Human" ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/40"
                }`}
              />
              <div className="lg:mt-4">
                <span className={`inline-block rounded-full border px-2.5 py-0.5 ${MONO} ${KIND_STYLE[step.kind]}`}>{step.kind}</span>
                <p className="mt-2 text-sm leading-6 text-white/75">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
