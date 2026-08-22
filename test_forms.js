const BASE_URL = "http://localhost:3001";

async function testForm(formType, payload) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Testing: ${formType}`);
  console.log(`${"=".repeat(60)}`);

  try {
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log(`Status: ${response.status}`);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log(`✅ SUCCESS: ${formType} submitted`);
      return true;
    } else {
      console.log(`❌ FAILED: ${formType}`);
      console.log("Error:", data.error);
      return false;
    }
  } catch (error) {
    console.error(`❌ EXCEPTION in ${formType}:`, error.message);
    return false;
  }
}

async function runTests() {
  const results = {
    contact: await testForm("Contact Form", {
      formType: "contact",
      First_Name: "Test",
      Last_Name: "Contact",
      Company: "QA Contact",
      Email: "test-contact@example.com",
      Phone: "+254700000111",
      Website: "https://contact.example.com",
      Description: "Testing contact form submission",
    }),

    businessGrowthAudit: await testForm("Business Growth Audit", {
      formType: "business-growth-audit",
      First_Name: "Test",
      Last_Name: "Audit",
      Company: "QA Audit Co",
      Industry: "Professional Services",
      Email: "test-audit@example.com",
      Phone: "+254700000222",
      Website: "https://audit.example.com",
      City: "Nairobi",
      Country: "Kenya",
      Growth_Goal: "Generate more qualified leads",
      Business_Challenge: "Need better lead generation systems",
      Current_Marketing_Channels: ["Facebook / Instagram", "Google Business Profile"],
      Desired_Timeline: "Within 1–3 months",
      Trial_Advertisement_Budget_Readiness: "Comfortable with recommended budget",
    }),

    requestSolution: await testForm("Request Solution", {
      formType: "request-solution",
      First_Name: "Test",
      Last_Name: "Solution",
      Company: "QA Solution Co",
      Email: "test-solution@example.com",
      Phone: "+254700000333",
      Website: "https://solution.example.com",
      Solution_Needed: ["Digital Marketing", "CRM & Sales Systems"],
      Estimated_Investment: "KSh 50,000 – 100,000",
      Description: "Need better CRM and marketing automation",
      Desired_Timeline: "Within 2–4 weeks",
    }),

    partner: await testForm("Partner Application", {
      formType: "partner",
      First_Name: "Test",
      Last_Name: "Partner",
      Company: "QA Partner Co",
      Email: "test-partner@example.com",
      Phone: "+254700000444",
      Website: "https://partner.example.com",
      City: "Nairobi",
      Country: "Kenya",
      Partner_Type: "Marketing Agency",
      Partnership_Interest: ["Refer Businesses to NairobiX", "Strategic Business Partnership"],
      Partnership_Motivation: "We want to refer our clients to NairobiX and create mutual value.",
    }),
  };

  console.log(`\n${"=".repeat(60)}`);
  console.log("SUMMARY");
  console.log(`${"=".repeat(60)}`);
  Object.entries(results).forEach(([form, success]) => {
    console.log(`${success ? "✅" : "❌"} ${form}`);
  });

  const allPassed = Object.values(results).every((r) => r);
  console.log(`\n${allPassed ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED"}`);
}

runTests().catch(console.error);
