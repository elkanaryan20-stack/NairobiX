"use client";

import { useState } from "react";
import type { SystemLayer } from "@/lib/case-studies";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

function LayerDetail({ layer }: { layer: SystemLayer }) {
  const rows = [
    ["Why it exists", layer.why],
    ["What moves through it", layer.carries],
    ["What happens next", layer.next],
  ];
  return (
    <dl className="space-y-5">
      {rows.map(([term, text]) => (
        <div key={term}>
          <dt className={`${MONO} text-white/45`}>{term}</dt>
          <dd className="mt-1.5 text-[15px] leading-7 text-white/85">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The system architecture as a connected stack. Every layer's name and
 * purpose is always visible; selecting one reveals why it exists, what moves
 * through it and what happens next — progressive disclosure that deepens
 * understanding without hiding the essentials.
 */
export function SystemExplorer({ layers }: { layers: SystemLayer[] }) {
  const [activeId, setActiveId] = useState(layers[0]?.id);
  const index = Math.max(0, layers.findIndex((l) => l.id === activeId));
  const active = layers[index];

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
      <ol className="relative">
        {layers.map((layer, i) => {
          const isActive = layer.id === active.id;
          return (
            <li key={layer.id} className="relative pl-10">
              {/* Connector to the next layer */}
              {i < layers.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`absolute left-[7px] top-8 bottom-0 w-px ${i < index ? "bg-[var(--color-primary)]/60" : "bg-white/15"}`}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[22px] h-[15px] w-[15px] rounded-full border transition-colors duration-300 ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : i < index
                      ? "border-[var(--color-primary)]/70 bg-[var(--section-bg)]"
                      : "border-white/35 bg-[var(--section-bg)]"
                }`}
              />
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`layer-detail layer-inline-${layer.id}`}
                onClick={() => setActiveId(layer.id)}
                className={`group w-full rounded-md border px-4 py-3.5 text-left transition-colors duration-200 ${
                  isActive ? "border-[var(--color-primary)]/50 bg-white/[0.04]" : "border-transparent hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <span className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline">
                  <span className={`${MONO} ${isActive ? "text-[var(--color-primary)]" : "text-white/40"}`}>{pad(i + 1)}</span>
                  <span className={`font-medium ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>{layer.name}</span>
                  <span className="col-start-2 mt-1 block text-sm leading-6 text-white/55">{layer.what}</span>
                </span>
              </button>
              {/* Small screens: the detail opens in place */}
              <div id={`layer-inline-${layer.id}`} hidden={!isActive} className="px-4 pb-6 pt-3 lg:hidden">
                <LayerDetail layer={layer} />
              </div>
            </li>
          );
        })}
      </ol>

      <div id="layer-detail" aria-live="polite" className="hidden lg:block">
        <div className="sticky top-24 border border-white/10 bg-black/30 p-8">
          <p className={`${MONO} text-[var(--color-primary)]`}>
            Layer {pad(index + 1)} of {pad(layers.length)}
          </p>
          <p className="mt-3 font-display text-3xl font-medium tracking-tight text-white">{active.name}</p>
          <p className="mt-3 text-[15px] leading-7 text-white/65">{active.what}</p>
          <div className="mt-7 border-t border-white/10 pt-7">
            <LayerDetail layer={active} />
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setActiveId(layers[index - 1]?.id)}
              className="text-sm text-white/70 hover:text-white disabled:cursor-default disabled:opacity-30"
            >
              ← Previous layer
            </button>
            <button
              type="button"
              disabled={index === layers.length - 1}
              onClick={() => setActiveId(layers[index + 1]?.id)}
              className="text-sm font-semibold text-white hover:text-[var(--color-primary)] disabled:cursor-default disabled:opacity-30"
            >
              Next layer →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
