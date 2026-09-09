export const BOOKING_URL = "/book";

export const NAV_ITEMS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  solutions: [
    { label: "Digital Marketing", href: "/solutions/digital-marketing" },
    { label: "Growth Strategy & Analytics", href: "/solutions/growth-strategy" },
    { label: "CRM & Sales Systems", href: "/solutions/crm-sales" },
    { label: "Business Automation", href: "/solutions/business-automation" },
    { label: "AI Solutions", href: "/solutions/ai-solutions" },
    { label: "Web & Digital Solutions", href: "/solutions/web-digital-solutions" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Partnership", href: "/partnership" },
    { label: "Contact", href: "/contact" },
  ],
  start: [
    { label: "Free Business Growth Assessment", href: "/business-growth-audit", external: false },
    { label: "Book a Consultation", href: BOOKING_URL, external: false },
    { label: "Talk to Nia", href: "#", external: false, chat: true },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/share/1F7emKasFD/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/nairobixgrowth", icon: "instagram" },
  { label: "X", href: "https://x.com/NairobiX_", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nairobix-agency/", icon: "linkedin" },
  { label: "WhatsApp", href: "https://wa.me/254105426364", icon: "whatsapp" },
];

export type SolutionDetail = {
  id: string;
  title: string;
  eyebrow: string;
  heading: string;
  problem: string;
  description: string;
  ideal: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  businessChallenge: string;
  whatWeBuild: string[];
  process: { stage: string; description: string }[];
  technology: string[];
  timeline: string;
  outcomes: string[];
  relatedCaseStudySlug: string;
  faqs: { question: string; answer: string }[];
};

export const SOLUTION_CATEGORIES: { id: string; title: string; intro: string; items: SolutionDetail[] }[] = [
  {
    id: "acquire-grow",
    title: "Acquire & Grow",
    intro: "Build stronger customer acquisition and create measurable demand.",
    items: [
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        eyebrow: "01 — DIGITAL MARKETING",
        heading: "Get your business in front of the right people.",
        problem:
          "Visibility is inconsistent — some months bring steady inquiries, others go quiet, with no clear reason why.",
        description:
          "We build digital marketing systems designed to improve visibility, attract qualified prospects and create a more consistent flow of opportunities.",
        ideal: [
          "Reach more potential customers",
          "Generate qualified leads",
          "Improve online visibility",
          "Make marketing more measurable",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/nairobi-skyline.webp",
        imageAlt: "The Nairobi city skyline under a bright midday sky.",
        businessChallenge:
          "Most businesses aren't short on marketing activity — they're short on a system that turns that activity into a predictable flow of qualified inquiries. Ads run without a clear read on what they cost per lead. Content gets published without a plan for who it's for. The result is visibility that rises and falls without an obvious cause, and a team that can't say with confidence what to do more of.",
        whatWeBuild: [
          "Paid search and social campaigns (Google Ads, Meta Ads) built around specific offers and audiences",
          "SEO foundations — technical health, on-page structure and content aligned to how customers actually search",
          "Content built around buyer intent rather than a generic posting calendar",
          "Tracking wired to real conversions, not just clicks and impressions",
        ],
        process: [
          { stage: "Discover", description: "We review current channels, past ad spend and search visibility to see where demand already exists and where it's being missed." },
          { stage: "Design", description: "We define the audiences, offers and channels most likely to produce qualified inquiries for this specific business." },
          { stage: "Implement", description: "We build and launch the campaigns, pages and content required, with tracking in place from day one." },
          { stage: "Integrate", description: "Leads flow directly into the CRM and sales process, so marketing and follow-up aren't run as separate efforts." },
          { stage: "Optimize", description: "We review cost per lead and lead quality on a regular cadence and reallocate spend toward what's actually converting." },
        ],
        technology: ["Google Ads", "Meta Ads", "Google Analytics", "Google Search Console", "Zoho CRM"],
        timeline: "Initial campaigns typically go live within 2–3 weeks; the full system usually matures over 60–90 days as data accumulates.",
        outcomes: [
          "A more consistent flow of inbound inquiries, month over month",
          "Clear visibility into which channels are actually producing customers",
          "Less dependence on any single source of leads",
          "A measurable, trackable cost per lead instead of a guess",
        ],
        relatedCaseStudySlug: "customer-acquisition-retention-system",
        faqs: [
          {
            question: "Do we need a large ad budget to start?",
            answer: "No. The right starting budget depends on your industry, competition and goals — this is one of the things the Growth Assessment helps clarify before any spend commitment is made.",
          },
          {
            question: "Will this replace our existing marketing efforts?",
            answer: "Not necessarily. We usually start by reviewing what's already running and build around what's working, rather than discarding it.",
          },
          {
            question: "How is success measured?",
            answer: "Primarily by qualified leads and cost per lead, tracked back to your CRM — not vanity metrics like impressions or likes.",
          },
        ],
      },
      {
        id: "growth-strategy",
        title: "Growth Strategy & Analytics",
        eyebrow: "02 — GROWTH STRATEGY & ANALYTICS",
        heading: "Know where to focus before you spend more.",
        problem:
          "Budget and effort are going somewhere, but it's difficult to say with confidence which activities are actually driving results.",
        description:
          "We help businesses identify growth opportunities, understand performance and make better decisions using strategy and business data.",
        ideal: [
          "Find growth opportunities",
          "Understand what's working",
          "Improve marketing and sales performance",
          "Make better decisions with data",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/acquire-grow.webp",
        imageAlt: "A concrete staircase leading upward toward daylight.",
        businessChallenge:
          "Data usually exists somewhere — in an ads dashboard, a spreadsheet, a CRM nobody fully trusts — but it rarely gets turned into a decision. Businesses end up choosing where to invest next based on instinct or whoever spoke last in a meeting, rather than a clear view of what's actually moving revenue.",
        whatWeBuild: [
          "A growth audit across acquisition, sales and retention to find the highest-impact gaps",
          "KPI dashboards that bring marketing, sales and operational data into one view",
          "A prioritized roadmap ranking opportunities by impact and effort",
          "A regular cadence of performance reviews so the plan adapts as results come in",
        ],
        process: [
          { stage: "Discover", description: "We audit current performance across acquisition, conversion and retention to establish an honest baseline." },
          { stage: "Design", description: "We identify the two or three highest-impact opportunities rather than a long, unprioritized list." },
          { stage: "Implement", description: "We stand up the dashboards and reporting needed to track the metrics that actually matter to this business." },
          { stage: "Integrate", description: "Reporting is connected to the systems producing the data — CRM, ad platforms, analytics — so it stays current without manual work." },
          { stage: "Optimize", description: "We review the roadmap on a set cadence, retiring what isn't working and doubling down on what is." },
        ],
        technology: ["Google Analytics", "Google Search Console", "Zoho CRM reporting", "KPI dashboards"],
        timeline: "An initial assessment and first dashboard are typically ready within 2–3 weeks; strategic review is an ongoing, not one-off, process.",
        outcomes: [
          "A clear view of what's actually driving revenue",
          "A short, prioritized list of the highest-impact opportunities",
          "Faster, better-informed budget decisions",
          "Less time spent reconciling numbers across disconnected tools",
        ],
        relatedCaseStudySlug: "patient-growth-experience-system",
        faqs: [
          {
            question: "Is this the same as the free Business Growth Assessment?",
            answer: "The Growth Assessment is the entry point — a structured review used to identify priorities. Growth Strategy & Analytics is the ongoing engagement that follows, with dashboards and ongoing review built in.",
          },
          {
            question: "What if our data is scattered across several tools?",
            answer: "That's the normal starting point. Part of this work is consolidating the data that already exists into a single, trustworthy view.",
          },
        ],
      },
    ],
  },
  {
    id: "convert-scale",
    title: "Convert & Scale",
    intro: "Turn opportunities into customers and build systems that support scalable growth.",
    items: [
      {
        id: "crm-sales",
        title: "CRM & Sales Systems",
        eyebrow: "03 — CRM & SALES SYSTEMS",
        heading: "Turn more opportunities into customers.",
        problem:
          "Leads exist in inboxes, WhatsApp threads and someone's memory — not in a system the whole team can see and act on.",
        description:
          "We design systems that organize leads, improve follow-up and give teams greater visibility across the sales process.",
        ideal: [
          "Stop losing track of leads",
          "Improve follow-up",
          "Organize the sales pipeline",
          "Build a more predictable sales process",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/convert-scale.webp",
        imageAlt: "Colleagues reviewing notes together at a wooden table.",
        businessChallenge:
          "When leads live across WhatsApp, personal inboxes and a salesperson's memory, follow-up depends entirely on individual discipline. Some prospects get a fast, thorough response; others wait days or get missed completely — and there's no reliable way to see which is which until a customer is already gone.",
        whatWeBuild: [
          "Zoho CRM setup and pipeline design matched to your actual sales process",
          "Lead-routing and follow-up automation so no inquiry sits untouched",
          "WhatsApp Business integration for the channel customers actually use",
          "Sales reporting that shows pipeline health, not just closed deals",
        ],
        process: [
          { stage: "Discover", description: "We map how leads currently arrive and move through your sales process, including the informal steps that never made it into a system." },
          { stage: "Design", description: "We design a pipeline structure and follow-up rules that match how your team actually sells." },
          { stage: "Implement", description: "We configure Zoho CRM, import existing contacts and set up the automations that keep leads moving." },
          { stage: "Integrate", description: "The CRM connects to your website forms, WhatsApp and marketing channels so leads land in one place automatically." },
          { stage: "Optimize", description: "We review pipeline reports regularly to spot where deals stall and adjust the process accordingly." },
        ],
        technology: ["Zoho CRM", "WhatsApp Business", "Workflow automation", "Sales reporting dashboards"],
        timeline: "CRM setup and an initial pipeline are typically live within 3–4 weeks; full workflow automation is usually complete within 6–8 weeks.",
        outcomes: [
          "No leads lost in inboxes or WhatsApp threads",
          "Faster, more consistent follow-up times",
          "A pipeline the whole team can see and act on",
          "A clearer, more predictable path from inquiry to customer",
        ],
        relatedCaseStudySlug: "lead-generation-sales-system",
        faqs: [
          {
            question: "We already use spreadsheets — is that a problem?",
            answer: "No. Most engagements start there. We typically migrate existing contacts and history into the CRM rather than starting from zero.",
          },
          {
            question: "Does this work with WhatsApp specifically?",
            answer: "Yes — WhatsApp Business integration is a core part of this solution, since it's often where Kenyan businesses actually talk to customers.",
          },
        ],
      },
      {
        id: "business-automation",
        title: "Business Automation",
        eyebrow: "04 — BUSINESS AUTOMATION",
        heading: "Let your business run smarter.",
        problem:
          "Quotes, follow-ups and reporting still depend on someone remembering to do them manually, every single time.",
        description:
          "We automate repetitive processes so teams can spend less time on manual work and more time on customers and growth.",
        ideal: [
          "Reduce repetitive work",
          "Respond faster",
          "Automate follow-ups",
          "Improve operational efficiency",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/operations-workflow.webp",
        imageAlt: "A team member working on a laptop at a standing desk inside an organized operations facility.",
        businessChallenge:
          "As a business grows, the manual processes that worked at a small scale — one person chasing quotes, another manually compiling a weekly report — start to break under their own weight. Work doesn't get faster; it just depends on more people doing more repetitive tasks, with more room for something to be missed.",
        whatWeBuild: [
          "Automated workflows for quotes, follow-ups and client onboarding",
          "Integrations between existing tools via API, so data doesn't need re-entering",
          "Internal notification and reminder systems so nothing depends on memory",
          "Reduced manual data entry across marketing, sales and operations",
        ],
        process: [
          { stage: "Discover", description: "We identify which repetitive tasks consume the most time and carry the highest risk of being missed." },
          { stage: "Design", description: "We design workflows that automate those tasks without removing necessary human judgment." },
          { stage: "Implement", description: "We build and test the automations using your existing tools wherever possible, rather than replacing them outright." },
          { stage: "Integrate", description: "Automations connect across CRM, communication and operational tools so information moves without manual handoffs." },
          { stage: "Optimize", description: "We monitor automation performance and refine rules as processes or volumes change." },
        ],
        technology: ["APIs and integrations", "Workflow automation", "Zoho CRM", "Internal notification systems"],
        timeline: "First automated workflows are typically live within 2–4 weeks, depending on complexity and how many existing tools need to be connected.",
        outcomes: [
          "Less manual administrative work across the team",
          "Faster response times on quotes and follow-ups",
          "Fewer tasks falling through the cracks",
          "Operational capacity that scales without proportionally more headcount",
        ],
        relatedCaseStudySlug: "lead-generation-sales-system",
        faqs: [
          {
            question: "Will automation replace staff roles?",
            answer: "The goal is to remove repetitive manual work, not judgment-based work — freeing people to focus on customers and decisions that need a person.",
          },
          {
            question: "What if our current tools don't have public APIs?",
            answer: "We assess this during the Discover stage. Where a direct integration isn't possible, we design a practical workaround rather than forcing a bad fit.",
          },
        ],
      },
    ],
  },
  {
    id: "build-innovate",
    title: "Build & Innovate",
    intro: "Build intelligent digital infrastructure for the next stage of growth.",
    items: [
      {
        id: "ai-solutions",
        title: "AI Solutions",
        eyebrow: "05 — AI SOLUTIONS",
        heading: "Put AI to work inside your business.",
        problem:
          "Customer questions, internal tasks and routine information requests still take up time that could go toward higher-value work.",
        description:
          "We implement practical AI solutions that help businesses automate tasks, support customers, improve productivity and make better use of their information.",
        ideal: [
          "Introduce AI into operations",
          "Automate intelligent tasks",
          "Improve customer support",
          "Increase productivity",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/modern-office.webp",
        imageAlt: "A sunlit modern office with people working quietly in the background.",
        businessChallenge:
          "Most businesses field the same handful of customer questions, and run the same handful of internal tasks, over and over. Handled manually every time, that repetition consumes hours that could go toward higher-value work — but many teams aren't sure where AI would actually be useful versus where it would just be a gimmick.",
        whatWeBuild: [
          "A business-specific AI assistant, in the spirit of NairobiX's own Nia, trained on your business",
          "Automated responses to common customer questions across web and WhatsApp",
          "AI-assisted internal workflows for research, drafting and routine information tasks",
          "Integration with your CRM and booking systems so AI actions connect to real records",
        ],
        process: [
          { stage: "Discover", description: "We identify the specific, repetitive questions and tasks where AI would create real time savings — not AI for its own sake." },
          { stage: "Design", description: "We define the assistant's scope, tone and guardrails so it represents the business accurately and knows its own limits." },
          { stage: "Implement", description: "We build and test the assistant or workflow against real scenarios before it goes live." },
          { stage: "Integrate", description: "The AI system connects to your CRM, booking and communication tools so it can act, not just answer." },
          { stage: "Optimize", description: "We review real conversations and outcomes to refine responses and expand scope over time." },
        ],
        technology: ["AI assistants (Claude-based)", "AI-powered workflows", "Zoho CRM integration", "WhatsApp Business"],
        timeline: "An initial AI assistant or workflow is typically live within 3–5 weeks; scope expands in phases from there.",
        outcomes: [
          "Faster responses to routine customer questions, at any hour",
          "Less staff time spent on repetitive internal tasks",
          "A foundation for further AI use as the business grows",
          "AI actions that are grounded in real business data, not generic answers",
        ],
        relatedCaseStudySlug: "patient-growth-experience-system",
        faqs: [
          {
            question: "Will the AI assistant make things up?",
            answer: "We design guardrails specifically to prevent this — the assistant is scoped to what it actually knows, and routes anything outside that scope to your team.",
          },
          {
            question: "Do we need our own AI infrastructure?",
            answer: "No. We build on existing AI platforms (such as Anthropic's Claude) rather than requiring you to build or host models yourself.",
          },
        ],
      },
      {
        id: "web-digital-solutions",
        title: "Web & Digital Solutions",
        eyebrow: "06 — WEB & DIGITAL SOLUTIONS",
        heading: "Build digital experiences that move your business forward.",
        problem:
          "The website exists, but it functions as a digital brochure rather than something that actively supports growth.",
        description:
          "We create websites, platforms and digital experiences designed around your customers, business processes and growth objectives.",
        ideal: [
          "Build a stronger digital presence",
          "Improve customer experience",
          "Create digital platforms",
          "Turn a website into a business tool",
        ],
        cta: "Get Your Growth Assessment →",
        href: "/business-growth-audit",
        image: "/images/photography/digital-payment.webp",
        imageAlt: "Two people exchanging phones to complete a digital payment at a retail counter.",
        businessChallenge:
          "A website that exists mainly to look presentable — rather than to capture leads, book appointments or support a sales process — is a missed asset. Many businesses have digital properties that predate their current growth systems, and those properties were never connected to the CRM, booking flow or marketing work built since.",
        whatWeBuild: [
          "A modern marketing website or platform built for both customers and search engines",
          "Custom portals and dashboards for clients, partners or internal teams",
          "Landing pages built specifically for conversion, not just information",
          "Ongoing technical support so the platform keeps pace with the business",
        ],
        process: [
          { stage: "Discover", description: "We review the current site or platform against actual business goals — leads, bookings, sales — rather than aesthetics alone." },
          { stage: "Design", description: "We design the information architecture and user experience around how real customers make decisions." },
          { stage: "Implement", description: "We build the site or platform on modern web technology, with performance and SEO considered from the start." },
          { stage: "Integrate", description: "Forms, bookings and key actions connect directly into your CRM and marketing systems." },
          { stage: "Optimize", description: "We monitor real usage and performance data to refine pages and flows after launch." },
        ],
        technology: ["Modern web applications (Next.js)", "Custom portals and dashboards", "Zoho CRM integration", "Analytics and conversion tracking"],
        timeline: "Focused landing pages typically ship within 2–3 weeks; a full platform or client portal usually takes 6–10 weeks.",
        outcomes: [
          "A website or platform that actively supports growth, not just a digital brochure",
          "A stronger, more credible digital presence",
          "Fewer manual steps between a website visit and a CRM record",
          "A digital experience that matches the quality of the business behind it",
        ],
        relatedCaseStudySlug: "customer-acquisition-retention-system",
        faqs: [
          {
            question: "Do we need to rebuild everything from scratch?",
            answer: "Not always. We assess what's worth keeping — content, brand assets, existing integrations — before deciding what to rebuild versus improve.",
          },
          {
            question: "Will the new site connect to our CRM automatically?",
            answer: "Yes — connecting website forms and actions directly to Zoho CRM is a standard part of this solution, not an optional add-on.",
          },
        ],
      },
    ],
  },
];

export const ALL_SOLUTIONS: SolutionDetail[] = SOLUTION_CATEGORIES.flatMap((category) => category.items);

export const HOME_SOLUTIONS = [
  {
    title: "Acquire & Grow",
    number: "01",
    description: "Build stronger customer acquisition and create measurable demand.",
    image: "/images/photography/acquire-grow.webp",
    imageAlt: "A concrete staircase leading upward toward daylight, framed by tall walls.",
    href: "/solutions#acquire-grow",
    cta: "Explore Solution →",
  },
  {
    title: "Convert & Scale",
    number: "02",
    description: "Turn opportunities into customers and build systems that support scalable growth.",
    image: "/images/photography/convert-scale.webp",
    imageAlt: "Colleagues reviewing notes together at a wooden table during a working session.",
    href: "/solutions#convert-scale",
    cta: "Explore Solution →",
  },
  {
    title: "Build & Innovate",
    number: "03",
    description: "Build intelligent digital infrastructure for the next stage of growth.",
    image: "/images/photography/build-innovate.webp",
    imageAlt: "A spiral staircase viewed from directly above, forming a precise architectural pattern.",
    href: "/solutions#build-innovate",
    cta: "Explore Solution →",
  },
];

export const CASE_STUDIES = [
  {
    slug: "patient-growth-experience-system",
    label: "Healthcare",
    title: "Patient Growth & Experience System",
    description: "How a connected growth system could transform a modern healthcare business.",
    image: "/images/photography/pexels-naboth-otieno-83498565-19805876.jpg",
    imageAlt: "A dental professional attending to a patient in a modern clinic.",
  },
  {
    slug: "customer-acquisition-retention-system",
    label: "Hospitality",
    title: "Customer Acquisition & Retention System",
    description: "How a connected growth system could transform a hospitality brand.",
    image: "/images/photography/case-hospitality.webp",
    imageAlt: "An elegant hotel lobby corridor with an arched doorway and patterned rug.",
  },
  {
    slug: "lead-generation-sales-system",
    label: "Real Estate",
    title: "Lead Generation & Sales System",
    description: "How a connected growth system could transform a real-estate business.",
    image: "/images/photography/cytonn-photography-76JYlSoAYM4-unsplash.jpg",
    imageAlt: "A professionally staged modern living room interior in a Nairobi property.",
  },
];

export const HERO_IMAGE = {
  src: "/images/photography/hero-arrival.webp",
  alt: "Sunlight cutting through a modern architectural walkway, casting long shadows across the floor.",
};

export const WHAT_WE_DO = {
  eyebrow: "WHAT NAIROBIX DOES",
  title: "Not a marketing agency. A connected growth system.",
  body: "NairobiX is not a marketing agency, a software vendor, or an automation consultancy — although the work touches all three. Digital marketing, CRM and sales systems, business automation, AI implementation, web and digital solutions, growth strategy and analytics are brought together as one body of work, because in practice these disciplines determine each other. A campaign that generates leads a sales team can't follow up on is not a marketing problem — it's a systems problem. NairobiX works at the level where growth actually happens: across the whole business, not inside a single department.",
};

export const PROBLEMS_WE_SOLVE = [
  {
    title: "Leads come in, then go quiet.",
    description:
      "Inquiries arrive from ads, referrals or your website, but follow-up is inconsistent, slow, or depends on one person remembering to respond.",
  },
  {
    title: "Marketing and sales don't share a system.",
    description:
      "Your team can see what channels bring in traffic, but has no clear view of what actually turns into paying customers.",
  },
  {
    title: "Growth still runs on manual effort.",
    description:
      "Quotes, follow-ups, onboarding and reporting run on spreadsheets, memory and repeated manual work instead of a system built to carry them.",
  },
  {
    title: "It's unclear where to focus next.",
    description:
      "Budget, time and attention are being spent, but it's difficult to see which investments are actually moving the business forward.",
  },
];

export const GROWTH_APPROACH = [
  {
    step: "Understand",
    description:
      "We review where your business is today — acquisition, sales process, systems and operations — to find what's limiting growth and where the strongest opportunities exist.",
  },
  {
    step: "Build",
    description:
      "We design and implement the systems, digital assets and strategies your business needs, sized to your current stage rather than a fixed package.",
  },
  {
    step: "Connect",
    description:
      "We connect marketing, sales, customer experience and operations so information and follow-up move automatically between them, instead of living in separate tools.",
  },
  {
    step: "Optimize",
    description:
      "We track what the system produces, identify where performance is weakest, and refine it — growth work continues after launch rather than ending at handover.",
  },
];

export const WHY_NAIROBIX = [
  {
    title: "One accountable partner, not five vendors",
    description:
      "Marketing, CRM, automation and web work are usually split across separate freelancers or agencies who don't coordinate. NairobiX carries all of it under one plan, so nothing falls into the gap between two vendors.",
  },
  {
    title: "Built around your business, not a fixed package",
    description:
      "The Business Growth Assessment shapes the plan before any system is built — the goal is the right system for your stage and budget, not a standard bundle sold the same way to every client.",
  },
  {
    title: "Strategy stays connected to execution",
    description:
      "Recommendations are implemented by the same team that made them, and reviewed against what the system actually produces — not handed off as a document and left.",
  },
];

export const ENGAGEMENT_PROCESS = [
  {
    number: "01",
    title: "Share your business",
    description: "Submit the Business Growth Assessment — a structured look at your goals, challenges and current systems.",
  },
  {
    number: "02",
    title: "NairobiX reviews it",
    description: "We review your responses against your industry and growth stage to identify the highest-impact opportunities.",
  },
  {
    number: "03",
    title: "You get a clear plan",
    description: "You receive the priorities and proposed approach in plain terms, with room to ask questions before anything begins.",
  },
  {
    number: "04",
    title: "We build and connect",
    description: "Implementation begins across the agreed systems, with performance reviewed and refined as the engagement continues.",
  },
];

export const INDUSTRIES_SERVED = [
  "Healthcare",
  "Hospitality",
  "Real Estate",
  "Retail & E-commerce",
  "Professional Services",
  "Education",
  "Finance",
  "Construction",
];

export const BUSINESSES_WE_SERVE = [
  { type: "SMEs & Established Businesses", problem: "growth that has plateaued or outgrown ad hoc systems" },
  { type: "Professional Services", problem: "growth that depends on referrals alone" },
  { type: "Healthcare", problem: "inconsistent patient inquiries and follow-up" },
  { type: "Education", problem: "enrollment inquiries that go unanswered" },
  { type: "Real Estate", problem: "slow lead response across listings" },
  { type: "E-commerce & Retail", problem: "inconsistent traffic and cart abandonment" },
  { type: "Hospitality", problem: "seasonal demand and guest retention" },
  { type: "Financial Services", problem: "lead qualification and trust-building at scale" },
  { type: "NGOs & Organizations", problem: "visibility and engagement on limited resources" },
];

export type IndustryDetail = {
  slug: string;
  name: string;
  eyebrow: string;
  heading: string;
  heroImage: string;
  heroImageAlt: string;
  challenge: string;
  opportunities: string[];
  approach: string;
  relevantSolutionIds: string[];
  technology: string[];
  outcomes: string[];
  caseStudySlug?: string;
  faqs: { question: string; answer: string }[];
};

export const INDUSTRIES: IndustryDetail[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    eyebrow: "INDUSTRY · HEALTHCARE",
    heading: "Turn patient inquiries into booked, returning patients.",
    heroImage: "/images/photography/pexels-tima-miroshnichenko-9574453.jpg",
    heroImageAlt: "An empty, well-equipped clinical laboratory workspace.",
    challenge:
      "Patient inquiries arrive through calls, walk-ins and increasingly WhatsApp, but follow-up and appointment reminders are usually handled manually and inconsistently. People who inquire don't always become booked patients, and existing patients drift away without any system actively working to bring them back.",
    opportunities: [
      "Convert more inquiries into booked appointments, not just conversations",
      "Reduce no-shows with automated reminders",
      "Replace a paper or memory-based patient list with a real CRM",
      "Answer common patient questions instantly, without tying up front-desk staff",
    ],
    approach:
      "We connect the channels patients already use — website, phone, WhatsApp — into a single CRM pipeline, then automate the repetitive parts: appointment reminders, common-question responses and follow-up after a missed booking. The front-desk team keeps control of judgment calls; the system handles the rest.",
    relevantSolutionIds: ["crm-sales", "ai-solutions", "business-automation"],
    technology: ["Zoho CRM", "WhatsApp Business", "AI assistants", "Automated appointment reminders"],
    outcomes: [
      "Fewer missed follow-ups with new inquiries",
      "More predictable appointment volume week to week",
      "Less administrative burden on front-desk staff",
      "A documented view of the patient pipeline, not just a booking diary",
    ],
    caseStudySlug: "patient-growth-experience-system",
    faqs: [
      {
        question: "Does this replace our existing clinic management software?",
        answer: "Not necessarily — we typically integrate with what you already use for scheduling and records, adding the CRM, communication and follow-up layer around it.",
      },
      {
        question: "Is patient data handled securely?",
        answer: "Yes. Any system we implement is designed with data protection obligations in mind, consistent with Kenya's Data Protection Act, 2019.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    eyebrow: "INDUSTRY · REAL ESTATE",
    heading: "Respond to listing interest before it goes cold.",
    heroImage: "/images/photography/pexels-mukula-igavinchi-443985808-15496542.jpg",
    heroImageAlt: "An aerial view of the Nairobi central business district skyline.",
    challenge:
      "Listings generate inbound interest across property portals, social media and referrals, but agents often respond manually and inconsistently. Hot leads cool off before a viewing is even scheduled, and there's rarely a shared view of which listings and channels are actually producing serious buyer or tenant interest.",
    opportunities: [
      "Respond to listing inquiries within minutes, not days",
      "Track every lead against the specific property they inquired about",
      "Automate viewing scheduling and follow-up sequences",
      "See which listings and marketing channels actually convert into deals",
    ],
    approach:
      "We build a CRM pipeline structured around properties and buyer or tenant journeys, connect it to WhatsApp for fast response, and pair it with targeted digital marketing so each listing has its own measurable acquisition channel rather than relying on foot traffic and referrals alone.",
    relevantSolutionIds: ["crm-sales", "digital-marketing", "web-digital-solutions"],
    technology: ["Zoho CRM", "WhatsApp Business", "Listing landing pages", "Google Ads", "Meta Ads"],
    outcomes: [
      "Faster response times on new listing inquiries",
      "A clear sales pipeline for every property, not just a shared inbox",
      "Less interest lost between inquiry and viewing",
      "Marketing spend directed toward the channels that actually produce buyers or tenants",
    ],
    caseStudySlug: "lead-generation-sales-system",
    faqs: [
      {
        question: "Can this work across multiple agents and listings at once?",
        answer: "Yes — the CRM pipeline is designed to give each agent visibility into their own leads while giving management a full view across every active listing.",
      },
      {
        question: "Do you handle the property portal integrations?",
        answer: "Where a portal offers an API or lead-notification feed, we connect it directly into the CRM so inquiries don't have to be copied over manually.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    eyebrow: "INDUSTRY · HOSPITALITY",
    heading: "Smooth out seasonal demand and bring guests back.",
    heroImage: "/images/photography/pexels-spoton-pos-2160258094-37594420.jpg",
    heroImageAlt: "A hospitality staff member using a point-of-sale system in a professional kitchen.",
    challenge:
      "Demand is seasonal, guests book across multiple channels — direct, OTAs, walk-in, phone — and repeat-guest relationships often depend on staff memory rather than a system. Slow periods aren't actively managed, and loyal guests aren't specifically re-engaged before they book elsewhere.",
    opportunities: [
      "Smooth out seasonal demand with campaigns timed to historically slow periods",
      "Build a guest CRM that tracks preferences and booking history",
      "Automate booking confirmations, reminders and post-stay follow-up",
      "Use WhatsApp as a direct booking and service channel guests already use",
    ],
    approach:
      "We bring direct, OTA and walk-in bookings into a single guest CRM, automate the communication around a stay — confirmation, reminders, post-stay follow-up — and run acquisition campaigns timed to fill the calendar's weakest periods rather than spending evenly year-round.",
    relevantSolutionIds: ["digital-marketing", "crm-sales", "business-automation"],
    technology: ["Zoho CRM", "WhatsApp Business", "Booking automation", "Meta Ads", "Google Ads"],
    outcomes: [
      "More consistent bookings across the full calendar, not just peak season",
      "A higher repeat-guest rate",
      "Less manual coordination for front-of-house and reservations staff",
      "A clearer picture of guest lifetime value, not just per-stay revenue",
    ],
    caseStudySlug: "customer-acquisition-retention-system",
    faqs: [
      {
        question: "Does this integrate with our existing booking engine or PMS?",
        answer: "In most cases, yes — we connect to your existing booking or property management system rather than replacing it outright, wherever an integration path exists.",
      },
      {
        question: "Can this help with low-season occupancy specifically?",
        answer: "That's usually one of the first priorities — targeted campaigns and guest re-engagement timed to historically slow periods are a core part of this solution.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    eyebrow: "INDUSTRY · PROFESSIONAL SERVICES",
    heading: "Build a pipeline that doesn't depend on referrals alone.",
    heroImage: "/images/photography/pexels-mikhail-nilov-9304659.jpg",
    heroImageAlt: "A professional presenting printed data charts on a whiteboard.",
    challenge:
      "Growth depends heavily on referrals and reputation — valuable, but unpredictable. There's often no structured way to capture and follow up on new inquiries, and no clear, data-driven view of which services or client segments actually produce the most profitable, sustainable work.",
    opportunities: [
      "Build a real pipeline for inbound inquiries instead of relying on referrals alone",
      "Systematize proposal creation and follow-up so nothing depends on memory",
      "Track which services and client types generate the strongest outcomes",
      "Establish a digital presence that supports referral-based trust rather than undercutting it",
    ],
    approach:
      "We set up a CRM pipeline that captures every inquiry — referral or otherwise — standardize proposal and follow-up workflows, and build reporting that shows which services and clients are actually driving profitable growth, so business development decisions rest on evidence rather than instinct.",
    relevantSolutionIds: ["growth-strategy", "crm-sales", "web-digital-solutions"],
    technology: ["Zoho CRM", "KPI dashboards", "Proposal and quote automation", "SEO-optimized web presence"],
    outcomes: [
      "A more predictable pipeline that doesn't depend solely on referrals",
      "Faster proposal turnaround",
      "A clear view of the most profitable service lines and client types",
      "Less inquiry follow-up left to memory or informal tracking",
    ],
    faqs: [
      {
        question: "Will this feel too 'salesy' for a relationship-driven practice?",
        answer: "No — the goal is to organize and speed up follow-up on inquiries you already receive, not to introduce aggressive sales tactics into a referral-based practice.",
      },
      {
        question: "We track clients in spreadsheets today — is that a problem?",
        answer: "That's the typical starting point. We migrate existing client and inquiry records into the CRM rather than asking you to start over.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    eyebrow: "INDUSTRY · E-COMMERCE",
    heading: "Turn more traffic into completed, repeat orders.",
    heroImage: "/images/photography/pexels-kaypics-27926809.jpg",
    heroImageAlt: "A market vendor using a smartphone at an open-air produce stall.",
    challenge:
      "Traffic arrives through ads, social and search, but cart abandonment, inconsistent WhatsApp order handling and no unified view of customers across channels mean much of that traffic never turns into repeat, reliable revenue.",
    opportunities: [
      "Recover abandoned carts and incomplete WhatsApp orders systematically",
      "Connect ad performance directly to actual completed sales, not just clicks",
      "Build customer profiles that span website, WhatsApp and social orders",
      "Automate order confirmations, shipping updates and re-engagement campaigns",
    ],
    approach:
      "We connect advertising, storefront and WhatsApp ordering into a single customer record, automate the follow-up around abandoned carts and incomplete orders, and build reporting that ties ad spend directly to completed sales rather than clicks and impressions.",
    relevantSolutionIds: ["digital-marketing", "business-automation", "ai-solutions"],
    technology: ["Meta Ads", "Google Ads", "WhatsApp Business", "Zoho CRM", "AI-assisted order handling"],
    outcomes: [
      "Lower cart and incomplete-order abandonment",
      "A clear, trustworthy view of return on ad spend",
      "Unified customer records across website, WhatsApp and social orders",
      "Faster order-to-fulfillment handling",
    ],
    faqs: [
      {
        question: "Does this work if most of our orders come through WhatsApp, not a website?",
        answer: "Yes — WhatsApp-first order flows are common in Kenya, and the CRM and automation are built to handle that as a primary channel, not an afterthought.",
      },
      {
        question: "Can you work with our existing online store platform?",
        answer: "In most cases, yes. We connect to your existing storefront rather than requiring a platform migration, unless the platform itself is limiting growth.",
      },
    ],
  },
];

export const CLIENT_WORKSPACE = {
  eyebrow: "THE NAIROBIX WORKSPACE",
  title: "A shared space for the work itself, not just the emails about it.",
  description:
    "Once an engagement begins, clients and partners get access to a dedicated NairobiX workspace — a single place to track project visibility, deliverables, growth reports and open requests, so collaboration doesn't depend on scattered emails and calls. It's part of how NairobiX works day to day, not a separate product.",
};

export const WORKSPACE_FEATURES = [
  {
    id: "visibility",
    title: "Project visibility",
    description: "Track active work, milestones and deliverables.",
  },
  {
    id: "reporting",
    title: "Growth reporting",
    description: "See performance and progress in one place.",
  },
  {
    id: "communication",
    title: "Open communication",
    description: "Submit requests and stay connected with the NairobiX team.",
  },
  {
    id: "nia",
    title: "Nia Growth Assistant",
    description: "Get guidance and quick answers whenever you need them.",
  },
];

export const PARTNER_PORTAL_NOTE =
  "Active partners get access to the NairobiX Partner Portal — a shared space for tracking referrals, requests and updates, so collaboration stays organized as the partnership grows.";

export const CONTACT_EMAIL = "hello@nairobix.com";

export const FAQS = [
  {
    question: "What does NairobiX actually do?",
    answer:
      "NairobiX helps businesses improve growth by connecting strategy, acquisition, sales systems, automation, web and digital solutions, and AI implementation into a single operating system.",
  },
  {
    question: "Do you offer individual services or complete growth systems?",
    answer:
      "We work best with businesses that want a connected growth system, but we can also support the specific areas that matter most right now.",
  },
  {
    question: "How do I know which solution my business needs?",
    answer:
      "The quickest way is to start with the Business Growth Assessment. It helps identify the gaps and priorities most likely to move your business forward.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. We work with ambitious businesses that are ready to improve growth, operations and conversion, whether they are early-stage or established.",
  },
  {
    question: "How much do NairobiX services cost?",
    answer:
      "Every engagement depends on the business, the scope and the level of implementation required. We usually start with a strategic assessment to clarify the right next step.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timelines depend on the scope. Some systems can be launched quickly, while broader transformation work takes longer and is phased appropriately.",
  },
  {
    question: "Can NairobiX work with our existing tools?",
    answer:
      "Yes. We regularly work within existing platforms and can connect systems, improve workflows and ensure the right tools support growth instead of creating more friction.",
  },
  {
    question: "What is the Business Growth Assessment?",
    answer:
      "It is a structured review of your current growth engine, team workflow, acquisition, sales processes and operational systems. The aim is to highlight priorities and practical next steps.",
  },
];
