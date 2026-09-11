import { TECH_ROLES } from "@/lib/site-data";

/**
 * The technology list as a connected ecosystem — each tool's role in the
 * system, arranged around the NairobiX system itself — rather than a flat
 * row of pills. Typographic marks only (no logo graphics).
 */
export function TechnologyEcosystem({ technology }: { technology: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-1.5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
          <p className="text-sm font-semibold text-white">The NairobiX System</p>
        </div>
        <p className="pl-4 text-sm text-[var(--text-secondary)] sm:pl-0">
          — how these tools work together, not a list of logos.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {technology.map((tech) => (
          <div
            key={tech}
            className="group rounded-xl border border-white/10 bg-[#0b0b0d] p-4 transition hover:border-[var(--color-primary)]/40"
          >
            <p className="text-sm font-semibold text-white">{tech}</p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
              {TECH_ROLES[tech] ?? "System component"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
