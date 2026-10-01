import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { ClipboardList, TrendingUp, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Faq } from "@/components/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame, GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { CTASection } from "@/components/ui/CTASection";
import { NiaMark } from "@/components/nia/NiaMark";
import { JsonLd } from "@/components/JsonLd";
import { HeroSystem } from "@/components/home/HeroSystem";
import { CapabilitySystem } from "@/components/home/CapabilitySystem";
import { GrowthBreakdown } from "@/components/home/GrowthBreakdown";
import { TechnologyMatrix } from "@/components/home/TechnologyMatrix";
import { ConnectedSystemCompare } from "@/components/home/ConnectedSystemCompare";
import { SolutionPathways } from "@/components/home/SolutionPathways";
import { ProcessLine } from "@/components/home/ProcessLine";
import { WhyNairobixList } from "@/components/home/WhyNairobixList";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { AssessmentStages } from "@/components/home/AssessmentStages";
import { CtaSystemLine } from "@/components/home/CtaSystemLine";
import { INSIGHTS } from "@/lib/insights";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import { IndustryStrip } from "@/components/industries/IndustryStrip";
import { Reveal } from "@/components/ui/Reveal";
import { NiaSectionCue } from "@/components/nia/NiaSectionCue";
import { HOME_TITLE, HOME_DESCRIPTION, homeMetadata } from "@/lib/seo";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";
import {
  BOOKING_URL,
  HOME_SOLUTIONS,
  CASE_STUDIES,
  FAQS,
  HERO_IMAGE,
  WHAT_WE_DO,
  CONNECTED_CAPABILITIES,
  PROBLEMS_WE_SOLVE,
  DISCONNECTED_PAIRS,
  CONNECTED_GROWTH_FLOW,
  ENGAGEMENT_PROCESS,
  PROBLEM_BREAK_POINTS,
  TECHNOLOGY_PREVIEW,
  HOME_PROCESS,
  HOME_WHY_NAIROBIX,
  CLIENT_WORKSPACE,
  WORKSPACE_FEATURES,
} from "@/lib/site-data";

const WORKSPACE_FEATURE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  visibility: ClipboardList,
  reporting: TrendingUp,
  communication: Mail,
  nia: NiaMark,
};

// A homepage-only illustrative snapshot of the real NairobiX workspace UI —
// rendered with the same PortalPreview component used on solution pages, so
// the "infrastructure behind the service" claim is shown, not just described.
const HOME_WORKSPACE_PREVIEW = {
  title: "Growth Workspace",
  caption: "Preview of the NairobiX client workspace",
  metrics: [
    { label: "Growth Visibility", direction: "up" as const },
    { label: "Manual Follow-up", direction: "down" as const },
    { label: "Reporting Effort", direction: "down" as const },
  ],
  rows: [
    { label: "Active Projects", status: "3 in progress" },
    { label: "Deliverables", status: "On track" },
    { label: "Growth Reports", status: "Updated weekly" },
    { label: "Open Requests", status: "2 pending" },
  ],
};

