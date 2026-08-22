#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://127.0.0.1:3000"
API_ENDPOINT="$BASE_URL/api/leads"

# Timestamp for unique test records
TIMESTAMP=$(date +%s)

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  NAIROBIX CRM INTEGRATION TEST - ALL 4 FORMS                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}\n"

# Test 1: Contact Form (Already working - baseline)
echo -e "${YELLOW}[TEST 1] CONTACT FORM${NC}"
echo "Testing baseline Contact form (should be working)..."

CONTACT_PAYLOAD=$(cat <<'EOF'
{
  "formType": "contact",
  "First_Name": "Test",
  "Last_Name": "Contact",
  "Company": "Test Company",
  "Email": "contact@test-nairobix.com",
  "Phone": "+254 712 345 678",
  "Website": "https://testcontact.com",
  "Description": "Testing Contact form - this should work"
}
EOF
)

CONTACT_RESPONSE=$(curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$CONTACT_PAYLOAD")

echo -e "Response: $CONTACT_RESPONSE\n"
if echo "$CONTACT_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ CONTACT FORM PASSED${NC}\n"
  CONTACT_PASS=1
else
  echo -e "${RED}❌ CONTACT FORM FAILED${NC}\n"
  CONTACT_PASS=0
fi

# Test 2: Business Assessment Form
echo -e "${YELLOW}[TEST 2] BUSINESS ASSESSMENT FORM${NC}"
echo "Testing Business Assessment form with fixed Lead_Type..."

ASSESSMENT_PAYLOAD=$(cat <<'EOF'
{
  "formType": "business-growth-audit",
  "First_Name": "TestAssess",
  "Last_Name": "Business",
  "Company": "Assessment Test Co",
  "Email": "assessment@test-nairobix.com",
  "Phone": "+254 723 456 789",
  "Website": "https://testassessment.com",
  "City": "Nairobi",
  "Country": "Kenya",
  "Industry": "Retail & E-commerce",
  "Growth_Goal": "Generate more qualified leads",
  "Business_Challenge": "Need better lead generation strategy",
  "Current_Marketing_Channels": ["Facebook / Instagram", "Google Business Profile"],
  "Desired_Timeline": "Within 2–4 weeks",
  "Trial_Advertisement_Budget_Readiness": "Yes, we have budget"
}
EOF
)

echo "Payload being sent:"
echo "$ASSESSMENT_PAYLOAD" | jq '.' 2>/dev/null || echo "$ASSESSMENT_PAYLOAD"
echo ""

ASSESSMENT_RESPONSE=$(curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$ASSESSMENT_PAYLOAD")

echo -e "Response: $ASSESSMENT_RESPONSE\n"
if echo "$ASSESSMENT_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ BUSINESS ASSESSMENT FORM PASSED${NC}\n"
  ASSESSMENT_PASS=1
else
  echo -e "${RED}❌ BUSINESS ASSESSMENT FORM FAILED${NC}\n"
  ASSESSMENT_PASS=0
fi

# Test 3: Service Request Form
echo -e "${YELLOW}[TEST 3] SERVICE REQUEST FORM${NC}"
echo "Testing Service Request form with fixed Lead_Type..."

SERVICE_PAYLOAD=$(cat <<'EOF'
{
  "formType": "request-solution",
  "First_Name": "TestService",
  "Last_Name": "Request",
  "Company": "Service Request Test Co",
  "Email": "service@test-nairobix.com",
  "Phone": "+254 734 567 890",
  "Website": "https://testservice.com",
  "Solution_Needed": ["CRM", "Marketing Automation"],
  "Estimated_Investment": "KSh 50,000 - 100,000",
  "Description": "We need better customer relationship management and marketing automation",
  "Desired_Timeline": "Within 1–3 months"
}
EOF
)

echo "Payload being sent:"
echo "$SERVICE_PAYLOAD" | jq '.' 2>/dev/null || echo "$SERVICE_PAYLOAD"
echo ""

SERVICE_RESPONSE=$(curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$SERVICE_PAYLOAD")

echo -e "Response: $SERVICE_RESPONSE\n"
if echo "$SERVICE_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ SERVICE REQUEST FORM PASSED${NC}\n"
  SERVICE_PASS=1
else
  echo -e "${RED}❌ SERVICE REQUEST FORM FAILED${NC}\n"
  SERVICE_PASS=0
fi

# Test 4: Partner Application Form (Already working - baseline)
echo -e "${YELLOW}[TEST 4] PARTNER APPLICATION FORM${NC}"
echo "Testing Partner Application form (should be working)..."

PARTNER_PAYLOAD=$(cat <<'EOF'
{
  "formType": "partner",
  "First_Name": "TestPartner",
  "Last_Name": "Application",
  "Company": "Partner Test Agency",
  "Email": "partner@test-nairobix.com",
  "Phone": "+254 745 678 901",
  "Website": "https://testpartner.com",
  "City": "Nairobi",
  "Country": "Kenya",
  "Partner_Type": "Marketing Agency",
  "Partnership_Interest": ["Lead Generation", "Digital Marketing"],
  "Partnership_Motivation": "We want to partner with NairobiX to offer comprehensive solutions"
}
EOF
)

PARTNER_RESPONSE=$(curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$PARTNER_PAYLOAD")

echo -e "Response: $PARTNER_RESPONSE\n"
if echo "$PARTNER_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ PARTNER APPLICATION FORM PASSED${NC}\n"
  PARTNER_PASS=1
else
  echo -e "${RED}❌ PARTNER APPLICATION FORM FAILED${NC}\n"
  PARTNER_PASS=0
fi

# Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                      TEST SUMMARY                             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}\n"

TOTAL_PASS=$((CONTACT_PASS + ASSESSMENT_PASS + SERVICE_PASS + PARTNER_PASS))
TOTAL_TESTS=4

if [ $CONTACT_PASS -eq 1 ]; then
  echo -e "${GREEN}✅${NC} Contact Form: PASS"
else
  echo -e "${RED}❌${NC} Contact Form: FAIL"
fi

if [ $ASSESSMENT_PASS -eq 1 ]; then
  echo -e "${GREEN}✅${NC} Business Assessment: PASS"
else
  echo -e "${RED}❌${NC} Business Assessment: FAIL"
fi

if [ $SERVICE_PASS -eq 1 ]; then
  echo -e "${GREEN}✅${NC} Service Request: PASS"
else
  echo -e "${RED}❌${NC} Service Request: FAIL"
fi

if [ $PARTNER_PASS -eq 1 ]; then
  echo -e "${GREEN}✅${NC} Partner Application: PASS"
else
  echo -e "${RED}❌${NC} Partner Application: FAIL"
fi

echo ""
echo -e "Result: ${YELLOW}${TOTAL_PASS}/${TOTAL_TESTS} forms passed${NC}"

if [ $TOTAL_PASS -eq $TOTAL_TESTS ]; then
  echo -e "${GREEN}✅ ALL TESTS PASSED!${NC}"
  exit 0
else
  echo -e "${RED}❌ SOME TESTS FAILED${NC}"
  exit 1
fi
