"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Scenario = {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const JOURNEYS: Record<string, string[]> = {
  professional: ["Referral / web", "Lead captured", "Qualified", "Follow-up", "Engagement"],
  property: ["Portal / WhatsApp", "Lead captured", "Agent assigned", "Viewing", "Deal"],
  retail: ["Campaign / store", "Product visit", "Order", "Fulfilment", "Repeat"],
};

function journeyFor(slug: string) {
  if (slug.includes("professional")) return JOURNEYS.professional;
  if (slug.includes("real-estate")) return JOURNEYS.property;
  return JOURNEYS.retail;
}

export function ScenarioShowcase({ scenarios }: { scenarios: Scenario[] }) {
  const featured = scenarios.slice(0, 3);
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug ?? "");
  const active = featured.find((scenario) => scenario.slug === activeSlug) ?? featured[0];

  if (!active) return null;

  const activeIndex = featured.findIndex((scenario) => scenario.slug === active.slug);

  return (
    <div>
      <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#101112] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
          <Image
            src={active.image}
            alt={active.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-opacity duration-300"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm sm:left-7 sm:top-7">
            Scenario {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{active.label}</p>
            <h3 className="mt-2 max-w-xl font-display text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">{active.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">{active.description}</p>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-7 lg:p-9">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Choose a scenario</p>
            <div role="group" aria-label="Choose an illustrative business scenario" className="mt-3 flex flex-wrap gap-2">
              {featured.map((scenario, index) => {
                const selected = scenario.slug === active.slug;
                return (
                  <button
                    key={scenario.slug}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveSlug(scenario.slug)}
                    className={`min-h-10 rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${selected ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-black" : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"}`}
                  >
                    <span className="mr-1.5 font-mono text-[10px] opacity-70">{String(index + 1).padStart(2, "0")}</span>
                    {scenario.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 border-t border-white/10 pt-5 sm:mt-9">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Example system path</p>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/50">Illustrative</span>
            </div>
            <ol className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2" aria-label={`Illustrative journey for ${active.label}`}>
              {journeyFor(active.slug).map((stage, index) => (
                <li key={stage} className="min-w-0 border-t border-white/20 pt-2.5">
                  <span className="block font-mono text-[9px] tracking-[0.12em] text-[var(--color-primary)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-white/80 sm:text-xs">{stage}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6">
            <p className="max-w-xs text-xs leading-5 text-[var(--text-tertiary)]">A representative scenario showing how NairobiX could connect the work. Not a client result.</p>
            <Link href={`/case-studies/${active.slug}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[var(--color-primary)]">
              Explore scenario <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Link href="/case-studies" className="text-xs font-semibold text-white/60 transition-colors hover:text-white">View all illustrative scenarios <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
