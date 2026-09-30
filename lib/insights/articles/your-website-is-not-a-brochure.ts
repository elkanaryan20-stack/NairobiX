import type { InsightArticleInput } from "../types";

export const yourWebsiteIsNotABrochure: InsightArticleInput = {
  slug: "your-website-is-not-a-brochure",
  category: "Digital",
  title: "Your Website Is Not a Brochure",
  dek: "A brochure is finished when it is printed. A business website has jobs to do every day: being found, earning trust, capturing enquiries, and passing them into the rest of the business intact.",
  description:
    "The seven jobs a business website actually does, what good looks like for each, the performance thresholds Google publishes, and a practical audit you can run on your own site.",
  publishedDate: "2026-09-30",
  heroImage: "/images/photography/pexels-shkrabaanthony-7971661.jpg",
  heroImageAlt: "A person working on a laptop at a café table beside a cup of coffee.",
  relatedSolutionIds: ["web-digital-solutions", "digital-marketing", "crm-sales"],
  related: ["marketing-sales-crm-one-system", "why-businesses-have-leads-but-lose-sales", "ai-in-a-small-business"],
  sections: [
    {
      id: "brochure-model",
      heading: "The brochure model, and why it persists",
      blocks: [
        {
          type: "p",
          text: "Many business websites are built like printed brochures: a home page, an about page, a services page and a contact page, designed once, launched, and left alone. The logic is understandable. A website used to be a statement that the business exists. For a long time, that was enough.",
        },
        {
          type: "p",
          text: "Today the website is usually one part of a longer path. Someone sees an advert, hears a recommendation or searches for a problem; visits the site to check the business is credible; then sends a message, fills in a form or taps through to WhatsApp. If the site does its part poorly — or does it well but drops the enquiry at the handoff — the marketing that brought the visitor is wasted.",
        },
      ],
    },
    {
      id: "seven-jobs",
      heading: "The seven jobs a business website actually does",
      blocks: [
        {
          type: "figure",
          figure: "website-roles",
          caption:
            "The website's part in the customer journey. The first five jobs happen on the site; the last two depend on what the site connects to.",
        },
        { type: "h3", text: "1. Discovery — being found for the right problems" },
        {
          type: "p",
          text: "People search for problems and needs, not company names. Pages that genuinely answer those questions are how new customers find a business. Google's guidance is to create helpful, reliable, people-first content — written primarily to help readers rather than to manipulate rankings — and it asks whether a reader will leave feeling they learned enough to achieve their goal [3].",
        },
        { type: "h3", text: "2. Trust — being credible quickly" },
        {
          type: "p",
          text: "Visitors decide fast. Nielsen Norman Group's analysis of page-visit data found that users often leave pages within 10 to 20 seconds, but that pages which communicate a clear value proposition can hold attention far longer [1]. Credibility comes from specifics: what the business does, for whom, where it is, who is behind it, and how to reach a person — not from adjectives.",
        },
        { type: "h3", text: "3. Conversion — making the next step obvious" },
        {
          type: "p",
          text: "Every important page should answer “what do I do now?” with one primary action. Offering five equal options is the same as offering none.",
        },
        { type: "h3", text: "4. Capture — turning interest into a record" },
        {
          type: "p",
          text: "Forms, booking tools and chat links are where interest becomes an enquiry. They should ask only what is needed, work flawlessly on a phone, confirm clearly what happens next, and never lose what the visitor typed.",
        },
        { type: "h3", text: "5. Qualification — understanding the enquiry" },
        {
          type: "p",
          text: "A few well-chosen questions — what the enquiry is about, rough timing, the kind of business — let the team prioritise and prepare. Too many questions reduce completions; too few leave the team guessing. The balance depends on the value of the enquiry.",
        },
        { type: "h3", text: "6. Handoff — passing the enquiry on intact" },
        {
          type: "p",
          text: "This is where many websites fail invisibly. A form that sends an email to an inbox nobody watches, or a WhatsApp link that arrives without context, breaks the chain. Enquiries should arrive in the system the team actually works from — ideally a CRM — with their source attached.",
        },
        { type: "h3", text: "7. Measurement — learning what works" },
        {
          type: "p",
          text: "Page views alone say little. The useful questions are which pages and sources produce enquiries, which enquiries become customers, and where visitors abandon the path. That requires tracking actions, not just visits, and connecting them to outcomes in the CRM.",
        },
      ],
    },
    {
      id: "performance",
      heading: "Performance is part of the experience",
      blocks: [
        {
          type: "p",
          text: "A slow or unstable page undermines trust before a visitor reads a word, and many visitors in Kenya browse on mobile connections of varying quality. Google defines three Core Web Vitals and publishes a “good” threshold for each [2].",
        },
        {
          type: "table",
          caption: "Core Web Vitals — Google's published thresholds for a good experience",
          columns: ["Metric", "What it measures", "Good"],
          rows: [
            ["Largest Contentful Paint (LCP)", "Loading — when the main content appears", "2.5 seconds or less"],
            ["Interaction to Next Paint (INP)", "Responsiveness — how quickly the page reacts to taps and clicks", "200 milliseconds or less"],
            ["Cumulative Layout Shift (CLS)", "Visual stability — how much the layout jumps while loading", "0.1 or less"],
          ],
          note: "Google recommends measuring at the 75th percentile of page loads, separately for mobile and desktop [2].",
        },
        {
          type: "p",
          text: "The most common culprits on small-business sites are oversized images, heavy themes and plug-ins, third-party scripts added over the years, and content that moves as it loads. Most are fixable without a redesign.",
        },
      ],
    },
    {
      id: "forms",
      heading: "The enquiry form: where most of the value is won or lost",
      blocks: [
        {
          type: "p",
          text: "Of all the elements on a business website, the enquiry form does the most direct work and gets the least design attention. Every field is a small cost to the visitor and a small benefit to the business. The question for each one is whether the benefit is worth the cost at this stage of the relationship.",
        },
        {
          type: "table",
          caption: "Deciding what an enquiry form should ask",
          columns: ["Field", "Why the business wants it", "Usually"],
          rows: [
            ["Name", "To address the person properly", "Ask"],
            ["Phone or WhatsApp", "The fastest route to a reply in most Kenyan markets", "Ask"],
            ["Email", "For proposals and documents", "Ask, or make optional if phone is given"],
            ["What the enquiry is about", "To route it and prepare — best as a short list of options", "Ask"],
            ["Timing", "To prioritise urgent enquiries", "Ask if it changes who responds first"],
            ["Budget", "To qualify", "Often better asked in conversation"],
            ["Company size, job title, address", "For segmentation", "Rarely worth it on a first enquiry"],
          ],
          note: "NairobiX analysis for typical service businesses. High-value B2B enquiries can justify more questions; simple bookings need fewer.",
        },
        {
          type: "p",
          text: "Three details matter as much as the fields themselves. The form should say what happens after it is submitted — who will respond, and how. It should keep what the visitor typed if something goes wrong, rather than clearing the form. And it should confirm receipt immediately, on the page and ideally by message, so the visitor is not left wondering whether it worked.",
        },
        { type: "h3", text: "Accessible to everyone who might buy" },
        {
          type: "p",
          text: "The Web Content Accessibility Guidelines are the international reference for making websites usable by people with disabilities; version 2.2 became a W3C Recommendation on 5 October 2023 [4]. Its additions include a minimum size — or enough spacing — for targets such as buttons and links, and not asking people for the same information twice in the same process [5]. For a business, the practical translation is simple: visible labels on every field, error messages that explain how to fix the problem, enough contrast to read in sunlight, and buttons large enough to tap accurately. These choices help every visitor on a phone, not only those using assistive technology.",
        },
      ],
    },
    {
      id: "common-mistakes",
      heading: "What most business websites get wrong",
      blocks: [
        {
          type: "list",
          items: [
            "**Describing the company instead of the customer's problem.** Visitors arrive with a need; the page should meet it.",
            "**Generic claims.** “Quality service” and “customer satisfaction” say nothing. Specifics — what, for whom, how, where — build credibility.",
            "**Contact as an afterthought.** A contact page at the end of the menu is not a conversion strategy.",
            "**Forms that go nowhere useful.** Enquiries emailed to a shared inbox with no owner or reminder.",
            "**No measurement of outcomes.** Knowing traffic but not which visits became customers.",
            "**Launch and leave.** A site that is never updated, tested or improved slowly stops doing its jobs.",
          ],
        },
      ],
    },
    {
      id: "example",
      heading: "A realistic example",
      blocks: [
        {
          type: "example",
          title: "A private school's admissions site — a composite, fictional example",
          paragraphs: [
            "A private school's website has attractive photography and a downloadable prospectus. Enquiries arrive through a form that emails the admissions office. Admissions staff say most enquiries come “from the website”, but nobody knows which pages or campaigns bring them, and some parents say they never heard back.",
            "Working through the seven jobs, the school finds that the fees and admissions pages — the ones parents most want — are hard to find on a phone; the form asks for eleven fields; and form emails go to an address checked twice a week. The changes are practical: clear admissions and fees pages written around parents' questions, a shorter form with the child's intended year and start term, an immediate confirmation explaining next steps, enquiries created directly in the admissions CRM with their source, and a follow-up reminder for staff.",
            "None of this needed a new visual design. It needed the website to be treated as the first stage of the admissions process rather than as a brochure.",
          ],
        },
      ],
    },
    {
      id: "audit",
      heading: "A practical audit for your own site",
      blocks: [
        {
          type: "checklist",
          title: "Twenty minutes, on your phone",
          items: [
            "Open your home page. Within ten seconds, is it clear what you do, for whom, and where?",
            "Find your main call to action on three key pages. Is there one clear next step on each?",
            "Submit your own contact form. Where did it go, who saw it, and how long until someone responded?",
            "Tap your WhatsApp link. Does the message arrive with enough context to reply well?",
            "Run your key pages through Google PageSpeed Insights and check the three Core Web Vitals.",
            "Check whether you can see, for last month, which sources produced enquiries — and which produced customers.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "A business website is an active part of the sales path, not a static statement.",
    "Its seven jobs: discovery, trust, conversion, capture, qualification, handoff and measurement.",
    "Speed and stability are part of credibility; Google publishes clear thresholds to aim for.",
    "The most costly failures are often invisible — at the handoff after the form is submitted.",
  ],
  sources: [
    {
      title: "How Long Do Users Stay on Web Pages?",
      publisher: "Nielsen Norman Group, 2011",
      url: "https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/",
    },
    {
      title: "Web Vitals",
      publisher: "web.dev (Google)",
      url: "https://web.dev/articles/vitals",
    },
    {
      title: "Creating helpful, reliable, people-first content",
      publisher: "Google Search Central",
      url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      title: "WCAG 2.2 is a web standard (“W3C Recommendation”)",
      publisher: "W3C Web Accessibility Initiative, 5 October 2023",
      url: "https://www.w3.org/WAI/news/2023-10-05/wcag22rec/",
    },
    {
      title: "What's new in WCAG 2.2",
      publisher: "W3C Web Accessibility Initiative",
      url: "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/",
    },
  ],
};
