"use client";

import Link from "next/link";
import { useId, useState, useSyncExternalStore } from "react";
import type { SolutionDetail } from "@/lib/site-data";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Category = { id: string; title: string; items: SolutionDetail[] };

// What each group is about, in three words — the group's own language.
const GROUP_THEME: Record<string, string> = {
  "acquire-grow": "Reach · Visibility · Data",
  "convert-scale": "Pipeline · Connection · Automation",
  "build-innovate": "Infrastructure · AI · Experience",
};

const DESKTOP = "(min-width: 1024px)";
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Solutions page's system architecture: NairobiX at the root, three
 * capability groups, two solutions in each. Selecting a solution lights its
 * whole path from the root and draws its connected flow beneath — the same
 * authored systemFlow its detail page describes, so the map teaches with
 * real content ("Digital Marketing doesn't stop at marketing") rather than
 * a diagram invented for this view.
 *
 * Desktop: a branching map with the flow as a horizontal path underneath.
 * Mobile: the same system as a vertical tree, with the selected solution's
 * flow revealed directly under it. Autoplay (slow, 6.5s — the flow has text
 * to read) runs on desktop only: on mobile a moving panel would shift the
 * page under the visitor's thumb.
 */
export function SolutionArchitecture({ categories }: { categories: Category[] }) {
  const all = categories.flatMap((c) => c.items);
  const [activeId, setActiveId] = useState(all[0]?.id);
  const activeIndex = Math.max(0, all.findIndex((s) => s.id === activeId));
  const active = all[activeIndex];
  const activeGroup = Math.max(0, categories.findIndex((c) => c.items.some((i) => i.id === active.id)));
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);
  const panelId = useId();

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: all.length,
    activeIndex,
    onAdvance: (next) => setActiveId(all[next]?.id),
    interval: 6500,
    enabled: isDesktop,
  });

  const numberOf = (id: string) => all.findIndex((s) => s.id === id) + 1;

  return (
    <div ref={containerRef} {...containerHandlers}>
      {/* ── Desktop map ─────────────────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="flex flex-col items-center">
          <RootNode />
          <span aria-hidden="true" className="h-8 w-px bg-[var(--color-primary)]/70" />
        </div>

        <div className="relative grid grid-cols-3 gap-6">
          {/* The bus across the three groups; the active half lights. */}
          <span aria-hidden="true" className="absolute left-[calc((100%-48px)/6)] right-[calc((100%-48px)/6)] top-0 h-px bg-white/15" />
          <span
            aria-hidden="true"
            className="absolute top-0 h-px bg-[var(--color-primary)]/70 transition-[left,right] duration-500 ease-out"
            style={{
              left: activeGroup === 0 ? "calc((100% - 48px) / 6)" : "50%",
              right: activeGroup === 2 ? "calc((100% - 48px) / 6)" : "50%",
            }}
          />
          {categories.map((category, g) => {
            const groupActive = g === activeGroup;
            return (
              <div key={category.id} className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className={`h-8 w-px transition-colors duration-500 ${groupActive ? "bg-[var(--color-primary)]/70" : "bg-white/15"}`}
                />
                <div
                  className={`w-full rounded-lg border px-4 py-3 text-center transition-colors duration-500 ${
                    groupActive ? "border-white/20 bg-white/[0.035]" : "border-white/10 bg-white/[0.015]"
                  }`}
                >
                  <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${groupActive ? "text-white" : "text-white/60"}`}>
                    {category.title}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--text-tertiary)]">{GROUP_THEME[category.id]}</p>
                </div>

                {/* Branch to the group's two solutions. */}
                <div className="relative mt-0 w-full">
                  <span aria-hidden="true" className={`mx-auto block h-6 w-px transition-colors duration-500 ${groupActive ? "bg-[var(--color-primary)]/70" : "bg-white/15"}`} />
                  <span aria-hidden="true" className="absolute left-[calc((100%-12px)/4)] right-[calc((100%-12px)/4)] top-6 h-px bg-white/15" />
                  {groupActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-6 h-px bg-[var(--color-primary)]/70"
                      style={category.items[0].id === active.id ? { left: "calc((100% - 12px) / 4)", right: "50%" } : { left: "50%", right: "calc((100% - 12px) / 4)" }}
                    />
                  ) : null}
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item) => {
                      const isActive = item.id === active.id;
                      return (
                        <div key={item.id} className="flex flex-col items-center">
                          <span
                            aria-hidden="true"
                            className={`h-6 w-px transition-colors duration-500 ${isActive ? "bg-[var(--color-primary)]/70" : "bg-white/15"}`}
                          />
                          <SolutionButton
                            item={item}
                            number={numberOf(item.id)}
                            active={isActive}
                            controls={panelId}
                            onSelect={() => setActiveId(item.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FlowPanel id={panelId} solution={active} number={activeIndex + 1} orientation="horizontal" />
      </div>

      {/* ── Mobile / tablet: a vertical system ───────────────────── */}
      <div className="lg:hidden">
        <RootNode />
        <ol className="relative mt-2 border-l border-white/15 pl-5" style={{ marginLeft: 18.5 }}>
          {categories.map((category) => (
            <li key={category.id} className="relative pt-6">
              <span aria-hidden="true" className="absolute -left-[24px] top-[31px] h-2 w-2 rounded-full border border-white/35 bg-[var(--section-bg)]" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">{category.title}</p>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">{GROUP_THEME[category.id]}</p>
              <div className="mt-4 space-y-3">
                {category.items.map((item) => {
                  const isActive = item.id === active.id;
                  return (
                    <div key={item.id}>
                      <SolutionButton
                        item={item}
                        number={numberOf(item.id)}
                        active={isActive}
                        controls={`${panelId}-m`}
                        onSelect={() => setActiveId(item.id)}
                      />
                      {isActive ? (
                        <FlowPanel id={`${panelId}-m`} solution={item} number={numberOf(item.id)} orientation="vertical" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RootNode() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white">NairobiX</span>
    </div>
  );
}

function SolutionButton({
  item,
  number,
  active,
  controls,
  onSelect,
}: {
  item: SolutionDetail;
  number: number;
  active: boolean;
  controls: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-controls={controls}
      className={`group relative w-full min-h-11 rounded-lg border px-4 py-3.5 text-left transition-colors duration-300 focus-visible:outline-offset-2 ${
        active
          ? "border-[var(--color-primary)]/60 bg-[var(--color-primary)]/[0.07]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <span className={`block font-mono text-[10px] tracking-[0.2em] ${active ? "text-[var(--color-primary)]" : "text-white/40"}`}>
        {pad(number)}
      </span>
      <span className={`mt-1.5 block text-sm font-semibold leading-snug ${active ? "text-white" : "text-white/80 group-hover:text-white"}`}>
        {item.title}
      </span>
    </button>
  );
}

/**
 * The selected solution's connected flow. Horizontal on desktop (one node
 * per step on a single line that draws in orange), vertical on mobile.
 * Every step shows its authored detail, so the path explains itself.
 */
function FlowPanel({
  id,
  solution,
  number,
  orientation,
}: {
  id: string;
  solution: SolutionDetail;
  number: number;
  orientation: "horizontal" | "vertical";
}) {
  const nodes = solution.systemFlow;
  const headingId = `${id}-h`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      key={solution.id}
      className={`animate-step-fade rounded-xl border border-white/10 bg-black/25 ${
        orientation === "horizontal" ? "mt-12 p-8" : "mt-3 p-5"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id={headingId} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {pad(number)} · How {solution.title} connects
        </h3>
        <Link
          href={`/solutions/${solution.id}`}
          className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
        >
          View {solution.title} in full
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]">
            →
          </span>
        </Link>
      </div>

      {orientation === "horizontal" ? (
        <ol
          className="relative mt-8 grid"
          style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
        >
          <span aria-hidden="true" className="absolute left-0 right-0 top-[3.5px] h-px bg-white/12" />
          <span
            key={solution.id}
            aria-hidden="true"
            className="nx-flow-draw absolute left-0 top-[3.5px] h-px bg-[var(--color-primary)]/70"
            style={{ right: `${100 / nodes.length}%` }}
          />
          {nodes.map((node, index) => (
            <li key={node.label} className="relative pr-4">
              <span
                aria-hidden="true"
                className="nx-flow-node relative z-10 block h-2 w-2 rounded-full border border-[var(--color-primary)] bg-[#0b0d10]"
                style={{ animationDelay: `${index * 70}ms` }}
              />
              <p className="mt-4 text-sm font-semibold text-white">{node.label}</p>
              <p className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">{node.detail}</p>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="relative mt-5 border-l border-[var(--color-primary)]/50 pl-5" style={{ marginLeft: 3.5 }}>
          {nodes.map((node) => (
            <li key={node.label} className="relative pb-4 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[24px] top-[6px] h-2 w-2 rounded-full border border-[var(--color-primary)] bg-[#0b0d10]" />
              <p className="text-sm font-semibold text-white">{node.label}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{node.detail}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
