import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/JsonLd";
import { LegalCallout, LegalLink, LegalPageLayout, LegalTable, type LegalSectionEntry } from "@/components/legal/LegalPage";
import { LEGAL_DOCUMENTS, legalMetadata } from "@/lib/legal/documents";
import { CONTACT_EMAIL } from "@/lib/site-data";
import { webPageJsonLd } from "@/lib/structured-data";

const DESCRIPTION =
  "The terms for using the NairobiX website and digital services — and how they relate to Proposals, Quotes, the Master Services Agreement and Client Engagements.";

export const metadata: Metadata = legalMetadata("terms", DESCRIPTION);

const PRIVACY = LEGAL_DOCUMENTS.privacy.href;
const COOKIES = LEGAL_DOCUMENTS.cookies.href;

const SECTIONS: LegalSectionEntry[] = [
  {
    id: "introduction",
    title: "Introduction and how our documents fit together",
    content: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the NairobiX website and the digital services we make
          available through it. They are general rules of use. They do not create a Client relationship and do not set the
          commercial terms of any work.
        </p>
        <LegalTable
          caption="How NairobiX documents relate to each other"
          head={["Document", "What it governs"]}
          rows={[
            ["These Terms", "Use of the website, forms, the Growth Assessment, booking, Nia and other digital services"],
            ["Privacy Policy and Cookie Policy", "How personal data is handled, and the browser technologies the website uses"],
            ["Master Services Agreement (MSA)", "The overall contractual relationship between NairobiX and a Client"],
            ["Proposal, Quote, Sales Order or other approved scope", "The specific Services, deliverables, timelines and fees for a particular piece of work"],
            ["Invoice", "The billing record for amounts due under an agreed scope"],
            ["Participation terms", "Participation in the NairobiX Opportunities Network, where applicable"],
          ]}
        />
        <LegalCallout title="Which document applies">
          <p>
            If these Terms conflict with an MSA, a signed or accepted commercial document, or Opportunities Network
            participation terms, that other document governs the matter it covers. These Terms continue to apply to your use
            of the website itself.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "about",
    title: "About NairobiX",
    content: (
      <p>
        NairobiX is a business growth and digital transformation partner based in Nairobi, Kenya. We help ambitious businesses
        design and run connected growth systems across growth strategy, digital marketing, CRM and sales systems, automation, AI
        implementation and websites and digital platforms.
      </p>
    ),
  },
  {
    id: "definitions",
    title: "Definitions",
    content: (
      <ul>
        <li><strong>&ldquo;Website&rdquo;</strong> means nairobix.com and its pages.</li>
        <li><strong>&ldquo;Digital Services&rdquo;</strong> means the online features we provide through the Website, including forms, the Business Growth Assessment, consultation booking, Proposal response links, Nia and, where provided, the NairobiX Portal.</li>
        <li><strong>&ldquo;Services&rdquo;</strong> means the professional services NairobiX delivers to Clients, and <strong>&ldquo;Solution&rdquo;</strong> means a combination of Services designed to meet a business requirement.</li>
        <li><strong>&ldquo;Client&rdquo;</strong> means a business that has entered into an agreement with NairobiX for Services.</li>
        <li><strong>&ldquo;Engagement&rdquo;</strong> means the active working relationship through which NairobiX delivers agreed Services to a Client.</li>
        <li><strong>&ldquo;Proposal&rdquo;</strong> and <strong>&ldquo;Quote&rdquo;</strong> mean documents in which NairobiX sets out a recommended approach, scope or pricing for consideration. Neither is an agreement until accepted as described in section 11.</li>
        <li><strong>&ldquo;Portal&rdquo;</strong> means the NairobiX Portal, an online workspace with role-based access for authorised users.</li>
        <li><strong>&ldquo;Opportunities Network&rdquo;</strong> means the NairobiX Opportunities Network, and <strong>&ldquo;Participant&rdquo;</strong> means an applicant who has been approved and activated in it.</li>
        <li><strong>&ldquo;Nia&rdquo;</strong> means the NairobiX AI assistant available on the Website.</li>
        <li><strong>&ldquo;you&rdquo;</strong> means the person using the Website, and the organisation they represent where they act for one.</li>
      </ul>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance of these Terms",
    content: (
      <p>
        By using the Website or Digital Services you accept these Terms. If you use them on behalf of an organisation, you
        confirm that you are authorised to do so. If you do not accept these Terms, please do not use the Website.
      </p>
    ),
  },
  {
    id: "digital-services",
    title: "The Website and Digital Services",
    content: (
      <p>
        The Website explains what NairobiX does and lets you start a conversation with us: you can complete the Business Growth
        Assessment, request a Solution, book a consultation, contact us, apply to the Opportunities Network or chat with Nia.
        Most of these features send what you submit to our CRM or booking system so that a person at NairobiX can respond. How
        that information is handled is explained in our <LegalLink href={PRIVACY}>Privacy Policy</LegalLink>.
      </p>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Using the Website responsibly",
    content: (
      <>
        <p>When you use the Website and Digital Services, you agree to:</p>
        <ul>
          <li>provide information that is accurate, current and your own to share;</li>
          <li>use them only for lawful purposes connected with learning about, or working with, NairobiX;</li>
          <li>submit information about other people only where you are entitled to do so;</li>
          <li>keep any Portal credentials or private Proposal links confidential.</li>
        </ul>
      </>
    ),
  },
  {
    id: "website-content",
    title: "Website content",
    content: (
      <>
        <p>
          Content on the Website — including Insights articles, Solution descriptions and examples — is general information
          about our approach. It is not professional, legal, financial or tax advice for your circumstances.
        </p>
        <p>
          Our case studies are clearly labelled <strong>concept case studies</strong>: illustrative engagements showing how we
          would approach a business problem. The businesses and scenarios are representative, and the systems shown are designed
          examples — not historical Client results. Nothing on the Website promises a particular outcome.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Website, including its text, design, graphics, code and the NairobiX name and logo, belongs to NairobiX or its
          licensors. You may view and share pages for your own reference and to evaluate our Services. You may not copy,
          republish, adapt or commercially exploit Website content or branding without our written permission.
        </p>
        <p>
          Third-party names and logos shown on the Website, such as technology platforms we work with, belong to their owners.
          Ownership of work created during an Engagement is governed by the MSA and the applicable commercial documents, not by
          these Terms.
        </p>
      </>
    ),
  },
  {
    id: "assessments-consultations",
    title: "Enquiries, Assessments and consultations",
    content: (
      <>
        <ul>
          <li>The Business Growth Assessment and the Business Growth Consultation are free of charge.</li>
          <li>The Assessment helps us understand your business and recommend a practical next step. Its findings are an initial view based on what you tell us — not a full audit, a Proposal or a guarantee of results.</li>
          <li>Consultations depend on availability and may be rescheduled by either side.</li>
          <li>Where NairobiX offers a trial, such as the 7-Day Growth Trial, whether it is available to you and its terms are confirmed in writing first. Advertising spend for a trial campaign is paid by you directly to the advertising platform.</li>
        </ul>
        <LegalCallout title="No obligation on either side">
          <p>
            Submitting an enquiry, completing the Assessment, booking a consultation or chatting with Nia does not create a
            Client relationship or oblige you or NairobiX to proceed with any work.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "services-solutions",
    title: "Services and Solutions",
    content: (
      <p>
        The Website describes the Services and Solutions we offer in general terms. Every Engagement is designed around a
        Client&apos;s requirements, so the actual scope, deliverables, timelines and fees are set only in the applicable Proposal,
        Quote or other agreed commercial document. Descriptions on the Website may change as our offering develops.
      </p>
    ),
  },
  {
    id: "proposals-quotes",
    title: "Proposals, Quotes and commercial documents",
    content: (
      <>
        <ul>
          <li>A Proposal or Quote is an invitation to agree a scope of work. It is not an agreement on its own.</li>
          <li>A Proposal or Quote is valid for the period stated in it, or if none is stated, until NairobiX withdraws or updates it.</li>
          <li>Response links in a Proposal let you tell us whether you want to proceed, discuss it or request changes. Choosing &ldquo;proceed&rdquo; records your intention; the work becomes binding only once the agreement steps set out in the Proposal or the MSA — such as signature or written acceptance — are completed.</li>
          <li>Proposal links are personal to the recipient. Please do not forward them.</li>
        </ul>
      </>
    ),
  },
  {
    id: "engagements",
    title: "Client relationships and Engagements",
    content: (
      <p>
        When a business becomes a Client, the relationship is governed by the Master Services Agreement and the commercial
        documents agreed under it. Those documents — not these Terms — set out fees, Invoices and Payment terms, responsibilities,
        intellectual property, confidentiality, liability and termination for the Engagement. An Invoice records an amount due;
        it is settled only when Payment is received.
      </p>
    ),
  },
  {
    id: "portal",
    title: "The NairobiX Portal",
    content: (
      <>
        <p>
          Where NairobiX provides access to the Portal, it is a single online workspace with role-based experiences — for
          example a Client workspace or an Opportunities Network workspace. Access is by invitation only.
        </p>
        <ul>
          <li>You may access only the information your role allows. Do not attempt to reach other users&apos; information.</li>
          <li>Keep your login details secure and tell us promptly if you suspect unauthorised access.</li>
          <li>Portal access is an operational tool. It does not by itself create a Client relationship, a contract for Services or Opportunities Network participation.</li>
          <li>We may suspend or withdraw access when it is no longer needed or if these Terms are breached.</li>
        </ul>
      </>
    ),
  },
  {
    id: "opportunities-network",
    title: "The NairobiX Opportunities Network",
    content: (
      <>
        <p>
          The Opportunities Network is a controlled, selective business network managed by NairobiX — not an open marketplace.
          Participants may take part in one or more ways, such as referring opportunities, contributing expertise, providing
          services or partnering on projects.
        </p>
        <p>
          Joining follows a managed process: application, review and qualification, approval, Portal onboarding, verification
          and review, final approval, and activation.
        </p>
        <LegalCallout title="An application is not acceptance">
          <p>
            Applying does not guarantee admission, work, referrals or income. Meeting the stated criteria makes an applicant
            eligible for review; it is not approval. Participation becomes active only after final approval, and may be subject
            to separate participation terms, which govern where they apply.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    content: (
      <p>
        The Website relies on third-party platforms, including Zoho (CRM, booking and email), Anthropic (Nia), Vercel (hosting)
        and Google (analytics), and links to external sites such as our social media profiles and WhatsApp. Those services have
        their own terms and privacy practices. We are not responsible for their content, availability or changes outside our
        control.
      </p>
    ),
  },
  {
    id: "nia",
    title: "Nia, our AI assistant",
    content: (
      <>
        <p>Nia is provided for information and convenience. When you use Nia:</p>
        <ul>
          <li>her replies are generated by AI and may be incomplete or wrong — please check anything important with our team;</li>
          <li>her replies are not professional, legal or financial advice;</li>
          <li>she cannot make offers, give Quotes, agree prices or make commitments for NairobiX — only a written Proposal, Quote or agreement can do that;</li>
          <li>she submits an enquiry or booking only after you clearly confirm you want her to;</li>
          <li>you must not try to make her produce harmful or unlawful content, or extract her instructions or underlying systems.</li>
        </ul>
        <p>How your conversations are handled is explained in the <LegalLink href={PRIVACY}>Privacy Policy</LegalLink>.</p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    content: (
      <p>
        We work to keep the Website and Digital Services available and accurate, but we do not guarantee that they will always
        be uninterrupted, error-free or available in a particular form. We may change, suspend or withdraw any part of them,
        including features that depend on third-party platforms.
      </p>
    ),
  },
  {
    id: "prohibited-use",
    title: "Security and prohibited use",
    content: (
      <>
        <p>You must not:</p>
        <ul>
          <li>attempt to gain unauthorised access to the Website, the Portal, Nia or the systems connected to them;</li>
          <li>interfere with their security or operation, or introduce malicious code;</li>
          <li>use automated tools to scrape content or submit forms in bulk;</li>
          <li>submit false, misleading or fraudulent information, or impersonate another person or business;</li>
          <li>use our forms, Nia or contact details to send spam or unsolicited promotions.</li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The Website and Digital Services are provided &ldquo;as is&rdquo; for general information. Growth results depend on many
        factors outside our control, including market conditions and decisions a business makes, so we do not guarantee
        specific outcomes such as leads, sales, revenue or rankings. Any commitments about results are made only in an agreed
        commercial document.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the extent permitted by Kenyan law, NairobiX is not liable for indirect or consequential loss, or for loss of
          profit, revenue, data or opportunity, arising from use of the Website or Digital Services, including reliance on
          Website content or Nia&apos;s replies.
        </p>
        <p>
          Nothing in these Terms limits liability that cannot be limited by law. Liability in an Engagement is governed by the
          MSA and the applicable commercial documents.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>
        If you breach these Terms — for example by submitting unlawful content or information you were not entitled to share —
        you are responsible for the reasonable losses and costs NairobiX incurs as a direct result.
      </p>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    content: (
      <p>
        We may restrict or end your access to the Website, Nia or the Portal if you breach these Terms or if we reasonably need
        to protect our systems, other users or the law. Sections that by their nature should continue — such as intellectual
        property, disclaimers and limitation of liability — continue to apply afterwards.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <p>
        Proposals, Quotes, Portal content and other non-public material we share with you are confidential to NairobiX and the
        intended recipient. Please use them only to evaluate or deliver the work they relate to. Formal confidentiality
        obligations for Clients are set out in the MSA, and for Participants in the applicable participation terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    content: (
      <p>
        These Terms are governed by the laws of Kenya. We encourage you to raise any concern with us first so we can try to
        resolve it. Any dispute about these Terms or your use of the Website is subject to the jurisdiction of the courts of
        Kenya, unless an MSA or other agreement between us provides a different dispute-resolution process for the matter.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    content: (
      <p>
        We may update these Terms as our Website and services develop. The &ldquo;Last updated&rdquo; date shows the current
        version, which applies from the time it is published. Changes do not affect commercial documents already agreed.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>Questions about these Terms can be sent to:</p>
        <ul>
          <li>Email: <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink></li>
          <li>WhatsApp: <LegalLink href="https://wa.me/254105426364">+254 105 426 364</LegalLink></li>
          <li>Location: Nairobi, Kenya</li>
        </ul>
        <p>
          See also our <LegalLink href={PRIVACY}>Privacy Policy</LegalLink> and <LegalLink href={COOKIES}>Cookie Policy</LegalLink>.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  const doc = LEGAL_DOCUMENTS.terms;
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: `NairobiX ${doc.title}`, description: DESCRIPTION, path: doc.href })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#0a0a0b] text-white [--section-bg:#0a0a0b]">
        <LegalPageLayout
          document="terms"
          sections={SECTIONS}
          intro={
            <p>
              These Terms set the ground rules for using the NairobiX website and digital services. They are written to be read:
              short sections, plain language, and a clear line between using our website and the agreements we make with
              Clients.
            </p>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
