"use client";

import { useEffect, useState } from "react";

type Item = { id: string; heading: string };

/**
 * Sticky article navigation (desktop only). Highlights the section being
 * read: the last section whose heading has passed the upper third of the
 * viewport. Plain anchor links, so it works without JavaScript too.
 */
export function OnThisPage({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const update = () => {
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">On this page</p>
      <ol className="mt-4 space-y-0.5 border-l border-white/10">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-[13px] leading-5 transition-colors duration-200 ${
                  active
                    ? "border-[var(--color-primary)] text-white"
                    : "border-transparent text-white/55 hover:text-white/85"
                }`}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
