import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ClipboardList, TrendingUp, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageFrame, GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { CTASection } from "@/components/ui/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import {
  BUSINESSES_WE_SERVE,
  GROWTH_APPROACH,
  WHY_NAIROBIX,
  CONNECTED_GROWTH_FLOW,
  DISCONNECTED_PAIRS,
  GROWTH_MINDSET_FLOW,
  ALL_SOLUTIONS,
  CASE_STUDIES,
  CLIENT_WORKSPACE,
  CONTACT_EMAIL,
} from "@/lib/site-data";
import { SystemFlow } from "@/components/solutions/SystemFlow";
import { SystemComparison } from "@/components/solutions/SystemComparison";
import { ProcessTimeline } from "@/components/solutions/ProcessTimeline";
import { TechnologyEcosystem } from "@/components/solutions/TechnologyEcosystem";
import { SystemExplorer } from "@/components/solutions/SystemExplorer";
import { GrowthSystemExplorer } from "@/components/solutions/GrowthSystemExplorer";

const TITLE = "About";
const DESCRIPTION =
  "NairobiX is a Nairobi-based business growth partner connecting strategy, digital marketing, CRM, automation, AI and web systems into one body of work.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

const METHOD_FLOW = [
  { label: "Strategy", detail: "We identify the opportunities, bottlenecks and systems that matter most before investing more budget or effort." },
  { label: "Technology", detail: "We implement the digital tools, platforms and workflows that make businesses faster, clearer and easier to scale." },
  { label: "Execution", detail: "We turn the strategy into practical delivery, helping teams build systems that work in real business conditions." },
];

const CLIENT_STATEMENTS = [
  {
    icon: ClipboardList,
    title: "You know what is happening.",
    description: "Projects, deliverables and progress are visible in one place, not scattered across emails and calls.",
  },
  {
    icon: TrendingUp,
    title: "You know what is working.",
    description: "Reports and performance information are accessible whenever you need them, not just at a monthly review.",
  },
  {
    icon: AlertCircle,
    title: "You know what needs attention.",
    description: "Requests, actions and priorities are organized, so nothing depends on someone remembering to follow up.",
  },
  {
    icon: Users,
    title: "You have one connected partner.",
    description: "Strategy, execution and systems stay aligned, with Nia on hand for quick guidance along the way.",
  },
];

const INDUSTRY_SLUGS: Record<string, string> = {
  Healthcare: "healthcare",
  "Real Estate": "real-estate",
  Hospitality: "hospitality",
  "Professional Services": "professional-services",
  "E-commerce & Retail": "ecommerce",
};

// About-page-only framing for WHY_NAIROBIX: a short "instead of X" contrast
// per existing reason, plus two extra reasons specific to this page. Kept
// local (rather than added to the shared WHY_NAIROBIX data) so the homepage,
// which also renders WHY_NAIROBIX directly, is unaffected.
const WHY_NAIROBIX_INSTEAD: Record<string, string> = {
  "One accountable partner, not five vendors": "coordinating multiple disconnected vendors",
  "Built around your business, not a fixed package": "implementing technology for its own sake",
  "Strategy stays connected to execution": "recommendations that never become operational",
};

const NAIROBIX_DIFFERENCE_EXTRAS = [
  {
    title: "Built for long-term growth",
    description:
      "Systems are designed to keep working and improving well past launch, not just for the duration of a single campaign or project.",
    instead: "one-off campaigns or isolated projects",
  },
  {
    title: "Measurable visibility",
    description:
      "Every connected system reports back into a shared view, so performance is something the business can see, not something it has to guess at.",
    instead: "activity without clear performance context",
  },
];

