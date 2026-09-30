// Industry contexts for /industries. Written as common patterns, not claims:
// every statement about a sector is hedged ("common patterns can include",
// "depending on…"), no outcomes are promised, and no case studies are
// implied. `detailSlug` links to an /industries/[slug] page where one exists.

export type IndustryContext = {
  slug: string;
  name: string;
  /** A few words for the index row. */
  short: string;
  image: string;
  imageAlt: string;
  context: string;
  friction: string;
  opportunities: string[];
  solutionIds: string[];
  startingPoint: string;
  detailSlug?: string;
};

export const INDUSTRY_CONTEXTS: IndustryContext[] = [
  {
    slug: "smes",
    name: "SMEs & Established Businesses",
    short: "Grown on reputation; now outgrowing informal systems",
    image: "/images/photography/pexels-cadomaestro-1170412.jpg",
    imageAlt: "An open-plan office with people working at desks under exposed ceilings.",
    context:
      "Businesses that have grown through the founders' effort, relationships and reputation, and now have more customers, staff and moving parts than their informal systems were built for.",
    friction:
      "Common patterns can include growth that has plateaued, marketing that runs in bursts, customer information spread across phones and spreadsheets, and owners who remain the bottleneck for decisions and follow-up.",
    opportunities: [
      "A clear view of where enquiries come from and where they are lost",
      "A shared customer record instead of personal phones",
      "Routine follow-up and reporting that no longer depend on the owner",
    ],
    solutionIds: ["growth-strategy", "crm-sales", "business-automation"],
    startingPoint:
      "Typically a Growth Assessment to find the one or two constraints that matter most, before any system is chosen.",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    short: "Relationship-led, referral-driven, longer cycles",
    image: "/images/photography/pexels-silverkblack-36766680.jpg",
    imageAlt: "Two professionals in conversation across a meeting table with coffee and papers.",
    context:
      "Relationship-driven acquisition, referrals, longer sales cycles and high-value engagements, where trust has to be established before a proposal is even considered.",
    friction:
      "Leads and referrals may arrive through personal networks, email and WhatsApp, making follow-up and pipeline visibility difficult. Proposals can stall for weeks without anyone noticing.",
    opportunities: [
      "A pipeline that shows every open opportunity and its next step",
      "Consistent, timely follow-up on proposals",
      "Visibility and content that support referrals rather than replace them",
    ],
    solutionIds: ["growth-strategy", "crm-sales", "business-automation", "digital-marketing"],
    startingPoint:
      "Often mapping the path from first conversation to signed engagement, then a CRM pipeline configured around it.",
    detailSlug: "professional-services",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Sensitive data, bookings, reminders and return visits",
    image: "/images/photography/pexels-xtrovarts-16903641.jpg",
    imageAlt: "A clinician in scrubs attending to a patient in a treatment chair.",
    context:
      "Patient enquiries arrive through calls, walk-ins and increasingly WhatsApp. Bookings, reminders and follow-up are handled by busy front-desk teams, and patient information is sensitive.",
    friction:
      "Depending on the practice, common patterns include enquiries that never become bookings, missed appointments, and returning patients who drift away because nothing prompts them back.",
    opportunities: [
      "Enquiries captured and answered consistently across channels",
      "Automated appointment reminders with an easy route to reschedule",
      "Follow-up that brings patients back when their care calls for it",
    ],
    solutionIds: ["crm-sales", "business-automation", "ai-solutions"],
    startingPoint:
      "Usually the enquiry-to-booking path and appointment reminders — designed with data protection obligations in mind from the start.",
    detailSlug: "healthcare",
  },
  {
    slug: "education",
    name: "Education",
    short: "Considered decisions, intake peaks, several decision-makers",
    image: "/images/photography/pexels-mikhail-nilov-9304659.jpg",
    imageAlt: "A woman presenting charts on a whiteboard to an audience.",
    context:
      "Enrolment is a considered decision, often made by parents or sponsors over weeks or months, with sharp peaks in enquiries around intake periods.",
    friction:
      "Common patterns can include intake-period enquiries outpacing the admissions team, parents or students who never hear back, and little visibility of which channels actually produce enrolments.",
    opportunities: [
      "An admissions pipeline from first enquiry to enrolment",
      "Timely, consistent follow-up through the decision period",
      "Reporting on which channels produce enrolments, not just enquiries",
    ],
    solutionIds: ["crm-sales", "digital-marketing", "web-digital-solutions"],
    startingPoint:
      "Often the admissions enquiry process ahead of the next intake: the website forms, the first response and the follow-up.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    short: "High enquiry volume, specific units, interest that cools fast",
    image: "/images/photography/pexels-youngafrikanna-36964425.jpg",
    imageAlt: "An aerial view of central Nairobi's towers and dense city blocks at golden hour.",
    context:
      "Enquiries arrive in volume from listing sites, social media and signboards, often about a specific unit, and a prospect's interest can go cold within hours.",
    friction:
      "Depending on the agency or developer, common patterns include slow responses to listing enquiries, agents handling leads on personal phones, and little record of which listings and channels produce viewings and sales.",
    opportunities: [
      "Fast, consistent first responses to listing enquiries",
      "Enquiries assigned to agents, with a shared record",
      "Visibility of enquiries, viewings and conversions by listing and source",
    ],
    solutionIds: ["crm-sales", "digital-marketing", "business-automation"],
    startingPoint:
      "Typically response time and lead assignment across the channels enquiries already come through.",
    detailSlug: "real-estate",
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    short: "Many channels to buy, mobile payments, repeat customers",
    image: "/images/photography/pexels-kindelmedia-6995134.jpg",
    imageAlt: "A person holding a payment card while shopping on a laptop.",
    context:
      "Customers discover, compare and buy across websites, social media, marketplaces, WhatsApp and physical stores, often paying by mobile money or card.",
    friction:
      "Common patterns can include inconsistent traffic, abandoned orders, stock and order information held in different places, and past customers the business cannot easily reach again.",
    opportunities: [
      "A store and checkout that work well on a phone",
      "Order and customer data connected rather than scattered",
      "Retention through consented follow-up with past customers",
    ],
    solutionIds: ["web-digital-solutions", "digital-marketing", "business-automation"],
    startingPoint:
      "Often the purchase path itself — from product page to payment and confirmation — before spending more on traffic.",
    detailSlug: "ecommerce",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    short: "Seasonal demand, many booking channels, the stay after the stay",
    image: "/images/photography/pexels-naimbic-2291636.jpg",
    imageAlt: "A hotel terrace restaurant beside a lit pool at dusk.",
    context:
      "Demand is seasonal, bookings arrive through many channels, and the guest experience runs from the first enquiry to the review written after departure.",
    friction:
      "Depending on the property, common patterns include direct enquiries answered slowly, heavy dependence on third-party booking platforms, and little structured contact with past guests.",
    opportunities: [
      "Direct enquiries handled quickly and consistently",
      "Pre-arrival and post-stay communication that runs reliably",
      "A guest record that supports return visits",
    ],
    solutionIds: ["crm-sales", "business-automation", "digital-marketing"],
    startingPoint:
      "Usually the direct-enquiry and booking path, where response speed has the most visible effect.",
    detailSlug: "hospitality",
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    short: "Trust, qualification, documents and compliance",
    image: "/images/photography/pexels-rdne-10376257.jpg",
    imageAlt: "Seen from above, a man in a shirt and tie works through printed forms beside a laptop.",
    context:
      "Trust, compliance and careful qualification shape every stage, from the first enquiry to onboarding, and many products involve documents and verification.",
    friction:
      "Common patterns can include manual, slow lead qualification, applications that stall between steps, and customer communication that must be accurate and compliant every time.",
    opportunities: [
      "Qualification that routes the right enquiries to the right people",
      "Application and onboarding steps tracked, so nothing stalls unseen",
      "Clear, consistent communication at each step",
    ],
    solutionIds: ["crm-sales", "business-automation", "growth-strategy"],
    startingPoint:
      "Often mapping the enquiry-to-onboarding journey and finding where applicants drop out.",
  },
  {
    slug: "ngos-organizations",
    name: "NGOs & Organizations",
    short: "Supporters, partners and members, on limited resources",
    image: "/images/photography/pexels-edmond-dantes-8550500.jpg",
    imageAlt: "Three colleagues in conversation around a table in a bright office.",
    context:
      "Organisations that need visibility, engagement and trust with supporters, partners, beneficiaries or members — often with small teams and limited budgets.",
    friction:
      "Common patterns can include supporter and partner information spread across spreadsheets and inboxes, communication that depends on a few people, and difficulty presenting the work clearly and consistently.",
    opportunities: [
      "A single record of supporters, partners and interactions",
      "Routine communication that runs without extra staff time",
      "A web presence that explains the work clearly",
    ],
    solutionIds: ["web-digital-solutions", "crm-sales", "business-automation"],
    startingPoint:
      "Usually a clear picture of who the organisation needs to reach, and the simplest system that keeps those relationships organised.",
  },
];

/** What changes the growth problem from one business to the next. */
export const CONTEXT_DIMENSIONS = [
  {
    name: "Acquisition model",
    question: "Where do your best customers come from?",
    from: "Referrals and relationships",
    to: "Campaigns at volume",
  },
  {
    name: "Customer journey",
    question: "How many touchpoints before someone decides?",
    from: "One conversation",
    to: "Many, over weeks",
  },
  {
    name: "Sales cycle",
    question: "How long, and how many people decide?",
    from: "Same day, one person",
    to: "Months, several people",
  },
  {
    name: "Operational constraints",
    question: "What limits how you can work?",
    from: "Flexible and informal",
    to: "Regulated, sensitive data",
  },
  {
    name: "Technology requirements",
    question: "What does the system have to connect?",
    from: "Messaging and a simple record",
    to: "Payments, portals, integrations",
  },
];
