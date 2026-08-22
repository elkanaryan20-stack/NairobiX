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
    { label: "Book a Consultation", href: "https://nairobix.zohobookings.com/4940054000000039045", external: true },
    { label: "Talk to Nia", href: "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/08/01/07/20260801073051-QOAXJ859.json", external: true, chat: true },
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
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "growth-strategy",
        title: "Growth Strategy & Analytics",
        eyebrow: "02 — GROWTH STRATEGY & ANALYTICS",
        heading: "Know where to focus before you spend more.",
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
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
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
        image:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "business-automation",
        title: "Business Automation",
        eyebrow: "04 — BUSINESS AUTOMATION",
        heading: "Let your business run smarter.",
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
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
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
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "web-digital-solutions",
        title: "Web & Digital Solutions",
        eyebrow: "06 — WEB & DIGITAL SOLUTIONS",
        heading: "Build digital experiences that move your business forward.",
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
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

export const HOME_SOLUTIONS = [
  {
    title: "Acquire & Grow",
    number: "01",
    description: "Build stronger customer acquisition and create measurable demand.",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    href: "/solutions#acquire-grow",
    cta: "Explore Solution →",
  },
  {
    title: "Convert & Scale",
    number: "02",
    description: "Turn opportunities into customers and build systems that support scalable growth.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    href: "/solutions#convert-scale",
    cta: "Explore Solution →",
  },
  {
    title: "Build & Innovate",
    number: "03",
    description: "Build intelligent digital infrastructure for the next stage of growth.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "customer-acquisition-retention-system",
    label: "Hospitality",
    title: "Customer Acquisition & Retention System",
    description: "How a connected growth system could transform a hospitality brand.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "lead-generation-sales-system",
    label: "Real Estate",
    title: "Lead Generation & Sales System",
    description: "How a connected growth system could transform a real-estate business.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
];

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
