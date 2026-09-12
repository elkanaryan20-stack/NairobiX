"use client";

import { useEffect, useRef, useState } from "react";

type RailSection = { id: string; label: string };

/**
 * A compact, corner-anchored wayfinding indicator for long editorial pages
 * (solution detail, scenario detail). Tracks the section in view via
 * IntersectionObserver and lets a visitor jump directly to any section —
 * deliberately not a full-width progress bar, and out of the way of the
 * fixed Nia launcher (bottom-right) by sitting at the opposite corner.
 */
export function SectionRail({ sections }: { sections: RailSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId)
  );
  const active = sections[activeIndex];

  if (!active) return null;

  return (
    <nav
      aria-label="Page sections"
      className="fixed bottom-6 left-6 z-30 hidden lg:block"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b0b0d]/90 py-2 pl-2 pr-4 shadow-[var(--shadow-elevated)] backdrop-blur">
        <div className="flex items-center gap-1.5">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              aria-current={section.id === activeId ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                section.id === activeId
                  ? "w-5 bg-[var(--color-primary)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            >
              <span className="sr-only">
                {String(index + 1).padStart(2, "0")} {section.label}
              </span>
            </a>
          ))}
        </div>
        <span className="text-xs font-medium text-[var(--text-secondary)]">
          {String(activeIndex + 1).padStart(2, "0")} · {active.label}
        </span>
      </div>
    </nav>
  );
}
