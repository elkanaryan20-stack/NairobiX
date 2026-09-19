import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { signProposalToken } from "@/lib/proposal-token";
import { getProposalLink, getZohoDeal, getZohoDealRawFields } from "@/lib/zoho";
import { SITE_URL } from "@/lib/seo";

// TEMPORARY — candidate API names for the two custom fields referenced by
// the Proposal Delivery email, tried individually (not in one request) so a
// wrong guess can't take down the whole diagnostic. Revert once confirmed.
const FIELD_NAME_CANDIDATES: Record<string, string[]> = {
  accountName: ["Account_Name"],
  desiredOutcomes: ["Desired_Outcomes", "Desired_Outcome", "Growth_Objective"],
  solutionFamily: ["Solution_Family", "Recommended_Solution", "Solution_Type"],
};

async function probeFieldNames(dealId: string) {
  const results: Record<string, Array<{ field: string; value: unknown; ok: boolean; error?: string }>> = {};

  for (const [label, candidates] of Object.entries(FIELD_NAME_CANDIDATES)) {
    results[label] = [];
    for (const field of candidates) {
      const result = await getZohoDealRawFields(dealId, [field]);
      results[label].push(
        result.ok
          ? { field, value: result.data[field] ?? null, ok: true }
          : { field, value: null, ok: false, error: result.error }
      );
    }
  }

  return results;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAuthorized(request: Request): boolean {
  const configuredSecret = process.env.PROPOSAL_LINKS_INTERNAL_SECRET;
  if (!configuredSecret) return false;

  const providedSecret = request.headers.get("x-internal-secret") ?? "";
  const provided = Buffer.from(providedSecret);
  const expected = Buffer.from(configuredSecret);

  return provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
}

/**
 * Internal-only endpoint: given a Deal ID, signs and returns the three
 * proposal response URLs plus the deal's existing proposal link. Not linked
 * from anywhere public — called by a human via generate-proposal-links.sh
 * today, and usable later by a Zoho workflow/custom function (invokeurl)
 * to automate sending the Proposal Delivery email without further code
 * changes. Guarded by a shared secret rather than the CRM OAuth session
 * since it may be called from outside a browser context.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const json = await request.json();

    if (!isRecord(json)) {
      return NextResponse.json({ error: "A dealId is required." }, { status: 400 });
    }

    const dealId = sanitizeString(json.dealId);
    const baseUrl = sanitizeString(json.baseUrl) || SITE_URL;

    if (!dealId) {
      return NextResponse.json({ error: "A dealId is required." }, { status: 400 });
    }

    const dealResult = await getZohoDeal(dealId);

    if (!dealResult.ok) {
      return NextResponse.json(
        { error: dealResult.notFound ? "Deal not found." : "Couldn't reach the CRM." },
        { status: dealResult.notFound ? 404 : 502 }
      );
    }

    const token = signProposalToken(dealId);
    const respondUrl = `${baseUrl.replace(/\/$/, "")}/proposal/respond?token=${encodeURIComponent(token)}`;
    const fieldNameProbe = await probeFieldNames(dealId);

    return NextResponse.json({
      dealId,
      proposalUrl: getProposalLink(dealResult.data) ?? null,
      proceedUrl: `${respondUrl}&action=proceed`,
      discussUrl: `${respondUrl}&action=discuss`,
      changesUrl: `${respondUrl}&action=changes`,
      // TEMPORARY diagnostic — not sensitive (Deal Stage/Next Step/custom
      // field values, not credentials). Revert once the Deluge function's
      // field names are confirmed (see conversation around 2026-09-19/20).
      debug: {
        stage: dealResult.data.Stage ?? null,
        stageCharCodes:
          typeof dealResult.data.Stage === "string"
            ? Array.from(dealResult.data.Stage).map((c) => c.charCodeAt(0))
            : null,
        stageMatches: dealResult.data.Stage === "Proposal/Price Quote",
        nextStep: dealResult.data.Next_Step ?? null,
        fieldNameProbe,
      },
    });
  } catch (error) {
    console.error("Proposal link generation route error", error);
    return NextResponse.json({ error: "Couldn't generate proposal links." }, { status: 500 });
  }
}
