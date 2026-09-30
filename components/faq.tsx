"use client";

import { useId, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Full-width FAQ accordion. The first item starts open (as before); `single`
 * keeps at most one open at a time (used on the homepage), otherwise items
 * open independently. Answers stay in the DOM when collapsed — they're only
 * visually folded (and made inert) — so page search and crawlers still see
 * them; the height reveal is a grid-rows transition, no measuring.
 */
export function Faq({ items, single = false }: { items: FaqItem[]; single?: boolean }) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set(items.length > 0 ? [0] : []));

  const toggle = (index: number) => {
    setOpenItems((current) => {
      const isOpen = current.has(index);
      if (single) return isOpen ? new Set() : new Set([index]);
      const next = new Set(current);
      if (isOpen) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div
            key={item.question}
            className={`rounded-[var(--radius-card)] border text-left transition-colors duration-300 ${
              isOpen ? "border-white/20 bg-white/[0.035]" : "border-white/10 bg-white/[0.02] hover:border-white/15"
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)] p-5 text-left text-base font-medium focus-visible:outline-offset-[-2px]"
              >
                <span className={`transition-colors duration-300 ${isOpen ? "text-white" : "text-white/85 group-hover:text-white"}`}>
                  {item.question}
                </span>
                {/* A plus drawn from two strokes; rotates 45° into an ×. */}
                <span
                  aria-hidden="true"
                  className={`relative h-3 w-3 flex-none transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
                >
                  <span
                    className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-300 ${
                      isOpen ? "bg-[var(--color-primary)]" : "bg-white/55 group-hover:bg-white/80"
                    }`}
                  />
                  <span
                    className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${
                      isOpen ? "bg-[var(--color-primary)]" : "bg-white/55 group-hover:bg-white/80"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
