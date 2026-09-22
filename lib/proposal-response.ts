import { verifyProposalToken } from "@/lib/proposal-token";
import { getProposalLink, getZohoDeal, updateZohoDealFields } from "@/lib/zoho";

export const PROPOSAL_ACTIONS = ["proceed", "discuss", "changes"] as const;
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
// A proposal response is only ever accepted while the Deal is in
// "Proposal/Price Quote". "Agreement" is a commercial process that happens
// inside "Negotiation/Review" / "Verbal Agreement", not a Deal Stage of its
// own — this handler never sets Verbal Agreement or Closed Won.
const PROPOSAL_STAGE = "Proposal/Price Quote";

type ActionConfig = {
  /** Only "proceed" advances the Deal Stage — discuss/changes stay in Proposal/Price Quote. */
  stage?: string;
  nextStep: string;
};

// Next Step is the operational record of the client's response and also
// doubles as the idempotency marker below. This handler only identifies the
// Deal and updates its fields — it does not create CRM Tasks. Zoho CRM
// workflows watch for these Deal states and create any internal Tasks
// separately.
const ACTION_CONFIG: Record<ProposalAction, ActionConfig> = {
  proceed: {
    stage: "Negotiation/Review",
    nextStep: "Prepare Agreement",
  },
  discuss: {
    nextStep: "Discuss Proposal",
  },
  changes: {
    nextStep: "Review Requested Proposal Changes",
  },
};

function findRecordedAction(nextStep: string | undefined): ProposalAction | undefined {
  return (Object.entries(ACTION_CONFIG) as [ProposalAction, ActionConfig][]).find(
    ([, config]) => config.nextStep === nextStep
  )?.[0];
}

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
 * Deal identification, action validation, and the Deal Stage/Next Step
 * update for the given action. Does not create CRM Tasks — Zoho CRM
 * workflows detect the resulting Deal state and create any Task separately.
 *
 * Idempotency: Next Step already matching one of the three known values
 * means a response was already fully recorded, so no further update is
 * attempted.
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
  const config = ACTION_CONFIG[action];

  const dealResult = await getZohoDeal(verification.dealId);

  if (!dealResult.ok) {
    return { status: "error", code: dealResult.notFound ? "deal_not_found" : "crm_error" };
  }

  const deal = dealResult.data;
  const recordedAction = findRecordedAction(deal.Next_Step);

  if (recordedAction && recordedAction !== action) {
    // The client already responded with a different action on an earlier
    // visit — show that original confirmation rather than reprocessing.
    return { status: "duplicate", action: recordedAction };
  }

  // Only block on stage/link when nothing has been recorded yet. If Next
  // Step already reflects this action, the deal was clearly eligible when
  // that response was first recorded — re-blocking a self-healing retry
  // just because the deal has since moved on would strand it permanently.
  if (!recordedAction) {
    if (deal.Stage !== PROPOSAL_STAGE) {
      return { status: "error", code: "wrong_stage" };
    }

    if (!getProposalLink(deal)) {
      return { status: "error", code: "missing_proposal_link" };
    }
  }

  const needsStageUpdate = config.stage !== undefined && deal.Stage !== config.stage;
  const needsNextStepUpdate = deal.Next_Step !== config.nextStep;

  if (needsStageUpdate || needsNextStepUpdate) {
    const updateResult = await updateZohoDealFields(deal.id, {
      ...(needsNextStepUpdate ? { Next_Step: config.nextStep } : {}),
      ...(needsStageUpdate ? { Stage: config.stage } : {}),
    });

    if (!updateResult.ok) {
      return { status: "error", code: "crm_error" };
    }
  }

  return { status: recordedAction === action ? "duplicate" : "success", action };
}
