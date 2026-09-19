#!/bin/bash

# Generates the three signed Proposal Response links (Proceed / Discuss /
# Request Changes) plus the existing proposal link for a given Zoho Deal ID,
# by calling the internal-only POST /api/proposal/generate-links endpoint.
# Paste the results into the Proposal Delivery email's CTA buttons.
#
# Usage:
#   ./generate-proposal-links.sh <deal_id> [base_url]
#
# base_url defaults to the deployed site — pass a local dev server URL
# (e.g. http://localhost:3000) to test the response flow before it ships.
#
# Required in .env.local (same directory as this script):
#   PROPOSAL_LINKS_INTERNAL_SECRET

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.local"

DEAL_ID="$1"
BASE_URL="${2:-https://www.nairobix.com}"

if [ -z "$DEAL_ID" ]; then
  echo "Usage: $0 <deal_id> [base_url]"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ No .env.local found at $ENV_FILE"
  echo "Create one with PROPOSAL_LINKS_INTERNAL_SECRET first."
  exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

if [ -z "$PROPOSAL_LINKS_INTERNAL_SECRET" ]; then
  echo "❌ Missing PROPOSAL_LINKS_INTERNAL_SECRET in $ENV_FILE"
  exit 1
fi

echo "Requesting proposal response links for Deal $DEAL_ID from $BASE_URL..."
RESPONSE=$(curl -s -X POST "${BASE_URL}/api/proposal/generate-links" \
  -H "Content-Type: application/json" \
  -H "x-internal-secret: ${PROPOSAL_LINKS_INTERNAL_SECRET}" \
  -d "{\"dealId\":\"${DEAL_ID}\"}")

echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
