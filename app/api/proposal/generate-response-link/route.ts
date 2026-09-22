import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { signProposalToken } from "@/lib/proposal-token";
import { setProposalResponseLink } from "@/lib/zoho";
import { SITE_URL } from "@/lib/seo";

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

// Mirrors app/api/proposal/send/route.ts's extractDealId — Zoho CRM Workflow
// Webhooks can carry module parameters as a query string or as a request
// body depending on how the action is configured.
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

/**
 * Internal-only endpoint: the target of a Zoho CRM Workflow Rule's Webhook
 * action, fired when a Deal enters Proposal/Price Quote — before the native
 * "Growth Proposal — Delivery" Email Notification action sends. Given a
 * Deal ID, signs a proposal-response token (lib/proposal-token.ts, same
 * signing/verification used by /api/proposal/respond) and writes the
 * resulting URL onto Deal.Proposal_Response_Link so the native email's
 * merge field has a value to reference.
 *
 * Deliberately does not send email, touch Stage/Next Step, create Tasks, or
 * process a client response — those remain the response endpoint's
 * (lib/proposal-response.ts) and the native Zoho workflow's job
 * respectively. Guarded by the same shared secret as
 * app/api/proposal/send/route.ts, since the caller is Zoho itself.
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

    const token = signProposalToken(dealId);
    const responseLink = `${SITE_URL}/proposal/respond?token=${encodeURIComponent(token)}`;

    const updateResult = await setProposalResponseLink(dealId, responseLink);

    if (!updateResult.ok) {
      return NextResponse.json(
        { error: "Couldn't update the Deal's response link." },
        { status: 502 }
      );
    }

    return NextResponse.json({ status: "ok", dealId });
  } catch (error) {
    console.error("Proposal response-link generation route error", error);
    return NextResponse.json({ error: "Couldn't generate the response link." }, { status: 500 });
  }
}
