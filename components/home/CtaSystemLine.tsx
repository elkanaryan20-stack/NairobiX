const STEPS = ["Assess", "Prioritize", "Build"];

/**
 * A quiet architectural footnote under the homepage's final CTA — the first
 * three moves of an engagement on one thin line. Static by design: the
 * sections above carry the page's motion; this only closes the thought.
 */
export function CtaSystemLine() {
  return (
    <ol aria-label="How an engagement starts" className="relative mx-auto mt-14 grid max-w-sm grid-cols-3 sm:max-w-md">
      <span aria-hidden="true" className="absolute left-[16.667%] right-[16.667%] top-[3.5px] h-px bg-white/15" />
      {STEPS.map((step, index) => (
        <li key={step} className="relative flex flex-col items-center">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full border bg-[var(--section-bg)] ${
              index === 0 ? "border-[var(--color-primary)]" : "border-white/30"
            }`}
          />
          <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
