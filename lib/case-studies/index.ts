import type { CaseArea, CaseStudy } from "./types";
import { professionalServicesGrowth } from "./cases/professional-services-growth";
import { realEstateLeadToSales } from "./cases/real-estate-lead-to-sales";
import { ecommerceGrowth } from "./cases/ecommerce-growth";
import { hospitalityEventsAutomation } from "./cases/hospitality-events-automation";
import { clinicAiFrontDesk } from "./cases/clinic-ai-front-desk";

export type { CaseArea, CaseStudy, GrowthStage, TechKey, UIFragment, SystemLayer, AutomationStepKind } from "./types";

/** Editorial order: the flagship first. */
export const CONCEPT_CASES: CaseStudy[] = [
  professionalServicesGrowth,
  realEstateLeadToSales,
  ecommerceGrowth,
  hospitalityEventsAutomation,
  clinicAiFrontDesk,
];

export const CASE_FILTERS: ("All" | CaseArea)[] = ["All", "Growth", "CRM & Sales", "Automation", "AI", "Digital"];

export const GROWTH_STAGES = ["Attention", "Capture", "Qualify", "Nurture", "Convert", "Deliver", "Retain", "Measure"] as const;

/** Shown on every concept case — elegant, but unmistakable. */
export const CONCEPT_DISCLOSURE =
  "An illustrative NairobiX engagement showing how we would approach this growth problem. The business and scenario are representative; the systems shown are designed examples, not historical client results.";

export function getCase(slug: string) {
  return CONCEPT_CASES.find((c) => c.slug === slug);
}

/** Approximate reading time from the case's own text. */
export function caseReadingMinutes(c: CaseStudy) {
  // Collect string values only (never object keys or image paths).
  const strings: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === "string") {
      if (!value.startsWith("/images/")) strings.push(value);
    } else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk([
    c.thesis,
    c.context,
    c.problemIntro,
    c.problemLayers,
    c.opportunity,
    c.system,
    c.beforeAfter,
    c.journey.map((j) => [j.stage, j.customer, j.business]),
    c.technology,
    c.automation,
    c.outcomes,
    c.measurement,
    c.human,
    c.build,
    c.lesson,
  ]);
  const words = strings.join(" ").split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
  return { words, minutes: Math.max(1, Math.round(words / 230)) };
}
