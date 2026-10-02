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
  "The cookies and browser storage the NairobiX website uses — for analytics, campaign attribution and, where enabled, advertising measurement — and how to control them.";

export const metadata: Metadata = legalMetadata("cookies", DESCRIPTION);

const PRIVACY = LEGAL_DOCUMENTS.privacy.href;

// This inventory is built from what the website actually loads (see
// app/layout.tsx and lib/tracking-config.ts): rows for optional
// integrations appear only when that integration is configured for the
// deployment, so the published policy matches the live site.
const ADS_ENABLED = Boolean(TRACKING.metaPixelId || TRACKING.googleAdsId);

const SECTIONS: LegalSectionEntry[] = [
  {
    id: "what-are-cookies",
    title: "What cookies and similar technologies are",
    content: (
      <>
        <p>
          Cookies are small text files a website stores in your browser so it can recognise your browser on a later visit or
          page. Websites also use <strong>similar technologies</strong>, such as local storage and session storage, which keep
          small pieces of information in your browser in a comparable way, and tags (small pieces of code) that send
          measurement events to analytics or advertising services.
        </p>
        <p>
          <strong>First-party</strong> technologies are set on nairobix.com itself. <strong>Third-party</strong> ones are
          associated with another company&apos;s service. Some, like Google Analytics cookies, are set on our domain but read
          by a third party&apos;s service.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How NairobiX uses them",
    content: (
      <>
        <p>We use cookies and similar technologies for a small number of purposes:</p>
        <ul>
          <li><strong>Essential functionality</strong> — keeping your Growth Assessment answers while you move between steps, and remembering your cookie choice.</li>
          <li><strong>Analytics</strong> — understanding which pages are visited so we can improve the Website. Google Analytics loads only if you allow Analytics.</li>
          <li><strong>Marketing</strong> — measuring marketing through Meta Pixel and, when configured, Google Ads. These technologies load only if you allow Marketing.</li>
          <li><strong>Campaign attribution</strong> — with Marketing consent, recording which channel or campaign brought you to us so an enquiry can be linked to its source.</li>
          {ADS_ENABLED ? <li><strong>Advertising measurement</strong> — seeing which of our ads lead to enquiries, bookings and completed Assessments.</li> : null}
        </ul>
        <p>NairobiX&apos;s website stores your consent choice and, after Marketing consent, campaign attribution in local storage. Third-party cookies are set only after you enable the relevant category.</p>
      </>
    ),
  },
  {
    id: "necessary",
    title: "Strictly necessary browser storage",
    content: (
      <>
        <p>These are set by the Website itself and are needed for features you use. They are removed when you close the tab.</p>
        <LegalTable
          caption="Strictly necessary browser storage"
          head={["Name", "Type", "Purpose", "Duration"]}
          rows={[
            ["nairobix:growth-assessment:v2", "Session storage", "Keeps your Growth Assessment answers if you refresh or move between steps. Cleared when you submit.", "Until the tab is closed"],
            ["nx_nia_roamed", "Session storage", "Remembers that Nia's occasional on-screen animation has played, so it does not repeat.", "Until the tab is closed"],
            ["nairobix:cookie-consent:v1", "Local storage", "Remembers your Analytics and Marketing choice until you clear site data or change it in Cookie preferences.", "Until you clear site data"],
          ]}
        />
      </>
    ),
  },
  {
    id: "attribution",
    title: "Campaign attribution storage",
    content: (
      <>
        <p>
          If you allow Marketing, the Website keeps a small first-party record of campaign attribution in your browser&apos;s
          local storage. It is sent with a form you submit and stored with your enquiry in our CRM. If you reject or later
          disable Marketing, the Website stops capturing attribution and clears this record where browser storage allows.
        </p>
        <LegalTable
          caption="Campaign attribution storage"
          head={["Name", "Type", "What it holds", "Duration"]}
          rows={[
            ["nx_lead_source", "Local storage", "The channel you first arrived from (for example Google, Instagram, WhatsApp or Direct)", "Until you clear site data"],
            ["nx_lead_source_medium, nx_lead_source_campaign", "Local storage", "Campaign tags from your first visit's link, if any", "Until you clear site data"],
            ["nx_touch_v1", "Local storage", "First and most recent visit details: channel, campaign tags (utm_*), ad click IDs, landing page and date", "Until you clear site data"],
          ]}
        />
        <p>
          This record contains no name or contact details on its own. A raw referring website address is never stored — only
          a general channel name.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics cookies",
    content: (
      <>
        <p>
          We use <strong>Google Analytics 4</strong> (Google LLC) to measure how the Website is used. It sets the following
          cookies, as documented by Google:
        </p>
        <LegalTable
          caption="Google Analytics cookies"
          head={["Name", "Provider", "Purpose", "Duration"]}
          rows={[
            ["_ga", "Google Analytics", "Distinguishes visitors", "2 years"],
            ["_ga_<container-id>", "Google Analytics", "Keeps the state of the current session", "2 years"],
          ]}
        />
        <p>Google Analytics and its cookies load only after you enable Analytics. We send general event labels only and never send your name, email address or phone number to Google Analytics.</p>
        <LegalTable
          caption="Analytics session storage"
          head={["Name", "Type", "Purpose", "Duration"]}
          rows={[["nx_evt_*", "Session storage", "Avoids counting an analytics start event more than once in a browser session", "Until the tab is closed"]]}
        />
      </>
    ),
  },
  {
    id: "advertising",
    title: "Advertising measurement",
    content: ADS_ENABLED ? (
      <>
        <p>We use the following advertising technologies to measure the effectiveness of our campaigns:</p>
        <LegalTable
          caption="Advertising cookies"
          head={["Name", "Provider", "Purpose", "Duration"]}
          rows={[
            ...(TRACKING.googleAdsId
              ? [["_gcl_ cookies (for example _gcl_aw)", "Google Ads", "Store ad click information so a later enquiry can be linked to the ad", "Set by Google"]]
              : []),
            ...(TRACKING.metaPixelId
              ? [
                  ["_fbp", "Meta Pixel", "Identifies the browser for Meta advertising measurement", "Set by Meta"],
                  ["_fbc", "Meta Pixel", "Stores the click identifier when you arrive from a Meta ad", "90 days"],
                ]
              : []),
          ]}
        />
        {TRACKING.metaPixelId ? (
          <p>
            When you complete the Assessment, book a consultation or send an enquiry, the Website may also send that event to
            Meta from our server (the Meta Conversions API). Your email address, phone number and name are hashed — turned into
            an irreversible code — before they are sent.
          </p>
        ) : null}
        {TRACKING.googleAdsId ? (
          <p>
            For Google Ads, your email address and phone number may be shared with Google in hashed form when you complete a key
            action (enhanced conversions).
          </p>
        ) : null}
      </>
    ) : (
      <p>
        The Website does not currently use advertising cookies or advertising measurement tags. If we introduce them, we will update this Policy before they are used. Marketing technologies are held until you enable Marketing.
      </p>
    ),
  },
  ...(TRACKING.gtmId
    ? [
        {
          id: "tag-manager",
          title: "Google Tag Manager",
          content: (
            <p>
              We use Google Tag Manager to manage measurement tags. Tag Manager itself does not set cookies; the tags it loads
              are limited to the categories described in this Policy.
            </p>
          ),
        },
      ]
    : []),
  {
    id: "third-party-links",
    title: "Embedded and linked third-party services",
    content: (
      <p>
        The Website links to external services such as WhatsApp, LinkedIn, Instagram, Facebook and X. These services set their
        own cookies only when you visit them, under their own policies. Nia&apos;s replies are generated on our server through
        Anthropic&apos;s API; Nia does not set cookies in your browser.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices and controls",
    content: (
      <>
        <LegalH3>Browser settings</LegalH3>
        <p>
          You can block or delete cookies and site data in your browser&apos;s settings, usually under Privacy or Site data.
          Clearing site data for nairobix.com also removes your consent choice and any attribution record. Blocking all storage may
          stop features such as saving your Assessment progress from working.
        </p>
        <LegalH3>Google Analytics</LegalH3>
        <p>
          You can stop Google Analytics measuring your visits with Google&apos;s{" "}
          <LegalLink href="https://tools.google.com/dlpage/gaoptout">browser add-on</LegalLink>, or by blocking cookies for
          nairobix.com.
        </p>
        <LegalH3>Global Privacy Control</LegalH3>
        <p>
          If your browser sends a Global Privacy Control (GPC) signal, the Website does not load advertising technologies and
          does not send advertising conversion data for your visit.
        </p>
        {ADS_ENABLED ? (
          <>
            <LegalH3>Advertising preferences</LegalH3>
            <p>
              You can also manage how ads are personalised in your{" "}
              {TRACKING.googleAdsId ? <LegalLink href="https://myadcenter.google.com/">Google</LegalLink> : null}
              {TRACKING.googleAdsId && TRACKING.metaPixelId ? " and " : null}
              {TRACKING.metaPixelId ? <LegalLink href="https://accountscenter.facebook.com/ad_preferences">Meta</LegalLink> : null}{" "}
              account settings.
            </p>
          </>
        ) : null}
        <LegalCallout title="Consent">
          <p>You can accept, reject or manage optional categories using the cookie notice. Your choice is saved in this browser. Use &ldquo;Cookie preferences&rdquo; in the Website footer to change it later. Essential storage is always active.</p>
        </LegalCallout>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    content: (
      <p>
        The technologies a website uses change as it develops. We update this Policy when we add or remove a technology, and
        the &ldquo;Last updated&rdquo; date shows the current version. Specific cookie names and durations are set by each
        provider and may change; the categories and purposes above remain the guide to how we use them.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about this Policy can be sent to <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>. How we
        handle personal data more broadly — including your rights under Kenya&apos;s Data Protection Act, 2019 — is explained in
        our <LegalLink href={PRIVACY}>Privacy Policy</LegalLink>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  const doc = LEGAL_DOCUMENTS.cookies;
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: `NairobiX ${doc.title}`, description: DESCRIPTION, path: doc.href })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#0a0a0b] text-white [--section-bg:#0a0a0b]">
        <LegalPageLayout
          document="cookies"
          sections={SECTIONS}
          intro={
            <p>
              This Policy lists the cookies and similar technologies the NairobiX website uses, what each one is for and how
              to control them. It complements our <LegalLink href={PRIVACY}>Privacy Policy</LegalLink>.
            </p>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
