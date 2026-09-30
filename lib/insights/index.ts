import type { InsightArticle, InsightArticleInput, InsightBlock, InsightCategory } from "./types";
import { leadsButLostSales } from "./articles/leads-but-lost-sales";
import { whatsappIsNotACrm } from "./articles/whatsapp-is-not-a-crm";
import { crmVsSpreadsheetVsWhatsapp } from "./articles/crm-vs-spreadsheet-vs-whatsapp";
import { whatToAutomateFirst } from "./articles/what-to-automate-first";
import { aiInASmallBusiness } from "./articles/ai-in-a-small-business";
import { yourWebsiteIsNotABrochure } from "./articles/your-website-is-not-a-brochure";
import { marketingSalesCrmOneSystem } from "./articles/marketing-sales-crm-one-system";

export type {
  FigureKey,
  InsightArticle,
  InsightBlock,
  InsightCategory,
  InsightSection,
  InsightSource,
} from "./types";

const WORDS_PER_MINUTE = 230;

function blockText(block: InsightBlock): string {
  switch (block.type) {
    case "p":
    case "h3":
    case "quote":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "steps":
      return block.items.map((item) => `${item.title} ${item.text}`).join(" ");
    case "callout":
      return `${block.title} ${block.text}`;
    case "table":
      return [block.caption, ...block.columns, ...block.rows.flat(), block.note ?? ""].join(" ");
    case "figure":
      return block.caption;
    case "example":
      return [block.title, ...block.paragraphs].join(" ");
    case "checklist":
      return [block.title, ...block.items].join(" ");
  }
}

function withReadingTime(article: InsightArticleInput): InsightArticle {
  const text = [
    article.dek,
    ...article.sections.flatMap((section) => [section.heading, ...section.blocks.map(blockText)]),
    ...article.takeaways,
  ].join(" ");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return { ...article, wordCount, readTime: `${minutes} min read` };
}

/** Editorial order: the featured article first, then the library. */
export const INSIGHTS: InsightArticle[] = [
  leadsButLostSales,
  whatsappIsNotACrm,
  marketingSalesCrmOneSystem,
  whatToAutomateFirst,
  aiInASmallBusiness,
  yourWebsiteIsNotABrochure,
  crmVsSpreadsheetVsWhatsapp,
].map(withReadingTime);

export const FEATURED_INSIGHT_SLUG = leadsButLostSales.slug;

/** Topic index for /insights, in reading order. Every topic has at least one article. */
export const INSIGHT_TOPICS: { category: InsightCategory; description: string }[] = [
  { category: "Growth", description: "How acquisition, conversion and measurement fit together." },
  { category: "Systems", description: "Choosing and structuring the tools a business runs on." },
  { category: "CRM & Sales", description: "Turning enquiries into customers, consistently." },
  { category: "Automation", description: "Deciding what to automate, and what to leave human." },
  { category: "AI", description: "Where AI earns its place, and where it doesn't." },
  { category: "Digital", description: "Websites and digital experiences that do real work." },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((article) => article.slug === slug);
}