export default function AboutPage() {
  const technologyStack = Array.from(new Set(ALL_SOLUTIONS.flatMap((solution) => solution.technology)));
  const nairobixDifference = [
    ...WHY_NAIROBIX.map((reason) => ({ ...reason, instead: WHY_NAIROBIX_INSTEAD[reason.title] ?? "" })),
    ...NAIROBIX_DIFFERENCE_EXTRAS,
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/about" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/photography/nairobi-skyline.webp"
              alt="The Nairobi city skyline under a bright midday sky."
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/80 to-[#030304]/40" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>

          <Container className="relative py-20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Eyebrow>NAIROBIX · ABOUT</Eyebrow>
                <Heading as="h1" variant="display-lg" className="mt-4">
                  A long-term growth partner for ambitious businesses.
                </Heading>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                  NairobiX helps businesses grow through connected systems, not disconnected
                  tactics. The work sits at the intersection of strategy, technology, automation
                  and execution, so growth feels structured, measurable and sustainable rather
                  than dependent on any one campaign.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="/business-growth-audit" variant="primary">
                    Get Your Free Business Growth Assessment →
                  </Button>
                  <Button href="/solutions" variant="secondary">
                    Explore Solutions →
                  </Button>
                </div>
              </div>

              <Card variant="outline" className="p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  What we believe
                </p>
                <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                  Growth is not a single campaign or one-off tactic. It is a connected system that
                  links acquisition, sales, automation, digital experiences and business intelligence.
                </p>
              </Card>
            </div>
          </Container>
        </section>

        {/* Nairobi / Africa context */}
        <Section border="top" spacing="compact">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>NAIROBI · AFRICA</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                Built in Nairobi. Designed for ambitious businesses across Africa.
              </Heading>
            </div>
            <p className="text-lg leading-8 text-[var(--text-secondary)]">
              NairobiX is based in Nairobi and built around the realities of doing business here —
              WhatsApp as a primary sales channel, referral-driven growth, and teams that need
              systems which work with existing tools rather than replacing them wholesale. The
              same approach applies to ambitious businesses anywhere in East Africa facing the
              same underlying growth problems.
            </p>
          </div>
        </Section>

        {/* What NairobiX actually is */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHAT NAIROBIX ACTUALLY IS</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Not a marketing vendor. A business growth partner.
            </Heading>
            <p className="mt-3 text-sm text-[var(--text-tertiary)]">Select a term to see what it means in practice.</p>
          </div>
          <SystemFlow nodes={METHOD_FLOW} />
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-5 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="text-sm font-medium text-white">= One connected growth system</span>
          </div>
        </Section>

        {/* Why businesses need a connected partner */}
        <Section border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHY A CONNECTED PARTNER</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Most businesses already have the pieces. They just don&apos;t talk to each other.
            </Heading>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              Marketing, WhatsApp, a website, a CRM, a sales team and a spreadsheet or two — most
              businesses have all of this already. What&apos;s usually missing is the connection
              between them.
            </p>
          </div>
          <SystemComparison disconnected={DISCONNECTED_PAIRS} connected={CONNECTED_GROWTH_FLOW} />
        </Section>

        {/* Methodology */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>HOW WE OPERATE</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              One growth system, built in four stages.
            </Heading>
          </div>
          <ProcessTimeline stages={GROWTH_APPROACH.map((item) => ({ stage: item.step, description: item.description }))} />
        </Section>

        {/* How we think about growth */}
        <Section border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>THE GROWTH SYSTEM</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              We look past individual marketing activities.
            </Heading>
            <p className="mt-3 text-sm text-[var(--text-tertiary)]">
              Select a stage to see what happens, what it takes, and what it produces.
            </p>
          </div>
          <GrowthSystemExplorer stages={GROWTH_MINDSET_FLOW} />
        </Section>

        {/* Trust layer / see the system */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="overflow-hidden rounded-[var(--radius-image)]">
              <ImageFrame
                src="/images/photography/why-nairobix.jpg"
                alt="A dramatic upward view of glass office towers in Nairobi's central business district."
                aspect="wide"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div>
              <Eyebrow>WHY TRUST NAIROBIX</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                Judge the system, not the pitch.
              </Heading>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                NairobiX doesn&apos;t ask you to take capability on faith. The technology and systems
                below are the same ones used across every NairobiX engagement — explore what each
                one actually builds.
              </p>
            </div>
          </div>
          <TechnologyEcosystem technology={technologyStack} />
          <div className="mt-14">
            <Eyebrow>SEE THE SYSTEM</Eyebrow>
            <Heading as="h3" variant="heading-lg" className="mt-4 mb-8">
              What NairobiX builds, by area.
            </Heading>
            <SystemExplorer solutions={ALL_SOLUTIONS} />
          </div>
        </Section>

        {/* Client experience */}
        <Section border="top" spacing="compact">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[var(--radius-image)]">
              <ImageFrame
                src="/images/photography/modern-office.webp"
                alt="A sunlit modern office with people working quietly in the background."
                aspect="portrait"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div>
              <Eyebrow>{CLIENT_WORKSPACE.eyebrow}</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                What it&apos;s actually like to work with NairobiX.
              </Heading>
              <div className="mt-10 space-y-7">
                {CLIENT_STATEMENTS.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Who we work with */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHO WE WORK WITH</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Built for businesses facing a familiar set of growth problems.
            </Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESSES_WE_SERVE.map((item) => {
              const slug = INDUSTRY_SLUGS[item.type];
              const content = (
                <>
                  <p className="text-sm font-semibold text-white">{item.type}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.problem}</p>
                  {slug ? (
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-[var(--color-primary)]">
                      See the industry →
                    </span>
                  ) : null}
                </>
              );
              return slug ? (
                <Link
                  key={item.type}
                  href={`/industries/${slug}`}
                  className="group rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02] p-5 transition hover:border-[var(--color-primary)]/40"
                >
                  {content}
                </Link>
              ) : (
                <Card key={item.type} variant="outline" className="p-5">
                  {content}
                </Card>
              );
            })}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--text-tertiary)]">
            And other growth-focused businesses across sectors, wherever a connected system would
            make the biggest difference.
          </p>
        </Section>

        {/* Scenarios */}
        <Section border="top" spacing="compact">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>ILLUSTRATIVE SCENARIOS</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                How NairobiX thinks, applied to real situations.
              </Heading>
            </div>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--color-primary)]">
              Explore Scenarios →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group block">
                <div className="overflow-hidden rounded-[var(--radius-image)]">
                  <div className="transition duration-700 ease-out group-hover:scale-[1.05]">
                    <ImageFrame src={study.image} alt={study.imageAlt} aspect="portrait" sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  {study.label} · Illustrative Scenario
                </p>
                <Heading as="h3" variant="heading-md" className="mt-2">
                  {study.title}
                </Heading>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                  View Scenario
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* The NairobiX difference */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>THE NAIROBIX DIFFERENCE</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              What changes when growth is treated as one system.
            </Heading>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {nairobixDifference.map((reason) => (
              <Card key={reason.title} variant="outline" className="p-6">
                <Heading variant="heading-md" as="h3">
                  {reason.title}
                </Heading>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{reason.description}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
                  Instead of {reason.instead}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <CTASection
          eyebrow="NEXT STEP"
          title="Build a growth system that works as one."
          description={`The Business Growth Assessment is the fastest way to see where the biggest opportunities are. Reach us directly any time at ${CONTACT_EMAIL}.`}
        >
          <Button href="/business-growth-audit" variant="primary">
            Get Your Free Business Growth Assessment →
          </Button>
          <Button href="/solutions" variant="secondary">
            Explore Solutions →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
