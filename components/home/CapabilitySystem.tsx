"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Capability = { name: string; phrase: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The six solution areas drawn as one connected line rather than six
 * separate cards — horizontal on desktop, vertical on mobile. The active
 * area advances on its own every 3.5s: the segment leading into it draws in
 * orange, its node switches on, and (on desktop, where phrases are otherwise
 * hidden) its one-line phrase settles in. Clicking, tapping or focusing an
 * area selects it and restarts the countdown; hovering only brightens, and
 * pauses the sequence while the pointer is over it (see useAutoAdvance).
 *
 * Every connector is the *outgoing* segment of its own item, spanning from
 * this node to the next one, so the line stays joined whatever height each
 * row wraps to on mobile.
 */
export function CapabilitySystem({ items }: { items: Capability[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: items.length,
    activeIndex,
    onAdvance: setActiveIndex,
  });

  return (
    <div ref={containerRef} {...containerHandlers}>
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
        <span aria-hidden="true" className="h-px w-3 bg-[var(--color-primary)]" />
        Six solution areas, one system
      </p>

      <ol aria-label="NairobiX solution areas" className="mt-8 grid lg:mt-10 lg:grid-cols-6">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const carriesSignal = index === activeIndex - 1;
          return (
            <li key={item.name} className="relative">
              {/* Active elevation: a faint wash beneath the line, not a card. */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 -left-3 right-3 hidden bg-gradient-to-b from-white/[0.035] to-transparent transition-opacity duration-500 lg:top-[6px] lg:block ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              {index < items.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-6 left-[5.5px] top-6 w-px bg-white/15 lg:bottom-auto lg:left-1.5 lg:top-[5.5px] lg:h-px lg:w-full"
                >
                  {/* Draws in (500ms) when it becomes the signal; fades out
                      when the signal moves on, and only then collapses —
                      so it's ready to draw again rather than retracting. */}
                  <span
                    className={`absolute inset-0 origin-top bg-[var(--color-primary)] lg:origin-left ${
                      carriesSignal ? "scale-100 opacity-100" : "scale-y-0 opacity-0 lg:scale-x-0 lg:scale-y-100"
                    }`}
                    style={{
                      transition: carriesSignal
                        ? "scale 500ms cubic-bezier(0.65, 0, 0.35, 1), opacity 0s"
                        : "opacity 400ms ease-out, scale 0s linear 400ms",
                    }}
                  />
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className="group relative flex w-full items-start gap-5 rounded-sm py-4 text-left focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 lg:flex-col lg:gap-0 lg:py-0 lg:pb-2 lg:pr-6"
              >
                <span className="relative z-10 mt-0.5 flex h-3 w-3 flex-none items-center justify-center lg:mt-0">
                  <span
                    className={`h-[9px] w-[9px] rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ${
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_0_4px_rgba(249,115,22,0.14)] delay-200"
                        : "border-white/30 bg-[var(--section-bg)] group-hover:border-white/55"
                    }`}
                  />
                </span>
                <span className="min-w-0 lg:mt-6">
                  <span
                    aria-hidden="true"
                    className={`block font-mono text-[10px] leading-4 tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-[var(--color-primary)]" : "text-white/50 group-hover:text-white/70"
                    }`}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`mt-2 block font-display text-xl font-medium leading-7 tracking-tight transition-colors duration-500 lg:min-h-14 ${
                      isActive ? "text-white" : "text-white/70 group-hover:text-white/85"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`mt-2 block text-sm leading-6 transition-[color,opacity,translate] duration-500 ease-out lg:mt-3 lg:min-h-18 ${
                      isActive
                        ? "text-[var(--text-secondary)] lg:translate-y-0 lg:opacity-100 lg:delay-150"
                        : "text-[var(--text-tertiary)] lg:translate-y-1 lg:opacity-0 lg:duration-300"
                    }`}
                  >
                    {item.phrase}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
