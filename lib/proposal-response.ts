import { verifyProposalToken } from "@/lib/proposal-token";
import {
  createZohoTask,
  findZohoDealTaskBySubject,
  getProposalLink,
  getZohoDeal,
  updateZohoDealFields,
} from "@/lib/zoho";

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
  taskSubject: string;
  taskDescription: string;
  priority: "High" | "Normal";
};

// Next Step values and Task subjects/descriptions are the operational record
// of the client's response — no new CRM field is created for this (see
// AGENTS brief section 21). Next Step also doubles as the idempotency marker
// below.
const ACTION_CONFIG: Record<ProposalAction, ActionConfig> = {
  proceed: {
    stage: "Negotiation/Review",
    nextStep: "Prepare Agreement",
    taskSubject: "Client Proceeded With Proposal",
    taskDescription:
      'The client selected "Proceed With Proposal" from the NairobiX Growth Proposal communication. This does not constitute a signed agreement — prepare the Agreement and continue the commercial process toward Verbal Agreement and Closed Won.',
    priority: "Normal",
  },
  discuss: {
    nextStep: "Discuss Proposal",
    taskSubject: "Discuss Proposal With Client",
    taskDescription:
      'The client selected "Discuss the Proposal" from the NairobiX Growth Proposal communication and would like to talk through it before deciding.',
    priority: "High",
  },
  changes: {
    nextStep: "Review Requested Changes",
    taskSubject: "Review Requested Proposal Changes",
    taskDescription:
      'The client selected "Request Changes" from the NairobiX Growth Proposal communication. Review their proposal and follow up with adjustments.',
    priority: "High",
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
 * Validates and processes a signed proposal response, per AGENTS brief
 * section 7's validation order and sections 8–10's per-action CRM effects.
 *
 * Idempotency has two layers so a retry after a partial failure self-heals
 * instead of silently dropping the Task or creating a duplicate one:
 *  1. Next Step already matching one of the three known values means a
 *     response was already fully recorded (cheap, no extra CRM reads).
 *  2. Even when Next Step doesn't match yet, the Deal's related Tasks are
 *     checked for the current action's exact Subject before creating one —
 *     covers the case where a prior attempt created the Task but the Next
 *     Step update that should have followed it failed.
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

  const taskExistsResult = await findZohoDealTaskBySubject(deal.id, config.taskSubject);
  const taskAlreadyExists = taskExistsResult.ok && taskExistsResult.data;

  if (!taskAlreadyExists) {
    const ownerId = typeof deal.Owner === "object" && deal.Owner ? deal.Owner.id : undefined;

    const taskResult = await createZohoTask({
      subject: config.taskSubject,
      description: `${config.taskDescription}\n\nResponse recorded: ${new Date().toISOString()}.`,
      dealId: deal.id,
      ownerId,
      priority: config.priority,
    });

    if (!taskResult.ok) {
      return { status: "error", code: "crm_error" };
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