export const metadata: Metadata = homeMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" })} />
      <JsonLd data={faqPageJsonLd(FAQS.slice(0, 5))} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        {/* 1. Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/70 to-[#030304]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030304] via-[#030304]/50 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>

          <Container className="relative pt-16 sm:pt-20 lg:pt-28">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-16">
              <div className="max-w-2xl lg:pb-2">
                <div className="hero-rise" style={{ animationDelay: "150ms" }}>
                  <Eyebrow>NAIROBIX / GROWTH SYSTEMS</Eyebrow>
                </div>
                <h1
                  className="hero-rise mt-7 text-balance font-display text-[2.375rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[3.5rem] lg:text-[2.875rem] xl:text-[3.75rem]"
                  style={{ animationDelay: "300ms" }}
                >
                  Growth handled as one
                  <br className="hidden sm:inline" /> connected system.
                  <span className="mt-4 block text-[0.56em] leading-tight text-white/45 sm:mt-6">
                    Not five disconnected vendors.
                  </span>
                </h1>
                <p
                  className="hero-rise mt-8 max-w-xl text-lg leading-8 text-[var(--text-secondary)]"
                  style={{ animationDelay: "450ms" }}
                >
                  NairobiX connects strategy, acquisition, sales, automation, AI and digital
                  infrastructure into one growth system — so the parts of your business responsible
                  for growth work together.
                </p>
                <div
                  className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
                  style={{ animationDelay: "600ms" }}
                >
                  <Button href="/business-growth-audit" variant="primary" className="min-h-12">
                    Start Your Free Growth Assessment →
                  </Button>
                  <Button href={BOOKING_URL} variant="secondary" className="min-h-12">
                    Book a Consultation →
                  </Button>
                </div>
              </div>

              <div className="hero-rise relative w-full max-w-xl lg:max-w-none" style={{ animationDelay: "750ms" }}>
                <HeroSystem />
                {/* The rail's line continues out of the panel into the
                    transition band below — offset matches HeroSystem's rail
                    x (border + column padding + node offset). */}
                <span
                  aria-hidden="true"
                  className="hero-draw-y absolute left-[35px] top-full h-16 w-px bg-white/12 sm:left-[39px] lg:h-20"
                  style={{ animationDelay: "1300ms" }}
                />
              </div>
            </div>

            {/* Transition band: the system line runs across and drops into
                the next section, so the page reads as one continuous
                system rather than stacked blocks. */}
            <div className="relative mt-16 pb-12 sm:pb-14 lg:mt-20">
              <span
                aria-hidden="true"
                className="hero-draw-x absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/20 via-white/12 to-white/5"
                style={{ animationDelay: "1300ms" }}
              />
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full border border-[var(--color-primary)] bg-[#030304]"
              />
              <span aria-hidden="true" className="absolute bottom-0 left-[3px] top-[4px] w-px bg-white/12" />
              <p className="pl-8 pt-6 text-sm leading-6 text-[var(--text-tertiary)]">
                Marketing, CRM, automation and AI — planned and delivered as one system.
              </p>
            </div>
          </Container>
        </section>

        {/* 02 — What NairobiX does · business + human context (warmth) */}
        <Section tone="warmth">
          {/* Continuation of the hero's system line through this section's
              top padding (the negative margin cancels exactly that padding),
              landing on a node above the eyebrow. */}
          <div aria-hidden="true" className="relative -mt-20 h-14 sm:-mt-24 sm:h-18 lg:-mt-28 lg:h-22">
            <span className="absolute left-[3px] top-0 h-[calc(100%-7px)] w-px bg-gradient-to-b from-white/12 to-white/5" />
            <span className="absolute bottom-0 left-0 h-[7px] w-[7px] rounded-full border border-white/25" />
          </div>
          {/* Mobile order: copy → capability system → image. Desktop: copy
              beside the image, with the capability line spanning beneath. */}
          <div className="mt-6 grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-x-16 lg:gap-y-24">
            <Reveal>
              <div>
                <Eyebrow>{WHAT_WE_DO.eyebrow}</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  {WHAT_WE_DO.title}
                </Heading>
                <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
                  {WHAT_WE_DO.summary}
                </p>
                <div className="mt-12 max-w-md sm:mt-14">
                  <span aria-hidden="true" className="block h-px w-8 bg-[var(--color-primary)]" />
                  <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-white/90 sm:text-[1.75rem]">
                    {WHAT_WE_DO.statement}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="order-last lg:order-none">
              <ImageFrame
                src="/images/photography/modern-office.webp"
                alt="Two colleagues working together at a bright, plant-filled office table."
                aspect="landscape"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-2">
              <CapabilitySystem items={CONNECTED_CAPABILITIES} />
            </Reveal>
          </div>
        </Section>

        {/* 03 — Solutions · an operating system of components (steel) */}
        <Section tone="steel" border="top" seam="node" id="solutions" className="scroll-mt-[72px]">
          <Reveal>
            <div className="mb-10 max-w-2xl sm:mb-12">
              <Eyebrow>SOLUTIONS</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Three ways we help businesses grow.
              </Heading>
              <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
                Six capabilities, connected around the way your business grows.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SolutionPathways pathways={HOME_SOLUTIONS} />
          </Reveal>
        </Section>

        {/* 04 — Where growth gets stuck · friction (friction) */}
        <Section tone="friction" border="top">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>WHERE GROWTH GETS STUCK</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                If any of this sounds familiar, you&apos;re not alone.
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 lg:mt-16">
              <GrowthBreakdown problems={PROBLEMS_WE_SOLVE} breakPoints={PROBLEM_BREAK_POINTS} />
            </div>
          </Reveal>
        </Section>

        {/* Industries · relevance, straight after the problems they shape (business).
            The same photographic strip as the /industries hero — one shared
            component, so the cards are identical on both pages. */}
        <Section tone="business" border="top">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>INDUSTRIES WE UNDERSTAND</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Growth systems designed around your industry&apos;s realities.
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <IndustryStrip linkBase="/industries" />
          </Reveal>
        </Section>

        {/* 05 — The connected growth system · flow (flow) */}
        <Section tone="flow" border="top" seam="signal">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>THE CONNECTED GROWTH SYSTEM</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                From disconnected tools to one connected system.
              </Heading>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                Structurally, most businesses look like the left — a handful of tools that don&apos;t
                talk to each other. NairobiX builds the right: one system that does.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 lg:mt-14">
              <ConnectedSystemCompare disconnected={DISCONNECTED_PAIRS} connected={CONNECTED_GROWTH_FLOW} />
            </div>
          </Reveal>
          <div className="mt-12 border-t border-white/10 pt-6">
            <Link
              href="#solutions"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors duration-300 hover:text-white"
            >
              See how we can help
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]"
              >
                →
              </span>
            </Link>
          </div>
        </Section>

        {/* 06 — Systems & technology · precision (technical) */}
        <Section tone="technical" border="top" seam="node">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>SYSTEMS &amp; TECHNOLOGY</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  The technology behind the system.
                </Heading>
              </div>
              <p className="max-w-md text-lg leading-8 text-[var(--text-secondary)] lg:justify-self-end">
                We connect the platforms and technologies that help businesses attract, convert,
                operate and grow.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 lg:mt-16">
              <TechnologyMatrix items={TECHNOLOGY_PREVIEW} />
            </div>
          </Reveal>
        </Section>

        {/* 11 — Illustrative scenarios · application, image-led (ink) */}
        <Section tone="ink" border="top">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>ILLUSTRATIVE SCENARIOS</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                What a connected growth system could look like
              </Heading>
              <p className="mt-4 text-sm leading-6 text-[var(--text-tertiary)]">
                These are concept case studies illustrating how NairobiX approaches a growth system
                for a given industry — not documented results from a specific client.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group block">
                  <ImageFrame
                    src={study.image}
                    alt={study.imageAlt}
                    aspect="wide"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {study.label} · Concept Case Study
                    </p>
                    <Heading variant="heading-md" as="h3" className="mt-3">
                      {study.title}
                    </Heading>
                    <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{study.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                      Explore the case study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* 07 — How NairobiX works · architecture (blueprint) */}
        <Section tone="blueprint" border="top">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>HOW NAIROBIX WORKS</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                How the system above actually gets built.
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 lg:mt-16">
              <ProcessLine stages={HOME_PROCESS} />
            </div>
          </Reveal>
        </Section>

        {/* 08 — Why NairobiX · human context (photo) */}
        <Section tone="photo" border="top">
          {/* Desktop: the photograph is the section's environment — it runs
              full-height from the page edge and dissolves into the black
              behind the reasons, rather than sitting in a frame. Mobile: a
              4:3 block above the content. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[48%] lg:block">
            <Image
              src="/images/photography/why-nairobix.jpg"
              alt="A dramatic upward view of glass office towers in Nairobi's central business district."
              fill
              sizes="48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#070707]/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#070707]/45 to-[#070707]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/55 via-transparent to-[#070707]/70" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <ImageFrame
              src="/images/photography/why-nairobix.jpg"
              alt="A dramatic upward view of glass office towers in Nairobi's central business district."
              aspect="landscape"
              sizes="(min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
              className="lg:hidden"
            />
            <div aria-hidden="true" className="hidden lg:block" />
            <Reveal>
              <div>
                <Eyebrow>WHY NAIROBIX</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  One partner for the systems that drive growth.
                </Heading>
                <div className="mt-10">
                  <WhyNairobixList reasons={HOME_WHY_NAIROBIX} />
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 10 — How we work + workspace · experience (interface) */}
        <Section tone="interface" border="top" seam="node">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>HOW WE WORK</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                What happens after you reach out.
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {ENGAGEMENT_PROCESS.map((item) => (
                <li key={item.number} className="border-t border-white/10 pt-5">
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-[var(--color-primary)]">
                    {item.number}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          {/* The workspace the engagement runs in — the same PortalPreview
              used on solution and case-study pages, set in a deeper panel. */}
          <Reveal delay={120}>
            <div className="mt-12 rounded-[var(--radius-card)] border border-white/10 bg-[#101112] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8 lg:mt-16 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
                <div className="min-w-0">
                  <Eyebrow>{CLIENT_WORKSPACE.eyebrow}</Eyebrow>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-[1.75rem]">
                    A system is not finished when it launches.
                  </h3>
                  <p className="mt-2 font-display text-xl tracking-tight text-white/60">
                    It gets better as the business learns.
                  </p>
                  <p className="mt-6 max-w-[var(--max-width-prose)] text-base leading-7 text-[var(--text-secondary)]">
                    {CLIENT_WORKSPACE.description}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                    {WORKSPACE_FEATURES.map((feature) => {
                      const Icon = WORKSPACE_FEATURE_ICONS[feature.id];
                      return (
                        <div key={feature.id} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">{feature.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-[var(--text-secondary)]">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="min-w-0">
                  <PortalPreview preview={HOME_WORKSPACE_PREVIEW} />
                </div>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
            <span className="text-[var(--text-tertiary)]">Prefer to talk it through first?</span>
            <Link
              href={BOOKING_URL}
              className="group inline-flex items-center gap-2 font-semibold text-white/85 transition-colors duration-300 hover:text-white"
            >
              Book a Consultation
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]"
              >
                →
              </span>
            </Link>
          </div>
        </Section>

        {/* 12 — Insights · knowledge (editorial) */}
        <Section tone="editorial">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c2410c]">INSIGHTS</p>
                <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[#141414] sm:text-4xl">
                  Ideas for building better businesses.
                </h2>
              </div>
              <p className="max-w-md text-lg leading-8 text-black/65 lg:justify-self-end">
                Practical thinking on growth, digital systems, automation, AI and the technology
                behind modern businesses.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <InsightsPreview articles={INSIGHTS} tone="light" />
            </div>
          </Reveal>
          <div className="mt-12 border-t border-black/10 pt-6">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#141414]/85 transition-colors duration-300 hover:text-[#141414]"
            >
              Explore all insights
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]"
              >
                →
              </span>
            </Link>
          </div>
        </Section>

        {/* 13 — Growth Assessment · focus, the primary conversion point (focus) */}
        <Section tone="focus" seam="signal">
          <NiaSectionCue reaction="attentive" />
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
              <div>
                <Eyebrow>GROWTH ASSESSMENT</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Find the opportunities your business is leaving on the table.
                </Heading>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                  A structured review of your growth, sales and operating systems — designed to
                  identify gaps, prioritize opportunities and define the next practical step.
                </p>
                <div className="mt-8">
                  <Button href="/business-growth-audit" variant="primary">
                    Start the 4-Minute Assessment →
                  </Button>
                </div>
                <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-tertiary)]">
                  After you submit, NairobiX reviews your responses and comes back with clear
                  priorities and a proposed approach — before anything begins.
                </p>
              </div>

              <AssessmentStages />
            </div>
          </Reveal>
        </Section>

        {/* 14 — FAQ · clarity (clear) */}
        <Section tone="clear" border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Questions businesses often ask
            </Heading>
          </div>
          <Faq items={FAQS.slice(0, 5)} single />
        </Section>

        {/* 15 — Final CTA · confidence, closure (deep) */}
        <CTASection
          title="Ready to build a stronger growth system?"
          description="Start with a clear view of where your business is today."
          tone="deep"
          spacing="compact"
          detail={<CtaSystemLine />}
        >
          <Button href="/business-growth-audit" variant="primary">
            Start Your Free Growth Assessment →
          </Button>
          <Button href={BOOKING_URL} variant="secondary">
            Book a Consultation →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
