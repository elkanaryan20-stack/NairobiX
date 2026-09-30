import type { InsightArticleInput } from "../types";

export const whatsappIsNotACrm: InsightArticleInput = {
  slug: "whatsapp-is-not-a-crm",
  category: "CRM & Sales",
  title: "WhatsApp Is Not a CRM: Where Customer Conversations Start Breaking Down",
  seoTitle: "WhatsApp Is Not a CRM",
  dek: "WhatsApp is the right front door for many businesses. The trouble starts when the chat thread is also expected to be the sales record, the task list and the memory of the business.",
  description:
    "What WhatsApp is built to hold, where it stops, how the Business app differs from the Business Platform, and what a CRM connection should — and should not — automate.",
  publishedDate: "2026-09-30",
  reviewedNote: "Platform details checked against WhatsApp and Meta documentation, September 2026.",
  heroImage: "/images/photography/pexels-kaypics-27926809.jpg",
  heroImageAlt: "A market vendor checking her smartphone at a stall of fresh tomatoes.",
  relatedSolutionIds: ["crm-sales", "business-automation"],
  related: ["crm-vs-spreadsheet-vs-whatsapp", "why-businesses-have-leads-but-lose-sales", "what-to-automate-first"],
  sections: [
    {
      id: "front-door",
      heading: "WhatsApp is the right front door",
      blocks: [
        {
          type: "p",
          text: "For a large share of Kenyan businesses, the first real conversation with a customer happens on WhatsApp. People ask about a property, a treatment, a course, a delivery or a price in a chat, because that is where they already are. This article is not an argument against that. Meeting customers where they are is good practice.",
        },
        {
          type: "p",
          text: "The argument is narrower. WhatsApp is designed to hold **conversations**. Growing a business also needs a place to hold **relationships and processes** — who this person is, what they want, who is responsible for them, what happens next, and whether they bought. When the chat app is asked to do both jobs, the second one quietly fails.",
        },
      ],
    },
    {
      id: "what-each-holds",
      heading: "What a chat holds, and what a CRM holds",
      blocks: [
        {
          type: "callout",
          kind: "definition",
          title: "CRM (customer relationship management) system",
          text: "Software that keeps a structured record of each contact and opportunity — its source, owner, stage, history and next action — so a team can manage many relationships consistently and see the pipeline as a whole.",
        },
        {
          type: "p",
          text: "A chat thread is ordered by time. It is excellent at showing what was said, and poor at answering the questions a manager needs answered: How many enquiries came in this week? Which ones are waiting on us? Which ones did we lose, and why? Who is handling the Kilimani client? Those are questions about **state**, and a conversation has no state — only a history.",
        },
        {
          type: "table",
          caption: "Different jobs, not better and worse tools",
          columns: ["Question", "WhatsApp chat", "CRM record"],
          rows: [
            ["What did the customer say?", "Complete, in order", "Summarised or linked"],
            ["Who owns this customer?", "Whoever holds the phone", "A named owner"],
            ["What happens next, and when?", "Not recorded", "A task with a due date"],
            ["Where is this deal?", "Inferred by scrolling", "A pipeline stage"],
            ["Where did this lead come from?", "Usually unknown", "A source field"],
            ["Did they buy?", "Not recorded", "Won or lost, with value"],
          ],
        },
      ],
    },
    {
      id: "breaking-points",
      heading: "Where conversations start breaking down",
      blocks: [
        {
          type: "p",
          text: "The failures below tend to appear gradually as volume grows, a second or third person starts handling enquiries, or the business begins to rely on referrals from customers it served a year ago.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Ownership blurs",
              text: "Enquiries arrive on several personal phones. When two people reply to the same customer, or each assumes the other did, the customer experiences the business as disorganised.",
            },
            {
              title: "History leaves with people",
              text: "When a staff member changes roles or leaves, their chats — and the relationships in them — go too. The business owned the customer; the phone owned the record.",
            },
            {
              title: "Follow-up depends on memory",
              text: "Nothing in a chat app says “this person asked for a quote four days ago and has heard nothing since.” Unread badges show new messages, not neglected ones.",
            },
            {
              title: "The pipeline is invisible",
              text: "Without stages, the only way to know how many opportunities are open is to scroll. Forecasting and prioritising become guesswork.",
            },
            {
              title: "Nothing can be measured",
              text: "If sources and outcomes are not recorded, the business cannot tell which campaign, referral partner or product line actually produces customers.",
            },
          ],
        },
      ],
    },
    {
      id: "business-app",
      heading: "What the WhatsApp Business app already gives you",
      blocks: [
        {
          type: "p",
          text: "Before adding anything, it is worth using what the free WhatsApp Business app already offers. WhatsApp's own guidance describes **labels and lists** for organising chats and contacts so they are easier to follow up and prioritise, **quick replies** for saving answers to common questions, and **automated greeting and away messages** [1]. The app also supports a product or service **catalog** [1].",
        },
        {
          type: "p",
          text: "Used deliberately — a label for each stage (New, Quote sent, Awaiting payment, Won), quick replies for the ten questions you answer every day, an away message that sets expectations out of hours — the app can carry a small business a long way. It is a sensible first stage, not a mistake to be skipped.",
        },
        {
          type: "p",
          text: "Its limits are structural rather than a matter of features. Labels live inside one account, not in a shared system with owners and due dates. Reporting is minimal. And the app is designed to be operated by people, not connected to other software — which is where the Business Platform comes in.",
        },
      ],
    },
    {
      id: "business-platform",
      heading: "How the WhatsApp Business Platform changes the picture",
      blocks: [
        {
          type: "p",
          text: "The WhatsApp Business Platform — accessed through Meta's Cloud API, usually via a CRM or messaging provider — lets software send and receive WhatsApp messages programmatically [4]. That makes it possible to log conversations in a CRM automatically, route them to the right person, and trigger messages from business events. It also comes with rules that shape how follow-up has to be designed.",
        },
        {
          type: "callout",
          kind: "fact",
          title: "The customer service window",
          text: "When a customer messages or calls a business, a 24-hour customer service window opens, and it resets each time they message again. Inside the window, the business can send free-form replies. Outside it, only pre-approved message templates can be sent [2][3].",
        },
        {
          type: "figure",
          figure: "service-window",
          caption:
            "How the 24-hour customer service window shapes follow-up on the WhatsApp Business Platform. A follow-up sent days later must use an approved template [2][3].",
        },
        {
          type: "p",
          text: "Templates generally need approval before they can be used, and businesses must obtain the customer's opt-in before sending them; Meta's documentation specifies that the opt-in must make the business name and intent clear [3][4]. Since 1 July 2025, Meta has charged per template message delivered, by category — marketing, utility and authentication — while non-template service messages are free, and utility templates sent inside an open customer service window are also free [5].",
        },
        {
          type: "callout",
          kind: "analysis",
          title: "Why this matters for design",
          text: "On the Platform, “follow up in four days” is not just a reminder to a salesperson; it is a template that must be written, categorised, approved and consented to in advance. Follow-up sequences should be designed deliberately, with a small set of useful templates, rather than improvised message by message.",
        },
      ],
    },
    {
      id: "connecting-to-crm",
      heading: "Connecting WhatsApp to a CRM",
      blocks: [
        {
          type: "p",
          text: "Most CRMs used by growing businesses can connect to the WhatsApp Business Platform, directly or through an integration partner. As one example, Zoho CRM documents a WhatsApp integration that lets teams message customers from the CRM, notify users when a customer writes in, configure message templates and trigger WhatsApp notifications from workflow rules [6]. Its prerequisites include a Meta business account, a verified business, a WhatsApp Business account and a registered phone number [6].",
        },
        {
          type: "figure",
          figure: "whatsapp-crm-architecture",
          caption:
            "An example architecture, not a prescription. The logos show where specific platforms can sit; other CRMs and messaging providers can fill the same roles.",
        },
        {
          type: "p",
          text: "The shape matters more than the vendor. A new conversation should create or match a contact; the contact should have an owner and a stage; the owner should get a task when a reply is due; and the outcome should be recorded so it can be reported against the source. If a proposed setup does not do those four things, it is a messaging tool, not a sales system.",
        },
      ],
    },
    {
      id: "what-to-automate",
      heading: "What should — and should not — be automated",
      blocks: [
        {
          type: "p",
          text: "The goal is not to remove people from the conversation. It is to remove the parts of the process that depend on people remembering, so their attention goes to the parts that need judgment.",
        },
        {
          type: "table",
          caption: "A starting point for dividing the work",
          columns: ["Usually worth automating", "Usually worth keeping human"],
          rows: [
            ["Logging every new conversation as a contact", "Understanding what the customer actually needs"],
            ["Assigning the enquiry to an owner", "Pricing, negotiation and exceptions"],
            ["An immediate acknowledgement out of hours", "Complaints and sensitive situations"],
            ["Reminding the owner when a reply is overdue", "Deciding whether and how to follow up a quiet lead"],
            ["Appointment and payment confirmations", "Anything where a wrong answer is costly"],
          ],
          note: "Automated messages should say they are automated, and always leave an easy route to a person.",
        },
      ],
    },
    {
      id: "data-protection",
      heading: "Customer data is a responsibility, not just an asset",
      blocks: [
        {
          type: "p",
          text: "Moving conversations from personal phones into a business system is also a data protection improvement. Kenya's Data Protection Act, 2019 requires that personal data be processed lawfully, fairly and transparently, collected for explicit, specified and legitimate purposes, and limited to what is necessary for those purposes [7].",
        },
        {
          type: "p",
          text: "Customer data scattered across staff phones is hard to secure, hard to correct and impossible to account for. A single system with access controls, and a clear purpose for each piece of information collected, is easier to defend. This is not legal advice; businesses handling sensitive data, such as health information, should take specific advice.",
        },
      ],
    },
    {
      id: "what-to-do-next",
      heading: "What to do next",
      blocks: [
        {
          type: "checklist",
          title: "Five steps, in order",
          items: [
            "Move enquiries to one business number on the WhatsApp Business app, not personal phones.",
            "Set up labels for your real sales stages, quick replies for common questions, and an honest away message.",
            "Keep a simple shared log of every enquiry: date, source, owner, stage, outcome.",
            "When the log is kept consistently but follow-up is still slipping, connect WhatsApp to a CRM through the Business Platform.",
            "Write a small set of approved templates for the follow-ups you actually need, and collect opt-in properly.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "WhatsApp holds conversations; a CRM holds relationships and process. Businesses need both.",
    "The free Business app — labels, lists, quick replies, away messages — is a legitimate first stage.",
    "On the Business Platform, follow-up after 24 hours needs approved templates and opt-in, so it must be designed in advance.",
    "Automate the remembering; keep the judgment human.",
  ],
  sources: [
    {
      title: "Staying organized as a small business using Lists and quick replies on WhatsApp",
      publisher: "WhatsApp Business",
      url: "https://business.whatsapp.com/resources/resource-library/staying-organized-smb-using-lists-quick-replies",
    },
    {
      title: "Service messages (customer service window)",
      publisher: "Meta for Developers — WhatsApp Business Platform",
      url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages",
    },
    {
      title: "Template fundamentals",
      publisher: "Meta for Developers — WhatsApp Business Platform",
      url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview",
    },
    {
      title: "About the WhatsApp Business Platform",
      publisher: "Meta for Developers",
      url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/about-the-platform",
    },
    {
      title: "Pricing on the WhatsApp Business Platform",
      publisher: "Meta for Developers",
      url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing",
      note: "Pricing rules change; check the current page before budgeting.",
    },
    {
      title: "Business messaging using WhatsApp for Business: integration with Zoho CRM",
      publisher: "Zoho CRM Help",
      url: "https://help.zoho.com/portal/en/kb/crm/connect-with-customers/business-messaging/articles/business-messaging-using-whatsapp-for-business-integration-with-zoho-crm",
      note: "Used as one documented example of a CRM–WhatsApp integration. No partnership is implied.",
    },
    {
      title: "The Data Protection Act, 2019 (No. 24 of 2019), section 25",
      publisher: "Kenya Law",
      url: "https://new.kenyalaw.org/akn/ke/act/2019/24/eng@2022-12-31",
    },
  ],
};
