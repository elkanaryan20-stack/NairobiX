import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { SectionRail } from "@/components/solutions/SectionRail";
import { SystemPortrait } from "@/components/case-studies/SystemPortrait";
import { SystemExplorer } from "@/components/case-studies/SystemExplorer";
import { AutomationFlows } from "@/components/case-studies/AutomationFlows";
import {
  BeforeAfter,
  BuildComponents,
  ConceptDisclosure,
  ContextSection,
  GrowthPath,
  HumanLayer,
  InlineCTA,
  Journey,
  MeasurementFramework,
  MONO,
  Outcomes,
  ProblemMap,
  RelatedThinking,
  SectionHead,
  TechnologyLayer,
} from "@/components/case-studies/sections";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { CONCEPT_CASES, caseReadingMinutes, getCase } from "@/lib/case-studies";
import { INSIGHTS } from "@/lib/insights";
import { ALL_SOLUTIONS, BOOKING_URL } from "@/lib/site-data";

export function generateStaticParams() {
  return CONCEPT_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return pageMetadata({ title: "Case study", description: "A NairobiX concept case study.", path: `/case-studies/${slug}` });
  return pageMetadata({
    title: `Concept: ${c.name}`,
    description: `${c.thesis} A concept engagement: an illustrative scenario, not historical client results.`,
    path: `/case-studies/${c.slug}`,
  });
}

