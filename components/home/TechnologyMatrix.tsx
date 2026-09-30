"use client";

import Image from "next/image";
import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import type { TechnologyItem } from "@/lib/site-data";

const INTERVAL_MS = 3800;
const LOGO_HEIGHT = 28;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A fixed matrix of selected technologies, drawn with hairline rules rather
 * than cards. Roughly every 3.8s one tile becomes active — a slightly lifted
 * surface, an orange edge drawn across its top, full-strength logo — and the
 * detail cell (part of the matrix itself, filling the last row) names it.
 * Otherwise the grid stays still.
 *
 * Hover, focus or tap selects a tile and restarts the countdown; pointer
 * hover and keyboard focus inside the matrix pause it (see useAutoAdvance).
 *
 * Cell counts are chosen so the matrix always closes as a full rectangle
 * with the current 17 technologies: desktop 17 tiles + a 3-wide detail cell
 * (4 × 5), tablet 17 + a 1-wide detail cell (3 × 6), mobile a full-width
 * detail cell first + 17 tiles + a closing label cell (2 × 10). Adjust the
 * detail cell's spans if the list length changes.
 */
export function TechnologyMatrix({ items }: { items: TechnologyItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: items.length,
    activeIndex,
    onAdvance: setActiveIndex,
    interval: INTERVAL_MS,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <ul
        aria-label="Selected technologies"
        className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.name} className="flex">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`group relative flex min-h-36 w-full flex-col justify-between p-5 text-left transition-colors duration-500 focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-white/60 sm:min-h-40 sm:p-6 ${
                  isActive ? "bg-[#141417]" : "bg-[var(--section-bg)] hover:bg-[#101013]"
                }`}
              >
                {/* Active signal: an orange edge drawn across the tile's top;
                    fades (rather than retracts) when the signal moves on. */}
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
                <Image
                  src={item.logo}
                  alt=""
                  width={Math.round(LOGO_HEIGHT * item.ratio)}
                  height={LOGO_HEIGHT}
                  unoptimized
                  style={{ width: Math.round(LOGO_HEIGHT * item.ratio), height: LOGO_HEIGHT }}
                  className={`self-start object-contain transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                  }`}
                />
                <span className="mt-8 block">
                  <span
                    className={`block text-[15px] font-medium transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-white/75" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {item.category}
                  </span>
                </span>
              </button>
            </li>
          );
        })}

        {/* Detail cell — part of the matrix, not a tooltip. Every entry is
            stacked in one grid cell so the cell never changes height. Not a
            live region: autoplay would otherwise announce every 3.8s. */}
        <li className="order-first col-span-2 flex flex-col bg-[var(--section-bg)] p-5 sm:order-last sm:col-span-1 sm:p-6 lg:col-span-3 lg:p-8">
          <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-3 bg-[var(--color-primary)]" />
              Selected technologies
            </span>
            <span aria-hidden="true" className="tabular-nums">
              <span className="text-white/80">{pad(activeIndex + 1)}</span> / {pad(items.length)}
            </span>
          </p>
          <div className="mt-6 grid flex-1 items-end lg:mt-auto">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.name}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 transition-[opacity,visibility,translate] ease-out ${
                    isActive
                      ? "visible translate-y-0 opacity-100 delay-150 duration-500"
                      : "invisible translate-y-1 opacity-0 duration-300"
                  }`}
                >
                  <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-2xl font-medium tracking-tight text-white sm:text-[1.75rem]">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {item.category}
                    </span>
                  </p>
                  <p className="mt-2 text-[15px] leading-6 text-[var(--text-secondary)]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </li>

        {/* Mobile only: closes the 2-column matrix into a full rectangle. */}
        <li
          aria-hidden="true"
          className="flex items-end bg-[var(--section-bg)] p-5 font-mono text-[10px] uppercase leading-4 tracking-[0.2em] text-white/35 sm:hidden"
        >
          Curated, not exhaustive
        </li>
      </ul>

      <p className="mt-5 max-w-2xl text-xs leading-5 text-[var(--text-tertiary)]">
        A selection of platforms NairobiX works with. Logos are trademarks of their respective owners
        and don&apos;t imply partnership or endorsement.
      </p>
    </div>
  );
}
