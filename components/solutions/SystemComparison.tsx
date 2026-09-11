import { X } from "lucide-react";
import { SystemFlow } from "@/components/solutions/SystemFlow";

type Pair = { from: string; to: string };
type FlowNode = { label: string; detail: string };

/**
 * Before/after systems thinking: a handful of tools that don't talk to each
 * other, next to the connected chain NairobiX builds instead. The clearest
 * single demonstration of "systems thinking" on the About page.
 */
export function SystemComparison({ disconnected, connected }: { disconnected: Pair[]; connected: FlowNode[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
          Without a connected system
        </p>
        <div className="space-y-3">
          {disconnected.map((pair) => (
            <div
              key={`${pair.from}-${pair.to}`}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5"
            >
              <span className="text-sm font-medium text-white">{pair.from}</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[var(--text-tertiary)]">
                <X className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="text-sm text-[var(--text-secondary)]">{pair.to}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          With NairobiX
        </p>
        <SystemFlow nodes={connected} />
      </div>
    </div>
  );
}