const RAIL = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "opportunity", label: "Opportunity" },
  { id: "system", label: "System design" },
  { id: "before-after", label: "Before / after" },
  { id: "journey", label: "Customer journey" },
  { id: "technology", label: "Technology" },
  { id: "automation", label: "Automation" },
  { id: "outcomes", label: "Designed outcomes" },
  { id: "measurement", label: "Measurement" },
  { id: "human", label: "Human layer" },
  { id: "build", label: "What we would build" },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const path = `/case-studies/${c.slug}`;
  const { minutes } = caseReadingMinutes(c);
  const solutions = c.solutionIds.map((id) => ALL_SOLUTIONS.find((s) => s.id === id)).filter((s) => s !== undefined);
  const related = c.insights
    .map((s) => INSIGHTS.find((a) => a.slug === s))
    .filter((a) => a !== undefined)
    .map(({ slug, title, category }) => ({ slug, title, category }));
  const position = CONCEPT_CASES.findIndex((x) => x.slug === c.slug);
  const next = CONCEPT_CASES[(position + 1) % CONCEPT_CASES.length];

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: `${c.name} — Concept Case Study`, description: c.thesis, path })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: c.name, path },
        ])}
      />
      <SiteHeader />
      <SectionRail sections={RAIL} />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* 01 — Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 [--section-bg:#070707]">
          <Container className="pb-16 pt-12 sm:pt-16 lg:pb-24">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/55">
                <li>
                  <Link href="/case-studies" className="hover:text-white">Case studies</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/80">{c.industry}</li>
              </ol>
            </nav>
            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
              <div>
                <p className={`${MONO} flex flex-wrap gap-x-3 gap-y-1`}>
                  <span className="text-[var(--color-primary)]">Concept case study</span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <span className="text-white/60">{c.industry}</span>
                </p>
                <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                  {c.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">{c.thesis}</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/75">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                  Concept engagement — illustrative scenario, not historical client results.
                </p>
              </div>
              <SystemPortrait image={c.image} imageAlt={c.imageAlt} fragments={c.portrait} preload />
            </div>
            <dl className="mt-14 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr_auto]">
              <div>
                <dt className={`${MONO} text-white/45`}>Industry</dt>
                <dd className="mt-2 text-sm text-white/85">{c.industry}</dd>
              </div>
              <div>
                <dt className={`${MONO} text-white/45`}>Focus</dt>
                <dd className="mt-2 text-sm text-white/85">{c.focus}</dd>
              </div>
              <div>
                <dt className={`${MONO} text-white/45`}>Solution areas</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {solutions.map((s) => (
                    <Link key={s.id} href={`/solutions/${s.id}`} className="text-white/85 hover:text-[var(--color-primary)]">
                      {s.title}
                    </Link>
                  ))}
                </dd>
              </div>
              <div>
                <dt className={`${MONO} text-white/45`}>Reading time</dt>
                <dd className="mt-2 text-sm text-white/85">{minutes} min</dd>
              </div>
            </dl>
          </Container>
        </section>

        {/* 02 — Context */}
        <Section tone="warmth" id="context" className="scroll-mt-[72px]">
          <SectionHead number={2} label="The context" title="A business that works — up to a point." />
          <div className="mt-12">
            <ContextSection c={c} />
          </div>
        </Section>

        {/* 03 — The problem */}
        <Section tone="friction" id="problem" className="scroll-mt-[72px]">
          <SectionHead number={3} label="The problem" title="Not a lead problem. A system problem." intro={<p>{c.problemIntro}</p>} />
          <ProblemMap c={c} />
          <div className="mt-16">
            <InlineCTA lead="Recognise some of this in your own business?" primary="See where your business stands" />
          </div>
        </Section>

        {/* 04 — The opportunity */}
        <Section tone="flow" id="opportunity" className="scroll-mt-[72px]">
          <SectionHead number={4} label="The opportunity" title={c.opportunity.statement} />
          <div className="mt-8 grid max-w-5xl gap-6 text-[17px] leading-8 text-white/75 md:grid-cols-2 md:gap-10">
            {c.opportunity.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <GrowthPath focus={c.opportunity.focus} />
        </Section>

        {/* 05 — The system design (centrepiece) */}
        <Section tone="architecture" id="system" className="scroll-mt-[72px]">
          <SectionHead number={5} label="The system design" title="The architecture, layer by layer." intro={<p>{c.system.intro}</p>} />
          <SystemExplorer layers={c.system.layers} />
          <div className="mt-16">
            <InlineCTA lead="Every business needs a different version of this architecture." primary="See what this could look like for your business" />
          </div>
        </Section>

        {/* 06 — Before / after */}
        <Section tone="graphite" id="before-after" className="scroll-mt-[72px]">
          <SectionHead
            number={6}
            label="Before / after"
            title="From a disconnected pattern to a connected one."
            intro={<p>The same people and much of the same technology — organised as one system instead of several.</p>}
          />
          <BeforeAfter c={c} />
        </Section>

        {/* 07 — The customer journey */}
        <Section tone="ink" id="journey" className="scroll-mt-[72px]">
          <SectionHead
            number={7}
            label="The customer journey"
            title="One customer, through the designed system."
            intro={<p>What the customer experiences at each step, and what the system does behind it. Names and details are illustrative.</p>}
          />
          <Journey c={c} />
        </Section>

        {/* 08 — Technology */}
        <Section tone="technical" id="technology" className="scroll-mt-[72px]">
          <SectionHead number={8} label="The technology layer" title="Technology, chosen last." intro={<p>{c.technology.intro}</p>} />
          <TechnologyLayer c={c} />
        </Section>

        {/* 09 — Automation */}
        <Section tone="steel" id="automation" className="scroll-mt-[72px]">
          <SectionHead number={9} label="The automation layer" title="Rules first. Then workflows. Then automation." intro={<p>{c.automation.intro}</p>} />
          <AutomationFlows automation={c.automation} />
        </Section>

        {/* 10 — Designed outcomes */}
        <Section tone="core" id="outcomes" className="scroll-mt-[72px]">
          <SectionHead number={10} label="Designed outcomes" title="What the system is designed to improve." />
          <Outcomes c={c} />
        </Section>

        {/* 11 — Measurement */}
        <Section tone="blueprint" id="measurement" className="scroll-mt-[72px]">
          <SectionHead
            number={11}
            label="Measurement framework"
            title="What we would measure."
            intro={<p>No invented numbers — a plan for knowing whether the system is working, set before it is built.</p>}
          />
          <MeasurementFramework c={c} />
        </Section>

        {/* 12 — The human layer */}
        <Section tone="business" id="human" className="scroll-mt-[72px]">
          <SectionHead number={12} label="The human layer" title="Where people stay responsible." />
          <div className="mt-12">
            <HumanLayer c={c} />
          </div>
        </Section>

        {/* 13 — What we would build */}
        <Section tone="clear" id="build" className="scroll-mt-[72px]">
          <SectionHead number={13} label="What we would build" title="One system, built in stages." />
          <BuildComponents c={c} />
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <blockquote className="border-l-2 border-[var(--color-primary)] pl-6 font-display text-2xl leading-snug text-white">
              {c.lesson}
            </blockquote>
            <RelatedThinking items={related} />
          </div>
        </Section>

        {/* 14 — The next step */}
        <Section tone="focus" seam="signal">
          <div className="mx-auto max-w-3xl text-center">
            <p className={`${MONO} text-[var(--color-primary)]`}>14 · The next step</p>
            <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Your business probably has a different version of this problem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Every business has a different starting point. The right system depends on your goals, requirements,
              customers, processes and existing technology.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/business-growth-audit" variant="primary">
                Find Your Version of This Problem →
              </Button>
              <Button href={BOOKING_URL} variant="secondary">
                Talk to Us →
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <ConceptDisclosure />
          </div>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/case-studies" className="text-sm text-white/65 hover:text-white">
              ← All case studies
            </Link>
            <Link href={`/case-studies/${next.slug}`} className="group text-right">
              <span className={`${MONO} block text-white/45`}>Next concept case</span>
              <span className="mt-1 inline-flex items-center gap-2 font-display text-lg text-white">
                {next.name}
                <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
