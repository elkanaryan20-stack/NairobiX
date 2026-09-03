export const BOOKING_URL = "https://nairobix.zohobookings.com/4940054000000039045";

export const BOTPRESS_SHARE_URL =
  "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/08/01/07/20260801073051-QOAXJ859.json";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Partnership", href: "/partnership" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  solutions: [
    { label: "Acquire & Grow", href: "/solutions#acquire-grow" },
    { label: "Convert & Scale", href: "/solutions#convert-scale" },
    { label: "Build & Innovate", href: "/solutions#build-innovate" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Partnership", href: "/partnership" },
    { label: "Contact", href: "/contact" },
  ],
  start: [
    { label: "Free Business Growth Assessment", href: "/business-growth-audit", external: false },
    { label: "Book a Consultation", href: BOOKING_URL, external: true },
    { label: "Talk to Nia", href: BOTPRESS_SHARE_URL, external: true, chat: true },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/share/1F7emKasFD/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/nairobixgrowth", icon: "instagram" },
  { label: "X", href: "https://x.com/NairobiX_", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nairobix-agency/", icon: "linkedin" },
  { label: "WhatsApp", href: "https://wa.me/254105426364", icon: "whatsapp" },
];

export const SOLUTION_CATEGORIES = [
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/nairobi-skyline.webp",
        imageAlt: "The Nairobi city skyline under a bright midday sky.",
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/acquire-grow.webp",
        imageAlt: "A concrete staircase leading upward toward daylight.",
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/convert-scale.webp",
        imageAlt: "Colleagues reviewing notes together at a wooden table.",
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/operations-workflow.webp",
        imageAlt: "A team member working on a laptop at a standing desk inside an organized operations facility.",
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/modern-office.webp",
        imageAlt: "A sunlit modern office with people working quietly in the background.",
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
        cta: "Request Solution →",
        href: "/request-solution",
        image: "/images/photography/digital-payment.webp",
        imageAlt: "Two people exchanging phones to complete a digital payment at a retail counter.",
      },
    ],
  },
];

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
    image: "/images/photography/case-healthcare.webp",
    imageAlt: "Warm wood beams and white architectural curves inside a premium modern building.",
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
    image: "/images/photography/case-realestate.webp",
    imageAlt: "A contemporary building at dusk with warm interior light glowing through the windows.",
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

export const CLIENT_WORKSPACE = {
  eyebrow: "THE NAIROBIX WORKSPACE",
  title: "A shared space for the work itself, not just the emails about it.",
  description:
    "Once an engagement begins, clients and partners get access to a dedicated NairobiX workspace — a single place to track project visibility, deliverables, growth reports and open requests, so collaboration doesn't depend on scattered emails and calls. It's part of how NairobiX works day to day, not a separate product.",
};

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
