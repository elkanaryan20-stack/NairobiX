type FlowNode = { label: string; detail: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** A compact homepage summary. The detailed before/after comparison lives on the inner pages. */
export function ConnectedSystemCompare({ connected }: { connected: FlowNode[] }) {
  return (
    <div>
      <ol aria-label="NairobiX growth system stages" className="grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-9 sm:gap-x-2 sm:gap-y-0">
        {connected.map((stage, index) => (
          <li key={stage.label} className="border-t border-white/15 pt-2.5 sm:pt-3">
            <span aria-hidden="true" className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-primary)]">{pad(index + 1)}</span>
            <span className="mt-1 block text-xs font-semibold leading-4 text-white sm:text-center">{stage.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-[var(--text-tertiary)]">
        <span className="text-white/80">Measure what moves.</span> Use the signal to guide the next strategy decision.
      </p>
    </div>
  );
}
