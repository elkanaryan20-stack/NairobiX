import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Metric = { label: string; direction: "up" | "down" };

/**
 * Directional KPI cards for Expected Outcomes, paired with the original
 * outcome sentences as supporting copy — qualitative direction, never
 * invented numbers.
 */
export function OutcomeMetrics({ metrics, outcomes }: { metrics: Metric[]; outcomes: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {metrics.map((metric, index) => (
        <Card key={metric.label} variant="outline" className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-semibold text-white">{metric.label}</p>
            {metric.direction === "up" ? (
              <TrendingUp className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            )}
          </div>
          {outcomes[index] ? (
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{outcomes[index]}</p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
