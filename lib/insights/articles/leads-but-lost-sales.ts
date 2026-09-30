import type { InsightArticleInput } from "../types";

export const leadsButLostSales: InsightArticleInput = {
  slug: "why-businesses-have-leads-but-lose-sales",
  category: "CRM & Sales",
  title: "Why Your Business Has Leads but Still Loses Sales",
  dek: "More enquiries rarely fix a conversion problem. Most lost sales happen after the lead arrives — in the gaps between capture, response, follow-up and measurement.",
  description:
    "Where sales actually go missing between the first enquiry and the closed deal, what the research says about response time, and a seven-stage model for finding the leaks in your own process.",
  publishedDate: "2026-09-30",
  heroImage: "/images/photography/pexels-a-darmel-8134095.jpg",
  heroImageAlt: "Close-up of hands typing on a laptop keyboard in low light.",
  relatedSolutionIds: ["crm-sales", "business-automation", "growth-strategy"],
  related: ["whatsapp-is-not-a-crm", "marketing-sales-crm-one-system", "what-to-automate-first"],
  sections: [
    {
      id: "the-problem",
      heading: "The problem usually starts after the enquiry",
      blocks: [
        {
          type: "p",
          text: "When sales slow down, the instinct is to find more leads: another campaign, a bigger ad budget, a new channel. Sometimes that is the right call. But in many growing businesses the more expensive problem sits somewhere else — in what happens between the moment someone enquires and the moment they either buy or quietly disappear.",
        },
        {
          type: "p",
          text: "That gap is easy to miss because nothing in it looks like a failure. An enquiry arrives on WhatsApp during a busy afternoon. Someone means to reply properly later. A quote is sent, and nobody checks back. A promising conversation goes cold because the person handling it went on leave. None of these moments is dramatic. Together, they can account for a large share of the revenue a business was already paying to attract.",
        },
        {
          type: "p",
          text: "This article looks at why that happens, what the evidence says about one part of it — response time — and how to think about the path from enquiry to sale as a system you can inspect and improve, rather than a matter of individual effort.",
        },
      ],
    },
    {
      id: "why-it-happens",
      heading: "Why this happens: leads are events, sales are processes",
      blocks: [
        {
          type: "p",
          text: "A lead is a single event: someone filled in a form, sent a message, called, or walked in. A sale is the end of a process that may involve several conversations, a quote, a decision by more than one person and a payment. Marketing is usually measured on the event. Revenue depends on the process.",
        },
        {
          type: "p",
          text: "When nobody owns the process as a whole, each stage is handled by whoever happens to be closest to it, using whatever tool is nearest — a personal phone, a notebook, a spreadsheet, memory. Each stage may work reasonably well on its own. What breaks is the **handoff between stages**, because a handoff that depends on someone remembering is a handoff that will sometimes be forgotten.",
        },
        {
          type: "figure",
          figure: "conversion-leaks",
          caption:
            "The path from enquiry to revenue, and the points where enquiries most often leak out. Each leak is a handoff that depends on memory rather than on a defined next step.",
        },
        {
          type: "callout",
          kind: "definition",
          title: "Conversion system",
          text: "The combination of people, rules and tools that moves an enquiry to a decision: how leads are captured, who responds and how fast, how they are qualified, how follow-up happens, and how the outcome is recorded. Every business has one. The question is whether it was designed or accumulated.",
        },
      ],
    },
    {
      id: "response-time",
      heading: "Response time matters more than most teams assume",
      blocks: [
        {
          type: "p",
          text: "One of the most cited pieces of evidence on this comes from a study published in Harvard Business Review in 2011. The researchers analysed 1.25 million sales leads received by 29 business-to-consumer and 13 business-to-business companies in the United States [1].",
        },
        {
          type: "callout",
          kind: "fact",
          title: "What the study found",
          text: "Firms that tried to contact a potential customer within an hour of receiving the enquiry were nearly seven times as likely to qualify the lead — meaning a meaningful conversation with a decision-maker — as firms that tried an hour later, and more than 60 times as likely as firms that waited 24 hours or longer [1].",
        },
        {
          type: "figure",
          figure: "response-decay",
          caption:
            "Left: relative likelihood of qualifying a lead, indexed to contact within one hour (= 100), derived from the ratios reported in [1]. Right: how the audited companies actually responded to an enquiry [1].",
        },
        {
          type: "p",
          text: "The same article reported how companies actually behaved when the researchers sent them enquiries: 37% responded within an hour, 16% within one to 24 hours, 24% took longer than 24 hours, and 23% never responded at all [1]. Among firms that did respond within 30 days, the average response time was 42 hours [1].",
        },
        {
          type: "callout",
          kind: "analysis",
          title: "How to read this evidence",
          text: "The study is from 2011, covers US companies and online leads, and measured contact attempts rather than closed sales. The exact multiples will not transfer to a Nairobi clinic or a property agency in 2026. The direction almost certainly does: interest is highest at the moment someone asks, and it decays while they wait — especially when a competitor is one message away.",
        },
        {
          type: "p",
          text: "Speed is not the only thing that matters. A fast, careless reply can do more harm than a thoughtful one an hour later. But speed is the easiest part of the system to measure, and in most businesses it is also the part that nobody is measuring.",
        },
      ],
    },
    {
      id: "common-mistakes",
      heading: "What most businesses get wrong",
      blocks: [
        {
          type: "p",
          text: "The patterns below come up repeatedly when businesses look closely at where their enquiries go. None of them is a failure of effort. Each is a gap in design.",
        },
        {
          type: "list",
          items: [
            "**Buying more leads to solve a conversion problem.** If half of today's enquiries are never followed up, doubling lead volume doubles the waste along with the sales.",
            "**Treating the CRM as a filing cabinet.** A CRM that records contacts but does not drive a next step — a task, a reminder, an owner — is a database, not a sales system.",
            "**Measuring leads instead of outcomes.** Reporting on enquiries per channel says which channels are noisy, not which ones produce customers.",
            "**Qualifying by instinct.** Without a shared definition of a good lead, each person prioritises differently, and the best enquiries are not reliably handled first.",
            "**Leaving the next step undefined.** A conversation that ends without an agreed next action — a call, a visit, a decision date — usually ends there.",
          ],
        },
      ],
    },
    {
      id: "how-the-system-works",
      heading: "How the conversion system actually works",
      blocks: [
        {
          type: "p",
          text: "It helps to break the path from enquiry to sale into stages, each with one question it must answer. The stages below are a working model, not a universal law; a clinic, a school and a B2B supplier will weight them differently. But every business that sells has some version of each.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Capture",
              text: "Does every enquiry become a record, whichever channel it arrives through? If an enquiry only exists inside one person's WhatsApp chat or inbox, the business cannot see it, count it or follow it up.",
            },
            {
              title: "Respond",
              text: "Who replies first, and how quickly? Define a target — for example, a first human reply within one working hour — and an acknowledgement that goes out immediately outside working hours.",
            },
            {
              title: "Qualify",
              text: "Is this a good fit, and how urgent is it? A few consistent questions (need, timing, budget range, decision-maker) let the team give the best enquiries the most attention.",
            },
            {
              title: "Follow up",
              text: "What happens when the customer goes quiet? A simple rule — for example, a check-in after two days and again after a week — removes the dependency on memory.",
            },
            {
              title: "Progress",
              text: "Where is each opportunity now? Stages such as Qualified, Quote sent, Negotiating and Won or Lost make the pipeline visible and show where deals stall.",
            },
            {
              title: "Close",
              text: "Is the path to paying clear? Proposals, payment options and confirmations should be easy to act on at the moment the customer decides.",
            },
            {
              title: "Measure",
              text: "Which sources, messages and people produce customers, not just conversations? This closes the loop back to marketing and tells you where the next shilling should go.",
            },
          ],
        },
        {
          type: "p",
          text: "Notice that only one of these stages — Capture — is about getting more leads into the system. The other six decide what those leads are worth.",
        },
      ],
    },
    {
      id: "example",
      heading: "A realistic example",
      blocks: [
        {
          type: "example",
          title: "An interior design studio — a composite, fictional business",
          paragraphs: [
            "A small interior design studio in Nairobi receives around sixty enquiries a month: roughly half through Instagram direct messages, a third on WhatsApp, and the rest through its website form. The founder believes the studio needs more visibility and is considering a larger advertising budget.",
            "Before spending more, the team goes back through one month of enquiries by hand. They find that about a fifth of Instagram messages received no reply for more than a day, because nobody was responsible for that inbox on weekends. Website enquiries went to an email address that one designer checked irregularly. Of the quotes sent, fewer than half had any follow-up after the first week.",
            "None of this required new technology to discover — only counting. The first changes were simple: one person owns first response each day, website enquiries forward to a shared WhatsApp number, every enquiry is logged in a shared sheet with its source and status, and every quote gets two scheduled follow-ups. Only after that routine held for a couple of months did the studio move the sheet into a CRM with reminders.",
            "The point is not the specific numbers, which are illustrative. It is the order: fix the leaks you can see before paying to pour more into the top.",
          ],
        },
      ],
    },
    {
      id: "what-to-do-next",
      heading: "What to do next",
      blocks: [
        {
          type: "p",
          text: "You can learn most of what you need from your own last month of enquiries. Before choosing any software, work through the checklist below.",
        },
        {
          type: "checklist",
          title: "A one-afternoon conversion audit",
          items: [
            "Count every enquiry from the last 30 days, by channel. Include DMs, calls and walk-ins, not just forms.",
            "For each one, note how long the first reply took, and whether anyone followed up after that.",
            "Mark which enquiries became customers. Compare the rate by channel.",
            "Write down your definition of a qualified lead in one sentence. Ask a colleague to do the same, and compare.",
            "Pick one follow-up rule and one response-time target, and assign an owner for each.",
          ],
        },
        {
          type: "p",
          text: "If the audit shows that enquiries are being lost at capture or follow-up, a CRM with automated reminders is usually the next step. If it shows that very few enquiries arrive at all, the problem really is upstream — and marketing spend becomes a much safer decision once you know the system below it can handle the volume.",
        },
      ],
    },
  ],
  takeaways: [
    "A lead is an event; a sale is a process. Most lost revenue sits in the handoffs between stages.",
    "Response speed has a large effect on whether a lead turns into a real conversation, and it is rarely measured.",
    "More leads multiply whatever your conversion system already does — including its leaks.",
    "Count and trace one month of enquiries before buying software or more advertising.",
  ],
  sources: [
    {
      title: "The Short Life of Online Sales Leads",
      publisher: "Harvard Business Review, March 2011 (Oldroyd, McElheran & Elkington)",
      url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      note: "Source of the response-time findings and the company response audit. US data from 2011; used here for direction, not as a local benchmark.",
    },
  ],
};
