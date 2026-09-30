import type { InsightArticleInput } from "../types";

export const crmVsSpreadsheetVsWhatsapp: InsightArticleInput = {
  slug: "crm-vs-spreadsheet-vs-whatsapp",
  category: "Systems",
  title: "CRM, Spreadsheet or WhatsApp: What Should Your Business Actually Use?",
  seoTitle: "CRM vs Spreadsheet vs WhatsApp",
  dek: "They are not three competing answers to the same question. Each is built to hold something different — and the right choice depends on what your business has outgrown.",
  description:
    "An honest comparison of the three tools most growing businesses use to manage customers, the signals that manual follow-up has stopped working, and a staged path that avoids buying a CRM nobody uses.",
  publishedDate: "2026-09-30",
  heroImage: "/images/photography/pexels-thirdman-5058915.jpg",
  heroImageAlt: "A man in a desk chair writing in a notebook beside a large monitor.",
  relatedSolutionIds: ["crm-sales", "business-automation"],
  related: ["whatsapp-is-not-a-crm", "why-businesses-have-leads-but-lose-sales", "what-to-automate-first"],
  sections: [
    {
      id: "wrong-question",
      heading: "The question is usually framed wrongly",
      blocks: [
        {
          type: "p",
          text: "“Should we get a CRM?” is often asked as if the choice were between a modern tool and an old-fashioned one. In practice, most businesses use all three of the tools in this article at once: WhatsApp for talking to customers, a spreadsheet for keeping lists, and sometimes a CRM that holds some of the same information again. The problem is rarely which tool. It is that nobody has decided **which tool is the record** for which job.",
        },
        {
          type: "p",
          text: "A more useful question is: what does each tool hold, what does your business now need to hold, and which gap is costing you the most?",
        },
        {
          type: "figure",
          figure: "tool-layers",
          caption:
            "Three tools, three different things held. A conversation tool holds what was said; a list holds rows of facts; a CRM holds relationships moving through a process.",
        },
      ],
    },
    {
      id: "each-tool",
      heading: "What each tool is genuinely good at",
      blocks: [
        { type: "h3", text: "WhatsApp: the conversation" },
        {
          type: "p",
          text: "Fast, familiar, and where customers already are. The free WhatsApp Business app adds labels, lists, quick replies and away messages that can organise a modest volume of enquiries [2]. Its weakness is that it has no concept of an owner, a due date or a pipeline — and when the conversations live on personal phones, the business does not really hold them at all.",
        },
        { type: "h3", text: "A spreadsheet: the list" },
        {
          type: "p",
          text: "Flexible, cheap, and understood by everyone. A shared sheet with a row per enquiry — date, name, source, owner, stage, next step, outcome — is a genuinely good second stage, and it forces the discipline of writing down what is happening. Its weaknesses appear with scale: nothing reminds anyone of anything, several people editing the same sheet overwrite each other, history is lost when a cell is changed, and errors accumulate quietly.",
        },
        {
          type: "callout",
          kind: "fact",
          title: "Spreadsheets are more error-prone than they feel",
          text: "In Raymond Panko's review of spreadsheet research, field audits using better methods found errors in at least 86% of the spreadsheets examined, and roughly 5% contained very serious errors [1]. Those audits concern complex financial models more than simple lead lists, but the lesson carries over: a manual record is only as reliable as the least careful edit.",
        },
        { type: "h3", text: "A CRM: the relationship and the process" },
        {
          type: "p",
          text: "A CRM holds each contact and opportunity as a structured record with an owner, a stage, a history and a next action, and it can act on that record — creating reminders, assigning leads, sending confirmations and reporting on the pipeline. Many CRMs can also connect to WhatsApp through the Business Platform, so conversations are logged against the contact [3]. Its weakness is cost of adoption: licences, setup, and above all the discipline of a team using it consistently.",
        },
      ],
    },
    {
      id: "comparison",
      heading: "Side by side",
      blocks: [
        {
          type: "table",
          caption: "How the three tools compare on the things that decide sales",
          columns: ["", "WhatsApp (Business app)", "Shared spreadsheet", "CRM"],
          rows: [
            ["Holds", "Conversations", "Rows of facts", "Contacts, deals, activity"],
            ["Owner per customer", "No", "If someone fills it in", "Yes, and can be assigned automatically"],
            ["Reminds you to follow up", "No", "No", "Yes"],
            ["Keeps history of changes", "Chat history only", "Limited", "Yes"],
            ["Pipeline view", "Via labels", "Via filters", "Built in"],
            ["Reporting by source and outcome", "No", "Manual", "Built in"],
            ["Cost to start", "Free", "Free", "Licence and setup time"],
            ["Typically breaks when…", "More than one person handles enquiries", "Volume or team size grows", "The process isn't defined first"],
          ],
          note: "Summaries of typical capabilities. Specific products differ, and features change.",
        },
      ],
    },
    {
      id: "signals",
      heading: "Signs you have outgrown manual follow-up",
      blocks: [
        {
          type: "p",
          text: "No enquiry volume magically triggers the need for a CRM. The better signal is when the costs of the manual system start to show up in the business. If several of the following are true, the manual approach is probably costing more than a CRM would.",
        },
        {
          type: "checklist",
          title: "Operational signals",
          items: [
            "You have discovered, more than once, an enquiry that nobody answered.",
            "More than two people handle customer enquiries, and they sometimes duplicate or miss each other's work.",
            "Nobody can say, without scrolling, how many open opportunities there are this week.",
            "Follow-ups happen when someone remembers, not on a schedule.",
            "When a staff member is away, their customers wait.",
            "You cannot say which marketing channel produced last month's customers.",
            "Your spreadsheet has multiple versions, or columns nobody trusts.",
          ],
        },
      ],
    },
    {
      id: "why-crms-fail",
      heading: "Why CRM projects fail — and how to avoid it",
      blocks: [
        {
          type: "p",
          text: "The most common way a CRM fails is not technical. It is that the system is configured around a generic idea of selling rather than the way this team actually works. The stages do not match reality, the required fields feel like busywork, and within a few months people are back on WhatsApp and the CRM is an expensive, half-empty database.",
        },
        {
          type: "callout",
          kind: "analysis",
          title: "Process first, software second",
          text: "Map how an enquiry actually becomes a customer today, including the informal steps nobody wrote down. Decide the few stages and fields that genuinely matter. Only then configure the tool. A CRM should make the real process easier; it should not replace it with a theoretical one.",
        },
        {
          type: "p",
          text: "Adoption also improves when the CRM gives something back immediately. If entering an enquiry means the owner gets an automatic reminder, the customer gets a confirmation and the manager stops asking for status updates, people use it. If entering data is pure overhead, they will not.",
        },
      ],
    },
    {
      id: "choosing",
      heading: "Choosing a CRM: questions that matter more than feature lists",
      blocks: [
        {
          type: "p",
          text: "CRM comparison pages list hundreds of features, most of which a growing business will never use. The questions below are the ones that decide whether a CRM is still in use a year later.",
        },
        {
          type: "checklist",
          title: "Before you choose",
          items: [
            "Can it match your real sales stages without heavy customisation?",
            "Is the mobile app good enough for people who work away from a desk?",
            "Does it connect to the channels your enquiries actually arrive through — website forms and the WhatsApp Business Platform?",
            "Can you export all of your data, in a usable format, if you ever leave?",
            "Where is the data processed, and can you control who sees what? Kenya's Data Protection Act requires personal data to be limited to what is necessary and processed for explicit, legitimate purposes [4].",
            "What will it cost per user as the team grows, not just today?",
            "Is there someone — in-house or a partner — who can configure it and support your team?",
          ],
        },
        { type: "h3", text: "What moving to a CRM actually involves" },
        {
          type: "p",
          text: "The software is the easy part. The work is in deciding the handful of stages and fields that matter, cleaning up existing records — duplicates, missing phone numbers, inconsistent names — before importing them, and agreeing who updates what. Running the old and new systems side by side for a short period, with a clear date when the old one stops, avoids the common failure where both are half-maintained indefinitely.",
        },
      ],
    },
    {
      id: "staged-path",
      heading: "A staged path that fits most growing businesses",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "One number, organised",
              text: "Move enquiries to a single business number on the WhatsApp Business app. Use labels for real stages and quick replies for common answers.",
            },
            {
              title: "One shared log",
              text: "Record every enquiry in a shared sheet with source, owner, stage, next step and outcome. Keep it for at least a month; it will show you where enquiries are being lost.",
            },
            {
              title: "A CRM around the process you now know",
              text: "Configure a CRM to match the stages the log revealed. Import the log. Start with reminders and assignment, not every feature.",
            },
            {
              title: "Connect the channels",
              text: "Connect website forms and WhatsApp (through the Business Platform) so enquiries arrive in the CRM without retyping.",
            },
            {
              title: "Automate and measure",
              text: "Add follow-up rules and reporting by source, and review them monthly. Improve the system from what it shows you.",
            },
          ],
        },
        {
          type: "example",
          title: "A property agency — a composite, fictional business",
          paragraphs: [
            "Three agents at a small letting agency each used their own WhatsApp to handle enquiries from listing sites and social media. The owner kept a spreadsheet of units but not of enquiries.",
            "For one month, every enquiry went into a shared log. It showed that enquiries arriving on weekends waited the longest, and that two agents were regularly replying to the same prospect. The CRM that followed was deliberately simple: four stages, automatic assignment by rota, a reminder if a new enquiry had no reply within two hours, and a weekly report of enquiries and viewings by source.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "WhatsApp, spreadsheets and CRMs hold different things; decide which is the record for each job.",
    "A shared spreadsheet is a legitimate stage — and the fastest way to learn your real process.",
    "Move to a CRM when the costs of manual follow-up show up in lost enquiries, duplicated work or blind spots.",
    "CRM projects fail on process, not software. Configure around how your team actually sells.",
  ],
  sources: [
    {
      title: "What We Know About Spreadsheet Errors",
      publisher: "Raymond R. Panko, University of Hawaiʻi",
      url: "http://panko.shidler.hawaii.edu/SSR/Mypapers/whatknow.htm",
      note: "Review of field audits and experiments on spreadsheet errors. Mostly concerns complex models.",
    },
    {
      title: "Staying organized as a small business using Lists and quick replies on WhatsApp",
      publisher: "WhatsApp Business",
      url: "https://business.whatsapp.com/resources/resource-library/staying-organized-smb-using-lists-quick-replies",
    },
    {
      title: "Business messaging using WhatsApp for Business: integration with Zoho CRM",
      publisher: "Zoho CRM Help",
      url: "https://help.zoho.com/portal/en/kb/crm/connect-with-customers/business-messaging/articles/business-messaging-using-whatsapp-for-business-integration-with-zoho-crm",
      note: "One documented example of a CRM–WhatsApp integration. No partnership is implied.",
    },
    {
      title: "The Data Protection Act, 2019 (No. 24 of 2019), section 25",
      publisher: "Kenya Law",
      url: "https://new.kenyalaw.org/akn/ke/act/2019/24/eng@2022-12-31",
    },
  ],
};
