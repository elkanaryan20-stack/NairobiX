"use client";

import { useState } from "react";
import { ProblemFlow } from "@/components/solutions/ProblemFlow";
import { SystemFlow } from "@/components/solutions/SystemFlow";

type FlowNode = { label: string; detail: string };

/**
 * A triggered before/after transformation: the same business problem this
 * solution starts from, and the connected system it becomes — one toggle,
 * not two separate static sections read minutes apart.
 */
export function SystemTransformation({
  problemSteps,
  systemNodes,
}: {
  problemSteps: string[];
  systemNodes: FlowNode[];
}) {
  const [mode, setMode] = useState<"before" | "after">("before");

  return (
    <div>
      <div className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1" role="tablist" aria-label="Before and after this system">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "before"}
          onClick={() => setMode("before")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "before" ? "bg-white/10 text-white" : "text-[var(--text-secondary)] hover:text-white"
          }`}
        >
          Without a system
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "after"}
          onClick={() => setMode("after")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "after"
              ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
              : "text-[var(--text-secondary)] hover:text-white"
          }`}
        >
          With NairobiX →
        </button>
      </div>

      <div key={mode} className="animate-step-fade mt-8">
        {mode === "before" ? <ProblemFlow steps={problemSteps} /> : <SystemFlow nodes={systemNodes} />}
      </div>
    </div>
  );
}
