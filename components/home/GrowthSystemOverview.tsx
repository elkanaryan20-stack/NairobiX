type FlowNode = { label: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** Compact nine-stage summary for the homepage. */
export function GrowthSystemOverview({ stages }: { stages: FlowNode[] }) {
  return (
    <div>
      <ol aria-label="NairobiX growth system stages" className="grid grid-cols-3 gap-x-3 gap-y-4 lg:grid-cols-9 lg:gap-x-2 lg:gap-y-0">
        {stages.map((stage, index) => (
          <li key={stage.label} className="border-t border-white/15 pt-2.5 lg:pt-3">
            <span aria-hidden="true" className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-primary)]">{pad(index + 1)}</span>
            <span className="mt-1 block text-xs font-semibold leading-4 text-white lg:text-center">{stage.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-[var(--text-tertiary)]">
        Measure results. Use what you learn to guide the next strategy decision.
      </p>
    </div>
  );
}
