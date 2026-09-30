import type { InsightArticleInput } from "../types";

export const aiInASmallBusiness: InsightArticleInput = {
  slug: "ai-in-a-small-business",
  category: "AI",
  title: "AI in a Small Business: What Is Actually Worth Using It For?",
  seoTitle: "AI in a Small Business: What's Worth It?",
  dek: "AI is useful for drafting, sorting, summarising and answering from material you trust. It is risky wherever a confident wrong answer would cost you. Most good decisions follow from knowing the difference.",
  description:
    "Plain definitions of AI, automation, chatbots, assistants and agents; where generative AI earns its place in a small business and where it doesn't; and a four-question test for any proposed use.",
  publishedDate: "2026-09-30",
  reviewedNote: "Reviewed September 2026. AI capabilities and guidance change quickly.",
  heroImage: "/images/photography/pexels-naboth-otieno-83498565-19805876.jpg",
  heroImageAlt: "A developer reviewing code across two screens at a home workstation.",
  relatedSolutionIds: ["ai-solutions", "business-automation"],
  related: ["what-to-automate-first", "whatsapp-is-not-a-crm", "your-website-is-not-a-brochure"],
  sections: [
    {
      id: "start-with-definitions",
      heading: "Start with the distinctions",
      blocks: [
        {
          type: "p",
          text: "Much of the confusion about AI in business comes from one word covering very different things. A reminder that fires the day before an appointment is sometimes called “AI”. So is a system that reads a customer's message and drafts a reply. So is software that takes actions on its own across several systems. They carry very different risks, and they should be chosen for different jobs.",
        },
        {
          type: "table",
          caption: "Terms worth separating",
          columns: ["Term", "What it means in practice", "Behaves"],
          rows: [
            ["Workflow automation", "Fixed rules: when X happens, if Y, do Z", "Predictably — same input, same output"],
            ["Generative AI", "Models that produce text, images or other content from patterns in data", "Probabilistically — output can vary and can be wrong"],
            ["Chatbot", "A conversational interface; may run on fixed scripts, on AI, or both", "Depends entirely on what is behind it"],
            ["AI assistant", "AI that helps a person — drafts, summaries, suggestions — with the person deciding", "Helpful when a human reviews the output"],
            ["AI agent", "AI that plans and takes actions across tools with limited supervision", "Powerful, and hardest to control"],
            ["Decision support", "Analysis that informs a human decision without making it", "Useful when inputs are sound"],
          ],
        },
        {
          type: "figure",
          figure: "ai-spectrum",
          caption:
            "From fixed rules to autonomous action. Moving right adds flexibility and adds risk; the human checkpoint matters more the further right a use case sits.",
        },
      ],
    },
    {
      id: "what-its-good-at",
      heading: "Where generative AI genuinely helps",
      blocks: [
        {
          type: "p",
          text: "Generative AI is strongest at tasks involving language where a person can quickly check the result. For a small business, that typically includes:",
        },
        {
          type: "list",
          items: [
            "**Drafting** — first versions of replies, proposals, job adverts or product descriptions, edited by a person before they go out.",
            "**Summarising** — long email threads, call notes or documents condensed so the next person can pick them up.",
            "**Classifying and routing** — reading an incoming enquiry and suggesting what it is about, how urgent it is and who should handle it.",
            "**Extracting** — pulling names, dates, amounts or requirements out of messages and documents into structured fields.",
            "**Answering from approved material** — responding to common questions using only content the business has written and checked, with a clear route to a person.",
          ],
        },
        {
          type: "p",
          text: "What these share is that the AI prepares and a person decides, or the AI answers within boundaries the business has set. The value comes from time returned to the team, not from removing them.",
        },
      ],
    },
    {
      id: "where-it-fails",
      heading: "Where it fails, and why",
      blocks: [
        {
          type: "callout",
          kind: "fact",
          title: "Confabulation",
          text: "The US National Institute of Standards and Technology's Generative AI Profile lists confabulation — the production of confidently stated but erroneous or false content, often called “hallucination” — among the risks that are unique to or exacerbated by generative AI [2].",
        },
        {
          type: "p",
          text: "This is not a bug that will disappear with the next release; it follows from how these models work. They generate plausible language, and plausible is not the same as true. A model asked about your prices, your policies or a customer's order will produce a fluent answer whether or not it has the facts.",
        },
        {
          type: "p",
          text: "Other practical risks follow. Outputs vary, so the same question may get different answers. Customer information pasted into a tool may be stored or processed in ways the business has not assessed. And staff can come to trust fluent output more than it deserves. NIST's broader AI Risk Management Framework describes trustworthy AI as valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed [1] — a useful checklist even for a very small deployment.",
        },
      ],
    },
    {
      id: "four-question-test",
      heading: "A four-question test for any AI use case",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Can a person check the output quickly?", text: "If reviewing the answer takes as long as producing it, the time saving disappears." },
            { title: "What does a wrong answer cost?", text: "A clumsy draft costs a minute. A wrong price, dosage, legal statement or promise to a customer can cost far more." },
            { title: "Is there an approved source of truth?", text: "AI that answers from your own checked content is far safer than AI answering from general knowledge." },
            { title: "Who is accountable?", text: "Name the person who reviews, owns and can switch off each use. If nobody is, it is not ready." },
          ],
        },
        {
          type: "table",
          caption: "Applying the test to common proposals",
          columns: ["Use case", "Verdict", "Why"],
          rows: [
            ["Drafting replies to enquiries for staff to edit", "Good fit", "Quick to check; person sends"],
            ["Summarising call notes into the CRM", "Good fit", "Low cost of error; saves real time"],
            ["Classifying and routing incoming enquiries", "Good fit, with monitoring", "Errors are recoverable if routing is reviewed"],
            ["Answering FAQs on the website from approved content", "Conditional", "Needs boundaries, disclosure and a route to a person"],
            ["Quoting prices or availability automatically", "Only from live, structured data", "A confabulated price is a broken promise"],
            ["Medical, legal or financial advice to customers", "Avoid", "Cost of a wrong answer is too high"],
          ],
          note: "Verdicts are NairobiX analysis for typical small businesses, not rules.",
        },
      ],
    },
    {
      id: "human-in-the-loop",
      heading: "Design the human checkpoint first",
      blocks: [
        {
          type: "p",
          text: "The single most important design decision in a business AI system is where a person reviews, approves or can take over. Decide it before choosing a tool. In practice this means: AI drafts, a person sends; AI suggests a category, a person can correct it; AI answers a customer, and says it is automated, and hands over to a person when the question leaves its approved material.",
        },
        {
          type: "callout",
          kind: "analysis",
          title: "Automation first, AI second",
          text: "Many problems described as AI problems are really automation problems: a reminder that is not sent, a record that is not created. Fix those with predictable rules first. Add AI where the task genuinely involves reading or writing language, and where the rules cannot be written down in advance.",
        },
      ],
    },
    {
      id: "kenyan-context",
      heading: "Data, governance and the Kenyan context",
      blocks: [
        {
          type: "p",
          text: "Kenya's Data Protection Act, 2019 applies to personal data whether it is processed by a person or by software. Its principles — lawful, fair and transparent processing, explicit and legitimate purposes, and data limited to what is necessary — are a sensible test for any AI use involving customers [4]. In practice: know what data goes into each tool, why, where it is processed, and who can see it.",
        },
        {
          type: "p",
          text: "At the national level, the government launched Kenya's Artificial Intelligence Strategy 2025–2030 in March 2025, built around digital infrastructure, data and AI governance, and research, innovation and commercialisation [3]. A strategy is not a regulation, but it signals the direction of policy, and businesses building on AI should expect governance expectations to mature.",
        },
      ],
    },
    {
      id: "example",
      heading: "A realistic example",
      blocks: [
        {
          type: "example",
          title: "A letting agency using AI to draft replies — a composite, fictional business",
          paragraphs: [
            "A letting agency receives dozens of WhatsApp and website enquiries a day, most asking similar questions about specific units: rent, deposit, availability, parking, viewing times.",
            "Rather than a chatbot answering customers directly, the agency uses AI inside its CRM to draft a reply to each enquiry, using only the listing sheet for that unit and the agency's written policies. The agent reviews the draft, corrects anything wrong, and sends it. Questions the listing does not answer are flagged instead of guessed.",
            "Response times fall because agents edit rather than write from scratch, and nothing reaches a customer without a person seeing it. Later, once the drafts prove reliable for a narrow set of questions, the agency may let a few of them send automatically — with disclosure, and a route to a person.",
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
          title: "Before adopting any AI tool",
          items: [
            "Write down the business problem in one sentence. Check whether a simple automation would solve it.",
            "Apply the four-question test: checkable, cost of error, source of truth, accountable owner.",
            "Decide the human checkpoint before choosing the tool.",
            "List the personal data involved and confirm where it will be processed.",
            "Start with one internal use — drafting or summarising — and measure time saved before going customer-facing.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "Automation follows rules predictably; generative AI produces plausible output that can be wrong.",
    "AI earns its place in drafting, summarising, classifying, extracting and answering from approved content.",
    "Confident wrong answers are an inherent risk, so design the human checkpoint first.",
    "Treat data protection as part of the design, not an afterthought.",
  ],
  sources: [
    {
      title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1",
      publisher: "US National Institute of Standards and Technology, January 2023",
      url: "https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf",
    },
    {
      title: "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1",
      publisher: "US National Institute of Standards and Technology, July 2024",
      url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
    },
    {
      title: "Kenya's Artificial Intelligence (AI) Strategy 2025–2030 launched at KICC, Nairobi",
      publisher: "Ministry of Information, Communications and the Digital Economy, Kenya",
      url: "https://www.ict.go.ke/kenyas-artificial-intelligence-ai-strategy-2025-2030-launched-kicc-nairobi",
    },
    {
      title: "The Data Protection Act, 2019 (No. 24 of 2019), section 25",
      publisher: "Kenya Law",
      url: "https://new.kenyalaw.org/akn/ke/act/2019/24/eng@2022-12-31",
    },
  ],
};
