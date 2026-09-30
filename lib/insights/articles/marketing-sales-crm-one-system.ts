import type { InsightArticleInput } from "../types";

export const marketingSalesCrmOneSystem: InsightArticleInput = {
  slug: "marketing-sales-crm-one-system",
  category: "Growth",
  title: "Why Marketing, Sales and CRM Can't Be Run as Separate Systems",
  seoTitle: "Why Marketing, Sales and CRM Belong Together",
  dek: "Marketing optimises for leads, sales works on customers, and the CRM records whatever it is given. Growth depends on the loop between them — including the signal that tells your advertising what a good customer looks like.",
  description:
    "What breaks at each handoff between marketing, sales and CRM; how Google and Meta can learn from your CRM's outcomes instead of form fills; and the shared definitions and metrics that connect the three.",
  publishedDate: "2026-09-30",
  reviewedNote: "Advertising platform details checked against Google and Meta documentation, September 2026.",
  heroImage: "/images/photography/pexels-divinetechygirl-1181745.jpg",
  heroImageAlt: "A team meeting around a long table, with a colleague joining on a wall-mounted video screen.",
  relatedSolutionIds: ["growth-strategy", "digital-marketing", "crm-sales"],
  related: ["why-businesses-have-leads-but-lose-sales", "your-website-is-not-a-brochure", "crm-vs-spreadsheet-vs-whatsapp"],
  sections: [
    {
      id: "one-customer",
      heading: "Three functions, one customer",
      blocks: [
        {
          type: "p",
          text: "In most growing businesses, marketing, sales and customer records grow up separately. Marketing is whoever runs the social accounts and the ads, and reports on reach and enquiries. Sales is whoever talks to customers, and reports — if at all — on deals closed. The CRM, if there is one, was set up once and records whatever people remember to put in it.",
        },
        {
          type: "p",
          text: "Each function can look healthy on its own terms while the business as a whole underperforms. Marketing delivers more enquiries than last quarter. Sales says the enquiries are poor. Nobody can settle the argument, because the data that would settle it — which enquiries became customers, and where they came from — is split across three places, or recorded nowhere.",
        },
      ],
    },
    {
      id: "handoffs",
      heading: "What breaks at each handoff",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Marketing → enquiry",
              text: "The source of the enquiry is lost the moment it arrives on a phone or in an inbox. From then on, nobody can connect a customer back to the campaign that found them.",
            },
            {
              title: "Enquiry → sales",
              text: "Without a shared definition of a good lead, marketing counts everything and sales ignores what it doesn't like. Both are rational; neither is aligned.",
            },
            {
              title: "Sales → CRM",
              text: "Outcomes — won, lost, why — are rarely recorded consistently. The CRM becomes a contact list rather than a record of what works.",
            },
            {
              title: "CRM → marketing",
              text: "The loop never closes. Marketing keeps optimising for enquiries because enquiries are the only signal it receives.",
            },
          ],
        },
        {
          type: "figure",
          figure: "closed-loop",
          caption:
            "An example of a closed loop. Enquiries flow into a CRM with their source attached; outcomes flow back to the advertising platforms so they can optimise for customers rather than form fills. Logos illustrate where specific platforms can sit.",
        },
      ],
    },
    {
      id: "the-signal",
      heading: "Your advertising learns from whatever signal you give it",
      blocks: [
        {
          type: "p",
          text: "Modern advertising platforms use automated bidding and targeting that optimise toward a conversion you define. If the conversion is “submitted a form”, the platform learns to find people who submit forms — which is not the same as people who become customers. A campaign can get steadily better at producing enquiries while sales complains that they are getting worse.",
        },
        {
          type: "p",
          text: "Both Google and Meta provide ways to send outcomes from the CRM back to the platform, so optimisation can be based on what happened after the enquiry.",
        },
        {
          type: "callout",
          kind: "fact",
          title: "Google Ads: enhanced conversions for leads",
          text: "When a visitor submits a form, the website sends Google hashed lead information such as an email address; the business stores the lead in its CRM; when the lead converts, the business imports the same hashed information, alongside Google identifiers such as the click ID, and Google matches the two [1]. Google recommends that advertisers using the older offline conversion import upgrade to enhanced conversions for leads [1][2].",
        },
        {
          type: "callout",
          kind: "fact",
          title: "Meta: Conversions API for CRM",
          text: "Meta's integration lets businesses upload lead-stage events from their CRM, ideally keyed by Meta's lead ID. It supports the Conversion Leads performance goal, which is currently compatible with Facebook and Instagram lead ads (Instant Forms). Meta lists requirements including at least 200 leads a month and uploading data at least once a day [3].",
        },
        {
          type: "callout",
          kind: "analysis",
          title: "What this requires in practice",
          text: "Neither option works unless the CRM captures identifiers at the moment of enquiry, records stages consistently, and is connected to the platforms. That is exactly why marketing and CRM cannot be designed separately: the feedback loop is built out of CRM data. Small businesses below the platforms' volume thresholds still benefit from the same discipline in their own reporting.",
        },
      ],
    },
    {
      id: "shared-definitions",
      heading: "Agree the definitions before the dashboards",
      blocks: [
        {
          type: "p",
          text: "Alignment starts with words. If marketing and sales mean different things by “lead”, no report will reconcile them. The definitions below are a starting point to adapt, not a standard.",
        },
        {
          type: "table",
          caption: "A shared vocabulary for the pipeline",
          columns: ["Stage", "Working definition", "Who owns it"],
          rows: [
            ["Enquiry", "Any person who contacts the business about a product or service", "Marketing brings it; first responder captures it"],
            ["Qualified lead", "An enquiry that meets agreed criteria — need, fit, timing", "Sales, using the agreed criteria"],
            ["Opportunity", "A qualified lead with an active proposal, quote or booking in progress", "A named salesperson"],
            ["Customer", "A paid sale", "Sales records it; finance confirms it"],
            ["Lost", "A closed opportunity, with a recorded reason", "Sales records it; marketing learns from it"],
          ],
          note: "NairobiX analysis. The criteria for “qualified” should be specific to the business and written down.",
        },
      ],
    },
    {
      id: "metrics",
      heading: "Metrics that connect the three",
      blocks: [
        {
          type: "p",
          text: "Once enquiries carry their source and outcomes are recorded, a handful of metrics tell a far more useful story than reach or raw enquiry counts:",
        },
        {
          type: "list",
          items: [
            "**Cost per qualified lead, by source** — not cost per enquiry.",
            "**Enquiry-to-customer rate, by source** — which channels produce buyers rather than browsers.",
            "**Time to first response** — the stage most within your control. Research on online leads found firms that attempted contact within an hour were nearly seven times as likely to qualify the lead as firms that waited longer [4].",
            "**Revenue by source** — where the next shilling of marketing should go.",
            "**Reasons for loss** — price, timing, fit, no response — which point to fixes in marketing, sales or the offer itself.",
          ],
        },
      ],
    },
    {
      id: "source-tracking",
      heading: "Recording the source: the unglamorous foundation",
      blocks: [
        {
          type: "p",
          text: "Every metric above depends on one field being filled in reliably: where did this enquiry come from? Most businesses lose it at the very first step, because the enquiry arrives on WhatsApp or by phone and nobody asks — or the answer is written down differently each time. There are three practical ways to capture it, and most businesses need all three.",
        },
        { type: "h3", text: "Tag the links you control" },
        {
          type: "p",
          text: "For links in adverts, social posts, emails and partner websites, Google Analytics supports campaign parameters added to the end of the URL: **utm_source** for the referrer, **utm_medium** for the kind of marketing and **utm_campaign** for the specific campaign, and Google recommends always using those three together [5]. When a visitor arrives through a tagged link, the values appear in the traffic acquisition reports [5] — and a website form can pass them into the CRM along with the enquiry.",
        },
        {
          type: "table",
          caption: "Campaign parameters in practice",
          columns: ["Parameter", "Example value", "Question it answers"],
          rows: [
            ["utm_source", "instagram", "Which platform or referrer sent the visitor?"],
            ["utm_medium", "paid_social", "What kind of marketing was it?"],
            ["utm_campaign", "sept_open_day", "Which specific campaign or offer?"],
          ],
          note: "Agree a naming convention and keep to it. Values are recorded as written, so “Instagram” and “instagram” are reported as different sources.",
        },
        { type: "h3", text: "Give each WhatsApp entry point its own opening line" },
        {
          type: "p",
          text: "WhatsApp's click-to-chat links can include a pre-filled message: a link in the form wa.me/<number>?text=<message> opens a chat with that text already typed [6]. Using a different message for each entry point — “Hi, I saw your open day advert” on the advert, “Hi, I found you on your website” on the site — gives the customer a natural first line and gives the person replying a simple way to record the source.",
        },
        { type: "h3", text: "Ask, and record the answer from a fixed list" },
        {
          type: "p",
          text: "For calls, walk-ins and referrals, the only reliable method is to ask how the customer heard about the business and record the answer from a short fixed list rather than as free text. Eight consistent options produce a report. Free text produces a column nobody can summarise.",
        },
      ],
    },
    {
      id: "example",
      heading: "A realistic example",
      blocks: [
        {
          type: "example",
          title: "A training provider — a composite, fictional business",
          paragraphs: [
            "A professional training provider runs Meta and Google campaigns for its short courses. Its agency reports a falling cost per enquiry every month. Enrolments are flat.",
            "The provider starts recording the source of every enquiry in its CRM and marking each one enrolled or lost. After two months, the picture is clear: one campaign produces many cheap enquiries from people looking for free courses, while a smaller search campaign produces fewer, more expensive enquiries that enrol at a far higher rate.",
            "Budget moves toward the campaign that produces enrolments. Enrolment outcomes are fed back to the ad platforms so they can optimise for them. The enquiry form gains one question — preferred start date — that helps the team prioritise. Nothing about the courses changed; the loop between marketing, sales and the CRM did.",
          ],
        },
      ],
    },
    {
      id: "what-to-do-next",
      heading: "What to do next",
      blocks: [
        {
          type: "checklist",
          title: "Closing the loop, in order",
          items: [
            "Write shared definitions for enquiry, qualified lead, opportunity, customer and lost.",
            "Make sure every enquiry is recorded with its source — including WhatsApp and calls.",
            "Record every outcome, with a reason for losses.",
            "Report cost per qualified lead and enquiry-to-customer rate by source, monthly, to marketing and sales together.",
            "When volume allows, send CRM outcomes back to your ad platforms, with consent and data protection properly handled.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "Marketing, sales and the CRM each look fine alone; growth depends on the handoffs between them.",
    "Ad platforms optimise for the signal you give them. Give them outcomes, not form fills.",
    "Google and Meta both offer ways to send CRM outcomes back — and both depend on disciplined CRM data.",
    "Agree definitions first; then measure cost per qualified lead and conversion by source.",
  ],
  sources: [
    {
      title: "About enhanced conversions for leads",
      publisher: "Google Ads Help",
      url: "https://support.google.com/google-ads/answer/15713840?hl=en",
    },
    {
      title: "About offline conversion imports",
      publisher: "Google Ads Help",
      url: "https://support.google.com/google-ads/answer/2998031?hl=en",
    },
    {
      title: "Conversions API for CRM integration",
      publisher: "Meta for Developers",
      url: "https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration",
      note: "Requirements and compatible ad formats change; check the current page.",
    },
    {
      title: "The Short Life of Online Sales Leads",
      publisher: "Harvard Business Review, March 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      note: "US data from 2011; used for direction rather than as a local benchmark.",
    },
    {
      title: "URL builders: collect campaign data with custom URLs",
      publisher: "Google Analytics Help",
      url: "https://support.google.com/analytics/answer/10917952?hl=en",
    },
    {
      title: "How to use click to chat",
      publisher: "WhatsApp Help Center",
      url: "https://faq.whatsapp.com/5913398998672934",
    },
  ],
};
