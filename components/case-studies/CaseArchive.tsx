"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { CaseArea, CaseStudy } from "@/lib/case-studies";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

type Entry = { study: CaseStudy; preview: ReactNode; stack: ReactNode };

/**
 * The concept-engagement archive: editorial rows (not identical cards) with a
 * minimal filter by system area. Previews are server-rendered and passed in.
 */
export function CaseArchive({ entries, filters }: { entries: Entry[]; filters: ("All" | CaseArea)[] }) {
  const [filter, setFilter] = useState<"All" | CaseArea>("All");
  const visible = entries.filter((e) => filter === "All" || e.study.areas.includes(filter));
  const count = (f: "All" | CaseArea) => (f === "All" ? entries.length : entries.filter((e) => e.study.areas.includes(f)).length);

  return (
    <div>
      <div role="group" aria-label="Filter case studies by system area" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-10 rounded-full border px-4 text-sm transition-colors ${
              filter === f ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white" : "border-white/15 text-white/65 hover:text-white"
            }`}
          >
            {f} <span className="ml-1 font-mono text-[11px] text-white/40">{count(f)}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} case {visible.length === 1 ? "study" : "studies"}
      </p>

      <ol className="mt-12 border-t border-white/10">
        {visible.map(({ study, preview, stack }, i) => (
          <li key={study.slug} className="border-b border-white/10">
            <Link
              href={`/case-studies/${study.slug}`}
              className="group relative grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 lg:py-16"
            >
              {/* Orange edge on hover / focus */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[var(--color-primary)] transition-[scale] duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <div className={i % 2 === 1 ? "md:order-2" : ""}>{preview}</div>
              <div>
                <p className={`${MONO} flex flex-wrap items-center gap-x-3 gap-y-1`}>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full border border-white/40 transition-colors duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]"
                  />
                  <span className="text-[var(--color-primary)]">Concept case study</span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <span className="text-white/55">{study.industry}</span>
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-white transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {study.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/65">{study.problem}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="System areas">
                  {study.areas.map((a) => (
                    <li key={a} className={`rounded-full border border-white/12 px-3 py-1 ${MONO} text-white/60`}>
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className={`${MONO} mb-3 text-white/40`}>Proposed stack</p>
                  {stack}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore case study
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      {visible.length === 0 ? (
        <p className="mt-8 text-white/60">No other concept cases in this area yet — see the featured case above.</p>
      ) : null}
    </div>
  );
}
