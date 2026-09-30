import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // The dev-only route indicator defaults to a black "N" badge bottom-left,
  // which reads as a second control next to Nia during review. Compile and
  // runtime errors still surface with it hidden.
  devIndicators: false,
  // The first Insights library was replaced by a smaller set of long-form
  // articles. Each retired URL points to the article that now covers its
  // subject, so existing links and search results keep working.
  async redirects() {
    return [
      ["how-to-stop-losing-leads-through-whatsapp", "whatsapp-is-not-a-crm"],
      ["zoho-crm-implementation-kenyan-businesses", "crm-vs-spreadsheet-vs-whatsapp"],
      ["automate-lead-follow-up-without-losing-personal-touch", "what-to-automate-first"],
      ["practical-ai-automation-kenyan-smes", "ai-in-a-small-business"],
      ["nairobi-businesses-outgrowing-referral-only-growth", "marketing-sales-crm-one-system"],
    ]
      .map(([from, to]) => ({ source: `/insights/${from}`, destination: `/insights/${to}`, permanent: true }))
      .concat(
        // The first three industry scenarios were replaced by fuller concept
        // case studies; each old URL points to the case covering its industry.
        [
          ["patient-growth-experience-system", "clinic-ai-assisted-front-desk"],
          ["lead-generation-sales-system", "real-estate-lead-to-sales-system"],
          ["customer-acquisition-retention-system", "venue-enquiry-to-event-automation"],
        ].map(([from, to]) => ({ source: `/case-studies/${from}`, destination: `/case-studies/${to}`, permanent: true })),
      );
  },
};

export default nextConfig;
