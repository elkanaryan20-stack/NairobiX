const NODES = ["Digital Marketing", "Lead Capture", "CRM", "Automation", "Sales", "Analytics"];

/**
 * A quiet, static line-and-node strip for the hero — the same visual grammar
 * as SystemFlow (node + connecting line) but simplified to a glance-length
 * cue, not an interactive exploration. Hidden on small mobile, where hero
 * space is reserved for the headline and CTAs.
 */
export function ConnectedSystemStrip() {
  return (
    <div className="mt-10 hidden sm:block" aria-hidden="true">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
        One connected system
      </p>
      <div className="relative flex items-start">
        <div className="absolute left-0 right-0 top-[5px] h-px overflow-hidden bg-white/10">
          <span className="animate-flow-travel absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-[var(--color-primary)]/70 to-transparent" />
        </div>
        <div className="relative flex w-full items-start justify-between">
          {NODES.map((label, index) => (
            <div key={label} className="flex flex-col items-center gap-2.5 px-1 first:items-start last:items-end">
              <span
                className={`h-[10px] w-[10px] rounded-full border ${
                  index === 0 || index === NODES.length - 1
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : "border-white/25 bg-[#0b0b0d]"
                }`}
              />
              <span className="max-w-[4.5rem] text-center text-[11px] leading-tight text-[var(--text-tertiary)] first:text-left last:text-right sm:max-w-[5.5rem]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
