// Nia's structured knowledge of NairobiX. Reuses the site's own content
// (lib/site-data.ts) as the source of truth wherever possible, so the
// assistant never drifts from what the website itself says.

import {
  BUSINESSES_WE_SERVE,
  CONTACT_EMAIL,
  ENGAGEMENT_PROCESS,
  FAQS,
  GROWTH_APPROACH,
  INDUSTRIES_SERVED,
  PROBLEMS_WE_SOLVE,
  SOLUTION_CATEGORIES,
  WHAT_WE_DO,
  WHY_NAIROBIX,
} from "@/lib/site-data";

function formatSolutions(): string {
  return SOLUTION_CATEGORIES.map((category) => {
    const items = category.items
      .map((item) => `  - ${item.title}: ${item.description}`)
      .join("\n");
    return `${category.title} — ${category.intro}\n${items}`;
  }).join("\n\n");
}

function formatFaqs(): string {
  return FAQS.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n");
}

export function buildNiaKnowledge(): string {
  return `
## What NairobiX is

${WHAT_WE_DO.body}

NairobiX is a business growth partner, digital transformation partner, systems
implementation partner, automation specialist, CRM implementation partner and
AI implementation consultant — not simply a social media marketing agency.

## Solutions NairobiX offers

${formatSolutions()}

## Problems NairobiX solves

${PROBLEMS_WE_SOLVE.map((p) => `- ${p.title} ${p.description}`).join("\n")}

## How engagements work

${GROWTH_APPROACH.map((step) => `${step.step}: ${step.description}`).join("\n")}

Engagement process:
${ENGAGEMENT_PROCESS.map((step) => `${step.number}. ${step.title} — ${step.description}`).join("\n")}

## Why NairobiX

${WHY_NAIROBIX.map((reason) => `- ${reason.title}: ${reason.description}`).join("\n")}

## Businesses NairobiX serves

Industries: ${INDUSTRIES_SERVED.join(", ")}.

${BUSINESSES_WE_SERVE.map((b) => `- ${b.type}: ${b.problem}`).join("\n")}

## The Business Growth Audit

The Business Growth Audit is NairobiX's primary acquisition mechanism — a
structured review of a business's growth engine, team workflow, acquisition,
sales processes and operational systems, used to identify priorities and
practical next steps. It is free. Direct genuinely interested visitors toward
it using the submit_growth_audit tool once you've had a natural conversation
and collected what's needed.

## The 7-Day Growth Trial

NairobiX offers a 7-Day Growth Trial consisting of:
1. A Business Growth Audit
2. A Growth Action Plan
3. A 7-Day Meta Ad Campaign

Advertising spend for the Meta campaign is paid directly to Meta by the
client — NairobiX does not charge for or mark up ad spend as part of the
trial. Do not state or imply any other pricing, discount, or guarantee about
the trial — none is defined here.

## Consultation

NairobiX offers a free 30-minute "NairobiX Business Growth Consultation" —
a working conversation to understand the business, identify growth
opportunities, and determine the right NairobiX solution. It is not a sales
pitch. Use the booking tools to check real availability and book it.

## FAQs

${formatFaqs()}

## Contact

General contact email: ${CONTACT_EMAIL}
`.trim();
}
