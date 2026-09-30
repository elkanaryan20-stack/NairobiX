"use client";

import { useState } from "react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

type Stage = { label: string; detail: string; meta: [string, string, string] };

const STAGES: Stage[] = [
  { label: "Marketing", detail: "Reach the right audience.", meta: ["Campaign", "Audience", "Traffic"] },
  { label: "Lead Capture", detail: "Turn attention into identifiable demand.", meta: ["Form", "WhatsApp", "Source"] },
  {
    label: "CRM",
    detail: "Every lead lands in one record, with its source and history attached.",
    meta: ["Record", "Source", "History"],
  },
  { label: "Follow-up", detail: "Make the next action clear.", meta: ["Task", "Message", "Timing"] },
  { label: "Sales", detail: "Move opportunities through a defined process.", meta: ["Pipeline", "Activity", "Value"] },
  { label: "Customer", detail: "Continue the relationship after conversion.", meta: ["Delivery", "Retention", "Expansion"] },
  { label: "Reporting", detail: "Make performance visible.", meta: ["Data", "Insight", "Decision"] },
  { label: "Optimization", detail: "Improve the system from what it learns.", meta: ["Learn", "Adjust", "Grow"] },
];

// Every rail position below is derived from this, so the signal segment and
// the feedback loop line up with the nodes without measuring the DOM.
const ROW = 44;
const NODE_X = 26;
const RAIL_HEIGHT = ROW * STAGES.length;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The hero's primary visual: the NairobiX growth sequence drawn as one
 * system — a single rail from Marketing to Optimization, with a feedback
 * loop returning to the start. Each change of stage plays as state → signal
 * → next state: the segment leading into the new node draws, the node
 * switches on, then its detail settles in. Nothing else in the panel moves.
 *
 * Autoplay, pausing (off-screen, hover, keyboard focus, reduced motion) and
 * timer reset on manual selection all come from useAutoAdvance, shared with
 * the site's other connected-flow components.
 */
