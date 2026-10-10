import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { SystemPortrait } from "@/components/case-studies/SystemPortrait";
import { CaseArchive } from "@/components/case-studies/CaseArchive";
import { ConceptDisclosure, MONO, StackStrip } from "@/components/case-studies/sections";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { CASE_FILTERS, CONCEPT_CASES, caseReadingMinutes } from "@/lib/case-studies";
import { BOOKING_URL } from "@/lib/site-data";

const TITLE = "Case Studies";
const DESCRIPTION =
  "Concept case studies showing how NairobiX turns business problems into connected systems — context, architecture, customer journey, technology, automation, measurement and the human layer.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/case-studies" });

const APPROACH = [
  ["Understand", "The business, its goals and where growth is actually getting stuck — before any recommendation."],
  ["Design", "The requirements, then the system: layers, rules, journeys and the decisions people keep."],
  ["Connect", "Marketing, sales, operations and technology joined so information and follow-up move between them."],
  ["Optimise", "Measured against a plan set in advance, and improved from what the system shows."],
];

export default function CaseStudiesPage() {
  const featured = CONCEPT_CASES.find((c) => c.featured) ?? CONCEPT_CASES[0];
  const others = CONCEPT_CASES.filter((c) => c.slug !== featured.slug);

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/case-studies" })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* Hero */}
        <Section tone="clear" spacing="hero" className="border-b border-white/10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>CASE STUDIES</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-5 max-w-3xl">
                See how NairobiX turns business problems into connected systems.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Detailed concept engagements showing how strategy, digital experiences, CRM, automation, AI and technology
                can come together around a real business requirement.
              </p>
              <p className="mt-8 font-display text-xl text-white">
                We don&apos;t just show what we make. <span className="text-white/55">We show how we think.</span>
              </p>
            </div>
            <ConceptDisclosure />
          </div>
        </Section>

        {/* Featured case */}
        <Section tone="core">
          <p className={`${MONO} text-white/50`}>Featured concept case</p>
          <Link href={`/case-studies/${featured.slug}`} className="group mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <SystemPortrait image={featured.image} imageAlt={featured.imageAlt} fragments={featured.portrait} preload />
            <div>
              <p className={`${MONO} flex flex-wrap gap-x-3`}>
                <span className="text-[var(--color-primary)]">Concept case study</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="text-white/55">{featured.industry}</span>
              </p>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">{featured.problem}</p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className={`${MONO} text-white/45`}>The designed system</p>
                <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-white/75">
                  {featured.system.layers.map((layer, i) => (
                    <li key={layer.id} className="flex items-center gap-2">
                      {layer.name}
                      {i < featured.system.layers.length - 1 ? <span aria-hidden="true" className="text-[var(--color-primary)]/70">→</span> : null}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-6">
                <p className={`${MONO} mb-3 text-white/45`}>Proposed stack</p>
                <StackStrip c={featured} compact />
              </div>
              <p className="mt-8 flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-2 font-semibold text-white">
                  Explore the case study
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
                <span className="font-mono text-[11px] text-white/45">{caseReadingMinutes(featured).minutes} min read</span>
              </p>
            </div>
          </Link>
        </Section>

        {/* Concept engagements */}
        <Section tone="ink" border="top">
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Eyebrow>CONCEPT ENGAGEMENTS</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Different businesses. The same way of thinking.
              </Heading>
            </div>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Each case follows one representative business from context and problem to architecture, customer journey,
              technology, automation, measurement and the decisions people keep.
            </p>
          </div>
          <CaseArchive
            filters={CASE_FILTERS}
            entries={others.map((study) => ({
              study,
              preview: <SystemPortrait image={study.image} imageAlt={study.imageAlt} fragments={study.portrait} compact />,
              stack: <StackStrip c={study} compact />,
            }))}
          />
        </Section>

        {/* How we approach problems */}
        <Section tone="graphite">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div>
              <Eyebrow>HOW WE APPROACH PROBLEMS</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Every case starts with the business, not the technology.
              </Heading>
              <Link href="/about#how-we-work" className="mt-6 inline-flex text-sm font-semibold text-white hover:text-[var(--color-primary)]">
                How NairobiX works →
              </Link>
            </div>
            <ol className="grid gap-px bg-white/10 sm:grid-cols-2">
              {APPROACH.map(([title, text], i) => (
                <li key={title} className="bg-[var(--section-bg)] p-6">
                  <p className={`${MONO} text-[var(--color-primary)]`}>
                    {String(i + 1).padStart(2, "0")}
                    {i < APPROACH.length - 1 ? <span aria-hidden="true" className="ml-2 text-white/30">→</span> : null}
                  </p>
                  <p className="mt-3 font-display text-xl text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Assessment */}
        <Section tone="focus" seam="signal">
          <div className="mx-auto max-w-2xl text-center">
            <Heading variant="display-md">Give us your business problem. This is how we&apos;ll think about it.</Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The Business Growth Assessment starts the same way every case here does: with your context, your
              constraints and what you&apos;re trying to achieve.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/business-growth-audit" variant="primary">
                Find Your Growth Leak →
              </Button>
              <Button href={BOOKING_URL} variant="secondary">
                Talk to Us →
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
