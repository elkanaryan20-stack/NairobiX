import type { CaseStudy } from "../types";

export const hospitalityEventsAutomation: CaseStudy = {
  slug: "venue-enquiry-to-event-automation",
  name: "Enquiry-to-Event Automation System",
  industry: "Hospitality · Events & venues",
  title: "From hand-built quotes to a reliable enquiry-to-event workflow.",
  thesis:
    "How NairobiX would automate the repetitive steps between an event enquiry and a delivered event — holds, quotes, deposits, confirmations and briefings — while leaving the judgment with the events team.",
  problem:
    "A hotel's events team spends much of its week on quotes, follow-ups, deposit chasing and internal coordination, all done by hand.",
  areas: ["Automation", "CRM & Sales", "Digital"],
  solutionIds: ["business-automation", "crm-sales", "web-digital-solutions"],
  focus: "Workflow automation",
  image: "/images/photography/bilderboken-rlwE8f8anOc-unsplash.jpg",
  imageAlt: "A lodge-style hotel with a thatched roof, terrace loungers and a pool at dusk.",
  portrait: [
    {
      kind: "quote",
      title: "Quote · Two-day leadership workshop",
      lines: [
        ["Conference package · 40 guests × 2 days", "Full day"],
        ["Breakout rooms", "2"],
        ["AV & projection", "Included"],
        ["Provisional hold", "Expires Fri 17:00"],
      ],
      status: "Reviewed by coordinator · ready to send",
    },
    {
      kind: "task",
      title: "Hold expires in 48 hours",
      meta: "Workshop · 12–13 March · Owner: Amina K.",
      body: "No response to the quote sent 3 working days ago. Decide: extend the hold, follow up, or release the dates.",
    },
    {
      kind: "record",
      title: "Event · Leadership workshop",
      stage: "Quote sent",
      rows: [
        ["Dates", "12–13 March"],
        ["Guests", "40"],
        ["Room", "Acacia Hall + 2 breakouts"],
        ["Source", "Website enquiry form"],
      ],
    },
  ],
  context: {
    paragraphs: [
      "Consider a hotel on the edge of Nairobi with conference rooms, a garden venue and a restaurant. Events — corporate meetings and workshops, weddings, private functions — are a significant part of its business, handled by a small events team.",
      "Enquiries arrive by email, phone, WhatsApp and a website form, often with incomplete details. Each becomes a conversation about dates, numbers and packages, then a quote built from a spreadsheet template, then follow-up, a deposit, a function sheet for the kitchen and operations, and a final invoice that reflects what changed on the day.",
      "The team is good at events. What wears it down is that every event repeats the same administrative pattern — and every step of it is done by hand.",
    ],
    assumptions: [
      { label: "Events team", value: "3–5 people" },
      { label: "Where enquiries come from", value: "Email, phone, WhatsApp, website form, returning corporate clients" },
      { label: "Event types", value: "Conferences, workshops, weddings, private functions" },
      { label: "Current tools", value: "The hotel's property management system, spreadsheets, email, WhatsApp" },
    ],
    works: [
      "A venue people like to use",
      "Packages that sell",
      "A team that delivers events well",
      "Returning corporate clients",
    ],
    manual: [
      "Building each quote from a spreadsheet template",
      "Checking room availability across several calendars",
      "Chasing quotes and deposits",
      "Typing function sheets and briefing the kitchen, AV and housekeeping",
      "Reconciling the final invoice against changes on the day",
    ],
  },
  problemIntro:
    "This is not a demand problem. It is an operations problem that shows up as slow quotes, lost bookings and tired people — and it follows exactly the kind of repeatable pattern a system can carry.",
  problemLayers: [
    {
      layer: "Capture",
      issue: "Enquiries arrive through four channels, usually without dates, numbers or event type.",
      effect: "Days are lost gathering the basics before a quote can even start.",
    },
    {
      layer: "Availability",
      issue: "Function-room availability is spread across several calendars.",
      effect: "Slow answers, and the risk of double holds.",
    },
    {
      layer: "Quoting",
      issue: "Each quote is rebuilt by hand from a template.",
      effect: "Quotes are slow and inconsistent, and pricing errors creep in.",
    },
    {
      layer: "Follow-up",
      issue: "Quotes and deposits are chased when someone has time.",
      effect: "Provisional holds block dates for weeks without a decision.",
    },
    {
      layer: "Coordination",
      issue: "Function sheets are typed and emailed; changes travel by phone.",
      effect: "The kitchen and operations may be working from outdated details.",
    },
    {
      layer: "Reporting",
      issue: "There is no record of enquiry-to-booking conversion or why events are lost.",
      effect: "The hotel cannot see which event types and sources are worth pursuing.",
    },
  ],
  opportunity: {
    statement:
      "The opportunity is to standardise the pattern every event follows, automate the steps that are pure routine, and give the team its time back for clients and for the events themselves.",
    paragraphs: [
      "Before anything is automated, the process has to be written down: the stages every event passes through, the information needed at each, and the decisions only a person should make. Most of the value of this engagement comes from that step — automation is how the agreed process then runs reliably.",
      "The order of work follows the pain: structured enquiries and availability first, then quotes and holds, then coordination and reporting.",
    ],
    focus: ["Capture", "Qualify", "Convert", "Deliver", "Measure"],
  },
  system: {
    intro:
      "The proposed architecture has eight layers. Several of them are simply the team's existing process, made explicit and connected. Select a layer to explore it.",
    layers: [
      {
        id: "enquiry",
        name: "Structured enquiry",
        what: "An enquiry form and WhatsApp flow that ask for date, event type, guest numbers and rough budget up front.",
        why: "A complete enquiry can be answered the same day; an incomplete one starts a week of back-and-forth.",
        carries: "Event type, dates, guests, budget range and contact.",
        next: "The enquiry becomes an event opportunity in the CRM.",
      },
      {
        id: "crm",
        name: "Event CRM",
        what: "Event opportunities with stages: Enquiry, Hold, Quote sent, Confirmed, Delivered, Invoiced — linked to client organisations.",
        why: "One place for every event and every returning client, instead of inboxes and spreadsheets.",
        carries: "Event details, client, owner and stage.",
        next: "Availability is checked for the requested dates.",
      },
      {
        id: "availability",
        name: "Availability & holds",
        what: "A single function-room calendar, with provisional holds that carry an expiry date.",
        why: "Holds that expire deliberately release dates for other clients instead of blocking them indefinitely.",
        carries: "Room, dates, hold status and expiry.",
        next: "A quote is prepared from the chosen package.",
      },
      {
        id: "quote",
        name: "Quote builder",
        what: "Quotes generated from standard packages and the enquiry details, reviewed by a coordinator before sending.",
        why: "Consistent, correct quotes in minutes — with a person checking every one.",
        carries: "Package, quantities, price and terms.",
        next: "The quote is sent and follow-up is scheduled.",
      },
      {
        id: "confirmation",
        name: "Deposit & confirmation",
        what: "Deposit instructions on acceptance, and a confirmation once payment is recorded.",
        why: "A clear, prompt confirmation turns a provisional booking into a committed one.",
        carries: "Deposit status and confirmed details.",
        next: "Event coordination begins.",
      },
      {
        id: "coordination",
        name: "Event coordination",
        what: "A function sheet generated from the booking, versioned when details change, with tasks for kitchen, AV and housekeeping.",
        why: "Every department works from the same, current details.",
        carries: "Menus, set-up, timings, final numbers and changes.",
        next: "The event is delivered; changes on the day are recorded.",
      },
      {
        id: "post-event",
        name: "Post-event",
        what: "Final invoice from the recorded details, a feedback request and, for corporate clients, a prompt to discuss the next event.",
        why: "The end of one event is the best moment to secure the next.",
        carries: "Final charges, feedback and rebooking interest.",
        next: "Outcomes flow into reporting.",
      },
      {
        id: "reporting",
        name: "Reporting",
        what: "Conversion from enquiry to booking by event type and source, time to quote, and reasons events are lost.",
        why: "It shows which events are worth pursuing, and where the process slows down.",
        carries: "Everything above, summarised.",
        next: "Packages, pricing and marketing are adjusted on evidence.",
      },
    ],
  },
  beforeAfter: {
    before: [
      "Email inbox",
      "Phone notes",
      "WhatsApp",
      "Spreadsheet quote templates",
      "Function sheets typed and emailed",
      "Several room calendars",
    ],
    beforeNote: "The same pattern, rebuilt by hand for every event.",
    after: ["Structured enquiry", "Event CRM", "Availability & holds", "Quote", "Deposit & confirmation", "Coordination", "Post-event", "Reporting"],
    afterNote: "The pattern written down once, then run reliably.",
  },
  journey: [
    {
      stage: "Discover",
      customer: "An HR manager planning a two-day leadership workshop finds the hotel through a colleague and a search.",
      business: "The conference page carries a tagged link and the source is recorded.",
    },
    {
      stage: "Enquire",
      customer: "She completes a short form: dates, 40 guests, workshop, rough budget.",
      business: "A complete enquiry creates an event opportunity with an owner.",
    },
    {
      stage: "Hold",
      customer: "Within working hours she hears that the dates are available and provisionally held until Friday.",
      business: "The function-room calendar shows the hold and its expiry.",
      fragment: {
        kind: "record",
        title: "Event · Leadership workshop",
        stage: "Hold",
        rows: [
          ["Dates", "12–13 March"],
          ["Guests", "40"],
          ["Room", "Acacia Hall + 2 breakouts"],
          ["Hold expires", "Fri 17:00"],
        ],
      },
    },
    {
      stage: "Quote",
      customer: "The same day, she receives a clear quote built from the conference package.",
      business: "The quote was generated from the enquiry and reviewed by the coordinator before sending.",
      fragment: {
        kind: "quote",
        title: "Quote · Two-day leadership workshop",
        lines: [
          ["Conference package · 40 guests × 2 days", "Full day"],
          ["Breakout rooms", "2"],
          ["AV & projection", "Included"],
          ["Deposit to confirm", "On acceptance"],
        ],
        status: "Reviewed by coordinator · sent",
      },
    },
    {
      stage: "Follow up",
      customer: "Three days later, a short, personal follow-up from the coordinator.",
      business: "A task was created when the quote went unanswered; the coordinator decided what to say.",
      fragment: {
        kind: "task",
        title: "Follow up: leadership workshop quote",
        meta: "Due today · Owner: Amina K.",
        body: "No response in 3 working days. Hold expires Friday. Decide: follow up, extend the hold or release the dates.",
      },
    },
    {
      stage: "Confirm",
      customer: "She accepts, pays the deposit and receives a confirmation with next steps.",
      business: "Deposit recorded; the hold becomes a confirmed booking.",
    },
    {
      stage: "Prepare",
      customer: "A week before, she's asked to confirm final numbers and dietary needs.",
      business: "The function sheet is generated and each department receives its tasks; changes create a new version.",
    },
    {
      stage: "Deliver",
      customer: "The workshop runs. A late change to lunch timing is handled on the spot.",
      business: "The change is recorded, so the final invoice matches what happened.",
    },
    {
      stage: "Measure",
      customer: "Afterwards she receives the final invoice, a feedback request and an offer to plan the next one.",
      business: "Reporting shows time to quote, conversion by event type and why events were lost.",
      fragment: {
        kind: "report",
        title: "Enquiry → booking by event type · layout",
        rows: [
          { label: "Corporate workshops", share: 0.65 },
          { label: "Conferences", share: 0.5 },
          { label: "Weddings", share: 0.35 },
          { label: "Private functions", share: 0.3 },
        ],
      },
    },
  ],
  technology: {
    intro:
      "The hotel's property management system stays the source of truth for bedrooms and billing; how far it can be connected depends on the integrations it offers. The events workflow sits alongside it.",
    items: [
      {
        keys: ["zoho"],
        name: "Zoho CRM",
        capability: "CRM & workflows",
        role: "Event opportunities, client organisations, stages and workflow automation.",
        reason: "Stages, rules, tasks and document generation are standard features — no custom software needed for the core workflow.",
        layer: "Event CRM · Follow-up · Reporting",
      },
      {
        keys: ["google"],
        name: "Google Workspace calendars",
        capability: "Availability",
        role: "One shared function-room calendar, including provisional holds.",
        reason: "A single calendar the whole team already knows, readable by the CRM's workflows.",
        layer: "Availability & holds",
      },
      {
        keys: ["whatsapp"],
        name: "WhatsApp Business Platform",
        capability: "Messaging",
        role: "Enquiries, confirmations and reminders on the channel many clients prefer.",
        reason: "Utility templates for confirmations and reminders; conversations logged against the event.",
        layer: "Enquiry · Confirmation · Coordination",
      },
      {
        keys: ["nextjs"],
        name: "Next.js",
        capability: "Web platform",
        role: "The structured enquiry form and a clean, shareable quote page.",
        reason: "Collects complete enquiries and presents quotes clearly on any device.",
        layer: "Structured enquiry · Quote",
      },
    ],
  },
  automation: {
    intro:
      "This scenario is where the difference between process, rule, workflow and automation matters most. The process is agreed first; the rules are written down; only then do the workflows run automatically.",
    workflows: [
      {
        name: "Enquiry to provisional hold",
        steps: [
          { kind: "Trigger", text: "An event enquiry is submitted." },
          { kind: "Rule", text: "Date, guest numbers and event type are present; if not, ask for the missing details." },
          { kind: "Action", text: "Check function-room availability; create the event opportunity and a provisional hold with a five-day expiry." },
          { kind: "Notification", text: "Assign a coordinator and notify them." },
          { kind: "Follow-up", text: "Acknowledge the client: dates held, and when to expect a quote." },
          { kind: "Human", text: "The coordinator reviews the request and chooses or adjusts the package." },
          { kind: "Measure", text: "Record time from enquiry to quote." },
        ],
      },
      {
        name: "Quote to confirmed event",
        steps: [
          { kind: "Trigger", text: "A reviewed quote is sent." },
          { kind: "Rule", text: "If there's no response within three working days, or the hold expires within 48 hours…" },
          { kind: "Action", text: "…create a follow-up task." },
          { kind: "Notification", text: "Alert the coordinator; alert the events manager if the hold is about to expire." },
          { kind: "Follow-up", text: "On acceptance, send deposit instructions; on payment, send the confirmation." },
          { kind: "Human", text: "The coordinator negotiates changes and decides whether to extend or release the hold." },
          { kind: "Measure", text: "Track quote-to-booking rate and the reasons events are lost." },
        ],
      },
      {
        name: "Final details to function sheet",
        steps: [
          { kind: "Trigger", text: "Seven days before a confirmed event." },
          { kind: "Rule", text: "If final numbers and dietary requirements are not yet confirmed…" },
          { kind: "Action", text: "…request them from the client." },
          { kind: "Notification", text: "When confirmed, generate the function sheet and send each department its tasks." },
          { kind: "Follow-up", text: "Any later change creates a new version and notifies the affected departments." },
          { kind: "Human", text: "The coordinator checks the sheet before release and handles on-the-day changes." },
          { kind: "Measure", text: "Track changes made after the final sheet, and their causes." },
        ],
      },
    ],
  },
  outcomes: [
    { title: "Faster, consistent quotes", text: "Package-based quotes prepared in minutes and checked by a person." },
    { title: "Fewer pricing errors", text: "Quotes built from standard packages, not retyped templates." },
    { title: "Holds that expire deliberately", text: "Dates are released or extended by decision, not by neglect." },
    { title: "One current version of the event", text: "Kitchen, AV and housekeeping work from the same function sheet." },
    { title: "Less routine administration", text: "Reminders, confirmations and briefings run from the booking." },
    { title: "Visibility of what converts", text: "Conversion by event type and source, and reasons events are lost." },
    { title: "More repeat corporate business", text: "A prompt to plan the next event at the right moment." },
    { title: "A foundation for self-service", text: "Once packages and rules are clear, clients could later check availability online." },
  ],
  measurement: [
    {
      group: "Acquisition",
      metrics: [
        { name: "Enquiries by source and event type", definition: "Where event demand comes from." },
        { name: "Complete enquiries", definition: "Share arriving with date, numbers and type." },
      ],
    },
    {
      group: "Conversion",
      metrics: [
        { name: "Enquiry → quote", definition: "And time taken." },
        { name: "Quote → confirmed", definition: "By event type and source." },
        { name: "Lost reasons", definition: "Price, dates, capacity, no response." },
      ],
    },
    {
      group: "Operations",
      metrics: [
        { name: "Time to quote", definition: "From complete enquiry to quote sent." },
        { name: "Holds expired without decision", definition: "Should fall towards zero." },
        { name: "Changes after final sheet", definition: "And whether departments were notified." },
      ],
    },
    {
      group: "Client",
      metrics: [
        { name: "Post-event feedback", definition: "Collected for every event." },
        { name: "Corporate rebooking", definition: "Clients booking a further event within a year." },
      ],
    },
    {
      group: "System",
      metrics: [
        { name: "Workflow exceptions", definition: "Steps that failed or were overridden." },
        { name: "Quote corrections", definition: "Generated quotes the coordinator had to change, and why." },
      ],
    },
  ],
  human: {
    intro:
      "Hospitality is judgment and warmth. The workflows carry the paperwork; the events team keeps every decision that shapes the client's experience and the hotel's margin.",
    image: "/images/photography/pexels-spoton-pos-2160258094-37594420.jpg",
    imageAlt: "A hospitality staff member using a point-of-sale screen in a professional kitchen.",
    assists: [
      { system: "Automation", does: "places holds, sends reminders, generates quotes and function sheets." },
      { system: "The CRM", does: "keeps every event and every returning client in one place." },
      { system: "Reporting", does: "shows which events convert and where the process slows." },
    ],
    decisions: [
      "Pricing exceptions and discounts",
      "Whether to extend a provisional hold for a valued client",
      "Tailoring a package to an unusual request",
      "Handling on-the-day changes and complaints",
      "Building relationships with corporate clients",
    ],
  },
  build: [
    { component: "Strategy", text: "Event process mapping, stage design and standard packages." },
    { component: "Digital", text: "A structured enquiry experience and clear, shareable quotes." },
    { component: "CRM", text: "Event opportunities, client organisations and stages." },
    { component: "Automation", text: "Holds, quotes, reminders, deposits, confirmations and function sheets." },
    { component: "Analytics", text: "Conversion by event type and source, time to quote and lost reasons." },
    { component: "AI — later", text: "Drafting function sheets from coordinator notes and summarising client requirements, reviewed before use.", later: true },
  ],
  lesson:
    "In this scenario, the events team doesn't need to work harder. It needs the pattern it repeats every week to be written down once — and then carried by the system.",
  insights: ["what-to-automate-first", "crm-vs-spreadsheet-vs-whatsapp", "ai-in-a-small-business"],
};
