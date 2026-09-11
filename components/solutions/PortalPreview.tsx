import { TrendingDown, TrendingUp } from "lucide-react";
import type { SolutionDetail } from "@/lib/site-data";

/**
 * A realistic, in-context preview of the NairobiX client workspace for this
 * solution — how the client actually sees and experiences the system day to
 * day. Directional/qualitative only: no invented numbers or fake data.
 */
export function PortalPreview({ preview }: { preview: SolutionDetail["portalPreview"] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="ml-2 rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
          NairobiX Workspace · {preview.title}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {preview.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                  {metric.label}
                </p>
                {metric.direction === "up" ? (
                  <TrendingUp className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                ) : (
                  <TrendingDown className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                )}
              </div>
              <p className="mt-2 text-sm font-semibold text-white">
                Trending {metric.direction === "up" ? "up" : "down"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
          {preview.rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-sm text-white">{row.label}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-white/10 px-5 py-3 text-xs text-[var(--text-tertiary)] sm:px-6">
        {preview.caption} — illustrative interface, shown for orientation.
      </p>
    </div>
  );
}
