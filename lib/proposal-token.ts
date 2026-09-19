import crypto from "node:crypto";

// Proposal response links stay valid for 30 days — long enough for a client
// to open the email and decide without an admin having to regenerate links,
// short enough that a stale forwarded email eventually stops working.
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30;

type ProposalTokenPayload = {
  dealId: string;
  expiresAt: number;
};

function getSecret(): string {
  const secret = process.env.PROPOSAL_RESPONSE_SECRET;
  if (!secret) {
    throw new Error("PROPOSAL_RESPONSE_SECRET is not configured.");
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest().toString("base64url");
}

/**
 * Builds a self-contained, stateless response token for a Deal — no server
 * side store needed. One token covers all three response actions; the email
 * links differ only in the `action` query param, since the CRM Deal ID isn't
 * secret on its own, only forgeable/mutable without this signature.
 */
export function signProposalToken(dealId: string, ttlSeconds: number = DEFAULT_TTL_SECONDS): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload: ProposalTokenPayload = { dealId, expiresAt };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export type ProposalTokenVerification =
  | { valid: true; dealId: string }
  | { valid: false; reason: "malformed" | "invalid_signature" | "expired" };

export function verifyProposalToken(token: string): ProposalTokenVerification {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return { valid: false, reason: "malformed" };
  }

  const [encodedPayload, signature] = parts;

  let expectedSignature: string;
  try {
    expectedSignature = sign(encodedPayload);
  } catch {
    return { valid: false, reason: "malformed" };
  }

  const provided = Buffer.from(signature, "base64url");
  const expected = Buffer.from(expectedSignature, "base64url");

  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return { valid: false, reason: "invalid_signature" };
  }

  let payload: ProposalTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  } catch {
    return { valid: false, reason: "malformed" };
  }

  if (typeof payload.dealId !== "string" || !payload.dealId || typeof payload.expiresAt !== "number") {
    return { valid: false, reason: "malformed" };
  }

  if (Math.floor(Date.now() / 1000) > payload.expiresAt) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, dealId: payload.dealId };
}
