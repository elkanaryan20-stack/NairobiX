#!/bin/bash

# Fetch recent Leads from Zoho CRM to verify our submissions
echo "Fetching Zoho CRM Leads to verify test records were created..."

# Read credentials from .env.local
export $(grep -v '^#' /workspaces/NairobiX/.env.local | xargs)

# Step 1: Get OAuth token
echo "Step 1: Requesting OAuth token..."
TOKEN_RESPONSE=$(curl -s -X POST "${ZOHO_ACCOUNTS_URL}/oauth/v2/token" \
  -H "Accept: application/json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token")

ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "Failed to get access token"
  echo "Response: $TOKEN_RESPONSE"
  exit 1
fi

echo "✅ Got access token: ${ACCESS_TOKEN:0:20}..."

# Step 2: Fetch recent leads with our test emails
echo ""
echo "Step 2: Fetching leads from Zoho CRM..."

LEADS_RESPONSE=$(curl -s -X GET "${ZOHO_API_URL}/crm/v2/Leads" \
  -H "Authorization: Zoho-oauthtoken ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json")

echo "Zoho API Response:"
echo "$LEADS_RESPONSE" | jq '.' 2>/dev/null || echo "$LEADS_RESPONSE"

echo ""
echo "Checking for test records..."

# Check for our test records
if echo "$LEADS_RESPONSE" | grep -q "TestAssess"; then
  echo "✅ Found Business Assessment test record"
else
  echo "❌ Business Assessment test record NOT found"
fi

if echo "$LEADS_RESPONSE" | grep -q "TestService"; then
  echo "✅ Found Service Request test record"
else
  echo "❌ Service Request test record NOT found"
fi

if echo "$LEADS_RESPONSE" | grep -q "Contact"; then
  echo "✅ Found Contact test record"
else
  echo "❌ Contact test record NOT found"
fi

if echo "$LEADS_RESPONSE" | grep -q "TestPartner"; then
  echo "✅ Found Partner Application test record"
else
  echo "❌ Partner Application test record NOT found"
fi

echo ""
echo "Checking Lead_Type values..."
echo "$LEADS_RESPONSE" | grep -o '"Lead_Type":"[^"]*"' | sort | uniq -c

echo ""
echo "Full API Response (last 100 lines):"
echo "$LEADS_RESPONSE" | tail -100
