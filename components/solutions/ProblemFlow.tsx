import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * A short, connected chain narrating how a business problem compounds
 * (e.g. "Scattered channels → Unclear attribution → Slow follow-up →
 * Lost opportunities"). Horizontal on desktop, vertical on mobile.
 */
export function ProblemFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-1 items-center gap-3 sm:flex-col sm:items-stretch sm:gap-0">
          <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 sm:justify-center sm:px-3 sm:py-5 sm:text-center">
            <span className="text-sm font-medium leading-snug text-white sm:text-[0.95rem]">{step}</span>
          </div>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center text-[var(--color-primary)] sm:h-9"
            >
              <ArrowDown className="h-4 w-4 sm:hidden" />
              <ArrowRight className="hidden h-4 w-4 sm:block" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
