"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Pathway = {
  title: string;
  number: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  capabilities: string[];
  cta: string;
};

const INTERVAL_MS = 5000;

/**
 * The three growth pathways as photographic cards, each naming the two
 * solution areas that carry it. The cards never move; roughly every 5s the
 * active treatment passes to the next one — an orange edge drawn across the
 * top, a lighter overlay, a 1.5% image push, the title and arrow easing
 * forward, the solution areas brightening. Hover or keyboard focus hands the
 * active state to that card instead (and pauses the sequence while there);
 * a click follows the link as before.
 *
 * Above the cards (desktop), a system line runs through one node per
 * pathway, each sitting on its card's left edge. Segments up to the active
 * pathway light orange, so the line tracks the sequence rather than
 * decorating it.
 */
export function SolutionPathways({ pathways }: { pathways: Pathway[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: pathways.length,
    activeIndex,
    onAdvance: setActiveIndex,
    interval: INTERVAL_MS,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <ol aria-hidden="true" className="mb-6 hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {pathways.map((pathway, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;
          return (
            <li key={pathway.title} className="relative flex items-center gap-3">
              {index < pathways.length - 1 ? (
                <span className="absolute left-[3.5px] top-1/2 h-px w-[calc(100%+1.5rem)] bg-white/15">
                  <span
                    className={`absolute inset-0 origin-left bg-[var(--color-primary)]/70 transition-transform duration-500 ease-out ${
                      isPassed ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              ) : (
                <span className="absolute left-[3.5px] right-0 top-1/2 h-px bg-gradient-to-r from-white/15 to-transparent" />
              )}
              <span
                className={`relative z-10 h-2 w-2 flex-none rounded-full border transition-colors duration-500 ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : isPassed
                      ? "border-[var(--color-primary)] bg-[var(--section-bg)]"
                      : "border-white/35 bg-[var(--section-bg)]"
                }`}
              />
              <span
                className={`relative z-10 bg-[var(--section-bg)] pr-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                  isActive ? "text-white/80" : "text-white/35"
                }`}
              >
                Pathway {pathway.number}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-6 lg:grid-cols-3">
        {pathways.map((pathway, index) => {
          const isActive = index === activeIndex;
          return (
            <Link
              key={pathway.title}
              href={pathway.href}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={`group relative isolate flex min-h-[460px] flex-col overflow-hidden rounded-[var(--radius-card)] border p-6 transition-colors duration-500 focus-visible:outline-offset-4 sm:min-h-[500px] sm:p-8 ${
                isActive ? "border-white/25" : "border-white/10"
              }`}
            >
              <Image
                src={pathway.image}
                alt={pathway.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className={`-z-10 object-cover transition-transform duration-[400ms] ease-out ${
                  isActive ? "scale-[1.015]" : "scale-100"
                }`}
              />
              {/* Base overlay keeps text legible; the second layer is what
                  lifts away when the card is active. */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#030304] from-15% via-[#030304]/75 via-50% to-[#030304]/15" />
              <div
                className={`absolute inset-0 -z-10 bg-[#030304]/30 transition-opacity duration-[400ms] ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
              />
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--color-primary)] ${
                  isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
                style={{
                  transition: isActive
                    ? "scale 500ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0s"
                    : "opacity 400ms ease-out, scale 0s linear 400ms",
                }}
              />

              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-[var(--color-primary)]" : "text-white/60"
                  }`}
                >
                  {pathway.number}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px w-8 transition-colors duration-300 ${
                    isActive ? "bg-[var(--color-primary)]/70" : "bg-white/25"
                  }`}
                />
              </div>

              <div className="mt-auto">
                <h3
                  className={`font-display text-2xl font-medium tracking-tight text-white transition-transform duration-300 ease-out sm:text-[1.75rem] ${
                    isActive ? "-translate-y-[3px]" : "translate-y-0"
                  }`}
                >
                  {pathway.title}
                </h3>
                <p className="mt-3 max-w-xs text-base leading-7 text-slate-200">{pathway.description}</p>

                <ul
                  aria-label={`Solution areas for ${pathway.title}`}
                  className="mt-6 border-t border-white/15 pt-4"
                >
                  {pathway.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className={`flex items-center gap-3 py-1 text-sm transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-px w-3 transition-colors duration-300 ${
                          isActive ? "bg-[var(--color-primary)]" : "bg-white/35"
                        }`}
                      />
                      {capability}
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/75"
                  }`}
                >
                  {pathway.cta.replace(/\s*→$/, "")}
                  <span
                    aria-hidden="true"
                    className={`inline-block transition-transform duration-300 ease-out ${
                      isActive ? "translate-x-1.5 text-[var(--color-primary)]" : "translate-x-0"
                    }`}
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
