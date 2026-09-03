import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Faq } from "@/components/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageFrame, GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { CTASection } from "@/components/ui/CTASection";
import {
  BOOKING_URL,
  HOME_SOLUTIONS,
  CASE_STUDIES,
  FAQS,
  HERO_IMAGE,
  WHAT_WE_DO,
  PROBLEMS_WE_SOLVE,
  GROWTH_APPROACH,
  WHY_NAIROBIX,
  ENGAGEMENT_PROCESS,
  INDUSTRIES_SERVED,
  CLIENT_WORKSPACE,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/75 to-[#030304]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030304] via-[#030304]/50 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>

          <Container className="relative py-24 sm:py-28 lg:py-36">
            <div className="max-w-2xl">
              <Eyebrow>NAIROBIX · GROWTH SYSTEMS</Eyebrow>
              <Heading variant="display-xl" className="mt-5">
                Growth handled as one connected system, not five disconnected vendors.
              </Heading>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                NairobiX combines digital marketing, CRM and sales systems, automation, AI and web
                platforms into a single body of work — so the parts of your business responsible
                for growth actually work together.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href="/business-growth-audit" variant="primary">
                  Get Your Free Business Growth Assessment →
                </Button>
                <Button href="/solutions" variant="secondary">
                  Explore Solutions →
                </Button>
              </div>
              <p className="mt-8 text-sm leading-6 text-[var(--text-tertiary)]">
                Marketing, CRM, automation and AI — planned and delivered as one system.
              </p>
            </div>
          </Container>
        </section>

        {/* 2. What NairobiX actually does */}
        <Section spacing="default">
          <div className="max-w-3xl">
            <Eyebrow>{WHAT_WE_DO.eyebrow}</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              {WHAT_WE_DO.title}
            </Heading>
            <p className="mt-6 max-w-[var(--max-width-prose)] text-lg leading-8 text-[var(--text-secondary)]">
              {WHAT_WE_DO.body}
            </p>
          </div>
        </Section>

        {/* 3. The problems we solve */}
        <Section tone="surface" border="top">
          <div className="max-w-2xl">
            <Eyebrow>WHERE GROWTH GETS STUCK</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              If any of this sounds familiar, you&apos;re not alone.
            </Heading>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PROBLEMS_WE_SOLVE.map((problem) => (
              <Card key={problem.title} variant="outline" className="p-6 sm:p-7">
                <Heading variant="heading-md" as="h3">
                  {problem.title}
                </Heading>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{problem.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* 4. The NairobiX connected-growth approach */}
        <Section border="top">
          <div className="max-w-2xl">
            <Eyebrow>THE NAIROBIX APPROACH</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              One growth system, built in four stages.
            </Heading>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {GROWTH_APPROACH.map((item, index) => (
              <div key={item.step} className={index > 0 ? "border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0" : ""}>
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  0{index + 1}
                </div>
                <Heading variant="heading-md" as="h3">
                  {item.step}
                </Heading>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Solutions overview */}
        <Section tone="surface" border="top">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>SOLUTIONS</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Three ways we help businesses grow.
            </Heading>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {HOME_SOLUTIONS.map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group relative isolate flex min-h-[430px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-white/10 p-6 sm:min-h-[460px] sm:p-8"
              >
                <Image
                  src={solution.image}
                  alt={solution.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/55 to-[#030304]/10" />
                <div
                  className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                  style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
                />
                <div className="relative">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {solution.number}
                  </div>
                  <Heading variant="heading-md" as="h3">
                    {solution.title}
                  </Heading>
                  <p className="mt-3 max-w-xs text-base leading-7 text-slate-200">{solution.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                    {solution.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* 6. Why NairobiX */}
        <Section border="top">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <ImageFrame
                src="/images/photography/executive-portrait.webp"
                alt="A business professional leaning against a stone column in natural light."
                aspect="portrait"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div>
              <Eyebrow>WHY NAIROBIX</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                A connected system beats a pile of vendors.
              </Heading>
              <div className="mt-10 space-y-8">
                {WHY_NAIROBIX.map((reason) => (
                  <div key={reason.title} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                    <Heading variant="heading-md" as="h3">
                      {reason.title}
                    </Heading>
                    <p className="mt-3 max-w-[var(--max-width-prose)] text-base leading-7 text-[var(--text-secondary)]">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 7. How we work */}
        <Section tone="surface" border="top">
          <div className="max-w-2xl">
            <Eyebrow>HOW WE WORK</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              What happens after you reach out.
            </Heading>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_PROCESS.map((item) => (
              <div key={item.number}>
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {item.number}
                </div>
                <Heading variant="heading-md" as="h3">
                  {item.title}
                </Heading>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>

          <Card variant="surface" className="mt-12 p-6 sm:p-8">
            <Eyebrow>{CLIENT_WORKSPACE.eyebrow}</Eyebrow>
            <Heading variant="heading-md" as="h3" className="mt-4">
              {CLIENT_WORKSPACE.title}
            </Heading>
            <p className="mt-3 max-w-[var(--max-width-prose)] text-base leading-7 text-[var(--text-secondary)]">
              {CLIENT_WORKSPACE.description}
            </p>
          </Card>
        </Section>

        {/* 8. Trust — industries + illustrative case studies */}
        <Section border="top">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>INDUSTRIES WE UNDERSTAND</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Growth systems designed around your industry&apos;s realities.
            </Heading>
          </div>
          <div className="mb-16 flex flex-wrap gap-3">
            {INDUSTRIES_SERVED.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-[var(--text-secondary)]"
              >
                {industry}
              </span>
            ))}
          </div>

          <div className="mb-8 flex flex-col gap-3 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>ILLUSTRATIVE SCENARIOS</Eyebrow>
              <Heading variant="heading-lg" className="mt-4" as="h3">
                What a connected growth system could look like
              </Heading>
              <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
                These are concept case studies illustrating how NairobiX approaches a growth system
                for a given industry — not documented results from a specific client.
              </p>
            </div>
          </div>
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
                    View Case Study →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* 9. Business Growth Assessment */}
        <Section tone="surface" border="top">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Eyebrow>GROWTH ASSESSMENT</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Find the opportunities your business is leaving on the table.
              </Heading>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                The Business Growth Assessment is a structured review of your acquisition, sales
                process and operational systems — designed to identify gaps, priorities and the
                most practical next step for your business.
              </p>
              <div className="mt-8">
                <Button href="/business-growth-audit" variant="primary">
                  Get Your Free Business Growth Assessment →
                </Button>
              </div>
            </div>

            <Card variant="outline" className="p-7">
              <div className="space-y-5">
                {[
                  { title: "Identify", text: "Growth opportunities and bottlenecks specific to your business." },
                  { title: "Prioritize", text: "The systems that matter most right now, not a generic checklist." },
                  { title: "Plan", text: "A practical next step, explained in plain terms before anything begins." },
                ].map((item) => (
                  <Card key={item.title} variant="surface" className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{item.text}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* 10. Final CTA + FAQ */}
        <CTASection
          title="Ready to build a stronger growth system?"
          tone="base"
        >
          <Button href="/business-growth-audit" variant="primary">
            Get Your Free Business Growth Assessment →
          </Button>
          <Button href={BOOKING_URL} external variant="secondary">
            Book a Consultation →
          </Button>
        </CTASection>

        <Section border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Questions businesses often ask
            </Heading>
          </div>
          <Faq items={FAQS.slice(0, 5)} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
