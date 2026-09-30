export type ReviewSection = {
  title: string;
  stepIndex: number;
  rows: Array<{ label: string; value: string }>;
};

/**
 * "Review your application" screen (brief section 14) — a read-only summary
 * of every section's answers with an Edit link back to that step. Generic
 * over `ReviewSection[]` so any multi-step form can reuse it.
 */
export function ReviewSummary({
  sections,
  onEdit,
}: {
  sections: ReviewSection[];
  onEdit: (stepIndex: number) => void;
}) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.title} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
              {section.title}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(section.stepIndex)}
              className="text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
            >
              Edit
            </button>
          </div>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {section.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs text-[var(--text-tertiary)]">{row.label}</dt>
                <dd className="mt-1 text-sm text-white">{row.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
