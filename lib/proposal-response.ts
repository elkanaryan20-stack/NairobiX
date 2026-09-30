import { verifyProposalToken } from "@/lib/proposal-token";
import { getProposalLink, getZohoDeal, updateZohoDealFields } from "@/lib/zoho";

export const PROPOSAL_ACTIONS = ["proceed", "discuss", "request_changes"] as const;
export type ProposalAction = (typeof PROPOSAL_ACTIONS)[number];

function isProposalAction(value: unknown): value is ProposalAction {
  return typeof value === "string" && (PROPOSAL_ACTIONS as readonly string[]).includes(value);
}

// NairobiX's finalized Deal Stage pipeline — confirmed against the Deals
// module's actual Stage picklist metadata (do not rename/add/remove/
// substitute any of these; note none of the "X/Y" values have spaces around
// the slash, unlike their conversational/display names):
//   Qualification → Needs Analysis → Proposal/Price Quote →
//   Negotiation/Review → Verbal Agreement → Closed Won / Closed Lost
// A proposal response is only ever *accepted* while the Deal is in
// "Proposal/Price Quote" — but Stage is now also this handler's own
// idempotency marker (see below), so Negotiation/Review and Verbal
// Agreement are both stages it recognizes as "already responded to".
const PROPOSAL_STAGE = "Proposal/Price Quote";
const REVIEW_STAGE = "Negotiation/Review";
const AGREEMENT_STAGE = "Verbal Agreement";

type ActionConfig = { stage: string };

// Next Step is never read or written by this handler — the Deal's existing
// Next Step is preserved exactly as-is for every action. Stage is the only
// field this handler ever mutates, and (since discuss/request_changes both
// land on Negotiation/Review) it also doubles as the idempotency marker:
// once a Deal has moved off Proposal/Price Quote, further identical clicks
// no-op and a click that would move it backward is refused rather than
// applied. This handler does not create CRM Tasks — Zoho CRM workflows
// watch for these Deal states and create any internal Tasks separately.
const ACTION_CONFIG: Record<ProposalAction, ActionConfig> = {
  proceed: { stage: AGREEMENT_STAGE },
  discuss: { stage: REVIEW_STAGE },
  request_changes: { stage: REVIEW_STAGE },
};

export type ProposalErrorCode =
  | "invalid_token"
  | "expired_token"
  | "invalid_action"
  | "deal_not_found"
  | "wrong_stage"
  | "missing_proposal_link"
  | "crm_error";

export type ProposalResponseResult =
  | { status: "success"; action: ProposalAction }
  | { status: "duplicate"; action: ProposalAction }
  | { status: "error"; code: ProposalErrorCode };

/**
 * Validates and processes a signed proposal response: token validation,
 * Deal identification, action validation, and the Deal Stage update for the
 * given action. Never touches Next Step, never creates CRM Tasks — Zoho CRM
 * workflows detect the resulting Deal state and create any Task separately.
 *
 * Idempotency runs entirely off Stage (see ACTION_CONFIG's comment):
 *  - Verbal Agreement is treated as final for this flow — a later
 *    discuss/request_changes click is refused rather than moving the Deal
 *    backward to Negotiation/Review.
 *  - Negotiation/Review accepts a later "proceed" (real forward progress to
 *    Verbal Agreement), but a repeat discuss/request_changes click is a
 *    no-op duplicate.
 */
export async function processProposalResponse(
  token: string,
  actionParam: string
): Promise<ProposalResponseResult> {
  const verification = verifyProposalToken(token);

  if (!verification.valid) {
    return { status: "error", code: verification.reason === "expired" ? "expired_token" : "invalid_token" };
  }

  if (!isProposalAction(actionParam)) {
    return { status: "error", code: "invalid_action" };
  }

  const action = actionParam;

  const dealResult = await getZohoDeal(verification.dealId);

  if (!dealResult.ok) {
    return { status: "error", code: dealResult.notFound ? "deal_not_found" : "crm_error" };
  }

  const deal = dealResult.data;

  if (deal.Stage === AGREEMENT_STAGE) {
    // Already at the end state via an earlier "proceed" — never downgrade
    // back to Negotiation/Review for a later discuss/request_changes click.
    return { status: "duplicate", action: "proceed" };
  }

  if (deal.Stage === REVIEW_STAGE) {
    if (action === "proceed") {
      const updateResult = await updateZohoDealFields(deal.id, { Stage: AGREEMENT_STAGE });
      if (!updateResult.ok) {
        return { status: "error", code: "crm_error" };
      }
      return { status: "success", action: "proceed" };
    }

    // Already in review from an earlier discuss/request_changes click.
    return { status: "duplicate", action };
  }

  if (deal.Stage !== PROPOSAL_STAGE) {
    return { status: "error", code: "wrong_stage" };
  }

  if (!getProposalLink(deal)) {
    return { status: "error", code: "missing_proposal_link" };
  }

  const updateResult = await updateZohoDealFields(deal.id, { Stage: ACTION_CONFIG[action].stage });

  if (!updateResult.ok) {
    return { status: "error", code: "crm_error" };
  }

  return { status: "success", action };
}
