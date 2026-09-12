"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import type { IndustryDetail } from "@/lib/site-data";

/**
 * A tabbed industry explorer in place of five near-identical cards — one
 * industry shown at a time, at full size, so its photography and business
 * challenge get real room instead of competing in a grid.
 */
export function IndustryExplorer({ industries }: { industries: IndustryDetail[] }) {
  const [activeSlug, setActiveSlug] = useState(industries[0]?.slug);
  const active = industries.find((industry) => industry.slug === activeSlug) ?? industries[0];

  if (!active) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose an industry">
        {industries.map((industry) => {
          const isActive = industry.slug === active.slug;
          return (
            <button
              key={industry.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlug(industry.slug)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "border-white/15 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/30 hover:text-white"
              }`}
            >
              {industry.name}
            </button>
          );
        })}
      </div>

      <div key={active.slug} className="animate-step-fade mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <ImageFrame src={active.heroImage} alt={active.heroImageAlt} aspect="wide" sizes="(min-width: 1024px) 42vw, 100vw" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {active.eyebrow}
          </p>
          <Heading variant="heading-lg" as="h2" className="mt-4">
            {active.heading}
          </Heading>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{active.challenge}</p>
          <Button href={`/industries/${active.slug}`} variant="secondary" size="md" className="mt-6">
            Explore {active.name} →
          </Button>
        </div>
      </div>
    </div>
  );
}
