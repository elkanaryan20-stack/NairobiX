import type { CaseStudy } from "../types";

export const realEstateLeadToSales: CaseStudy = {
  slug: "real-estate-lead-to-sales-system",
  name: "Real Estate Lead-to-Sales System",
  industry: "Real Estate",
  title: "From listing enquiries to a pipeline every agent can see.",
  thesis:
    "How NairobiX would connect enquiries from portals, social media, WhatsApp and referrals into one pipeline organised around properties as well as people.",
  problem:
    "An agency receives enquiries from portals, social media, WhatsApp and signboards, but response and follow-up depend on individual agents and their phones.",
  areas: ["CRM & Sales", "Automation", "Growth"],
  solutionIds: ["crm-sales", "business-automation", "digital-marketing", "growth-strategy"],
  focus: "Lead-to-sales system",
  image: "/images/photography/aziz-kouri-CzWpHIxs91s-unsplash.jpg",
  imageAlt: "A two-storey residential house with a wide lawn in late-afternoon light.",
  portrait: [
    {
      kind: "chat",
      contact: "Agency · Business account",
      messages: [
        { from: "customer", text: "Is the 2-bedroom in Kileleshwa (ref KL-204) still available?", tag: "Saturday · 8:40pm" },
        { from: "business", text: "Yes — KL-204 is available from the 1st. Viewings this week: Tue 4pm, Thu 10am. Brian will confirm.", tag: "Automated · unit details from listing" },
      ],
    },
    {
      kind: "record",
      title: "Deal · KL-204 · 2-bed apartment",
      stage: "Viewing booked",
      rows: [
        ["Prospect", "Enquiry via portal → WhatsApp"],
        ["Agent", "Brian O."],
        ["Move-in", "Within 4 weeks"],
        ["Viewing", "Tue 16:00"],
      ],
    },
    {
      kind: "report",
      title: "KL-204 · landlord activity · layout",
      rows: [
        { label: "Enquiries", share: 0.9 },
        { label: "Viewings", share: 0.45 },
        { label: "Applications", share: 0.15 },
      ],
    },
  ],
  context: {
    paragraphs: [
      "Consider a Nairobi property agency handling lettings and sales for residential developments and individual landlords. Listings appear on property portals, the agency's social accounts, signboards and its own website.",
      "A prospective tenant typically enquires about a specific unit — often on WhatsApp, often in the evening or at the weekend — and is usually talking to several agencies at once. Buyers take longer, involve family and financing, and need to be kept warm over weeks.",
      "The agents work hard and many are excellent at closing. But each agent runs their own enquiries on their own phone, and management's view of demand is whatever the agents report on Monday.",
    ],
    assumptions: [
      { label: "Team", value: "8–15 agents, plus an office team handling listings and administration" },
      { label: "Where enquiries come from", value: "Property portals, Instagram and Facebook, WhatsApp, signboards, referrals" },
      { label: "Decision speed", value: "Days for lettings; weeks to months for sales" },
      { label: "Current tools", value: "Agents' personal WhatsApp, a listings spreadsheet, portal inboxes" },
    ],
    works: [
      "A good inventory of listings",
      "Agents with real local knowledge",
      "Steady enquiry volume from portals and social media",
      "Relationships with developers and landlords",
    ],
    manual: [
      "Copying portal enquiries into WhatsApp conversations",
      "Deciding which agent takes each enquiry",
      "Booking, confirming and re-confirming viewings",
      "Assembling activity updates for landlords by hand",
    ],
  },
  problemIntro:
    "In property, interest is perishable and prospects compare agencies in parallel. The system problem is less about the number of enquiries than about speed, ownership and memory — and about a pipeline that has two dimensions, people and units.",
  problemLayers: [
    {
      layer: "Marketing",
      issue: "Listings are promoted on several portals and social accounts, with no view of which produce viewings.",
      effect: "Spend follows habit rather than results.",
    },
    {
      layer: "Capture",
      issue: "Enquiries land in portal inboxes, direct messages, agents' phones and the office line.",
      effect: "Evening and weekend enquiries wait until someone happens to notice.",
    },
    {
      layer: "Qualification",
      issue: "Budget, move-in date and requirements are asked inconsistently.",
      effect: "Viewings are booked for prospects who were never a fit, while good prospects wait.",
    },
    {
      layer: "Follow-up",
      issue: "After a viewing, the next step depends on the agent's memory.",
      effect: "Interested prospects drift to the agency that called back.",
    },
    {
      layer: "Sales",
      issue: "Deal status sits with individual agents.",
      effect: "Management cannot see which units are close to letting or selling.",
    },
    {
      layer: "Reporting",
      issue: "Landlords ask what is happening with their property; the answer is assembled by hand.",
      effect: "The agency cannot show the work it does — or learn from it.",
    },
  ],
  opportunity: {
    statement:
      "The opportunity is to answer faster than competitors, keep every prospect attached to the right unit and the right agent, and give management and landlords a true picture of activity.",
    paragraphs: [
      "A pipeline that tracks only people loses the question landlords care about most: what is happening with my property? A pipeline that tracks only units loses the prospect who would have taken a different one. The design links the two.",
      "Speed matters here more than in most sectors, because the prospect is comparing agencies in real time. The first priority is therefore the first hour after an enquiry, including evenings and weekends — without asking agents to be on call around the clock.",
    ],
    focus: ["Capture", "Qualify", "Nurture", "Convert", "Measure"],
  },
  system: {
    intro:
      "The proposed architecture has eight layers, organised so that every enquiry is attached to a unit, an agent and a next step within minutes of arriving. Select a layer to see what it does and why.",
    layers: [
      {
        id: "listings",
        name: "Listings & campaigns",
        what: "Portal listings, social posts and paid promotion, each carrying the unit reference and a tagged link or pre-filled WhatsApp message.",
        why: "So every enquiry arrives already attached to a unit and a source.",
        carries: "Unit reference, channel and campaign.",
        next: "Prospects enquire through the channel they prefer.",
      },
      {
        id: "capture",
        name: "Enquiry capture",
        what: "Portal notification emails, WhatsApp, website forms and logged calls all create or update a record in the CRM.",
        why: "An enquiry held only on one agent's phone is invisible to everyone else — and lost if that agent is busy or leaves.",
        carries: "Contact details, unit reference, source and the first message.",
        next: "The enquiry is matched to its unit and assigned.",
      },
      {
        id: "crm",
        name: "CRM: people and units",
        what: "Contacts and deals, each deal linked to a unit record holding the listing details and landlord.",
        why: "It answers both questions — who is this prospect, and what is happening with this property.",
        carries: "Prospect history, unit status, agent and stage.",
        next: "Each new deal is assigned to an agent.",
      },
      {
        id: "assignment",
        name: "Assignment",
        what: "Rules that route each enquiry to the listing agent, or by area or rota when the listing agent is unavailable.",
        why: "Ownership decided by rule is faster and fairer than ownership decided by whoever saw it first.",
        carries: "Owner, and the time assigned.",
        next: "The agent qualifies the prospect.",
      },
      {
        id: "qualification",
        name: "Qualification",
        what: "A short, consistent set of questions: move-in date or purchase timeline, budget, must-haves and, for sales, financing.",
        why: "So agents spend viewing time on prospects who fit — and can suggest other units to those who don't.",
        carries: "Qualification answers and fit.",
        next: "Qualified prospects are offered viewing slots.",
      },
      {
        id: "viewings",
        name: "Viewing scheduling",
        what: "Viewing slots per unit, with confirmations, a location pin and a reminder the day before.",
        why: "Viewings are where letting decisions are made; no-shows waste the agent's most valuable time.",
        carries: "Viewing time, attendance and the agent's notes afterwards.",
        next: "After the viewing, a follow-up task is created.",
      },
      {
        id: "pipeline",
        name: "Deal pipeline",
        what: "Stages from Enquiry to Qualified, Viewing booked, Viewed, Application or Offer, and Let, Sold or Lost.",
        why: "So agents and management see the same picture, and stalled deals are visible.",
        carries: "Stage, expected close and loss reasons.",
        next: "Closed deals move to lease or sale administration; data flows to reporting.",
      },
      {
        id: "reporting",
        name: "Reporting",
        what: "Weekly activity by unit, agent and source — and a landlord report generated from the same data.",
        why: "It turns the agency's work into something landlords can see, and shows which channels produce viewings.",
        carries: "Enquiries, viewings, applications and outcomes.",
        next: "Marketing and pricing conversations with landlords are based on evidence.",
      },
    ],
  },
  beforeAfter: {
    before: [
      "Portal inbox emails",
      "Agents' personal WhatsApp",
      "The office phone line",
      "A listings spreadsheet",
      "Viewings in agents' own calendars",
      "Landlord updates written by hand",
    ],
    beforeNote: "Every agent runs a private system. The agency has no shared memory.",
    after: ["Listings & campaigns", "Capture", "CRM: people + units", "Assignment", "Qualification", "Viewings", "Deal pipeline", "Reporting"],
    afterNote: "Every enquiry attached to a unit, an agent and a next step.",
  },
  journey: [
    {
      stage: "Discover",
      customer: "On a Saturday evening, a young professional sees a 2-bedroom apartment on a property portal.",
      business: "The listing carries the unit reference and a WhatsApp link with a pre-filled message.",
    },
    {
      stage: "Enquire",
      customer: "She taps the link; the message already names the unit. She asks if it's still available.",
      business: "A new conversation arrives on the agency's business number, not an agent's personal phone.",
      fragment: {
        kind: "chat",
        contact: "Agency · Business account",
        messages: [
          { from: "customer", text: "Hi, I'm interested in KL-204, the 2-bedroom in Kileleshwa. Still available?" },
          { from: "business", text: "Yes, KL-204 is available from the 1st. Rent and deposit details are below. Brian, the listing agent, will be in touch to arrange a viewing.", tag: "Automated · from listing data" },
        ],
      },
    },
    {
      stage: "Capture",
      customer: "Within a minute she has the key facts — and knows a named person will follow up.",
      business: "The CRM matches the reference, creates a deal linked to KL-204 and assigns it to the listing agent.",
      fragment: {
        kind: "record",
        title: "Deal · KL-204",
        stage: "New",
        rows: [
          ["Source", "Portal → WhatsApp"],
          ["Unit", "KL-204 · 2-bed · Kileleshwa"],
          ["Agent", "Brian O."],
          ["Next action", "Qualify · by Sun 10:00"],
        ],
      },
    },
    {
      stage: "Qualify",
      customer: "The next morning, Brian asks three questions: move-in date, budget, anything essential.",
      business: "Her answers are recorded. She fits; he also notes a similar unit nearby, in case.",
    },
    {
      stage: "View",
      customer: "She books Tuesday at 4pm, gets a confirmation with a location pin, and a reminder on Monday.",
      business: "The viewing is on the unit's schedule; the agent's day plan updates.",
      fragment: {
        kind: "task",
        title: "Viewing reminder sent · KL-204",
        meta: "Mon 09:00 · Automated",
        body: "Reminder with location pin sent to prospect. Brian's schedule: 3 viewings Tue, including KL-204 at 16:00.",
      },
    },
    {
      stage: "Follow up",
      customer: "The day after the viewing, Brian calls to answer her remaining questions.",
      business: "A follow-up task was created automatically when the viewing was marked attended.",
    },
    {
      stage: "Convert",
      customer: "She applies. The next steps — documents, deposit, lease — are clear.",
      business: "The deal moves to Application, then Let. The unit's status updates on every channel.",
      fragment: {
        kind: "pipeline",
        title: "Lettings pipeline · this week",
        columns: [
          { name: "Viewing booked", cards: ["RW-110 · 3-bed", "KL-310 · studio"] },
          { name: "Application", cards: ["KL-204 · 2-bed"], active: true },
          { name: "Let", cards: ["LV-022 · 1-bed"] },
        ],
      },
    },
    {
      stage: "Deliver",
      customer: "Lease signing and handover follow a checklist; she knows whom to contact after moving in.",
      business: "Handover tasks are created from the closed deal; her record is kept for future moves and referrals.",
    },
    {
      stage: "Measure",
      customer: "Her landlord receives a clear report of the activity on the unit.",
      business: "Weekly reporting shows enquiries, viewings and lets by unit, agent and source.",
      fragment: {
        kind: "report",
        title: "Viewings by source · layout",
        rows: [
          { label: "Portal A", share: 0.7 },
          { label: "Instagram", share: 0.45 },
          { label: "Signboards", share: 0.3 },
          { label: "Referrals", share: 0.25 },
        ],
      },
    },
  ],
  technology: {
    intro:
      "The requirements — people linked to units, fast routing, scheduled messages and reporting per property — decide the stack. Much of it may already exist in the agency; the work is connecting it.",
    items: [
      {
        keys: ["zoho"],
        name: "Zoho CRM",
        capability: "CRM",
        role: "Contacts and deals, with a module for units so each deal is linked to a property.",
        reason: "Custom modules, assignment rules and workflow automation without custom software.",
        layer: "CRM · Assignment · Pipeline · Reporting",
      },
      {
        keys: ["whatsapp"],
        name: "WhatsApp Business Platform",
        capability: "Messaging",
        role: "The channel most prospects use to enquire and confirm viewings.",
        reason: "Connected to the CRM, it lets acknowledgements and viewing confirmations run from the record — with approved templates outside the 24-hour window.",
        layer: "Capture · Viewings · Follow-up",
      },
      {
        keys: ["meta"],
        name: "Meta — Facebook & Instagram",
        capability: "Social acquisition",
        role: "Promotion of featured listings, and the social channels where many enquiries start.",
        reason: "Where the audience already is; campaign links carry the unit and source.",
        layer: "Listings & campaigns",
      },
      {
        keys: ["wordpress"],
        name: "WordPress",
        capability: "Website",
        role: "The agency's website and listing pages, where the site already runs on it.",
        reason: "No need to rebuild what works — listing pages gain viewing requests and WhatsApp entry points.",
        layer: "Listings · Capture",
      },
    ],
  },
  automation: {
    intro:
      "Two workflows carry most of the load: the first hour after an enquiry, and the days around a viewing. Both end in a person.",
    workflows: [
      {
        name: "New listing enquiry",
        steps: [
          { kind: "Trigger", text: "A portal enquiry email, WhatsApp message or website form arrives." },
          { kind: "Rule", text: "Identify the unit reference; if it's missing, ask the prospect which property they mean." },
          { kind: "Action", text: "Create or match the contact, and create a deal linked to the unit." },
          { kind: "Notification", text: "Assign to the listing agent — or the rota agent if they are unavailable — and notify them." },
          { kind: "Follow-up", text: "Send an immediate acknowledgement with the unit's key facts and the agent's name." },
          { kind: "Human", text: "The agent qualifies the prospect and offers viewing times." },
          { kind: "Measure", text: "Record time to acknowledgement and to first agent contact, by source." },
        ],
      },
      {
        name: "Viewing to next step",
        steps: [
          { kind: "Trigger", text: "A viewing is booked." },
          { kind: "Rule", text: "The day before at 9am, if the viewing is still scheduled…" },
          { kind: "Action", text: "…send a reminder with the time and a location pin." },
          { kind: "Notification", text: "Add the viewing to the agent's day plan." },
          { kind: "Follow-up", text: "When the viewing is marked attended, create a follow-up task for the next day." },
          { kind: "Human", text: "The agent calls to discuss, answers questions and agrees the next step." },
          { kind: "Measure", text: "Track no-shows and viewing-to-application rate by unit." },
        ],
      },
    ],
  },
  outcomes: [
    { title: "Fast, consistent first response", text: "Every enquiry is acknowledged with real unit information — including evenings and weekends." },
    { title: "Clear ownership", text: "Each prospect is attached to a named agent and a specific unit." },
    { title: "No lost weekend enquiries", text: "Enquiries wait in a shared system with an owner, not on a phone nobody is checking." },
    { title: "Pipeline visibility per listing", text: "Management can see which units are close to letting or selling, and which are stuck." },
    { title: "Better landlord reporting", text: "Activity reports come from the same data the agents use." },
    { title: "Spend guided by viewings", text: "Promotion decisions can be based on which channels produce viewings, not views." },
    { title: "Continuity when people change", text: "An agent's prospects and history stay with the agency." },
    { title: "A foundation for more", text: "Clean unit and deal data make further automation — and AI drafting from listing sheets — practical." },
  ],
  measurement: [
    {
      group: "Acquisition",
      metrics: [
        { name: "Enquiries by source and unit", definition: "Where demand comes from, per listing." },
        { name: "Cost per viewing", definition: "Where paid promotion is used." },
      ],
    },
    {
      group: "Conversion",
      metrics: [
        { name: "Enquiry → qualified", definition: "Share of enquiries that fit the unit or another listing." },
        { name: "Qualified → viewing", definition: "Share that book and attend a viewing." },
        { name: "Viewing → application or offer", definition: "By unit, agent and source." },
        { name: "Application → let or sold", definition: "And the reasons deals are lost." },
      ],
    },
    {
      group: "Operations",
      metrics: [
        { name: "Time to first contact", definition: "Including out-of-hours enquiries." },
        { name: "Viewing no-show rate", definition: "Before and after reminders are introduced." },
        { name: "Post-viewing follow-up", definition: "Share of viewings followed up within a day." },
      ],
    },
    {
      group: "Client",
      metrics: [
        { name: "Landlord reporting", definition: "Reports delivered on schedule." },
        { name: "Repeat and referred clients", definition: "Tenants, buyers and landlords who return or refer." },
      ],
    },
    {
      group: "System",
      metrics: [
        { name: "Unit match rate", definition: "Enquiries automatically linked to the correct unit." },
        { name: "Assignment exceptions", definition: "Enquiries that needed manual routing." },
      ],
    },
  ],
  human: {
    intro:
      "Property is a relationship business. The system handles speed and memory so agents can spend their time on the parts that close deals: judgment, trust and negotiation.",
    image: "/images/photography/pexels-yankrukov-7640793.jpg",
    imageAlt: "Colleagues reviewing documents together at a desk in an office.",
    assists: [
      { system: "Automation", does: "acknowledges, routes, reminds and records." },
      { system: "The CRM", does: "keeps every prospect attached to the right unit and the right agent." },
      { system: "Reporting", does: "shows landlords and management what is actually happening." },
    ],
    decisions: [
      "Which prospect to prioritise for a unit in high demand",
      "Negotiating price and terms with landlords, tenants and buyers",
      "Assessing applications",
      "Handling complaints and disputes",
      "When to call rather than message",
    ],
  },
  build: [
    { component: "Strategy", text: "Pipeline and qualification design, source tracking and the landlord reporting model." },
    { component: "Digital", text: "Listing pages with viewing requests and WhatsApp entry points that carry the unit reference." },
    { component: "CRM", text: "Contacts, deals and units, with assignment rules." },
    { component: "Automation", text: "Acknowledgements, viewing confirmations and post-viewing follow-up tasks." },
    { component: "Analytics", text: "Activity by unit, agent and source, and landlord reports from the same data." },
    { component: "AI — later", text: "Drafting replies from listing sheets for agents to review, once unit data is reliable.", later: true },
  ],
  lesson:
    "In this scenario, the agency's advantage isn't more listings. It's being the agency that answers first, remembers everything and can show landlords its work.",
  insights: ["whatsapp-is-not-a-crm", "crm-vs-spreadsheet-vs-whatsapp", "why-businesses-have-leads-but-lose-sales"],
};
