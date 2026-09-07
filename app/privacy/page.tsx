import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalDocument, type LegalSection } from "@/components/ui/LegalDocument";
import { CONTACT_EMAIL } from "@/lib/site-data";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How NairobiX collects, uses, shares and protects personal information across the website, forms, consultations, Nia and related services.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/privacy" });

const LAST_UPDATED = "7 September 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      {
        p: "We collect information you provide directly, through the Business Growth Assessment, the Request a Solution form, the Growth Partner application, the general Contact form, the consultation booking flow, and conversations with Nia when you choose to submit a request through her. Depending on which form or flow you use, this can include:",
      },
      {
        ul: [
          "Contact details — name, email address, and phone / WhatsApp number",
          "Business details — company name, industry, website, city and country",
          "Enquiry details — your growth goals, business challenges, current marketing channels, desired timeline, budget readiness, and the specific solution, service, or partnership you're interested in",
          "Consultation details — the topic you'd like to discuss and a brief description of your current priority, when booking a NairobiX Business Growth Consultation",
        ],
      },
      {
        p: "We also collect standard website usage data automatically through Google Analytics — see Cookies & tracking below. We do not currently operate user accounts or a login system for website visitors, so we do not collect passwords or account credentials through the public website.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How and why we use it",
    body: [
      {
        p: "We use the information we collect to:",
      },
      {
        ul: [
          "Respond to your enquiry and follow up on your request",
          "Review and process Business Growth Assessment submissions",
          "Schedule, confirm and manage consultations",
          "Understand your business context so we can recommend a relevant NairobiX solution",
          "Operate, maintain and improve the website and Nia",
          "Meet legal, accounting and contractual obligations",
          "Communicate with you about your enquiry, booking or engagement",
        ],
      },
      {
        p: "We do not use your information to make automated decisions that produce legal or similarly significant effects on you without human involvement.",
      },
    ],
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    body: [
      { p: "Under the Data Protection Act, 2019, we rely on the following legal bases:" },
      {
        ul: [
          "Consent — when you voluntarily submit a form, start a conversation with Nia, or book a consultation, you consent to us processing the information you provide for the purpose you submitted it.",
          "Steps taken at your request — where you are in discussion with us about a potential engagement, processing your information is necessary to take steps you requested before entering into an agreement.",
          "Legitimate interests — for limited purposes such as keeping the website secure and functioning properly, and understanding aggregate usage through analytics, where these interests are not overridden by your rights.",
          "Legal obligation — where we are required to retain or disclose information to comply with applicable law.",
        ],
      },
    ],
  },
  {
    id: "sharing-and-third-parties",
    title: "Data sharing, processors and third parties",
    body: [
      {
        p: "We do not sell your personal information. We share information only with service providers who help us operate NairobiX, and only to the extent necessary for the purpose described:",
      },
      {
        ul: [
          "Zoho Corporation — we use Zoho CRM to manage leads and enquiries, and Zoho Bookings to manage consultation scheduling. Information you submit through our forms, the booking flow, or Nia is stored in these Zoho products.",
          "Anthropic — Nia is powered by Anthropic's Claude API. Messages you send to Nia are processed by Anthropic to generate her responses.",
          "Google — Google Analytics processes website usage data as described under Cookies & tracking below.",
        ],
      },
      {
        p: "We may also disclose information where required by law, to protect our legal rights, or in connection with a business transaction such as a merger or asset transfer, in which case we would take reasonable steps to ensure the information continues to be protected.",
      },
    ],
  },
  {
    id: "nia-ai",
    title: "Nia, our AI assistant",
    body: [
      {
        p: "Nia is NairobiX's AI assistant, built on Anthropic's Claude models. When you chat with Nia:",
      },
      {
        ul: [
          "Your messages are sent to Anthropic's API to generate a response. Anthropic processes this data in accordance with its own privacy and data-handling practices.",
          "Nia can look up real consultation availability at any time without submitting any of your information.",
          "Nia can only submit a Business Growth Assessment, service request, partner application, or consultation booking on your behalf after you have explicitly confirmed, in your own words, that you want it submitted. Once confirmed, that information is sent to Zoho CRM or Zoho Bookings in exactly the same way it would be if you had used the corresponding form directly.",
          "Your conversation with Nia lives in your browser for the duration of your visit. NairobiX does not save your full chat transcript in a database — it is not retained once you close or refresh the page, other than the specific fields you choose to submit as described above.",
          "To help prevent abuse, we apply a short-term, automatic rate limit based on your network address. This is held in server memory only, is not linked to your identity, and does not persist beyond a short rolling window.",
        ],
      },
      {
        p: "Nia is a conversational assistant, not a substitute for professional, financial or legal advice, and her responses may occasionally be inaccurate.",
      },
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "Cookies and tracking",
    body: [
      {
        p: "NairobiX does not set custom cookies of its own. The website uses Google Analytics (Google LLC) to understand how visitors use the site. Google Analytics sets its own standard browser cookies (such as those beginning with _ga) to distinguish visitors and sessions.",
      },
      {
        p: "We also send a small number of custom analytics events — for example, when a form is successfully submitted — but these events only include a generic label describing which form was submitted (such as \"contact\" or \"consultation_booking\"). We do not send your name, email, phone number or any other personal information to Google Analytics.",
      },
      {
        p: "We do not currently display a cookie consent banner. If you would prefer not to be tracked by Google Analytics, you can use your browser's cookie controls, a browser extension, or Google's own opt-out tools to limit or block this tracking.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data retention",
    body: [
      {
        p: "We retain personal information for as long as reasonably necessary to respond to your enquiry, deliver the service you requested, maintain accurate business and financial records, and meet our legal and contractual obligations. When information is no longer needed for these purposes, we take reasonable steps to delete or anonymize it, subject to any longer period required by law or governed by our third-party service providers' own data retention practices.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      { p: "We take reasonable technical and organizational measures to protect the information we hold, including:" },
      {
        ul: [
          "Encrypting data in transit between your browser and our website (HTTPS)",
          "Keeping API credentials and third-party integration keys server-side only — they are never exposed to your browser",
          "Limiting access to personal information to those who need it to do their work",
          "Relying on the security measures of established service providers (Zoho, Anthropic, Google, and our hosting provider) for the parts of the process they handle",
        ],
      },
      { p: "No method of transmission or storage is completely secure, and we cannot guarantee absolute security." },
    ],
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    body: [
      {
        p: "Some of the service providers we use — including Zoho Corporation, Anthropic and Google — may process or store information on servers located outside Kenya. Where this occurs, we take reasonable steps to work with reputable providers and to ensure information is handled in a manner consistent with the protections required under the Data Protection Act, 2019.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your data-subject rights",
    body: [
      { p: "Under the Data Protection Act, 2019, you have the right to:" },
      {
        ul: [
          "Be informed of the use to which your personal information will be put",
          "Access the personal information we hold about you",
          "Request correction of inaccurate or misleading information",
          "Object to the processing of your personal information",
          "Request deletion of false or misleading information about you",
          "Request the transfer of your personal information to another party (data portability), where applicable",
        ],
      },
      {
        p: "To exercise any of these rights, contact us using the details in Contact us below. We may need to verify your identity before responding.",
      },
    ],
  },
  {
    id: "childrens-data",
    title: "Children's data",
    body: [
      {
        p: "NairobiX's website and services are directed at businesses and business professionals. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
      },
    ],
  },
  {
    id: "complaints",
    title: "Complaints and the ODPC",
    body: [
      {
        p: "If you have concerns about how we handle your personal information, we encourage you to contact us first at the email below so we can try to resolve it directly. You also have the right to lodge a complaint with Kenya's Office of the Data Protection Commissioner (ODPC).",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    body: [
      {
        p: "We may update this Privacy Policy from time to time to reflect changes in our practices, our services, or applicable law. The \"Last updated\" date at the top of this page shows when it was last revised.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      {
        p: `For questions about this Privacy Policy or to exercise your data protection rights, contact us at ${CONTACT_EMAIL}.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/privacy" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <LegalDocument
          eyebrow="NAIROBIX · PRIVACY"
          title="Privacy Policy"
          lastUpdated={LAST_UPDATED}
          intro={
            <p>
              This Privacy Policy explains how NairobiX (&ldquo;NairobiX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses,
              shares and protects information in connection with this website, the Business Growth
              Assessment, consultation bookings, Nia (our AI assistant), and related services. It is
              written to align with Kenya&apos;s Data Protection Act, 2019 and applicable regulations and
              guidance issued by the Office of the Data Protection Commissioner (ODPC). By using this
              website or submitting information to NairobiX, you acknowledge that you have read this
              Policy.
            </p>
          }
          sections={SECTIONS}
        />
      </main>
      <SiteFooter />
    </>
  );
}
