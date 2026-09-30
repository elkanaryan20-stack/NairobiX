// NairobiX Insights content model.
//
// Articles are structured data, not HTML, so the article page controls the
// typography and every visual is a real component. Inline text supports two
// markers only:
//   [1]        a citation — the 1-based index into the article's `sources`
//   **bold**   emphasis
//
// Evidence convention (shown to readers above each article's sources):
// anything with a citation marker is drawn from that source; frameworks,
// "analysis" callouts and labelled examples are NairobiX's own reasoning.

export type InsightCategory = "Growth" | "Systems" | "CRM & Sales" | "Automation" | "AI" | "Digital";

/** Custom explanatory figures, rendered by components/insights/figures.tsx. */
export type FigureKey =
  | "conversion-leaks"
  | "response-decay"
  | "service-window"
  | "whatsapp-crm-architecture"
  | "tool-layers"
  | "automation-matrix"
  | "ai-spectrum"
  | "website-roles"
  | "closed-loop";

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "steps"; items: { title: string; text: string }[] }
  | {
      type: "callout";
      /** definition = a term explained; fact = a sourced finding; analysis = NairobiX reasoning. */
      kind: "definition" | "fact" | "analysis";
      title: string;
      text: string;
    }
  | { type: "quote"; text: string }
  | { type: "table"; caption: string; columns: string[]; rows: string[][]; note?: string }
  | { type: "figure"; figure: FigureKey; caption: string }
  | { type: "example"; title: string; paragraphs: string[] }
  | { type: "checklist"; title: string; items: string[] };

export type InsightSection = {
  /** Anchor for the "On this page" navigation. */
  id: string;
  heading: string;
  blocks: InsightBlock[];
};

export type InsightSource = {
  title: string;
  publisher: string;
  url: string;
  /** What the article uses it for, or a caveat about it. */
  note?: string;
};

export type InsightArticleInput = {
  slug: string;
  category: InsightCategory;
  title: string;
  /** A shorter title for search results when the headline runs past ~50 characters. */
  seoTitle?: string;
  /** The thesis, shown under the title. */
  dek: string;
  /** Search/listing summary: why the article is worth opening. */
  description: string;
  publishedDate: string;
  /** Shown for articles whose platform details change quickly. */
  reviewedNote?: string;
  heroImage: string;
  heroImageAlt: string;
  sections: InsightSection[];
  takeaways: string[];
  sources: InsightSource[];
  /** Slugs of related articles. */
  related: string[];
  relatedSolutionIds: string[];
};

export type InsightArticle = InsightArticleInput & {
  /** Computed from the article's actual word count. */
  readTime: string;
  wordCount: number;
};
