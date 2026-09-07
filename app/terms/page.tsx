import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalDocument, type LegalSection } from "@/components/ui/LegalDocument";
import { CONTACT_EMAIL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of the NairobiX website, the Business Growth Assessment, consultations, Nia and engagement with NairobiX services.",
};

const LAST_UPDATED = "7 September 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: [
      {
        p: "These Terms of Service (\"Terms\") govern your access to and use of the NairobiX website, the Business Growth Assessment, consultation bookings, Nia (our AI assistant), and related content and functionality (together, the \"Website\"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.",
      },
      {
        p: "These Terms apply to your use of the Website itself. They do not, on their own, constitute a service agreement — specific client engagements are governed by a separate agreement or Statement of Work, as described below.",
      },
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    body: [
      {
        p: "You may use the Website for lawful purposes connected to evaluating or engaging NairobiX's services. You agree not to:",
      },
      {
        ul: [
          "Use the Website in any way that violates applicable law",
          "Submit false, misleading or fraudulent information through any form, booking flow, or conversation with Nia",
          "Attempt to interfere with, disrupt, or gain unauthorized access to the Website, Nia, or the systems behind them (including Zoho CRM, Zoho Bookings, or Anthropic's API)",
          "Scrape, copy, or reproduce the Website's content for a purpose other than your own evaluation of NairobiX's services",
          "Use the Website, forms, or Nia to send unsolicited commercial communications or spam",
        ],
      },
    ],
  },
  {
    id: "services",
    title: "NairobiX services",
    body: [
      {
        p: "NairobiX is a business growth partner that brings together digital marketing, CRM and sales systems, business automation, AI implementation, web and digital solutions, and growth strategy as a connected body of work, as described on the Website. The specific scope, deliverables and terms of any engagement are set out in a separate proposal, agreement or Statement of Work (\"SOW\"), not in these Terms.",
      },
    ],
  },
  {
    id: "growth-assessment",
    title: "Business Growth Assessment",
    body: [
      {
        p: "The Business Growth Assessment is a free, structured review of your business's acquisition, sales process and operational systems, used to identify priorities and a practical next step.",
      },
      {
        p: "Submitting a Business Growth Assessment does not create a client relationship, does not guarantee that NairobiX will accept your business as a client, does not guarantee a Free Growth Trial or any other offer, and does not guarantee any particular business outcome. NairobiX reviews each submission and follows up at its discretion.",
      },
    ],
  },
  {
    id: "growth-trial",
    title: "Free Growth Trial",
    body: [
      {
        p: "Where offered, the 7-Day Growth Trial consists of a Business Growth Audit, a Growth Action Plan, and a 7-Day Meta ad campaign. Any advertising spend for the Meta ad campaign is paid directly by you to Meta; NairobiX does not charge for or mark up that ad spend.",
      },
      {
        p: "Eligibility for, and availability of, the Free Growth Trial is determined by NairobiX at its discretion and is not guaranteed by submitting a Business Growth Assessment, contacting NairobiX, or using Nia. No pricing, discount, or outcome beyond what is described here is offered or implied as part of the trial unless separately confirmed in writing.",
      },
    ],
  },
  {
    id: "consultations",
    title: "Consultations",
    body: [
      {
        p: "NairobiX offers a free 30-minute Business Growth Consultation, booked through Zoho Bookings via the Website or through Nia. This is a working conversation to understand your business and identify potential next steps — it is not a sales pitch and not a guarantee of any subsequent engagement, proposal, or business outcome. Consultation slots are subject to availability and may be rescheduled or cancelled by either party.",
      },
    ],
  },
  {
    id: "client-engagements",
    title: "Client engagements",
    body: [
      {
        p: "No client relationship, service agreement, or obligation on NairobiX's part arises from browsing the Website, submitting a Business Growth Assessment, requesting a solution, applying as a partner, booking a consultation, or chatting with Nia. A client engagement begins only once NairobiX and the client have agreed on scope and terms in a separate written proposal, agreement or SOW.",
      },
    ],
  },
  {
    id: "proposals-and-agreements",
    title: "Proposals, SOWs and separate agreements",
    body: [
      {
        p: "Where NairobiX and a client proceed with an engagement, the specific project scope, deliverables, timelines, fees and other commercial or legal obligations are set out in a proposal, agreement, and/or Statement of Work agreed between NairobiX and the client. Where any conflict arises between these Terms and a signed client agreement or SOW, the signed agreement or SOW governs for that engagement.",
      },
    ],
  },
  {
    id: "fees-and-payment",
    title: "Fees and payment",
    body: [
      {
        p: "The Website does not display fixed pricing for NairobiX's services, beyond making clear that the Business Growth Assessment and the standard Business Growth Consultation are free, and that any Meta advertising spend under the Free Growth Trial is paid directly to Meta by the client. Fees for any engagement are agreed separately in the applicable proposal, agreement or SOW before work begins.",
      },
    ],
  },
  {
    id: "third-party-platforms",
    title: "Third-party platforms",
    body: [
      {
        p: "The Website and Nia rely on third-party platforms, including Zoho CRM and Zoho Bookings (Zoho Corporation), Anthropic's Claude API (Nia), Google Analytics (Google LLC), and — for the Free Growth Trial — Meta's advertising platform. Your use of these platforms indirectly through the Website is also subject to those providers' own terms of service. NairobiX is not responsible for outages, errors, or changes in these third-party platforms that are outside its control.",
      },
    ],
  },
  {
    id: "nia-ai",
    title: "Nia / AI",
    body: [
      {
        p: "Nia is an AI assistant built on Anthropic's Claude models, provided for informational and convenience purposes to help you learn about NairobiX and, where you choose, submit an enquiry or booking. Nia's responses:",
      },
      {
        ul: [
          "May occasionally be inaccurate or incomplete, and should not be relied upon as professional, financial, or legal advice",
          "Do not constitute a binding offer, quote, guarantee, or commitment by NairobiX unless separately confirmed in writing by a member of the NairobiX team",
          "Will only result in a submission to NairobiX's CRM or booking system after you have explicitly confirmed, in your own words, that you want that action taken",
        ],
      },
    ],
  },
  {
    id: "user-responsibilities",
    title: "User responsibilities",
    body: [
      {
        p: "You are responsible for the accuracy of the information you provide to NairobiX through any form, the booking flow, or Nia. You agree to provide truthful, accurate and complete information and to update it as necessary.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      {
        p: "The Website — including its design, text, graphics, layout, branding, the \"NairobiX\" name and logo, and underlying code — is owned by NairobiX or its licensors and is protected by applicable intellectual property laws. You may view and use the Website for your own evaluation of NairobiX's services. You may not copy, reproduce, republish, or create derivative works from the Website's content or branding without NairobiX's prior written permission.",
      },
    ],
  },
  {
    id: "client-materials",
    title: "Client-provided materials",
    body: [
      {
        p: "Any materials, information, brand assets, or content a client provides to NairobiX in connection with an engagement remain the client's property. NairobiX uses such materials only to deliver the agreed engagement, and any further terms regarding their use are set out in the applicable agreement or SOW.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: [
      {
        p: "NairobiX and its clients are expected to treat non-public business information shared in the course of an engagement as confidential and to use it only for the purposes of that engagement. Formal confidentiality obligations — including their scope and duration — are set out in the applicable client agreement, SOW, or a separate non-disclosure agreement where one is signed.",
      },
    ],
  },
  {
    id: "results-disclaimer",
    title: "Business-results disclaimer",
    body: [
      {
        p: "NairobiX does not guarantee specific business results, including but not limited to leads, sales, revenue, traffic, search rankings, conversion rates, or return on investment. Growth and marketing outcomes depend on many factors outside NairobiX's control, including market conditions, competitor activity, and decisions made by the client. Any figures, examples, or case studies referenced on the Website are illustrative and not a promise of similar results.",
      },
    ],
  },
  {
    id: "availability",
    title: "Service availability",
    body: [
      {
        p: "NairobiX does not guarantee that the Website, Nia, the booking system, or any related functionality will be available at all times or free of errors or interruptions. We may modify, suspend, or discontinue any part of the Website or its functionality at any time, with or without notice.",
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      {
        p: "To the fullest extent permitted by applicable law, NairobiX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunity, arising out of or relating to your use of the Website, Nia, or any third-party platform integrated with them, even if NairobiX has been advised of the possibility of such damages. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable Kenyan law.",
      },
    ],
  },
  {
    id: "termination",
    title: "Termination",
    body: [
      {
        p: "NairobiX may suspend or restrict your access to the Website, forms, booking system, or Nia at its discretion, including where we reasonably believe these Terms have been violated or the Website is being misused. Termination or suspension of an active client engagement is governed by the applicable client agreement or SOW, not by these Terms.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: [
      {
        p: "NairobiX may update these Terms from time to time to reflect changes in our services, business practices, or applicable law. Changes take effect once posted on this page, and the \"Last updated\" date above reflects the most recent revision. Continued use of the Website after changes are posted constitutes acceptance of the updated Terms.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: [
      {
        p: "These Terms are governed by the laws of Kenya. Any dispute arising out of or relating to these Terms or your use of the Website is subject to the exclusive jurisdiction of the courts of Kenya, without prejudice to any dispute resolution mechanism agreed in a separate client agreement or SOW.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact information",
    body: [
      { p: `Questions about these Terms can be directed to ${CONTACT_EMAIL}.` },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <LegalDocument
          eyebrow="NAIROBIX · TERMS"
          title="Terms of Service"
          lastUpdated={LAST_UPDATED}
          intro={
            <p>
              These Terms of Service govern your use of the NairobiX website, the Business Growth
              Assessment, consultation bookings, Nia (our AI assistant), and related functionality. Please
              read them alongside our{" "}
              <a href="/privacy" className="font-semibold text-white hover:text-[var(--color-primary)]">
                Privacy Policy
              </a>
              . Specific project scope, pricing, deliverables and commercial obligations are governed by
              the applicable client agreement or Statement of Work, not by these Terms.
            </p>
          }
          sections={SECTIONS}
        />
      </main>
      <SiteFooter />
    </>
  );
}
