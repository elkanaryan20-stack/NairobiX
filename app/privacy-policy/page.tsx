import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/JsonLd";
import { LegalCallout, LegalH3, LegalLink, LegalPageLayout, LegalTable, type LegalSectionEntry } from "@/components/legal/LegalPage";
import { LEGAL_DOCUMENTS, legalMetadata } from "@/lib/legal/documents";
import { CONTACT_EMAIL } from "@/lib/site-data";
import { TRACKING } from "@/lib/tracking-config";
import { webPageJsonLd } from "@/lib/structured-data";

const DESCRIPTION =
  "How NairobiX collects, uses, shares and protects personal information under Kenya's Data Protection Act, 2019 — across the website, forms, bookings, Nia and Client Engagements.";

export const metadata: Metadata = legalMetadata("privacy", DESCRIPTION);

const ODPC_URL = "https://www.odpc.go.ke/";
const COOKIES = LEGAL_DOCUMENTS.cookies.href;
const TERMS = LEGAL_DOCUMENTS.terms.href;
const ADS_ENABLED = Boolean(TRACKING.metaPixelId || TRACKING.googleAdsId);

const SECTIONS: LegalSectionEntry[] = [
  {
    id: "introduction",
    title: "Introduction and scope",
    content: (
      <>
        <p>
          This Privacy Policy explains how NairobiX handles personal data when you visit nairobix.com, use our forms, the
          Business Growth Assessment, consultation booking or Nia (our AI assistant), apply to the NairobiX Opportunities
          Network, respond to a Proposal, or work with us as a Client.
        </p>
        <p>
          It is written to meet the duty to inform you under section 29 of Kenya&apos;s{" "}
          <strong>Data Protection Act, 2019</strong> (the &ldquo;Act&rdquo;) and the regulations made under it. How cookies and
          similar browser technologies are used is covered in more detail in our <LegalLink href={COOKIES}>Cookie Policy</LegalLink>.
        </p>
        <p>
          &ldquo;Personal data&rdquo; means information that relates to an identified or identifiable person — for example your
          name, email address or phone number. Information that only describes a business, such as its industry or website, is
          not personal data on its own, but we treat it with the same care when it is linked to a named person.
        </p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "Who we are and our role",
    content: (
      <>
        <p>
          NairobiX is a business growth and digital transformation partner based in Nairobi, Kenya. We help businesses with
          growth strategy, digital marketing, CRM and sales systems, automation, AI implementation and websites and digital
          platforms.
        </p>
        <LegalH3>When NairobiX is the data controller</LegalH3>
        <p>
          For the website, our forms, bookings, Nia, Opportunities Network applications and our own relationships with
          prospective and existing Clients, NairobiX decides why and how your personal data is processed. In those cases we
          are the <strong>data controller</strong> under the Act and responsible for the processing described in this Policy.
        </p>
        <LegalH3>When we process data on behalf of a Client</LegalH3>
        <p>
          When we build or operate systems for a Client — for example configuring their CRM, running their campaigns or
          automating their customer communications — we may handle personal data about that Client&apos;s own customers and
          contacts. In that work the Client is normally the data controller and NairobiX acts as a{" "}
          <strong>data processor</strong>, following the Client&apos;s documented instructions under our agreement with them. If you
          are a customer of one of our Clients, please contact that business about how it uses your information.
        </p>
        <LegalH3>Our service providers</LegalH3>
        <p>
          We use established technology providers to run the website and our business systems. They process personal data on
          our behalf as our processors, or under their own terms where they act independently (see{" "}
          <a href="#business-systems" className="text-white underline decoration-white/25 underline-offset-4">section 08</a>).
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    content: (
      <>
        <p>We collect only what we need for the purpose you are using. Depending on how you interact with us, this may include:</p>
        <LegalTable
          caption="Categories of personal data NairobiX collects"
          head={["Category", "Examples", "When"]}
          rows={[
            ["Identity and contact", "First and last name, email address, phone or WhatsApp number", "Any form, booking, Nia request, Proposal or direct contact"],
            ["Business information", "Business name, industry, website, city, country", "Growth Assessment, forms, bookings, Network applications"],
            ["Enquiry details", "Your message, the topic or Solution you are interested in, desired timeline, investment readiness", "Contact and Request a Solution forms, Nia"],
            ["Growth Assessment answers", "Growth priorities, where your business is stuck, how customers find you, how enquiries are tracked and followed up", "Business Growth Assessment"],
            ["Consultation details", "Chosen date and time, focus area, what you would like to discuss", "Consultation booking (website or Nia)"],
            ["Opportunities Network application", "Organisation type, how you would like to participate, motivation", "Network application"],
            ["Proposal responses", "Whether you chose to proceed, discuss or request changes to a Proposal", "Response links in a NairobiX Proposal"],
            ["Nia conversations", "The messages you type to Nia", "When you chat with Nia"],
            ["Communications", "Emails and WhatsApp messages you exchange with us", "When you contact us or we reply"],
            ["Client Engagement information", "Contacts at the Client, scope and delivery records, Invoices and Payment records", "When you become a Client"],
            ["Technical and usage", "Pages viewed and general interaction events", "When you enable Analytics, as you browse the Website"],
            ["Campaign attribution", "The channel you arrived from, campaign tags in the link (such as utm_source), ad click IDs, landing page", "When you enable Marketing; sent with any form you submit"],
          ]}
        />
        <p>
          We do not ask for sensitive personal data — such as health information, ethnic origin, biometric data or financial
          account details — through the website. Please do not include it in free-text fields or conversations with Nia. The
          website does not take payments and does not collect card details.
        </p>
      </>
    ),
  },
  {
    id: "how-we-collect",
    title: "How we collect it",
    content: (
      <ul>
        <li><strong>Directly from you</strong> — when you complete a form, the Growth Assessment or a booking, apply to the Opportunities Network, respond to a Proposal, email or message us, or speak with us.</li>
        <li><strong>Through Nia</strong> — when you chat with Nia, and when you confirm that Nia should submit an enquiry or booking for you.</li>
        <li><strong>Automatically</strong> — through analytics and, where enabled, advertising measurement technologies described in the <LegalLink href={COOKIES}>Cookie Policy</LegalLink>.</li>
        <li><strong>During an Engagement</strong> — from you and your colleagues as we deliver agreed work.</li>
        <li><strong>From others</strong> — occasionally from a person who refers you to us, or from publicly available business sources such as your company website.</li>
      </ul>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use personal data",
    content: (
      <>
        <p>We use personal data to:</p>
        <ul>
          <li>respond to enquiries and follow up on requests you make;</li>
          <li>review your Growth Assessment and prepare the findings and next steps you asked for;</li>
          <li>arrange, confirm and hold consultations;</li>
          <li>assess, qualify and administer Opportunities Network applications and participation;</li>
          <li>prepare Proposals and Quotes and record your response to them;</li>
          <li>deliver Services and manage Client relationships and Engagements, including invoicing;</li>
          <li>operate and improve the website and Nia, and understand which pages and channels are useful;</li>
          {ADS_ENABLED ? <li>measure which of our advertising leads to enquiries and bookings;</li> : null}
          <li>keep our systems secure and prevent abuse;</li>
          <li>meet legal, tax, accounting and regulatory obligations, and establish or defend legal claims.</li>
        </ul>
        <LegalCallout title="No fully automated decisions">
          <p>
            We do not make decisions about you that produce legal or similarly significant effects using automated processing
            alone. Assessments, applications and Proposals are reviewed by people at NairobiX.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "lawful-bases",
    title: "Lawful bases for processing",
    content: (
      <>
        <p>Section 30 of the Act allows personal data to be processed only on specific grounds. We rely on the following:</p>
        <LegalTable
          caption="Lawful bases NairobiX relies on"
          head={["Activity", "Lawful basis under the Act"]}
          rows={[
            ["Responding to enquiries, Assessments, bookings and Nia requests you submit", "Your consent, given when you submit, and steps taken at your request before entering into a contract"],
            ["Reviewing Opportunities Network applications", "Steps taken at your request before entering into a participation arrangement"],
            ["Delivering Services and managing an Engagement", "Performance of a contract with the Client"],
            ["Website analytics and security", "Our legitimate interests in running a secure, useful website, balanced against your rights"],
            ...(ADS_ENABLED ? [["Advertising measurement", "Our legitimate interests in understanding which advertising works — you can opt out as described in the Cookie Policy"]] : []),
            ["Marketing messages", "Your consent, which you can withdraw at any time"],
            ["Tax, accounting and legal compliance", "Compliance with a legal obligation"],
          ]}
        />
        <p>
          Where we rely on consent, you can withdraw it at any time by contacting us. Withdrawal does not affect processing
          that took place before it.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing communications",
    content: (
      <p>
        The website does not sign you up to a mailing list. We send marketing messages — for example news about our Services or
        Insights — only where you have agreed to receive them, and every message tells you how to opt out at no cost. If you
        opt out, we stop using your personal data for direct marketing. Messages about an enquiry, booking, Proposal or
        Engagement you are involved in are not marketing and will continue while they are relevant.
      </p>
    ),
  },
  {
    id: "business-systems",
    title: "The business systems we use",
    content: (
      <>
        <p>NairobiX runs on the following technology. Each provider handles only the data needed for its part of the work:</p>
        <LegalTable
          caption="Technology providers that process personal data for NairobiX"
          head={["Provider", "What it does for NairobiX", "Data involved"]}
          rows={[
            ["Zoho CRM", "Our CRM: records enquiries, Assessments, applications, Proposals and Client relationships", "Contact, business, enquiry and Assessment details; campaign attribution"],
            ["Zoho Bookings", "Consultation scheduling and confirmations", "Contact details, chosen time, consultation topic"],
            ["Zoho Mail", "Email, including sending Proposals", "Email correspondence"],
            ["Anthropic (Claude API)", "Generates Nia's replies", "The messages you send to Nia"],
            ["Vercel", "Hosts the website and its server functions", "Technical data such as IP address and request logs"],
            ["Google Analytics", "Website usage measurement", "Usage and device data, pseudonymous identifiers"],
            ...(TRACKING.googleAdsId ? [["Google Ads", "Advertising measurement", "Conversion events; email and phone in hashed form where provided"]] : []),
            ...(TRACKING.metaPixelId ? [["Meta (Pixel and Conversions API)", "Advertising measurement", "Conversion events; email, phone and name in hashed form where provided"]] : []),
            ["WhatsApp (Meta)", "Messaging, if you choose to contact us on WhatsApp", "Your number and messages"],
          ]}
        />
        <p>
          We may change providers as our business evolves. We will update this Policy when a change affects how your personal
          data is handled in a meaningful way.
        </p>
      </>
    ),
  },
  {
    id: "nia",
    title: "Nia, our AI assistant",
    content: (
      <>
        <p>
          Nia is an AI assistant on the website that answers questions about NairobiX and, if you ask, helps you submit an
          enquiry or book a consultation. Nia runs on Anthropic&apos;s Claude models.
        </p>
        <ul>
          <li>The messages you send are passed to Anthropic to generate Nia&apos;s replies, and are processed under Anthropic&apos;s commercial terms.</li>
          <li>Your conversation is held in your browser while the page is open. NairobiX does not save chat transcripts to a database; refreshing or closing the page ends the conversation.</li>
          <li>Nia only submits information to our CRM or booking system after you clearly confirm that you want it to. What is submitted is handled exactly as if you had used the matching form.</li>
          <li>To prevent abuse, the number of messages from a network address is limited for a short period. This is held briefly in server memory and is not linked to your identity.</li>
          <li>People at NairobiX review anything Nia submits for you before acting on it.</li>
        </ul>
        <LegalCallout title="Please share only what is needed">
          <p>
            Nia can be wrong, and is not a source of professional, legal or financial advice. Do not share passwords, financial
            details or other sensitive information in a conversation.
          </p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    content: (
      <>
        <p>
          The website uses Google Analytics to understand how it is used when you enable Analytics{ADS_ENABLED ? ", and advertising measurement tags to see which campaigns lead to enquiries when you enable Marketing" : ""}.
          With Marketing consent, it also keeps a small attribution record in your browser so we know which channel brought you to us; this is sent with any form you submit and stored with your enquiry in our CRM. You can change these choices using Cookie preferences in the Website footer.
        </p>
        <p>
          We do not send your name, email or phone number to Google Analytics.
          {ADS_ENABLED ? " Where advertising measurement is enabled, any email or phone number shared with an advertising platform is hashed (turned into an irreversible code) first." : ""}{" "}
          If your browser sends a Global Privacy Control signal, advertising technologies are not loaded for your visit.
        </p>
        <p>
          The full list of technologies, what they store and how to control them is in our{" "}
          <LegalLink href={COOKIES}>Cookie Policy</LegalLink>.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "When we share personal data",
    content: (
      <>
        <p>We do not sell personal data. We share it only:</p>
        <ul>
          <li>with the service providers described in section 08, to the extent they need it;</li>
          <li>
            within the Opportunities Network, where an approved Participant is involved in a specific opportunity — and then
            only the information needed for that opportunity, in line with the applicable participation terms;
          </li>
          <li>with professional advisers such as lawyers, auditors and accountants, under a duty of confidentiality;</li>
          <li>where required by law, a court order or a competent authority, or to protect our legal rights;</li>
          <li>with a successor business if NairobiX is involved in a merger, acquisition or transfer of assets, subject to equivalent protection.</li>
        </ul>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    content: (
      <>
        <p>
          Several of our providers — including Zoho, Anthropic, Vercel and Google{TRACKING.metaPixelId ? ", as well as Meta" : ""} — operate
          infrastructure outside Kenya, so your personal data may be stored or processed in other countries.
        </p>
        <p>
          Sections 48 to 50 of the Act allow such transfers where appropriate safeguards are in place or another condition in
          the Act applies. We work with established providers that set out their security and data-protection commitments in
          their contracts, and we transfer only what is needed for the purpose described in this Policy. You can contact us for
          more information about the safeguards that apply to a particular provider.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    content: (
      <>
        <p>
          Under section 39 of the Act we keep personal data only for as long as it is needed for the purpose it was collected
          for, unless a longer period is required or allowed by law. In practice:
        </p>
        <ul>
          <li><strong>Enquiries, Assessments and applications</strong> are kept while we are in active discussion with you and for a reasonable period afterwards, so we can follow up and keep an accurate record of our relationship.</li>
          <li><strong>Client and Engagement records</strong>, including Invoices and Payment records, are kept for as long as Kenyan tax, accounting and limitation laws require.</li>
          <li><strong>Nia conversations</strong> are not stored by NairobiX after you close the page.</li>
          <li><strong>Browser storage</strong> used by the website is described, with its duration, in the <LegalLink href={COOKIES}>Cookie Policy</LegalLink>.</li>
        </ul>
        <p>When data is no longer needed, we delete it or anonymise it so it no longer identifies you.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect data",
    content: (
      <>
        <p>We use technical and organisational measures appropriate to the risk, including:</p>
        <ul>
          <li>encrypting connections to the website (HTTPS);</li>
          <li>keeping credentials for our CRM, booking, AI and other integrations on the server, never in your browser;</li>
          <li>limiting access to personal data to people who need it for their work;</li>
          <li>sending only hashed contact details to advertising platforms, where advertising measurement is used;</li>
          <li>relying on the security programmes of established providers for the systems they run.</li>
        </ul>
        <p>
          No system is completely secure. If a breach of personal data creates a real risk of harm, we will notify the Data
          Commissioner and, where required, affected individuals, as section 43 of the Act requires.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Under the Act you have the right to:</p>
        <ul>
          <li>be informed of how your personal data is used;</li>
          <li>access the personal data we hold about you;</li>
          <li>object to all or part of the processing of your personal data, including — at any time — for direct marketing;</li>
          <li>have false or misleading data corrected, and deleted;</li>
          <li>ask us to restrict processing in the circumstances set out in the Act;</li>
          <li>receive data you provided in a structured, commonly used, machine-readable format, where data portability applies;</li>
          <li>withdraw consent where we rely on it;</li>
          <li>not be subject to a decision based solely on automated processing that significantly affects you.</li>
        </ul>
        <p>
          To exercise a right, email <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>. We may need to
          confirm your identity first. We will respond within the periods set by the Data Protection (General) Regulations,
          2021, and there is no charge for making a request. If we cannot meet a request — for example because the law requires
          us to keep certain records — we will explain why in writing.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Questions and complaints",
    content: (
      <p>
        If you are unhappy with how we have handled your personal data, please contact us first so we can try to put it right.
        You also have the right to complain to the{" "}
        <LegalLink href={ODPC_URL}>Office of the Data Protection Commissioner (ODPC)</LegalLink>, Kenya&apos;s data protection
        regulator.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Our website and Services are intended for businesses and the adults who run them. We do not knowingly collect personal
        data from anyone under 18. If you believe a child has given us personal data, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    content: (
      <p>
        We review this Policy when our services, systems or the law change. The &ldquo;Last updated&rdquo; date above shows the
        current version. Where a change significantly affects how we use personal data you have already given us, we will tell
        you directly where we can.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>For questions about this Policy or your personal data, contact NairobiX:</p>
        <ul>
          <li>Email: <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink></li>
          <li>WhatsApp: <LegalLink href="https://wa.me/254105426364">+254 105 426 364</LegalLink></li>
          <li>Location: Nairobi, Kenya</li>
        </ul>
        <p>
          Use of the website is also governed by our <LegalLink href={TERMS}>Terms of Service</LegalLink>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const doc = LEGAL_DOCUMENTS.privacy;
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: `NairobiX ${doc.title}`, description: DESCRIPTION, path: doc.href })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#0a0a0b] text-white [--section-bg:#0a0a0b]">
        <LegalPageLayout
          document="privacy"
          sections={SECTIONS}
          intro={
            <p>
              Your trust matters to how we work. This Policy sets out, in plain language, what personal data NairobiX
              collects, why, who it is shared with, how long it is kept and the rights you have under Kenyan law.
            </p>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