export function HeroSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  // The first active state is revealed by the CSS entrance; once the
  // sequence has moved on, newly-active nodes should switch on with the
  // short signal delay rather than replay that ~1000ms intro.
  const [hasAdvanced, setHasAdvanced] = useState(false);

  const select = (index: number) => {
    setHasAdvanced(true);
    setActiveIndex(index);
  };

  const { containerRef, containerHandlers } = useAutoAdvance({
    itemCount: STAGES.length,
    activeIndex,
    onAdvance: select,
  });

  const loopActive = hasAdvanced && activeIndex === 0;

  return (
    <div
      ref={containerRef}
      {...containerHandlers}
      className={`relative rounded-lg border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-sm ${
        hasAdvanced ? "" : "hero-system-intro"
      }`}
    >
      {/* Registration marks — drawing-board corners. */}
      <span aria-hidden="true" className="absolute -left-2 -top-2 h-3 w-3 border-l border-t border-white/25" />
      <span aria-hidden="true" className="absolute -right-2 -top-2 h-3 w-3 border-r border-t border-white/25" />
      <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-3 w-3 border-b border-l border-white/25" />
      <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-white/25" />

      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-5">
        <p className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          <span aria-hidden="true" className="h-px w-3 bg-[var(--color-primary)]" />
          Connected Growth System
        </p>
        <p aria-hidden="true" className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-[var(--text-tertiary)]">
          <span className="text-white/80">{pad(activeIndex + 1)}</span> / {pad(STAGES.length)}
        </p>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative px-2 py-4 sm:px-3">
          <div className="relative" style={{ height: RAIL_HEIGHT }}>
            {/* Base rail */}
            <span
              aria-hidden="true"
              className="hero-draw-y absolute w-px bg-white/12"
              style={{ left: NODE_X, top: ROW / 2, height: RAIL_HEIGHT - ROW, animationDelay: "850ms" }}
            />
            {/* Feedback loop: Optimization back into Marketing */}
            <svg
              aria-hidden="true"
              className="absolute left-0 top-0 overflow-visible"
              width={NODE_X}
              height={RAIL_HEIGHT}
              fill="none"
            >
              <path
                d={`M ${NODE_X - 6} ${RAIL_HEIGHT - ROW / 2} H 8 V ${ROW / 2} H ${NODE_X - 6}`}
                className="stroke-white/15"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <path
                d={`M ${NODE_X - 6} ${RAIL_HEIGHT - ROW / 2} H 8 V ${ROW / 2} H ${NODE_X - 6}`}
                className="stroke-[var(--color-primary)] transition-opacity duration-500 ease-out"
                strokeWidth="1"
                style={{ opacity: loopActive ? 0.9 : 0 }}
              />
            </svg>
            {/* Signal: the one segment leading into the active node, redrawn
                (via key) on every change so it reads as travelling into the
                new state. At the wrap the loop above carries it instead. */}
            {activeIndex > 0 ? (
              <span
                key={activeIndex}
                aria-hidden="true"
                className="hero-signal-draw absolute w-[2px] bg-[var(--color-primary)]"
                style={{ left: NODE_X - 0.5, top: ROW / 2 + (activeIndex - 1) * ROW, height: ROW }}
              />
            ) : null}

            <ol aria-label="NairobiX growth system stages" className="relative">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={stage.label}>
                    <button
                      type="button"
                      onClick={() => select(index)}
                      onMouseEnter={() => select(index)}
                      onFocus={() => select(index)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-center gap-3 rounded-md pr-3 text-left transition-colors duration-300 focus-visible:outline-offset-[-2px] ${
                        isActive ? "bg-white/[0.035]" : "hover:bg-white/[0.02]"
                      }`}
                      style={{ height: ROW, paddingLeft: NODE_X - 6 }}
                    >
                      <span className="relative flex h-3 w-3 flex-none items-center justify-center">
                        <span
                          className={`h-[9px] w-[9px] rounded-full border bg-[#0a0a0c] transition-colors duration-300 ${
                            isActive ? "border-[var(--color-primary)]" : "border-white/25 group-hover:border-white/50"
                          }`}
                        />
                        {isActive ? (
                          <span className="hero-node-on absolute h-[9px] w-[9px] rounded-full bg-[var(--color-primary)] shadow-[0_0_0_4px_rgba(249,115,22,0.14)]" />
                        ) : null}
                      </span>
                      <span className="w-5 flex-none font-mono text-[10px] text-[var(--text-tertiary)] lg:hidden xl:inline">
                        {pad(index + 1)}
                      </span>
                      <span
                        className={`truncate text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 lg:tracking-[0.14em] xl:tracking-[0.18em] ${
                          isActive ? "text-white" : "text-white/45 group-hover:text-white/80"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Every stage's detail is stacked in one grid cell so the pane is
            always as tall as its longest entry — autoplay never shifts the
            layout around it. Not a live region: announcing every 3.5s
            autoplay step would talk over the rest of the page. */}
        <div className="grid border-t border-white/10 sm:border-l sm:border-t-0">
          {STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            const following = STAGES[(index + 1) % STAGES.length];
            return (
              <div
                key={stage.label}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 flex flex-col p-5 transition-[opacity,visibility,transform] ease-out sm:p-6 ${
                  isActive
                    ? "visible translate-y-0 opacity-100 delay-150 duration-300"
                    : "invisible translate-y-1 opacity-0 duration-200"
                }`}
              >
                <p className="font-display text-2xl font-medium tracking-tight text-white">{stage.label}</p>
                <p className="mt-3 text-[15px] leading-6 text-[var(--text-secondary)]">{stage.detail}</p>
                <ul className="mt-6 flex flex-wrap gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {stage.meta.map((item, metaIndex) => (
                    <li key={item} className={metaIndex > 0 ? "ml-3 border-l border-white/15 pl-3" : ""}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  Next
                  <span aria-hidden="true">→</span>
                  <span className="text-white/80">{following.label}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="flex items-center gap-5 border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] sm:px-5"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span className="h-[2px] w-4 bg-[var(--color-primary)]" />
          Signal
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-4 border-t border-dashed border-white/30" />
          Feedback loop
        </span>
      </div>
    </div>
  );
}
