import type { CSSProperties } from "react";

type Pair = { from: string; to: string };
type FlowNode = { label: string; detail: string };

// Deliberately uneven indents (px, desktop only): the disconnected side
// should read as scattered parts before a word is read. The broken drop
// under each pair starts from that pair's own indent, so it never lines up
// with the next pair — the misalignment is the point.
const SCATTER = [0, 40, 12, 56, 24];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Homepage version of the before/after systems comparison (the About page
 * keeps components/solutions/SystemComparison). Same content, but the form
 * carries the argument.
 *
 * Left — disconnected: pairs of tools as separate parts with broken
 * connectors, distributed down the full height of the right-hand rail so the
 * two sides share one vertical rhythm. Between pairs, a dashed line drops
 * from each pair and stops short: the height comes from the interruptions,
 * not from padding.
 *
 * Right — connected: one continuous line through all nine stages. Where
 * scroll-driven animation is supported, an orange progress line fills that
 * rail as the visitor scrolls through (.nx-rail-progress).
 */
export function ConnectedSystemCompare({ disconnected, connected }: { disconnected: Pair[]; connected: FlowNode[] }) {
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col">
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="h-px w-2 bg-white/30" />
            <span className="h-px w-2 bg-white/30" />
          </span>
          Without a connected system
        </p>
        <ul className="mt-6 flex flex-1 flex-col">
          {disconnected.map((pair, index) => {
            const indent = SCATTER[index % SCATTER.length];
            const isLast = index === disconnected.length - 1;
            return (
              <li
                key={`${pair.from}-${pair.to}`}
                className={`relative flex flex-col ${isLast ? "" : "flex-1"}`}
                style={{ "--indent": `${indent}px` } as CSSProperties}
              >
                <div className="flex items-center lg:pl-[var(--indent)]">
                  <span className="rounded-sm border border-white/12 bg-white/[0.02] px-3 py-2 text-sm font-medium text-white/85">
                    {pair.from}
                  </span>
                  {/* A connector that doesn't connect. */}
                  <span aria-hidden="true" className="flex items-center px-2">
                    <span className="h-px w-4 bg-white/25 sm:w-6" />
                    <span className="mx-1.5 font-mono text-[11px] leading-none text-white/35">×</span>
                    <span className="w-4 border-t border-dashed border-white/20 sm:w-6" />
                  </span>
                  <span className="sr-only">not connected to</span>
                  <span className="rounded-sm border border-dashed border-white/12 px-3 py-2 text-sm text-white/55">
                    {pair.to}
                  </span>
                </div>
                {/* The broken drop: a dashed path leaving this pair that
                    fades out before it reaches the next one. */}
                {isLast ? null : (
                  <span aria-hidden="true" className="relative min-h-6 flex-1">
                    <span className="absolute left-[18px] top-0 h-[55%] w-px border-l border-dashed border-white/15 [mask-image:linear-gradient(to_bottom,#000,transparent)] lg:left-[calc(var(--indent)+18px)]" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
          <span aria-hidden="true" className="h-px w-5 bg-[var(--color-primary)]" />
          With NairobiX
        </p>
        <ol className="relative mt-6">
          {/* One continuous rail from the first node to the last. The last
              row masks the rail below its node with the section surface. */}
          <span aria-hidden="true" className="absolute bottom-0 left-[3.5px] top-[9px] w-px bg-white/15">
            <span className="nx-rail-progress absolute inset-0 origin-top bg-[var(--color-primary)]/70" />
          </span>
          {connected.map((node, index) => {
            const isFirst = index === 0;
            const isLast = index === connected.length - 1;
            return (
              <li key={node.label} className={`relative flex gap-5 ${isLast ? "" : "pb-5"}`}>
                {isLast ? (
                  <span aria-hidden="true" className="absolute bottom-0 left-0 top-[13px] w-2 bg-[var(--section-bg)]" />
                ) : null}
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-[5px] h-2 w-2 flex-none rounded-full border bg-[var(--section-bg)] ${
                    isFirst ? "border-[var(--color-primary)]" : "border-white/35"
                  }`}
                />
                <div className="min-w-0">
                  <p className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                      {pad(index + 1)}
                    </span>
                    <span className="text-sm font-semibold text-white">{node.label}</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{node.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
