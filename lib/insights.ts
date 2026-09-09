export type InsightArticle = {
  slug: string;
  category: "Growth" | "Sales Systems" | "Automation" | "AI" | "Digital" | "Kenya & Africa";
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedSolutionId?: string;
  relatedIndustrySlug?: string;
};

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "how-to-stop-losing-leads-through-whatsapp",
    category: "Sales Systems",
    title: "How to Stop Losing Leads Through WhatsApp",
    description:
      "WhatsApp is where most Kenyan businesses actually talk to customers — and where most leads quietly disappear. Here's how to fix that without abandoning the channel.",
    publishedDate: "2026-01-14",
    readTime: "7 min read",
    relatedSolutionId: "crm-sales",
    sections: [
      {
        heading: "WhatsApp isn't the problem — the lack of a system around it is",
        paragraphs: [
          "For most Kenyan businesses, WhatsApp is the real front door. Customers inquire about a property, a treatment, a booking or an order through a chat, not a form. That's not a bad thing — it's how people actually want to communicate. The problem shows up after the first message: there's no record of who inquired, no reminder to follow up, and no way to tell whether a conversation from three weeks ago ever turned into a sale.",
          "A missed WhatsApp follow-up doesn't look like a dramatic failure. It looks like a chat that quietly scrolls off the top of someone's phone, replaced by the next urgent thing. Multiply that by every staff member handling inquiries, and a business can be losing a meaningful share of its best leads without anyone noticing.",
        ],
      },
      {
        heading: "Why 'just be more disciplined' doesn't fix it",
        paragraphs: [
          "It's tempting to treat this as a discipline problem — tell staff to follow up better, keep a notebook, set personal reminders. In practice, this rarely survives more than a few weeks, especially once volume increases or a staff member changes. The fix isn't more willpower; it's removing the dependency on memory in the first place.",
          "That means every WhatsApp inquiry needs to become a record somewhere outside the chat thread itself — ideally the moment it arrives, not at the end of the day when half of them have already been forgotten.",
        ],
      },
      {
        heading: "What a working system actually looks like",
        paragraphs: [
          "In practice, this usually means connecting WhatsApp Business to a CRM (Zoho CRM is what we implement most often for Kenyan businesses) so that a new inquiry creates a lead automatically, with a follow-up reminder attached. Nobody has to remember to log it — the system already has.",
          "From there, the second piece is a simple follow-up rule: if a lead hasn't had a response within a set window, someone gets notified. This alone catches the majority of leads that would otherwise fall through. The third piece — often skipped — is closing the loop: marking whether a lead converted, so the business can eventually see which sources and messages actually produce customers, not just conversations.",
        ],
      },
      {
        heading: "Where to start if you're doing this manually today",
        paragraphs: [
          "You don't need to overhaul everything at once. Start by picking one thing: a shared inbox instead of personal phones, a simple daily log of new inquiries, or a CRM with WhatsApp integration if volume justifies it. The Business Growth Assessment is designed to help identify which of these is the right next step for where your business actually is — not a generic 'buy a CRM' recommendation regardless of stage.",
        ],
      },
    ],
  },
  {
    slug: "zoho-crm-implementation-kenyan-businesses",
    category: "Sales Systems",
    title: "Zoho CRM Implementation for Kenyan Businesses: What to Expect",
    description:
      "A practical look at what actually happens during a Zoho CRM implementation — timeline, common pitfalls, and what makes the difference between a CRM that gets used and one that gets abandoned.",
    publishedDate: "2026-01-28",
    readTime: "8 min read",
    relatedSolutionId: "crm-sales",
    sections: [
      {
        heading: "Most failed CRM rollouts fail for the same reason",
        paragraphs: [
          "The most common reason a CRM implementation fails isn't the software — it's that the system was built around how a CRM 'should' work in general, rather than how this specific team actually sells. If the pipeline stages don't match the real sales process, or the required fields feel like busywork, staff quietly stop updating it, and within a few months the CRM has become an expensive, mostly-empty database.",
          "A workable implementation starts by mapping the real process first — including the informal steps nobody wrote down, like following up on WhatsApp before sending a formal quote — and only then configuring Zoho CRM to match it.",
        ],
      },
      {
        heading: "What implementation typically involves",
        paragraphs: [
          "A realistic Zoho CRM implementation covers four things: pipeline and stage design matched to your actual sales process, migrating existing contacts and history (usually from spreadsheets or a previous informal system), integrations with the channels leads actually come through — website forms, WhatsApp Business, ad platforms — and automation for the repetitive parts, like follow-up reminders and lead assignment.",
          "For most small and mid-sized Kenyan businesses, this is realistic within three to four weeks for a working core system, with more advanced automation layered on over the following month or two.",
        ],
      },
      {
        heading: "The part that determines whether it actually gets used",
        paragraphs: [
          "Adoption, not configuration, is usually the harder problem. A CRM that requires ten fields to log a simple inquiry will get abandoned by a busy sales team, no matter how well it's built. The systems that stick tend to require the minimum information at the point of contact, with everything else — scoring, tagging, reporting — happening automatically in the background rather than as manual data entry.",
          "It also helps enormously if the CRM removes work rather than just adding a place to record it. If moving a lead through the pipeline automatically triggers a WhatsApp reminder or a task for someone else, the CRM starts to feel like it's doing part of the job — not just watching people do it.",
        ],
      },
      {
        heading: "Is Zoho CRM the right starting point?",
        paragraphs: [
          "Zoho CRM tends to be a strong fit for Kenyan businesses because of its WhatsApp Business integration options, reasonable cost relative to enterprise alternatives, and flexibility for the kind of pipeline structures common in real estate, healthcare, professional services and hospitality. It isn't the only option, but it's the one we implement most often — for context, not as a blanket recommendation independent of your specific sales process.",
        ],
      },
    ],
  },
  {
    slug: "automate-lead-follow-up-without-losing-personal-touch",
    category: "Automation",
    title: "How to Automate Lead Follow-Up Without Losing the Personal Touch",
    description:
      "Automated follow-up has a reputation for feeling robotic. Done well, it does the opposite — it makes sure the personal follow-up you're already capable of actually happens, every time.",
    publishedDate: "2026-02-11",
    readTime: "6 min read",
    relatedSolutionId: "business-automation",
    sections: [
      {
        heading: "The real trade-off isn't 'automated vs. personal'",
        paragraphs: [
          "Business owners are often wary of automation because they picture generic, obviously-templated messages that make a lead feel like a number. That's a real risk, but it's a design problem, not an inherent property of automation. The actual trade-off most businesses face isn't 'automated vs. personal' — it's 'personal but inconsistent vs. consistent but occasionally impersonal'. Most businesses are currently choosing the first option without realizing it.",
        ],
      },
      {
        heading: "What to automate, and what to leave to a person",
        paragraphs: [
          "The parts worth automating are the ones that are purely about timing and consistency: sending an acknowledgment the moment someone inquires, reminding staff when a lead has gone quiet, following up automatically after a missed appointment or an abandoned cart. None of these require judgment — they just require not being forgotten.",
          "The parts worth leaving to a person are the ones that require actual judgment: answering a specific question, negotiating terms, handling a complaint, or any conversation where the person clearly wants to talk to a human. A well-designed system automates the surrounding structure and leaves the substance of the conversation to your team.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Consider a hotel guest who inquires about a booking. An automated system can instantly confirm receipt and share availability — work a person would otherwise do manually, often with a delay. If the guest doesn't respond within a day, an automated reminder goes out. But the moment the guest asks a specific question about a room or requests a discount, the conversation should route directly to a person. The guest experiences fast, consistent service; the team spends their time on the parts of the conversation that actually need them.",
        ],
      },
      {
        heading: "Getting started without overengineering it",
        paragraphs: [
          "Start with the single follow-up step your business drops most often — this is usually obvious once you look for it — and automate just that one step before expanding further. Business Automation, as we implement it, is built around your existing tools rather than requiring you to replace them, so this can usually begin without a large upfront platform change.",
        ],
      },
    ],
  },
  {
    slug: "practical-ai-automation-kenyan-smes",
    category: "AI",
    title: "Practical AI Automation for Kenyan SMEs: Where to Actually Start",
    description:
      "Most AI advice for small businesses is either too abstract to act on or too focused on flashy demos. Here's a grounded starting point for where AI is actually useful right now.",
    publishedDate: "2026-02-24",
    readTime: "7 min read",
    relatedSolutionId: "ai-solutions",
    sections: [
      {
        heading: "Start with repetition, not ambition",
        paragraphs: [
          "The businesses that get real value from AI tend to start with something unglamorous: the handful of questions or tasks that repeat constantly. What are your hours? Do you deliver to this area? Can I reschedule my appointment? These questions cost time in aggregate, even though each one is trivial individually — and they're exactly the kind of repetitive, well-defined task current AI assistants handle well.",
          "The businesses that struggle with AI tend to start from the opposite direction — 'we should have an AI chatbot' as a goal in itself, without a specific repetitive problem it's meant to solve. That usually produces something that looks impressive in a demo and gets ignored by real customers within a week.",
        ],
      },
      {
        heading: "Where AI is genuinely useful for a small or mid-sized business",
        paragraphs: [
          "In our experience building these systems, three areas consistently produce real value: answering routine customer questions instantly, at any hour, across WhatsApp or a website; assisting internal work like drafting follow-up messages, summarizing customer conversations, or organizing information that currently lives in someone's head; and triaging incoming requests so the right ones reach a person quickly instead of sitting in a shared inbox.",
          "What ties these together is that none of them require the AI to make a judgment call the business isn't comfortable delegating. The AI extends what already exists rather than replacing a decision a person should be making.",
        ],
      },
      {
        heading: "The guardrail that matters most",
        paragraphs: [
          "The single most important design decision in any AI assistant is what it does when it doesn't know the answer. A system that confidently guesses will eventually give a customer wrong information about pricing, availability or policy — which does real damage to trust. A well-built assistant is scoped tightly to what it actually knows about the business and hands off to a person the moment a question falls outside that scope. This is a design choice, not a limitation of the underlying AI model.",
        ],
      },
      {
        heading: "A realistic first step",
        paragraphs: [
          "Pick the three to five questions your team answers most often, and start there — a narrow, well-scoped assistant that handles those well will earn more trust (from customers and from your own team) than a broad one that occasionally gets things wrong. From that foundation, scope typically expands in phases as the business sees what's working.",
        ],
      },
    ],
  },
  {
    slug: "nairobi-businesses-outgrowing-referral-only-growth",
    category: "Kenya & Africa",
    title: "Why Nairobi Businesses Are Outgrowing Referral-Only Growth",
    description:
      "Referrals built many successful Nairobi businesses. They also have a ceiling. Here's how to tell if you've reached it, and what a next step actually looks like.",
    publishedDate: "2026-03-05",
    readTime: "6 min read",
    relatedSolutionId: "growth-strategy",
    relatedIndustrySlug: "professional-services",
    sections: [
      {
        heading: "Referrals are a real growth engine — with a real ceiling",
        paragraphs: [
          "Many strong Nairobi businesses — professional services firms especially — were built almost entirely on referrals and reputation. That's not a weakness; it's evidence of genuinely good work. But referral-based growth has a structural ceiling: it scales with how many satisfied clients happen to know someone else who needs your services, not with how much effort or budget you're willing to invest. At some point, growth plateaus not because demand has disappeared, but because the referral network has been largely exhausted.",
        ],
      },
      {
        heading: "The signs a business has hit that ceiling",
        paragraphs: [
          "A few patterns tend to show up: growth has flattened even though client satisfaction hasn't dropped; new business increasingly comes from the same two or three long-standing relationships rather than a broader base; and there's no real answer to 'where will our next ten clients come from' beyond 'hopefully more referrals'. None of these are crises — but they're a sign the business has outgrown the growth model that built it.",
        ],
      },
      {
        heading: "What comes after referrals, without abandoning them",
        paragraphs: [
          "The goal isn't to replace referral-based growth — it remains genuinely valuable — but to add a second, more controllable channel alongside it. In practice, this usually means building a real inquiry pipeline (so referrals and other inbound interest are captured and followed up consistently, rather than handled informally), and a digital presence substantial enough to support trust before a referral conversation even happens — the way a prospective client quietly checks a firm's website before taking a referral seriously.",
          "This is a strategy and systems problem more than a marketing problem. It requires knowing which services and client types are actually most profitable — often surprisingly different from where the team spends the most time — before deciding where to invest in growing beyond referrals.",
        ],
      },
      {
        heading: "A grounded starting point",
        paragraphs: [
          "This is precisely what Growth Strategy & Analytics is designed to establish: an honest read on current performance, the two or three highest-impact opportunities, and a system for tracking whether new investment is actually working — before committing meaningful budget to a new growth channel.",
        ],
      },
    ],
  },
];
