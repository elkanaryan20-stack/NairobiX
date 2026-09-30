import type { CaseStudy } from "../types";

export const professionalServicesGrowth: CaseStudy = {
  slug: "professional-services-growth-system",
  name: "Professional Services Growth System",
  industry: "Professional Services",
  title: "From scattered enquiries to one connected growth system.",
  thesis:
    "How NairobiX would redesign the path from first interaction to qualified opportunity, sales follow-up and measurement for an established, referral-led firm.",
  problem:
    "A firm with a strong reputation and referral base, but inconsistent digital acquisition and follow-up that depends on individual memory.",
  areas: ["Growth", "CRM & Sales", "Automation", "Digital"],
  solutionIds: ["growth-strategy", "digital-marketing", "crm-sales", "business-automation", "web-digital-solutions"],
  focus: "Growth system",
  featured: true,
  image: "/images/photography/pexels-mikhail-nilov-9301316.jpg",
  imageAlt: "A professional standing at the head of a table, talking with seated colleagues in a bright office.",
  portrait: [
    {
      kind: "landing",
      url: "firm.co.ke/advisory/tax-compliance",
      eyebrow: "Tax & compliance advisory",
      headline: "Clarity on your obligations before the deadline, not after.",
      body: "Who this is for · How an engagement works · What happens first",
      cta: "Discuss your situation",
    },
    {
      kind: "chat",
      contact: "Firm · Business account",
      messages: [
        { from: "customer", text: "Hi, I found your tax compliance page. We need help before the next filing.", tag: "Source: search · tax-compliance" },
        { from: "business", text: "Thank you — Wanjiku from our advisory team will reply this morning." },
      ],
    },
    {
      kind: "pipeline",
      title: "New business pipeline",
      columns: [
        { name: "Qualified", cards: ["Logistics co. · Tax", "School · Audit"] },
        { name: "Proposal sent", cards: ["Manufacturer · Advisory"], active: true },
        { name: "Won", cards: ["NGO · Payroll"] },
      ],
    },
  ],
  context: {
    paragraphs: [
      "Consider an established professional services firm in Nairobi — an advisory, accounting, legal or consulting practice. It has built its reputation over years of good work. Most new clients arrive through referrals from existing clients and partners, and the partners are well known in their sectors.",
      "Growth has started to require more than reputation. The firm wants to win work beyond its existing network, runs occasional search and LinkedIn campaigns, and has a website that describes its services well. Enquiries now arrive through WhatsApp, email, the website form, phone calls and introductions at events.",
      "Nothing is broken, exactly. Clients are served well. But the path from a first interaction to a signed engagement has grown informally, one channel at a time, and nobody has designed it as a whole.",
    ],
    assumptions: [
      { label: "Team size", value: "15–30 staff, with a small number of partners who lead new business" },
      { label: "Where enquiries come from", value: "Referrals, WhatsApp, website form, email, events" },
      { label: "Sales cycle", value: "Several weeks, often with more than one decision-maker" },
      { label: "Current tools", value: "Email, WhatsApp, a shared spreadsheet, accounting software" },
    ],
    works: [
      "A strong reputation and a loyal referral base",
      "Partners who sell well once they are in the room",
      "A capable delivery team",
      "A website that explains the services clearly",
    ],
    manual: [
      "Logging enquiries in a spreadsheet — when someone remembers",
      "Deciding, case by case, who follows up each enquiry",
      "Chasing proposals that have gone quiet",
      "Compiling a monthly picture of new business by hand",
    ],
  },
  problemIntro:
    "Asked what is wrong, the firm would probably say “we need more leads.” Looked at as a system, the picture is different: demand already exists, but at every layer it is harder to see, harder to act on and harder to learn from than it should be.",
  problemLayers: [
    {
      layer: "Marketing",
      issue: "Campaigns and articles run, but it is unclear which of them produce clients rather than clicks.",
      effect: "Budget decisions rest on reach, not on revenue.",
    },
    {
      layer: "Capture",
      issue: "Enquiries arrive through five channels, each held somewhere different.",
      effect: "There is no single count of demand.",
    },
    {
      layer: "Qualification",
      issue: "The important context — the need, the timing, who decides — stays inside individual conversations.",
      effect: "Partners spend time on poor-fit enquiries and miss good ones.",
    },
    {
      layer: "Follow-up",
      issue: "Responsibility for the next step is informal; proposals are chased when someone remembers.",
      effect: "Opportunities cool without anyone deciding to let them go.",
    },
    {
      layer: "Sales",
      issue: "Opportunity status lives in partners' heads and inboxes.",
      effect: "Nobody can see the pipeline or forecast new work with confidence.",
    },
    {
      layer: "Reporting",
      issue: "New-business figures are assembled by hand, if at all.",
      effect: "Management cannot see where demand is being lost.",
    },
  ],
  opportunity: {
    statement:
      "The opportunity is not simply to generate more enquiries. It is to create a connected path from attention to qualified opportunity — and to learn from every step of it.",
    paragraphs: [
      "For a referral-led firm, the first gains usually come from the middle of the path: capturing every enquiry, qualifying consistently and making the next step visible. Better acquisition is worth more once the system below it can hold the demand.",
      "That ordering matters. It means the first phase of work strengthens what already works — referrals and partner relationships — before money is spent adding new sources of demand. Marketing investment then lands on a system that can show what it produced.",
    ],
    focus: ["Capture", "Qualify", "Nurture", "Convert", "Measure"],
  },
  system: {
    intro:
      "The proposed architecture has nine layers. Each exists because of a specific problem in the layer map above, and each passes something to the next. Select a layer to see why it exists, what moves through it and what happens next.",
    layers: [
      {
        id: "marketing",
        name: "Marketing",
        what: "Targeted search and LinkedIn campaigns, referral-partner content and articles on the services the firm most wants to grow.",
        why: "To add a predictable source of demand alongside referrals — aimed at the work the firm actually wants, not everything it could do.",
        carries: "Campaign and source information, carried in tagged links.",
        next: "Visitors arrive on a landing experience written for their specific need.",
      },
      {
        id: "landing",
        name: "Landing experience",
        what: "Focused pages for each priority service, answering the questions a buyer asks before making contact.",
        why: "A general services page asks visitors to do the translation themselves. A focused page earns the enquiry.",
        carries: "The source, the service page visited and the visitor's own description of the need.",
        next: "A short enquiry form, or a WhatsApp link with a pre-filled opening line naming the service.",
      },
      {
        id: "capture",
        name: "Lead capture",
        what: "Every entry point — form, WhatsApp, email, phone, event introduction — creates a record in the same place.",
        why: "Demand that is not recorded cannot be counted, owned or followed up.",
        carries: "Contact details, source, service of interest and the first message.",
        next: "The record is created or matched in the CRM and routed to an owner.",
      },
      {
        id: "crm",
        name: "CRM",
        what: "The system of record for contacts, organisations, opportunities and every interaction with them.",
        why: "It replaces the spreadsheet, the inboxes and memory with one shared view of every relationship.",
        carries: "The history of the relationship, the named owner and the current stage.",
        next: "New enquiries enter qualification.",
      },
      {
        id: "qualification",
        name: "Qualification",
        what: "A consistent set of questions — service, scope, timing, decision-maker, budget range — answered in the first conversation.",
        why: "So partners can prioritise best-fit enquiries and decline poor fits early and courteously.",
        carries: "A qualification status, and the notes behind it.",
        next: "Qualified enquiries become opportunities with an owner and a next step.",
      },
      {
        id: "follow-up",
        name: "Follow-up",
        what: "A scheduled next action for every open opportunity, with reminders and a small set of editable templates.",
        why: "To remove the dependency on memory without removing the firm's personal tone.",
        carries: "Due dates, reminders and a record of each touchpoint.",
        next: "The opportunity moves through the sales stages.",
      },
      {
        id: "pipeline",
        name: "Sales pipeline",
        what: "Stages that match how the firm actually wins work: Qualified, Discovery meeting, Proposal sent, Negotiation, Won or Lost.",
        why: "So partners and management share one view of current and likely new work — and of why work is lost.",
        carries: "Stage, value range, expected decision date and loss reasons.",
        next: "Won opportunities move into onboarding.",
      },
      {
        id: "onboarding",
        name: "Client onboarding",
        what: "A defined handover from sales to delivery: engagement letter, kickoff, documents and introductions.",
        why: "The first weeks of an engagement shape whether the client returns and refers others.",
        carries: "Scope, contacts and the commitments made during the sale.",
        next: "The relationship continues in the same record — ready for future work and referrals.",
      },
      {
        id: "reporting",
        name: "Reporting",
        what: "A monthly view of demand, conversion and pipeline by source and service.",
        why: "To show where demand comes from, where it is lost and what to change next.",
        carries: "Everything above, summarised.",
        next: "Findings feed back into marketing and process decisions — the loop closes.",
      },
    ],
  },
  beforeAfter: {
    before: [
      "Website form → shared inbox",
      "WhatsApp on partners' phones",
      "Spreadsheet, sometimes updated",
      "Introductions at events",
      "Proposals in email threads",
      "A monthly report built by hand",
    ],
    beforeNote: "Each channel works on its own. Nothing connects them, so nothing can be counted end to end.",
    after: ["Campaigns & referrals", "Landing experience", "Capture", "CRM", "Qualification", "Follow-up", "Sales pipeline", "Onboarding", "Reporting"],
    afterNote: "One path, one record, one view — and a loop back to marketing.",
  },
  journey: [
    {
      stage: "Discover",
      customer: "A finance director searches for help with a specific compliance question — or hears the firm's name from a peer.",
      business: "The search campaign or the referral partner's link carries its source.",
    },
    {
      stage: "Explore",
      customer: "She lands on a page about that exact service: who it is for, how an engagement works, what happens first.",
      business: "The page is built to answer the questions buyers ask before they make contact.",
      fragment: {
        kind: "landing",
        url: "firm.co.ke/advisory/tax-compliance",
        eyebrow: "Tax & compliance advisory",
        headline: "Clarity on your obligations before the deadline, not after.",
        body: "For finance teams in growing companies. A first conversation, then a fixed-scope proposal.",
        cta: "Discuss your situation",
      },
    },
    {
      stage: "Enquire",
      customer: "She taps the WhatsApp link. The opening line is already written; she adds one sentence of context.",
      business: "The pre-filled message identifies the service page, so the source is not lost.",
      fragment: {
        kind: "chat",
        contact: "Firm · Business account",
        messages: [
          { from: "customer", text: "Hi, I found your tax compliance page. We're a logistics company and need help before the next filing." },
          { from: "business", text: "Thank you. Wanjiku from our advisory team will reply by 11am today.", tag: "Automated acknowledgement" },
        ],
      },
    },
    {
      stage: "Capture",
      customer: "She receives an honest acknowledgement: who will reply, and when, in working hours.",
      business: "A contact and an enquiry are created in the CRM, with source and service attached, and an owner is assigned.",
      fragment: {
        kind: "record",
        title: "Enquiry · Logistics company",
        stage: "New",
        rows: [
          ["Service", "Tax & compliance"],
          ["Source", "Search → service page → WhatsApp"],
          ["Owner", "Wanjiku M."],
          ["Next action", "First reply · today 11:00"],
        ],
      },
    },
    {
      stage: "Qualify",
      customer: "In the first conversation she is asked a few useful questions: scope, timing, who else is involved.",
      business: "The answers are recorded; the enquiry is marked qualified and becomes an opportunity.",
    },
    {
      stage: "Follow up",
      customer: "After the discovery meeting, the proposal arrives when promised, and a short check-in follows a few days later.",
      business: "If the proposal has had no response, the owner receives a reminder task — and decides how to follow up.",
      fragment: {
        kind: "task",
        title: "Follow up: proposal to logistics company",
        meta: "Due tomorrow · Owner: Wanjiku M.",
        body: "No client activity since the proposal was sent 4 working days ago. Suggested check-in template attached — edit before sending.",
      },
    },
    {
      stage: "Convert",
      customer: "She raises one question about scope; the partner answers it the same day.",
      business: "The opportunity moves to Negotiation, then Won, with the agreed scope recorded.",
      fragment: {
        kind: "pipeline",
        title: "New business pipeline",
        columns: [
          { name: "Proposal sent", cards: ["Manufacturer · Advisory"] },
          { name: "Negotiation", cards: ["Logistics co. · Tax"], active: true },
          { name: "Won", cards: ["NGO · Payroll"] },
        ],
      },
    },
    {
      stage: "Deliver",
      customer: "Her first week is organised: engagement letter, kickoff meeting, a named contact.",
      business: "Onboarding tasks are created from the won opportunity, carrying what was agreed in the sale.",
    },
    {
      stage: "Measure",
      customer: "Months later she refers a colleague, who arrives with a known source.",
      business: "The monthly report shows the campaign, the service page and the referral in one line of sight.",
      fragment: {
        kind: "report",
        title: "Qualified opportunities by source · layout",
        rows: [
          { label: "Referrals", share: 0.8 },
          { label: "Search · service pages", share: 0.55 },
          { label: "LinkedIn", share: 0.3 },
          { label: "Events", share: 0.2 },
        ],
      },
    },
  ],
  technology: {
    intro:
      "Technology comes last — once the requirements are clear. For this scenario a modest, well-integrated stack is enough; a larger one would add cost and maintenance without adding capability the firm needs yet.",
    items: [
      {
        keys: ["zoho"],
        name: "Zoho CRM",
        capability: "CRM",
        role: "System of record for contacts, opportunities, activity and onboarding tasks.",
        reason: "Mature pipeline and workflow features at a cost that suits a firm of this size, and a documented WhatsApp integration.",
        layer: "CRM · Follow-up · Pipeline · Reporting",
      },
      {
        keys: ["whatsapp"],
        name: "WhatsApp Business Platform",
        capability: "Messaging",
        role: "The conversation channel most prospective clients already prefer.",
        reason: "Connected through the Platform, conversations can be logged against the CRM record instead of living on personal phones.",
        layer: "Capture · Follow-up",
      },
      {
        keys: ["google"],
        name: "Google Ads & Analytics",
        capability: "Search & analytics",
        role: "Search campaigns for priority services, and measurement of how visitors use the site.",
        reason: "Buyers search for specific problems. Campaign parameters carry the source through to the CRM.",
        layer: "Marketing · Reporting",
      },
      {
        keys: ["nextjs"],
        name: "Next.js",
        capability: "Web platform",
        role: "The landing experience: fast, focused service pages with forms that post directly to the CRM.",
        reason: "Control over performance, forms and tracking — the parts of the site that do conversion work.",
        layer: "Landing experience · Capture",
      },
      {
        keys: ["figma"],
        name: "Figma",
        capability: "Design",
        role: "Designing the service pages and the enquiry path before they are built.",
        reason: "The firm can review the journey and the wording early, while changes are still cheap.",
        layer: "Landing experience",
      },
    ],
  },
  automation: {
    intro:
      "Automation here is deliberately narrow. It carries the routine steps that currently depend on memory — and hands every judgment back to a person.",
    workflows: [
      {
        name: "New enquiry",
        steps: [
          { kind: "Trigger", text: "A website form is submitted, or a new WhatsApp conversation starts." },
          { kind: "Rule", text: "Check that contact details and the service of interest are present; if not, flag the record for completion." },
          { kind: "Action", text: "Create or match the contact, and create an enquiry carrying its source and service." },
          { kind: "Notification", text: "Assign an owner by service line and notify them." },
          { kind: "Follow-up", text: "Send an acknowledgement saying who will reply, and when." },
          { kind: "Human", text: "The owner reads the context and replies personally." },
          { kind: "Measure", text: "Record the time to first response and, later, the enquiry's outcome." },
        ],
      },
      {
        name: "Proposal follow-up",
        steps: [
          { kind: "Trigger", text: "An opportunity moves to Proposal sent." },
          { kind: "Rule", text: "If no client activity is logged within four working days…" },
          { kind: "Action", text: "…create a follow-up task for the owner, due the next working day." },
          { kind: "Notification", text: "Remind the owner in the CRM and by email." },
          { kind: "Follow-up", text: "Attach a suggested check-in message the owner can edit." },
          { kind: "Human", text: "The partner decides whether, when and how to follow up." },
          { kind: "Measure", text: "Track proposal-to-decision time and the reasons work is lost." },
        ],
      },
    ],
  },
  outcomes: [
    { title: "Clear ownership", text: "Every enquiry has a named owner from the moment it arrives." },
    { title: "Visible follow-up", text: "Open proposals and overdue next steps are visible to the person responsible, and to management." },
    { title: "Less manual coordination", text: "No retyping between inbox, spreadsheet and report." },
    { title: "A consistent client experience", text: "Every prospective client receives the same standard of response, whichever channel they use." },
    { title: "Management visibility", text: "Demand, conversion and pipeline can be seen by source and by service." },
    { title: "Marketing connected to sales", text: "Campaign decisions can be based on qualified opportunities, not clicks." },
    { title: "Useful business data", text: "Sources and loss reasons accumulate into knowledge about what works." },
    { title: "Ready for what comes next", text: "Clean records and defined stages make further automation, or AI assistance, practical." },
  ],
  measurement: [
    {
      group: "Acquisition",
      metrics: [
        { name: "Visits by source", definition: "Visits to service pages by channel and campaign." },
        { name: "Qualified enquiries", definition: "Enquiries that meet the agreed criteria, by source." },
        { name: "Cost per qualified enquiry", definition: "Where paid campaigns are used." },
      ],
    },
    {
      group: "Conversion",
      metrics: [
        { name: "Enquiry → qualified", definition: "Share of enquiries that meet the criteria." },
        { name: "Qualified → opportunity", definition: "Share that reach a discovery meeting or proposal." },
        { name: "Opportunity → engagement", definition: "Share won, by service and source." },
      ],
    },
    {
      group: "Operations",
      metrics: [
        { name: "Time to first response", definition: "From enquiry to first human reply, in working hours." },
        { name: "Follow-up completion", definition: "Share of due follow-ups completed on time." },
        { name: "Pipeline hygiene", definition: "Open opportunities with an owner, a stage and a next action." },
      ],
    },
    {
      group: "Client",
      metrics: [
        { name: "Onboarding completion", definition: "New engagements that complete the agreed onboarding steps." },
        { name: "Repeat and referred work", definition: "New work from existing clients and from their referrals." },
      ],
    },
    {
      group: "System",
      metrics: [
        { name: "Workflow exceptions", definition: "Automations that failed or needed manual correction." },
        { name: "Data completeness", definition: "Records with source, service and outcome filled in." },
      ],
    },
  ],
  human: {
    intro:
      "The system is designed to support the firm's judgment, not to replace it. Technology preserves context and prompts action. People decide — and in a firm whose value is its advice, that line matters more than anywhere.",
    image: "/images/photography/pexels-ekaterina-bolovtsova-6077644.jpg",
    imageAlt: "A person in a suit holding a folder of documents while seated.",
    assists: [
      { system: "The CRM", does: "preserves the history of every relationship, so nothing depends on one person's memory." },
      { system: "Automation", does: "creates the task, the reminder and the acknowledgement." },
      { system: "Reporting", does: "shows where demand comes from and where it is lost." },
    ],
    decisions: [
      "Whether an enquiry is a good fit for the firm",
      "What to propose, and at what fee",
      "How to respond to a sensitive or confidential matter",
      "When a client needs a partner's call rather than a message",
      "Which lost opportunities are worth revisiting",
    ],
  },
  build: [
    { component: "Strategy", text: "Growth architecture, qualification criteria and a pipeline designed around how the firm wins work." },
    { component: "Digital", text: "Service landing pages and a clear conversion path for each priority service." },
    { component: "CRM", text: "Contact, opportunity and onboarding structure, configured to the firm's real stages." },
    { component: "Automation", text: "Enquiry routing, acknowledgements and follow-up reminders." },
    { component: "Analytics", text: "Source tracking from campaign to CRM, and a monthly demand-and-pipeline report." },
    {
      component: "AI — later",
      text: "Summaries of discovery calls and first-draft proposals, once clean records and consistent stages are in place. Not in the first phase.",
      later: true,
    },
  ],
  lesson:
    "In this scenario, the firm doesn't need a bigger budget first. It needs the demand it already has to be visible, owned and measured.",
  insights: ["why-businesses-have-leads-but-lose-sales", "marketing-sales-crm-one-system", "whatsapp-is-not-a-crm"],
};
