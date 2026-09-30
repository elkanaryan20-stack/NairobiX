// NairobiX concept case studies.
//
// These are designed demonstration engagements, not client work. The content
// model enforces that: there is no field for a client name, a testimonial, a
// date delivered or a result. Numbers may appear only as labelled
// illustrative assumptions about the representative business, and outcomes
// are "designed outcomes" plus a measurement plan — what the system is built
// to improve and how it would be measured, never what it achieved.

export type CaseArea = "Growth" | "CRM & Sales" | "Automation" | "AI" | "Digital";

export type GrowthStage = "Attention" | "Capture" | "Qualify" | "Nurture" | "Convert" | "Deliver" | "Retain" | "Measure";

export type TechKey =
  | "zoho"
  | "hubspot"
  | "whatsapp"
  | "google"
  | "meta"
  | "nextjs"
  | "react"
  | "postgresql"
  | "openai"
  | "anthropic"
  | "wordpress"
  | "shopify"
  | "firebase"
  | "figma";

/** Small interface fragments used in hero portraits and the customer journey. */
export type UIFragment =
  | { kind: "landing"; url: string; eyebrow: string; headline: string; body: string; cta: string }
  | { kind: "chat"; contact: string; messages: { from: "customer" | "business"; text: string; tag?: string }[] }
  | { kind: "record"; title: string; stage: string; rows: [string, string][] }
  | { kind: "task"; title: string; meta: string; body: string }
  | { kind: "pipeline"; title: string; columns: { name: string; cards: string[]; active?: boolean }[] }
  | { kind: "report"; title: string; rows: { label: string; share: number }[] }
  | { kind: "assistant"; question: string; draft: string; source: string; status: string }
  | { kind: "quote"; title: string; lines: [string, string][]; status: string }
  | { kind: "storefront"; product: string; detail: string; price: string; notes: string[] };

export type SystemLayer = {
  id: string;
  name: string;
  /** What it is. */
  what: string;
  /** Why it exists — the problem it answers. */
  why: string;
  /** What information moves through it. */
  carries: string;
  /** What happens next. */
  next: string;
};

export type AutomationStepKind = "Trigger" | "Rule" | "Action" | "Notification" | "Follow-up" | "Human" | "Measure";

export type CaseStudy = {
  slug: string;
  /** The system's name, e.g. "Professional Services Growth System". */
  name: string;
  industry: string;
  /** The editorial headline. */
  title: string;
  /** One sentence: how NairobiX would approach it. */
  thesis: string;
  /** One sentence: the business problem, for the index. */
  problem: string;
  areas: CaseArea[];
  solutionIds: string[];
  focus: string;
  featured?: boolean;

  /** A real photograph for index previews and the hero portrait. */
  image: string;
  imageAlt: string;
  /** Interface fragments composed over the photograph in the hero. */
  portrait: UIFragment[];

  context: {
    paragraphs: string[];
    /** Labelled on the page as illustrative assumptions. */
    assumptions: { label: string; value: string }[];
    works: string[];
    manual: string[];
  };

  problemIntro: string;
  problemLayers: { layer: string; issue: string; effect: string }[];

  opportunity: { statement: string; paragraphs: string[]; focus: GrowthStage[] };

  system: { intro: string; layers: SystemLayer[] };

  beforeAfter: { before: string[]; beforeNote: string; after: string[]; afterNote: string };

  journey: { stage: string; customer: string; business: string; fragment?: UIFragment; exception?: boolean }[];

  technology: {
    intro: string;
    items: {
      keys: TechKey[];
      name: string;
      /** The capability this technology fills, e.g. "CRM" or "AI layer". */
      capability: string;
      role: string;
      reason: string;
      layer: string;
    }[];
  };

  automation: { intro: string; workflows: { name: string; steps: { kind: AutomationStepKind; text: string }[] }[] };

  outcomes: { title: string; text: string }[];

  measurement: { group: string; metrics: { name: string; definition: string }[] }[];

  human: {
    intro: string;
    image: string;
    imageAlt: string;
    assists: { system: string; does: string }[];
    decisions: string[];
  };

  build: { component: string; text: string; later?: boolean }[];

  /** The one-sentence lesson of the scenario. */
  lesson: string;
  /** Related Insights article slugs. */
  insights: string[];
};
