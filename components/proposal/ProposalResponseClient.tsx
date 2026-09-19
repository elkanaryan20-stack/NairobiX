"use client";

import { useEffect, useRef, useState } from "react";
import { ProposalProcessing } from "@/components/proposal/ProposalProcessing";
import { ProposalConfirmation } from "@/components/proposal/ProposalConfirmation";
import { ProposalError } from "@/components/proposal/ProposalError";
import { trackConversion } from "@/lib/analytics";
import { wait, prefersReducedMotion } from "@/lib/motion";
import type { ProposalAction, ProposalErrorCode, ProposalResponseResult } from "@/lib/proposal-response";

const ANALYTICS_EVENT: Record<ProposalAction, string> = {
  proceed: "proposal_proceed",
  discuss: "proposal_discuss",
  changes: "proposal_changes_requested",
};

type ClientState = ProposalResponseResult | null;

/**
 * Orchestrates the response request against /api/proposal/respond. The
 * `requested` ref (not just state) guards the fetch itself — React Strict
 * Mode's dev double-invoke of effects must not fire two CRM-writing
 * requests, only re-render twice.
 */
export function ProposalResponseClient({ token, action }: { token: string; action: string }) {
  const [result, setResult] = useState<ClientState>(() =>
    token && action ? null : { status: "error", code: "invalid_token" }
  );
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current || !token || !action) return;
    requested.current = true;

    const reduceMotion = prefersReducedMotion();
    const minDisplayMs = reduceMotion ? 0 : 700;
    const start = Date.now();

    fetch("/api/proposal/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action }),
    })
      .then(async (response) => (await response.json()) as ProposalResponseResult)
      .catch(
        (): ProposalResponseResult => ({ status: "error", code: "crm_error" as ProposalErrorCode })
      )
      .then(async (payload) => {
        const elapsed = Date.now() - start;
        if (elapsed < minDisplayMs) {
          await wait(minDisplayMs - elapsed);
        }

        setResult(payload);

        if (payload.status === "success") {
          trackConversion(ANALYTICS_EVENT[payload.action], { form_type: "proposal_response" });
        }
      });
  }, [token, action]);

  if (!result) {
    return <ProposalProcessing />;
  }

  if (result.status === "error") {
    return <ProposalError code={result.code} />;
  }

  return <ProposalConfirmation action={result.action} isDuplicate={result.status === "duplicate"} />;
}
