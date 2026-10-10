"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import type { IndustryContext } from "@/lib/industry-contexts";

type SolutionRef = { id: string; title: string };

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

/** The five-part reading of one industry. Shared by the desktop panel and the mobile disclosure. */
function IndustryDetail({ industry, solutions }: { industry: IndustryContext; solutions: SolutionRef[] }) {
  const relevant = industry.solutionIds
    .map((id) => solutions.find((s) => s.id === id))
    .filter((s): s is SolutionRef => s !== undefined);

  const parts = [
    { label: "Context", body: <p>{industry.context}</p> },
    { label: "Common growth friction", body: <p>{industry.friction}</p> },
    {
      label: "System opportunities",
      body: (
        <ul>
          {industry.opportunities.map((item) => (
            <li key={item} className="relative pl-5 [&+&]:mt-1.5">
              <span aria-hidden="true" className="absolute left-0 top-[11px] h-px w-2.5 bg-[var(--color-primary)]" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Relevant growth capabilities",
      body: (
        <ul className="flex flex-wrap gap-2">
          {relevant.map((s) => (
            <li key={s.id}>
              <Link
                href={`/solutions/${s.id}`}
                className="inline-flex min-h-8 items-center rounded-full border border-white/15 px-3.5 text-[13px] text-white/85 transition-colors hover:border-[var(--color-primary)]/60 hover:text-white"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Typical starting point", body: <p>{industry.startingPoint}</p> },
  ];

  return (
    <dl className="divide-y divide-white/10 border-y border-white/10">
      {parts.map((part, i) => (
        <div key={part.label} className="grid gap-2 py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5">
          <dt className={`${LABEL} pt-1 text-white/50`}>
            <span className="mr-2 text-[var(--color-primary)]">{pad(i + 1)}</span>
            {part.label}
          </dt>
          <dd className="text-[15px] leading-6 text-white/80">{part.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The industry index: a list of nine contexts on the left, and a reading of
 * the selected one on the right (desktop). On small screens each row is a
 * disclosure that opens its reading in place. A URL hash (#healthcare)
 * selects that industry, so other pages can link straight to a context.
 */
export function IndustryIndex({ industries, solutions }: { industries: IndustryContext[]; solutions: SolutionRef[] }) {
  const [activeSlug, setActiveSlug] = useState(industries[0]?.slug);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.slice(1);
      if (industries.some((i) => i.slug === slug)) {
        setActiveSlug(slug);
        setMobileOpen(slug);
      }
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [industries]);

  const active = industries.find((i) => i.slug === activeSlug) ?? industries[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      {/* Index */}
      <ol className="border-t border-white/10">
        {industries.map((industry, index) => {
          const isActive = industry.slug === active.slug;
          const isOpen = mobileOpen === industry.slug;
          return (
            <li key={industry.slug} id={industry.slug} className="scroll-mt-28 border-b border-white/10">
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`industry-panel industry-inline-${industry.slug}`}
                onClick={() => {
                  setActiveSlug(industry.slug);
                  setMobileOpen(isOpen ? null : industry.slug);
                  const panel = panelRef.current;
                  if (panel && panel.offsetParent !== null && panel.getBoundingClientRect().top < 0) {
                    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                  }
                }}
                className="group relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-5 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-4 top-5 bottom-5 hidden w-[2px] bg-[var(--color-primary)] transition-opacity duration-300 lg:block ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span className={`font-mono text-xs ${isActive ? "text-[var(--color-primary)]" : "text-white/40"}`}>{pad(index + 1)}</span>
                <span>
                  <span
                    className={`block font-display text-lg font-medium tracking-tight transition-colors sm:text-xl ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {industry.name}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white/50">{industry.short}</span>
                </span>
                <span aria-hidden="true" className="text-white/40 lg:hidden">
                  {isOpen ? "−" : "+"}
                </span>
                <span
                  aria-hidden="true"
                  className={`hidden text-[var(--color-primary)] transition-all duration-300 lg:inline ${
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                  }`}
                >
                  →
                </span>
              </button>

              {/* Mobile: the reading opens in place. */}
              <div id={`industry-inline-${industry.slug}`} hidden={!isOpen} className="pb-8 lg:hidden">
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[var(--radius-image)]">
                  <Image src={industry.image} alt={industry.imageAlt} fill sizes="100vw" className="object-cover grayscale-[25%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <IndustryDetail industry={industry} solutions={solutions} />
                {industry.detailSlug ? (
                  <Link href={`/industries/${industry.detailSlug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore {industry.name} in depth <span aria-hidden="true" className="text-[var(--color-primary)]">→</span>
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: the reading of the selected industry. */}
      <div id="industry-panel" aria-live="polite" className="hidden lg:block">
        <div ref={panelRef} className="sticky top-24 scroll-mt-24">
          <div className="relative aspect-[3/1] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03]">
            {industries.map((industry) => (
              <Image
                key={industry.slug}
                src={industry.image}
                alt={industry.slug === active.slug ? industry.imageAlt : ""}
                aria-hidden={industry.slug === active.slug ? undefined : true}
                fill
                sizes="(min-width: 1280px) 640px, 55vw"
                className={`object-cover grayscale-[25%] transition-opacity duration-500 ${
                  industry.slug === active.slug ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/20 to-transparent" />
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
            <p className="absolute bottom-4 left-5 right-5 font-display text-2xl font-medium tracking-tight text-white">{active.name}</p>
          </div>
          <div className="mt-4">
            <IndustryDetail industry={active} solutions={solutions} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/50">Common patterns, not assumptions about your business.</p>
            {active.detailSlug ? (
              <Link
                href={`/industries/${active.detailSlug}`}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Explore {active.name} in depth
                <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
