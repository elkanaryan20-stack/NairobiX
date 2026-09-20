import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { signProposalToken } from "@/lib/proposal-token";
import { buildProposalEmailHtml } from "@/lib/proposal-email";
import {
  createZohoTask,
  findZohoDealTaskBySubject,
  getProposalLink,
  getZohoContactEmail,
  getZohoDealForProposalEmail,
  sendZohoMail,
  type ZohoDeal,
} from "@/lib/zoho";
import { SITE_URL } from "@/lib/seo";

// Mirrors lib/proposal-response.ts's PROPOSAL_STAGE. Duplicated locally
// (not imported) so this route has zero footprint on the existing
// proposal-response architecture — see AGENTS brief.
const PROPOSAL_STAGE = "Proposal/Price Quote";

// The idempotency marker: a Task with this exact Subject on the Deal means
// a prior run (a Zoho webhook retry, or the workflow re-firing) already
// delivered this proposal — no new CRM field needed, same pattern
// lib/proposal-response.ts uses for response idempotency.
const SENT_TASK_SUBJECT = "Growth Proposal Sent";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAuthorized(request: Request): boolean {
  const configuredSecret = process.env.PROPOSAL_WEBHOOK_SECRET;
  if (!configuredSecret) return false;

  const providedSecret = request.headers.get("x-nairobix-webhook-secret") ?? "";
  const provided = Buffer.from(providedSecret);
  const expected = Buffer.from(configuredSecret);

  return provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
}

// Zoho CRM Workflow Webhooks can carry module parameters as a query string
// or as a request body depending on how the action is configured — accept
// either rather than assuming one.
async function extractDealId(request: Request): Promise<string> {
  const url = new URL(request.url);
  const fromQuery = sanitizeString(url.searchParams.get("dealId"));
  if (fromQuery) return fromQuery;

  const bodyText = await request.text().catch(() => "");
  if (!bodyText) return "";

  try {
    const json = JSON.parse(bodyText);
    if (isRecord(json)) {
      const fromJson = sanitizeString(json.dealId);
      if (fromJson) return fromJson;
    }
  } catch {
    // Not JSON — fall through to form-encoded parsing below.
  }

  return sanitizeString(new URLSearchParams(bodyText).get("dealId"));
}

// Desired_Outcomes/Solution_Family are multi-select picklists — they come
// back as an array even with one value selected.
function joinMultiSelect(value: unknown): string {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join(", ");
  }
  return typeof value === "string" ? value : "";
}

function getAccountName(deal: ZohoDeal): string {
  const account = deal.Account_Name;
  if (account && typeof account === "object" && "name" in account) {
    const name = (account as { name?: unknown }).name;
    return typeof name === "string" ? name : "";
  }
  return "";
}

/**
 * Internal-only endpoint: the target of the Zoho CRM "Proposal Sent"
 * Workflow Rule's Webhook action (CRM Plus doesn't expose Custom
 * Functions, so this replaces the originally-planned Deluge function).
 * Given a Deal ID, builds fresh signed response URLs, fetches the Deal's
 * proposal link and Contact email, and sends the Growth Proposal email via
 * the Zoho Mail API. Guarded by a shared secret header rather than the CRM
 * OAuth session since the caller is Zoho itself, not a browser.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const dealId = await extractDealId(request);

    if (!dealId) {
      return NextResponse.json({ error: "A dealId is required." }, { status: 400 });
    }

    const dealResult = await getZohoDealForProposalEmail(dealId);

    if (!dealResult.ok) {
      return NextResponse.json(
        { error: dealResult.notFound ? "Deal not found." : "Couldn't reach the CRM." },
        { status: dealResult.notFound ? 404 : 502 }
      );
    }

    const deal = dealResult.data;

    if (deal.Stage !== PROPOSAL_STAGE) {
      return NextResponse.json({ error: "Deal is not in Proposal/Price Quote." }, { status: 409 });
    }

    const proposalUrl = getProposalLink(deal);

    if (!proposalUrl) {
      return NextResponse.json({ error: "Deal has no Growth Proposal Link." }, { status: 409 });
    }

    const alreadySentResult = await findZohoDealTaskBySubject(dealId, SENT_TASK_SUBJECT);

    if (alreadySentResult.ok && alreadySentResult.data) {
      return NextResponse.json({ status: "duplicate", dealId });
    }

    const contactId =
      typeof deal.Contact_Name === "object" && deal.Contact_Name ? deal.Contact_Name.id : undefined;

    if (!contactId) {
      return NextResponse.json({ error: "Deal has no linked Contact." }, { status: 409 });
    }

    const emailResult = await getZohoContactEmail(contactId);

    if (!emailResult.ok || !emailResult.data) {
      return NextResponse.json(
        { error: emailResult.ok ? "Contact has no email address." : "Couldn't reach the CRM." },
        { status: emailResult.ok ? 409 : 502 }
      );
    }

    const token = signProposalToken(dealId);
    const respondUrl = `${SITE_URL}/proposal/respond?token=${encodeURIComponent(token)}`;

    const html = buildProposalEmailHtml({
      accountName: getAccountName(deal),
      desiredOutcomes: joinMultiSelect(deal.Desired_Outcomes),
      solutionFamily: joinMultiSelect(deal.Solution_Family),
      proposalUrl,
      proceedUrl: `${respondUrl}&action=proceed`,
      discussUrl: `${respondUrl}&action=discuss`,
      changesUrl: `${respondUrl}&action=changes`,
    });

    const sendResult = await sendZohoMail({
      to: emailResult.data,
      subject: "Your NairobiX Growth Proposal",
      html,
    });

    if (!sendResult.ok) {
      return NextResponse.json({ error: "Couldn't send the proposal email." }, { status: 502 });
    }

    const ownerId = typeof deal.Owner === "object" && deal.Owner ? deal.Owner.id : undefined;

    const taskResult = await createZohoTask({
      subject: SENT_TASK_SUBJECT,
      description: `The NairobiX Growth Proposal email was sent to ${emailResult.data}.\n\nSent: ${new Date().toISOString()}.`,
      dealId,
      ownerId,
      priority: "Normal",
    });

    if (!taskResult.ok) {
      // The email already went out — surface this as a logged failure
      // rather than reporting the whole request as failed. Known trade-off:
      // if the Task creation itself fails right after a successful send, a
      // later retry (Zoho retries webhooks that don't return 2xx, and the
      // workflow can re-fire) won't find the idempotency marker and will
      // resend. Accepted as a rare edge case given no new CRM field is
      // available to track "email sent but marker not yet written".
      console.error("Growth Proposal Sent task creation failed after a successful send", taskResult.error);
    }

    return NextResponse.json({ status: "sent", dealId });
  } catch (error) {
    console.error("Proposal send route error", error);
    return NextResponse.json({ error: "Couldn't send the proposal." }, { status: 500 });
  }
}
