import type { CaseStudy } from "../types";

export const clinicAiFrontDesk: CaseStudy = {
  slug: "clinic-ai-assisted-front-desk",
  name: "AI-Assisted Front Desk System",
  industry: "Healthcare · Outpatient clinic",
  title: "From repetitive questions to an AI-assisted front desk, with people in charge.",
  thesis:
    "How NairobiX would use AI carefully in a clinic: answering routine questions from approved information, preparing work for staff, and keeping every clinical and sensitive decision with people.",
  problem:
    "A clinic's front desk spends much of the day answering the same questions on WhatsApp and phone, while bookings, reminders and anxious patients compete for the same attention.",
  areas: ["AI", "Automation"],
  solutionIds: ["ai-solutions", "business-automation", "crm-sales"],
  focus: "AI with human oversight",
  image: "/images/photography/pexels-tima-miroshnichenko-5452301.jpg",
  imageAlt: "A doctor in a white coat holding a tablet, photographed in black and white.",
  portrait: [
    {
      kind: "assistant",
      question: "Do you accept my insurance, and is a GP available tomorrow morning?",
      draft:
        "Yes, we accept this insurer for outpatient consultations. GP consultations run 8am–5pm. I can pass a booking request to our front desk — would you like me to?",
      source: "Answered from: Insurance list (updated 2 Sep) · Clinic hours",
      status: "Automated reply · labelled as automated",
    },
    {
      kind: "task",
      title: "Escalated to staff · urgent wording",
      meta: "21:14 · Fixed guidance sent · On-duty staff alerted",
      body: "The assistant did not answer. The patient received the clinic's standard emergency guidance, and the on-duty nurse was notified to call back.",
    },
    {
      kind: "record",
      title: "Booking request · GP",
      stage: "Awaiting confirmation",
      rows: [
        ["Preferred time", "Tomorrow, morning"],
        ["Visit type", "General consultation"],
        ["Channel", "WhatsApp · after hours"],
        ["Next", "Front desk confirms at 8:00"],
      ],
    },
  ],
  context: {
    paragraphs: [
      "Consider a private outpatient clinic in Nairobi with several doctors across general practice and a few specialities, a pharmacy counter and a laboratory. The front desk handles walk-ins, phone calls and a busy WhatsApp number.",
      "A large share of messages ask the same things: opening hours, whether a particular doctor is in today, consultation fees, which insurers are accepted, how to prepare for a test, where to park, whether results are ready.",
      "The staff are good with patients. But answering routine questions competes with the work that genuinely needs them — booking, reminders, following up missed appointments, and patients who are anxious or unwell.",
    ],
    assumptions: [
      { label: "Front desk", value: "3–4 staff across shifts" },
      { label: "Channels", value: "Walk-in, phone, WhatsApp — including evenings" },
      { label: "Question mix", value: "Mostly routine: hours, fees, insurance, preparation, results status" },
      { label: "Current tools", value: "A clinic management system for records and billing; the WhatsApp Business app" },
    ],
    works: [
      "Trusted doctors and a loyal patient base",
      "A clinic management system for records and billing",
      "Friendly, experienced front-desk staff",
      "Clinic policies that are mostly written down somewhere",
    ],
    manual: [
      "Answering the same questions dozens of times a day",
      "Taking bookings by phone and WhatsApp, then re-entering them",
      "Reminder calls the day before appointments",
      "Chasing patients who missed appointments",
    ],
  },
  problemIntro:
    "The obvious answer is another receptionist. The underlying problem is that routine, verifiable information takes the same human attention as the moments that genuinely need a person — and the urgent message sits in the same queue as the question about parking.",
  problemLayers: [
    {
      layer: "Access",
      issue: "Patients ask routine questions on WhatsApp and phone at all hours.",
      effect: "Staff time is consumed by repetition; after-hours questions wait until morning.",
    },
    {
      layer: "Knowledge",
      issue: "Correct answers exist — in staff heads, on notices and in old messages.",
      effect: "Answers vary depending on who replies.",
    },
    {
      layer: "Booking",
      issue: "Booking requests arrive in chat and are re-entered into the clinic system.",
      effect: "Double handling and occasional errors.",
    },
    {
      layer: "Reminders",
      issue: "Reminder calls happen when there is time.",
      effect: "Missed appointments leave unused slots.",
    },
    {
      layer: "Escalation",
      issue: "Urgent or sensitive messages sit in the same queue as routine ones.",
      effect: "The messages that matter most can wait the longest.",
    },
    {
      layer: "Reporting",
      issue: "There is no view of what patients ask, or which needs go unmet.",
      effect: "Improvements rely on anecdote.",
    },
  ],
  opportunity: {
    statement:
      "The opportunity is not to replace the front desk with a chatbot. It is to let AI handle what is routine and verifiable, route everything else to people faster, and give staff their time back for patients.",
    paragraphs: [
      "Generative AI can produce confident answers that are wrong — the risk that the US National Institute of Standards and Technology calls confabulation. In a clinic that risk is unacceptable for anything clinical. So the design starts from boundaries: an approved knowledge base the assistant may answer from, escalation rules that take precedence over it, and people who own both.",
      "Health information is also among the categories Kenya's Data Protection Act treats as sensitive personal data. The assistant is designed to collect as little as possible — it books; it does not ask about symptoms.",
    ],
    focus: ["Capture", "Qualify", "Convert", "Deliver", "Retain", "Measure"],
  },
  system: {
    intro:
      "The proposed architecture has eight layers. Three of them — knowledge, escalation and governance — exist to constrain the AI, not to extend it. Select a layer to explore it.",
    layers: [
      {
        id: "knowledge",
        name: "Approved knowledge base",
        what: "Hours, doctors' schedules, fees, accepted insurers, test preparation, directions — each item with an owner and a review date.",
        why: "The assistant may only answer from content the clinic has written and checked. No approved answer, no automated answer.",
        carries: "Approved answers, their source and when they were last reviewed.",
        next: "The assistant retrieves from it when a patient asks.",
      },
      {
        id: "assistant",
        name: "AI assistant on WhatsApp",
        what: "An assistant that answers routine questions from the knowledge base, says it is automated, and offers a person at any time.",
        why: "Routine questions get consistent, immediate answers — including in the evening.",
        carries: "The question, the answer given and the knowledge items used.",
        next: "Anything outside the knowledge base, or any sign of urgency, goes to escalation.",
      },
      {
        id: "escalation",
        name: "Escalation rules",
        what: "Rules that run before the AI answers: clinical symptoms, urgent wording, complaints, results and anything unfamiliar go straight to people.",
        why: "Safety comes first, so the rules sit in front of the model — not behind it.",
        carries: "The reason for escalation, and the conversation so far.",
        next: "Urgent messages receive fixed, pre-approved guidance and alert on-duty staff; others enter the staff inbox.",
      },
      {
        id: "booking",
        name: "Booking requests",
        what: "A short structured request — name, visit type, preferred time — collected in the conversation, with no questions about symptoms.",
        why: "Removes re-typing, and keeps sensitive information out of the chat.",
        carries: "The booking request only.",
        next: "Front-desk staff confirm the booking in the clinic system.",
      },
      {
        id: "inbox",
        name: "Staff inbox",
        what: "A single queue for escalations and booking requests, with an AI summary of each conversation and a suggested reply staff can edit.",
        why: "Staff see what needs them, in priority order, with context already summarised.",
        carries: "Conversations, summaries, priorities and actions taken.",
        next: "Staff reply, book or call back.",
      },
      {
        id: "reminders",
        name: "Reminders & follow-up",
        what: "Appointment reminders with preparation instructions, and a follow-up task when an appointment is missed.",
        why: "Fewer missed appointments, and a person — not an automated message — reaching out when someone doesn't come.",
        carries: "Appointment, reminder status and attendance.",
        next: "Missed appointments create a task to rebook.",
      },
      {
        id: "governance",
        name: "Governance",
        what: "Data minimisation, access controls, a retention period for conversations, and a weekly human review of a sample of AI answers.",
        why: "Using AI responsibly with patients is an ongoing practice, not a setting.",
        carries: "Review findings, corrections and policy changes.",
        next: "Corrections update the knowledge base and escalation rules.",
      },
      {
        id: "reporting",
        name: "Reporting",
        what: "Question topics, answers given, escalations, response times and questions the knowledge base couldn't answer.",
        why: "It shows what patients need — and where the clinic's information has gaps.",
        carries: "Everything above, summarised weekly.",
        next: "Knowledge gaps are filled; recurring questions improve the website and notices.",
      },
    ],
  },
  beforeAfter: {
    before: [
      "WhatsApp on the front-desk phone",
      "Phone calls",
      "Notices on the wall",
      "The clinic system",
      "A paper reminder list",
      "Staff memory",
    ],
    beforeNote: "Every question — routine or urgent — waits in the same line for the same people.",
    after: ["Approved knowledge", "AI assistant", "Escalation rules", "Booking requests", "Staff inbox", "Reminders", "Governance", "Reporting"],
    afterNote: "Routine answered, urgent escalated, people focused where they matter.",
  },
  journey: [
    {
      stage: "Ask",
      customer: "At 9pm, a patient asks whether the clinic accepts her insurer and whether a GP is available tomorrow.",
      business: "Escalation rules check the message first: routine, nothing urgent.",
    },
    {
      stage: "Answer",
      customer: "She receives a clear answer within seconds, and the message says it is automated.",
      business: "The assistant answers only from the approved insurance list and clinic hours, and shows what it used.",
      fragment: {
        kind: "assistant",
        question: "Do you accept my insurance, and is a GP available tomorrow morning?",
        draft:
          "Yes, we accept this insurer for outpatient consultations. GPs are available 8am–5pm tomorrow. Would you like me to pass a booking request to our front desk?",
        source: "Answered from: Insurance list (reviewed 2 Sep) · Clinic hours",
        status: "Automated reply",
      },
    },
    {
      stage: "Request",
      customer: "She says yes and gives her name and a preferred time. She isn't asked about symptoms.",
      business: "A booking request is created — no clinical detail collected.",
      fragment: {
        kind: "record",
        title: "Booking request · GP",
        stage: "Awaiting confirmation",
        rows: [
          ["Preferred time", "Tomorrow, morning"],
          ["Visit type", "General consultation"],
          ["Channel", "WhatsApp · after hours"],
          ["Next", "Front desk confirms at 8:00"],
        ],
      },
    },
    {
      stage: "Confirm",
      customer: "At 8am, she receives a confirmation from the front desk with the time and the doctor's name.",
      business: "Staff confirm the slot in the clinic system; the confirmation goes out from the record.",
    },
    {
      stage: "Remind",
      customer: "The day before her follow-up test, she gets a reminder with preparation instructions.",
      business: "The reminder uses approved wording from the knowledge base.",
    },
    {
      stage: "Attend",
      customer: "She attends. At the desk, staff have time to talk to her.",
      business: "Front-desk time previously spent on routine questions goes to patients in the room.",
    },
    {
      stage: "Escalate",
      customer: "Another patient, late at night, writes about chest pain.",
      business: "The escalation rule fires before the AI: fixed emergency guidance is sent, and the on-duty nurse is alerted to call.",
      exception: true,
      fragment: {
        kind: "task",
        title: "Urgent · call back now",
        meta: "22:41 · Escalated by rule · Assistant did not answer",
        body: "Standard emergency guidance sent. Conversation summary attached. On-duty nurse: please call the patient.",
      },
    },
    {
      stage: "Review",
      customer: "Nothing changes for patients — this happens behind the scenes.",
      business: "Each week, the practice manager reviews a sample of AI answers and all escalations, and corrects what was wrong.",
    },
    {
      stage: "Measure",
      customer: "Patients get routine answers faster, and urgent ones reach a person sooner.",
      business: "Reporting shows question topics, escalations and the questions the knowledge base couldn't answer.",
      fragment: {
        kind: "report",
        title: "Questions by topic · layout",
        rows: [
          { label: "Hours & availability", share: 0.8 },
          { label: "Fees & insurance", share: 0.6 },
          { label: "Test preparation", share: 0.35 },
          { label: "Not in knowledge base", share: 0.15 },
        ],
      },
    },
  ],
  technology: {
    intro:
      "The AI model is the least important decision here. The knowledge base, the escalation rules and the review process decide whether the system is safe; the model is replaceable. Choices depend on data-processing terms, cost and how each option performs in evaluation on the clinic's own questions.",
    items: [
      {
        keys: ["openai", "anthropic"],
        name: "OpenAI or Anthropic models",
        capability: "AI layer",
        role: "The language model that answers routine questions from approved content and summarises conversations for staff.",
        reason: "Either could fill this role. The choice is made through evaluation on anonymised historical questions, and on data-handling terms.",
        layer: "AI assistant · Staff inbox",
      },
      {
        keys: ["whatsapp"],
        name: "WhatsApp Business Platform",
        capability: "Messaging",
        role: "The patient-facing channel, with utility templates for confirmations and reminders.",
        reason: "Where patients already message the clinic; the Platform allows the assistant and staff inbox to share one number.",
        layer: "Access · Reminders",
      },
      {
        keys: ["postgresql"],
        name: "PostgreSQL",
        capability: "Database",
        role: "The approved knowledge base, conversation logs and review records, with access controls.",
        reason: "A reliable, well-understood database the clinic's data can be kept in, with clear retention rules.",
        layer: "Knowledge · Governance · Reporting",
      },
      {
        keys: ["nextjs"],
        name: "Next.js",
        capability: "Staff tools",
        role: "The staff inbox and the knowledge-base editor used by the practice manager.",
        reason: "A focused internal tool is simpler for staff than a general-purpose platform.",
        layer: "Staff inbox · Knowledge",
      },
    ],
  },
  automation: {
    intro:
      "Three workflows, one principle: rules run before AI, and people are the last step for anything that matters.",
    workflows: [
      {
        name: "Routine question",
        steps: [
          { kind: "Trigger", text: "A patient sends a message." },
          { kind: "Rule", text: "Escalation rules check for urgency, clinical content or complaints first. If none match…" },
          { kind: "Action", text: "…the assistant answers only if the approved knowledge base covers the question, and labels the reply as automated." },
          { kind: "Notification", text: "If the knowledge base doesn't cover it, the conversation goes to the staff inbox with a summary." },
          { kind: "Follow-up", text: "The assistant offers a booking request or a person." },
          { kind: "Human", text: "Staff handle everything outside the approved knowledge." },
          { kind: "Measure", text: "Record the topic, whether it was answered, and knowledge gaps." },
        ],
      },
      {
        name: "Urgent signal",
        steps: [
          { kind: "Trigger", text: "A message contains possible emergency or clinical content." },
          { kind: "Rule", text: "Escalation takes precedence — the AI does not answer." },
          { kind: "Action", text: "Send the clinic's fixed, pre-approved emergency guidance." },
          { kind: "Notification", text: "Alert the on-duty staff member immediately." },
          { kind: "Follow-up", text: "If unacknowledged within a set time, alert a second person." },
          { kind: "Human", text: "A member of staff calls the patient." },
          { kind: "Measure", text: "Track time from message to human contact." },
        ],
      },
      {
        name: "Appointment reminder",
        steps: [
          { kind: "Trigger", text: "A booking is confirmed in the clinic system." },
          { kind: "Rule", text: "The day before, at a set time…" },
          { kind: "Action", text: "…send a reminder with any preparation instructions from the knowledge base." },
          { kind: "Notification", text: "If an appointment is missed, create a task for the front desk." },
          { kind: "Follow-up", text: "The task prompts a call to rebook, not an automated message." },
          { kind: "Human", text: "Staff call, rebook and note anything the doctor should know." },
          { kind: "Measure", text: "Track missed appointments and rebooking." },
        ],
      },
    ],
  },
  outcomes: [
    { title: "Routine questions answered consistently", text: "The same approved answer, whoever asks and whenever they ask." },
    { title: "After-hours coverage for routine needs", text: "Evening questions about hours, fees and insurance don't wait until morning." },
    { title: "Urgent messages reach people faster", text: "Escalation rules pull them out of the queue instead of leaving them in it." },
    { title: "Less re-entry", text: "Booking requests arrive structured, ready to confirm." },
    { title: "Fewer missed appointments", text: "Reminders with preparation instructions, and a person following up when someone doesn't come." },
    { title: "Visibility of patient needs", text: "What patients ask, and where the clinic's information falls short." },
    { title: "Knowledge kept current", text: "Every approved answer has an owner and a review date." },
    { title: "Safer use of AI", text: "Boundaries, disclosure, review and data minimisation designed in from the start." },
  ],
  measurement: [
    {
      group: "Access",
      metrics: [
        { name: "Messages by topic and hour", definition: "What patients need, and when." },
        { name: "Answered from approved knowledge", definition: "Share of routine questions the assistant could answer." },
      ],
    },
    {
      group: "Quality & safety",
      metrics: [
        { name: "Answer accuracy", definition: "From the weekly human review of sampled answers." },
        { name: "Escalation accuracy", definition: "Messages escalated that should have been — and any that should have been but weren't." },
        { name: "Corrections", definition: "Knowledge-base changes made after review." },
      ],
    },
    {
      group: "Operations",
      metrics: [
        { name: "Time to human contact", definition: "For escalated and urgent messages." },
        { name: "Booking request → confirmed", definition: "Time taken, including after-hours requests." },
        { name: "Staff time on routine messages", definition: "Sampled periodically." },
      ],
    },
    {
      group: "Patient",
      metrics: [
        { name: "Missed appointments", definition: "And rebooking after a missed appointment." },
        { name: "Patient feedback", definition: "On the messaging experience, including the assistant." },
      ],
    },
    {
      group: "System",
      metrics: [
        { name: "Knowledge gaps", definition: "Topics the assistant couldn't answer." },
        { name: "Retention compliance", definition: "Conversations deleted on schedule." },
      ],
    },
  ],
  human: {
    intro:
      "In healthcare, the human layer is the system's core, not its fallback. AI assists with routine information and summaries; people own every clinical, sensitive and exceptional decision — and they own the AI's knowledge and boundaries too.",
    image: "/images/photography/pexels-xtrovarts-16903231.jpg",
    imageAlt: "A clinician in a surgical cap and mask, looking down in concentration.",
    assists: [
      { system: "AI", does: "answers routine questions from approved content and summarises conversations for staff." },
      { system: "Automation", does: "routes, reminds and records." },
      { system: "The knowledge base", does: "keeps one approved, reviewed version of the truth." },
    ],
    decisions: [
      "Anything clinical — symptoms, advice, results",
      "Urgent or distressing situations",
      "Exceptions to fees or insurance",
      "Complaints",
      "What goes into the approved knowledge base, and when it changes",
    ],
  },
  build: [
    { component: "Strategy", text: "Use-case selection, escalation policy and governance, agreed with clinical leadership." },
    { component: "Knowledge", text: "An approved knowledge base with owners and review dates." },
    { component: "AI", text: "An assistant with boundaries and disclosure, evaluated on anonymised historical questions before any patient sees it." },
    { component: "Automation", text: "Routing, reminders and missed-appointment follow-up." },
    { component: "Digital", text: "A staff inbox and knowledge-base editor." },
    { component: "Analytics", text: "Topic, escalation and knowledge-gap reporting, plus the weekly review." },
  ],
  lesson:
    "In this scenario, the value of AI comes as much from what it is not allowed to do as from what it does.",
  insights: ["ai-in-a-small-business", "what-to-automate-first", "whatsapp-is-not-a-crm"],
};
