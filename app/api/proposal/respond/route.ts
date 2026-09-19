import { NextResponse } from "next/server";
import { processProposalResponse, type ProposalErrorCode } from "@/lib/proposal-response";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const ERROR_STATUS: Record<ProposalErrorCode, number> = {
  invalid_token: 400,
  expired_token: 400,
  invalid_action: 400,
  deal_not_found: 404,
  wrong_stage: 409,
  missing_proposal_link: 409,
  crm_error: 502,
};

export async function POST(request: Request) {
  try {
    const json = await request.json();

    if (!isRecord(json)) {
      return NextResponse.json({ status: "error", code: "invalid_token" }, { status: 400 });
    }

    const token = sanitizeString(json.token);
    const action = sanitizeString(json.action);

    if (!token) {
      return NextResponse.json({ status: "error", code: "invalid_token" }, { status: 400 });
    }

    const result = await processProposalResponse(token, action);
    const status = result.status === "error" ? ERROR_STATUS[result.code] : 200;

    return NextResponse.json(result, { status });
  } catch (error) {
    console.error("Proposal response route error", error);
    return NextResponse.json({ status: "error", code: "crm_error" }, { status: 500 });
  }
}
