import type { InsightArticleInput } from "../types";

export const whatToAutomateFirst: InsightArticleInput = {
  slug: "what-to-automate-first",
  category: "Automation",
  title: "What Should You Automate First in a Growing Business?",
  dek: "The best first automation is rarely the most impressive one. It is the task that happens often, follows a clear rule, and costs you something every time it is late or forgotten.",
  description:
    "A practical framework for choosing what to automate — frequency, rule clarity, cost of delay and cost of error — plus how to go from a business problem to a small, measurable automation.",
  publishedDate: "2026-09-30",
  heroImage: "/images/photography/operations-workflow.webp",
  heroImageAlt: "A man working at a laptop on a standing desk in a warehouse office.",
  relatedSolutionIds: ["business-automation", "crm-sales", "ai-solutions"],
  related: ["ai-in-a-small-business", "why-businesses-have-leads-but-lose-sales", "crm-vs-spreadsheet-vs-whatsapp"],
  sections: [
    {
      id: "decision-not-tool",
      heading: "Automation is a decision, not a tool",
      blocks: [
        {
          type: "p",
          text: "Most conversations about automation start with a tool: a workflow builder, a chatbot, an integration someone saw in a demo. The more useful starting point is a question about the business: **which recurring task, if it happened reliably and instantly, would make the biggest difference?**",
        },
        {
          type: "p",
          text: "Asked that way, the answer is usually unglamorous. Sending the confirmation. Logging the enquiry. Reminding someone that a quote has gone unanswered for three days. Moving a record from one system to another so nobody has to retype it. These tasks are small individually and expensive collectively, because they are exactly the ones that slip when people are busy.",
        },
      ],
    },
    {
      id: "what-it-is",
      heading: "What automation actually is",
      blocks: [
        {
          type: "callout",
          kind: "definition",
          title: "Workflow automation",
          text: "A rule that says: **when** something happens (a trigger), **if** certain conditions are true, **then** do something (an action). For example: when a website form is submitted, if the enquiry is about a consultation, then create a lead in the CRM, assign it to today's owner and send the customer a confirmation.",
        },
        {
          type: "p",
          text: "Everything that can be automated reliably can be described in that shape. If you cannot write the rule down — because it depends on reading the situation, weighing a relationship or making an exception — the task needs human judgment, and automating it will produce confident mistakes. That is also the line between rule-based automation and AI, which is covered in a separate article.",
        },
      ],
    },
    {
      id: "four-questions",
      heading: "Four questions that rank any candidate",
      blocks: [
        {
          type: "p",
          text: "For each task you are considering, ask four questions. They are a working framework, not a formula — but they reliably separate good first automations from projects that disappoint.",
        },
        {
          type: "steps",
          items: [
            {
              title: "How often does it happen?",
              text: "A task done forty times a week repays automation far faster than one done twice a month. Frequency multiplies every other benefit.",
            },
            {
              title: "How clear is the rule?",
              text: "Can you write it as when–if–then without “it depends”? Clear rules automate cleanly. Fuzzy rules need standardising first.",
            },
            {
              title: "What does delay cost?",
              text: "Some tasks lose value by the hour — a reply to a new enquiry, a reminder before an appointment. Others can wait until Friday without harm.",
            },
            {
              title: "What does an error cost?",
              text: "A wrongly worded confirmation is embarrassing. A wrongly sent invoice or a message to the wrong patient is serious. High-cost errors need a human checkpoint.",
            },
          ],
        },
        {
          type: "figure",
          figure: "automation-matrix",
          caption:
            "Frequency against rule clarity gives four zones. Cost of delay and cost of error then decide the order within a zone, and whether a human checkpoint is needed.",
        },
      ],
    },
    {
      id: "where-to-start",
      heading: "Where most businesses should start: the follow-up layer",
      blocks: [
        {
          type: "p",
          text: "Applied honestly, the four questions point most growing businesses to the same place: the steps between a customer's enquiry and the team's response. They happen constantly, the rules are clear, and delay is costly. In a widely cited Harvard Business Review study of 1.25 million leads, firms that attempted contact within an hour were nearly seven times as likely to qualify the lead as firms that waited even an hour longer [1].",
        },
        {
          type: "list",
          items: [
            "**Capture** — every form, message or call becomes a record automatically.",
            "**Acknowledge** — the customer gets an immediate, honest confirmation, especially out of hours.",
            "**Assign** — the enquiry goes to a named person, by rota, territory or product.",
            "**Remind** — the owner is prompted if no reply has been sent within the target time.",
            "**Confirm** — bookings, payments and next steps are confirmed without anyone retyping details.",
          ],
        },
        {
          type: "p",
          text: "None of these replaces a conversation. They make sure the conversation happens, and happens quickly.",
        },
      ],
    },
    {
      id: "not-first",
      heading: "What not to automate first",
      blocks: [
        {
          type: "list",
          items: [
            "**Processes you have not standardised.** Automating a messy process produces a faster mess. Agree the steps first.",
            "**Judgment calls.** Pricing exceptions, complaints, credit decisions and anything sensitive need a person, even if software prepares the information.",
            "**Rare tasks.** Something done monthly is usually cheaper as a checklist than as an automation that must be built and maintained.",
            "**Tasks whose failure you would not notice.** Every automation needs someone who would know if it stopped working.",
          ],
        },
        {
          type: "callout",
          kind: "analysis",
          title: "Automation has running costs",
          text: "Automations break when a form changes, a field is renamed or a connected service updates. Each one needs an owner, a simple way to see that it ran, and a note of what it does. Ten small automations nobody understands are a liability, not a system.",
        },
      ],
    },
    {
      id: "problem-to-automation",
      heading: "From business problem to automation: how to decide what to build",
      blocks: [
        {
          type: "p",
          text: "Good automation projects follow the same sequence regardless of the tool. Skipping steps is how businesses end up with impressive workflows that solve the wrong problem.",
        },
        {
          type: "steps",
          items: [
            { title: "Name the problem in business terms", text: "Not “we need Zapier” but “patients miss appointments and we find out when the slot is already wasted.”" },
            { title: "Map what happens today", text: "Write down each step, who does it, with what tool, and where it goes wrong. The map often reveals a simpler fix." },
            { title: "Find the rule", text: "Identify the part that can be written as when–if–then. That is your automation. The rest stays human." },
            { title: "Decide the human checkpoint", text: "Where must a person review, approve or be able to step in? Build that in from the start." },
            { title: "Build the smallest useful version", text: "Automate one step end to end, run it for a few weeks, and watch it." },
            { title: "Measure against the problem", text: "Did the problem named in step one actually shrink? If not, adjust before automating more." },
          ],
        },
      ],
    },
    {
      id: "is-it-worth-it",
      heading: "Is it worth it? A simple way to estimate",
      blocks: [
        {
          type: "p",
          text: "Vendors will happily estimate the return on an automation for you. A rough estimate of your own is more useful, because it forces you to state the assumptions. Three kinds of value are worth separating, because they behave differently.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Time returned",
              text: "How often the task happens, multiplied by the minutes it takes, multiplied by what that time costs. This is the easiest value to calculate and usually the smallest.",
            },
            {
              title: "Errors avoided",
              text: "How often the manual version goes wrong — a missed follow-up, a wrong detail retyped — multiplied by what each error costs. Often larger than the time saved, and easy to overlook.",
            },
            {
              title: "Speed and consistency",
              text: "What it is worth for every customer to get a reply, a reminder or a confirmation on time, every time. Hard to put a number on, and frequently the biggest of the three.",
            },
          ],
        },
        {
          type: "table",
          caption: "An illustrative estimate — logging and assigning new enquiries",
          columns: ["Assumption", "Illustrative value", "Working"],
          rows: [
            ["Enquiries per month", "200", "From your own records"],
            ["Minutes to log and assign each one by hand", "3", "Time it for a week"],
            ["Time returned per month", "10 hours", "200 × 3 minutes"],
            ["Enquiries currently lost or delayed at logging", "1 in 20", "From a month's audit"],
            ["Enquiries recovered per month", "About 10", "200 ÷ 20"],
            ["Running cost", "Tool subscription + about 1 hour of upkeep a month", "Plus a one-off setup"],
          ],
          note: "Every number here is hypothetical; replace each one with your own. The point is the structure: time, errors and speed, set against build and running costs.",
        },
        {
          type: "p",
          text: "In this illustration, the ten hours returned each month are useful, but the ten enquiries that no longer slip through are the real case for the automation. If your own numbers show neither, choose a different first automation.",
        },
      ],
    },
    {
      id: "example",
      heading: "A worked example",
      blocks: [
        {
          type: "example",
          title: "Appointment reminders at a clinic — a composite, fictional business",
          paragraphs: [
            "A physiotherapy clinic books around 120 appointments a week. Front-desk staff try to call or message every patient the day before, but on busy days reminders are skipped, and missed appointments leave unused slots.",
            "Against the four questions: the task is very frequent, the rule is clear (“the day before, at 10am, message every patient with a booking tomorrow”), delay makes it worthless, and an error is low-cost as long as the message is accurate and easy to reply to. It sits squarely in the “automate first” zone.",
            "The clinic automates the reminder from its booking system, with a reply option to confirm or reschedule. Replies asking to reschedule create a task for the front desk — the human checkpoint. Staff time previously spent on routine reminders goes to rebooking and patients who need a conversation.",
            "To judge value, the clinic uses simple arithmetic rather than a vendor's projection: minutes saved per week, plus the value of slots that are now rebooked instead of wasted, compared with the cost of the tool and its upkeep. Health information is sensitive, so the reminder contains only what is necessary — a time and a clinic name — in line with data-minimisation principles in Kenya's Data Protection Act [2].",
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
          title: "Find your first automation this week",
          items: [
            "List every recurring task in the path from enquiry to payment. Aim for twenty.",
            "Score each one for frequency, rule clarity, cost of delay and cost of error.",
            "Circle the tasks that are frequent, clear and costly when late. Pick one.",
            "Write its rule as when–if–then, and name the human checkpoint.",
            "Build it, give it an owner, and check after a month whether the original problem shrank.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "Start from a business problem, not a tool.",
    "Rank candidates by frequency, rule clarity, cost of delay and cost of error.",
    "For most growing businesses, the follow-up layer — capture, acknowledge, assign, remind, confirm — is the best first automation.",
    "Automate the rule, keep the judgment, and give every automation an owner.",
  ],
  sources: [
    {
      title: "The Short Life of Online Sales Leads",
      publisher: "Harvard Business Review, March 2011",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      note: "US data from 2011; used for direction rather than as a local benchmark.",
    },
    {
      title: "The Data Protection Act, 2019 (No. 24 of 2019), section 25",
      publisher: "Kenya Law",
      url: "https://new.kenyalaw.org/akn/ke/act/2019/24/eng@2022-12-31",
    },
  ],
};
