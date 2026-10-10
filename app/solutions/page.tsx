import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTION_CATEGORIES, ALL_SOLUTIONS, BOOKING_URL } from "@/lib/site-data";
import type { SolutionDetail } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd, serviceListJsonLd } from "@/lib/structured-data";
import { SolutionArchitecture } from "@/components/solutions/SolutionArchitecture";
import { NiaSectionCue } from "@/components/nia/NiaSectionCue";

const TITLE = "Growth Systems";
const DESCRIPTION =
  "Explore how NairobiX connects marketing, sales, CRM, automation and digital infrastructure into a growth system built around your business.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/solutions" });

// Each capability group gets its own environment (see globals.css).
const GROUP_TONE = {
  "acquire-grow": "acquire",
  "convert-scale": "convert",
  "build-innovate": "build",
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Growth Systems overview. Journey: what NairobiX builds (hero) → how the
 * capabilities connect (interactive architecture) → what each one solves
 * (capability modules, grouped) → you don't have to choose alone (the
 * Growth Assessment). Each solution's full detail stays on its own page;
 * this page answers "what is it, and how does it connect?".
 */
export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/solutions" })} />
      <JsonLd data={serviceListJsonLd(SOLUTION_CATEGORIES)} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070808] text-white">
        {/* Hero — a business system map. */}
        <section className="nx-env-map border-b border-white/10">
          <Container className="pb-14 pt-20 sm:pb-16 sm:pt-24 lg:pt-28">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · GROWTH SYSTEMS</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                NairobiX designs connected growth systems.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Growth breaks down when marketing, sales, customer follow-up and reporting work in
                separate lanes. NairobiX connects the right mix of strategy, CRM, automation, AI
                and digital infrastructure around how your business operates.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/business-growth-audit" variant="primary" className="min-h-12">
                  Find Your Growth Leak →
                </Button>
                <Button href={BOOKING_URL} variant="secondary" className="min-h-12">
                  Talk to Us →
                </Button>
              </div>
            </div>

            {/* The three groups as nodes on the system line — each sits on
                one of the hero's faint capability lines (centre of each
                third of the content column). */}
            <nav aria-label="Solution groups" className="mt-16 lg:mt-20">
              <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0">
                <span aria-hidden="true" className="absolute left-[16.667%] right-[16.667%] top-[3.5px] hidden h-px bg-white/15 sm:block" />
                {SOLUTION_CATEGORIES.map((category, index) => (
                  <li key={category.id} className="relative flex sm:justify-center">
                    <a
                      href={`#${category.id}`}
                      className="group flex min-h-11 items-center gap-3 sm:flex-col sm:gap-3 sm:text-center"
                    >
                      <span
                        aria-hidden="true"
                        className="relative z-10 h-2 w-2 flex-none rounded-full border border-[var(--color-primary)] bg-[#070808] transition-colors group-hover:bg-[var(--color-primary)]"
                      />
                      <span>
                        <span className="block font-mono text-[10px] tracking-[0.2em] text-white/40">GROUP {pad(index + 1)}</span>
                        <span className="mt-1 block text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
                          {category.title} <span aria-hidden="true" className="text-[var(--color-primary)]">↓</span>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Container>
        </section>

        {/* System architecture — how the six solutions connect. */}
        <Section tone="architecture" border="top">
          <NiaSectionCue reaction="bounce" />
          <div className="mb-12 max-w-2xl">
            <Eyebrow>SYSTEM ARCHITECTURE</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              How the six growth capabilities connect.
            </Heading>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              Select a solution to see where it sits in the system — and what it connects to on
              either side.
            </p>
          </div>
          <SolutionArchitecture categories={SOLUTION_CATEGORIES} />
        </Section>

        {/* The three groups, each in its own environment. */}
        {SOLUTION_CATEGORIES.map((category, groupIndex) => (
          <div key={category.id} id={category.id} className="scroll-mt-20">
            <Section tone={GROUP_TONE[category.id as keyof typeof GROUP_TONE] ?? "core"} border="top">
              <Reveal>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
                      Group {pad(groupIndex + 1)}
                    </p>
                    <Heading variant="display-md" className="mt-3" as="h2">
                      {category.title}
                    </Heading>
                  </div>
                  <p className="max-w-md text-base leading-7 text-[var(--text-secondary)]">{category.intro}</p>
                </div>
              </Reveal>

              <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-24">
                {category.items.map((item, itemIndex) => (
                  <Reveal key={item.id} delay={80}>
                    <CapabilityModule
                      item={item}
                      number={ALL_SOLUTIONS.findIndex((solution) => solution.id === item.id) + 1}
                      imageRight={itemIndex % 2 === 1}
                    />
                  </Reveal>
                ))}
              </div>
            </Section>
          </div>
        ))}

        {/* The conclusion of the architecture: you don't have to choose alone. */}
        <Section tone="focus" border="top">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">NOT SURE WHERE TO START</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Start with the Business Growth Assessment.
            </Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The six capabilities work in combination, and your business may need only some of
              them. The assessment identifies which mix fits your current
              requirements — before anything is built.
            </p>

            {/* Six parts of one system; a business selects the ones it needs. */}
            <div aria-hidden="true" className="mx-auto mt-10 max-w-sm">
              <div className="relative flex items-center justify-between">
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                {ALL_SOLUTIONS.map((solution, index) => (
                  <span
                    key={solution.id}
                    className={`relative h-2.5 w-2.5 rounded-full border ${
                      index === 2 || index === 3
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                        : "border-white/30 bg-[var(--section-bg)]"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Six capabilities · the combination that fits
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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

/**
 * One solution as a module of the larger system: number and name, the
 * business problem, what NairobiX builds, outcomes, the connected path it
 * belongs to (its authored systemFlow), and the way into its full page.
 */
function CapabilityModule({ item, number, imageRight }: { item: SolutionDetail; number: number; imageRight: boolean }) {
  return (
    <article
      className={`group grid gap-8 lg:items-stretch lg:gap-14 ${
        imageRight ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      }`}
    >
      <Link
        href={`/solutions/${item.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block overflow-hidden rounded-[var(--radius-image)] lg:min-h-[360px] ${imageRight ? "lg:order-2" : ""}`}
      >
        {/* The photograph spans the full height of the module, so it anchors
            the text beside it instead of floating in the middle. */}
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015] lg:absolute lg:inset-0">
          <ImageFrame src={item.image} alt={item.imageAlt} aspect="wide" className="lg:h-full lg:aspect-auto" sizes="(min-width: 1024px) 42vw, 100vw" />
        </div>
        <span className="absolute left-0 top-0 h-[2px] w-16 origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Link>

      <div className={imageRight ? "lg:order-1" : ""}>
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="text-[var(--color-primary)]">{pad(number)}</span>
          <span aria-hidden="true" className="h-px w-6 bg-white/20" />
          <span className="text-white/60">{item.title}</span>
        </p>
        <Heading variant="heading-lg" as="h3" className="mt-4">
          {item.heading}
        </Heading>

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">The problem</dt>
            <dd className="mt-1.5 text-base leading-7 text-white/90">{item.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">What NairobiX builds</dt>
            <dd className="mt-1.5 text-base leading-7 text-[var(--text-secondary)]">{item.description}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Outcomes</dt>
            <dd className="mt-2.5">
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {item.ideal.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span aria-hidden="true" className="h-px w-3 flex-none bg-[var(--color-primary)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {/* Where it sits in the system — the connected path it belongs to. */}
        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Connects</p>
          <p className="mt-2 text-xs leading-6 text-white/55">
            {item.systemFlow.map((node, index) => (
              <span key={node.label}>
                {/* Real spaces around the arrow give the line somewhere to wrap. */}
                {index > 0 ? <span aria-hidden="true" className="text-[var(--color-primary)]/70"> → </span> : null}
                <span className="whitespace-nowrap">{node.label}</span>
              </span>
            ))}
          </p>
        </div>

        <Link
          href={`/solutions/${item.id}`}
          className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white"
        >
          Explore {item.title}
          <span
            aria-hidden="true"
            className="inline-block text-white/80 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
