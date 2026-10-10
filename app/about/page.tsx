import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { ClipboardList, Mail, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame, GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { NiaMark } from "@/components/nia/NiaMark";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import { TechnologyMatrix } from "@/components/home/TechnologyMatrix";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { BOOKING_URL, BUSINESSES_WE_SERVE, SOLUTION_CATEGORIES, TECHNOLOGY_PREVIEW } from "@/lib/site-data";

const TITLE = "About: Growth Partner in Nairobi";
const DESCRIPTION =
  "NairobiX is a Nairobi-based business growth and digital transformation partner. We bring strategy, marketing, CRM, automation, AI and digital solutions together around what a business actually needs.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

const pad = (n: number) => String(n).padStart(2, "0");

// The pieces most businesses already have — annotated onto a real working
// scene rather than drawn as another system diagram. Positions are % of the
// photo; decorative (the copy beside it says the same thing in words).
const SCATTERED_PIECES = [
  { label: "Marketing", x: 6, y: 10 },
  { label: "CRM", x: 64, y: 8 },
  { label: "Website", x: 70, y: 32 },
  { label: "WhatsApp", x: 8, y: 56 },
  { label: "Sales", x: 58, y: 60 },
  { label: "Automation", x: 18, y: 84 },
  { label: "Data", x: 76, y: 84 },
];

// What NairobiX designs around in this market — phrased as what is often
// true, never as a claim about every business.
const CONTEXT_NOTES = [
  {
    title: "WhatsApp as a working channel",
    text: "Many customer conversations start and continue on WhatsApp. Systems should work with that, not around it.",
  },
  {
    title: "Referrals and relationships",
    text: "Referrals remain a real source of growth for many businesses. Good systems make them visible and repeatable.",
  },
  {
    title: "Tools that already exist",
    text: "Most teams already use several tools. The practical step is often connecting them, not replacing them.",
  },
  {
    title: "Sized to the stage",
    text: "What a business needs depends on where it is. Systems are designed for the current stage, with room to grow.",
  },
];

const PARTNER_CHAIN = [
  { label: "Business need", text: "What the business is trying to achieve." },
  { label: "Requirement", text: "What actually has to change for that to happen." },
  { label: "Solution", text: "The right combination of capabilities for that change." },
  { label: "System", text: "Everything connected so it works as one." },
  { label: "Outcome", text: "What the business can see and measure afterwards." },
];

const PRINCIPLES = [
  { title: "Understand the business", text: "Goals, constraints, customers — and how the business actually runs today." },
  { title: "Define what needs to change", text: "Turn the problem into a clear requirement before anything is built." },
  { title: "Design the right solution", text: "Choose the capabilities that meet the requirement — no more, no less." },
  { title: "Connect it to the wider system", text: "Make it work with the processes, tools and people around it." },
  { title: "Measure and improve", text: "Track what it produces, and refine it as the business learns." },
];

// The full NairobiX model, shown once as a quiet reference line — the five
// principles above are its readable form.
const FULL_MODEL = [
  "Problem",
  "Need",
  "Requirement",
  "Capability",
  "Solution",
  "Process",
  "Rule",
  "Workflow",
  "Automation",
  "Technology",
  "Outcome",
  "Measurement",
];

const METHOD = [
  {
    title: "Understand",
    text: "Review the business, its goals and constraints — acquisition, sales process, systems and operations — to find what is limiting growth.",
  },
  { title: "Build", text: "Design and implement the systems, digital assets and strategies the business actually requires." },
  {
    title: "Connect",
    text: "Connect the relevant parts so information, processes and customer journeys work together instead of in separate tools.",
  },
  { title: "Optimize", text: "Measure what the system produces and improve it over time. The work doesn't end at launch." },
];

const EXPERIENCE: Array<{ title: string; text: string; icon: ComponentType<{ className?: string }> }> = [
  { title: "Visibility", text: "Know what's happening — active work, milestones and deliverables in one place.", icon: ClipboardList },
  { title: "Collaboration", text: "Requests, priorities and deliverables are kept together, not scattered across emails and calls.", icon: Mail },
  { title: "Performance", text: "See what the system is producing through shared growth reporting.", icon: TrendingUp },
  { title: "Guidance", text: "Access to the NairobiX team — and Nia, the NairobiX assistant, for quick answers along the way.", icon: NiaMark },
];

const DIFFERENCE = [
  { title: "One accountable partner", text: "Strategy, execution and systems stay connected — and so does responsibility for them." },
  { title: "Built around your business", text: "The system starts from requirements, not a fixed package." },
  { title: "Connected from the beginning", text: "The relevant marketing, sales, technology and operational systems are designed to work together." },
  { title: "Built to improve", text: "The work doesn't end at launch. What the system produces shapes the next improvement." },
];

const INDUSTRY_SLUGS: Record<string, string> = {
  Healthcare: "healthcare",
  "Real Estate": "real-estate",
  Hospitality: "hospitality",
  "Professional Services": "professional-services",
  "E-commerce & Retail": "ecommerce",
};

// Workspace preview — the same illustrative interface used on the homepage.
const WORKSPACE_PREVIEW = {
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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/about" })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* 01 — Hero: a real Nairobi skyline, and who NairobiX is in three sentences. */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/photography/pexels-mukula-igavinchi-443985808-15496542.jpg"
              alt="Nairobi's skyline and expressway under an overcast sky."
              fill
              preload
              sizes="100vw"
              className="object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-[#070707]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-[#070707]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/40" />
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
          </div>
          <Container className="pb-16 pt-24 sm:pt-28 lg:pb-20 lg:pt-36">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · ABOUT</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-5">
                Growth takes a partner who can see the whole system.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                NairobiX is a business growth and digital transformation partner based in Nairobi. We
                bring strategy, marketing, CRM, automation, AI and digital solutions together around
                what a business actually needs — so growth is built as a system, not managed as a
                collection of disconnected activities.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/business-growth-audit" variant="primary" className="min-h-12">
                  Find Your Growth Leak →
                </Button>
                <Button href="#how-we-work" variant="secondary" className="min-h-12">
                  Explore How We Work →
                </Button>
              </div>
            </div>
            <dl className="mt-16 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3 lg:mt-24">
              {[
                ["Based in", "Nairobi, Kenya"],
                ["Works across", "Six connected solution areas"],
                ["Starts with", "The business — then the system"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">{term}</dt>
                  <dd className="mt-2 text-sm font-medium text-white/85">{value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* 02 — Why NairobiX exists: the pieces are there; the connection isn't. */}
        <Section tone="warmth">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
            <Reveal>
              <div>
                <Eyebrow>WHY WE EXIST</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Businesses rarely lack tools. They lack connection.
                </Heading>
                <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                  A campaign brings in enquiries. The enquiries arrive on WhatsApp. Someone copies a few
                  into a spreadsheet. Sales follows up when it can. Reporting is pieced together at the end
                  of the month. Each part works — on its own.
                </p>
                <div className="mt-10 max-w-md">
                  <span aria-hidden="true" className="block h-px w-8 bg-[var(--color-primary)]" />
                  <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-white/90 sm:text-[1.75rem]">
                    Most businesses already have pieces of a growth system. What&apos;s often missing is the
                    architecture connecting them.
                  </p>
                </div>
                <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
                  NairobiX exists to build that architecture — so the parts of a business responsible for
                  growth work together, and growth stops depending on disconnected tactics and vendors.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <figure className="relative">
                <ImageFrame
                  src="/images/photography/pexels-a-darmel-7710088.jpg"
                  alt="A man arranging separate sticky notes across a wall while planning."
                  aspect="landscape"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                {/* Annotations: the scattered pieces, each on its own. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {SCATTERED_PIECES.map((piece) => (
                    <span
                      key={piece.label}
                      className="absolute flex items-center gap-1.5 rounded-sm bg-[#070707]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-[2px] sm:text-[10px]"
                      style={{ left: `${piece.x}%`, top: `${piece.y}%` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full border border-white/60" />
                      {piece.label}
                    </span>
                  ))}
                </div>
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  The pieces — each working on its own
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* 03 — Built in Nairobi: context-aware, never a claim about everyone. */}
        <Section tone="business" border="top">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal className="lg:order-2">
              <div>
                <Eyebrow>NAIROBI · AFRICA</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Built in Nairobi. Designed for ambitious businesses.
                </Heading>
                <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                  NairobiX is based in Nairobi, and designs around the way many businesses here actually
                  operate — then builds systems that fit that reality, rather than importing a template
                  built for somewhere else.
                </p>
                <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {CONTEXT_NOTES.map((note) => (
                    <div key={note.title} className="border-t border-white/10 pt-4">
                      <dt className="text-sm font-semibold text-white">{note.title}</dt>
                      <dd className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{note.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:order-1">
              <ImageFrame
                src="/images/photography/pexels-anthonyshkraba-production-8837553.jpg"
                alt="A team working together around a table covered in plans and notes."
                aspect="portrait"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="lg:h-full lg:aspect-auto"
              />
            </Reveal>
          </div>
        </Section>

        {/* 04 — What NairobiX is: how a partner reads a business. */}
        <Section tone="core" border="top">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow>WHAT NAIROBIX IS</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Connected thinking, grounded in daily operations.
                </Heading>
                <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                  NairobiX works across strategy, marketing, CRM, automation, AI and digital platforms.
                  The work connects the right capabilities around what a business needs and how it
                  operates, so each step builds on the system already in place.
                </p>
                <p className="mt-5 text-base leading-7 text-[var(--text-tertiary)]">
                  Each engagement starts with the need, the people involved and the systems already in place.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ol className="relative">
                {PARTNER_CHAIN.map((step, index) => (
                  <li key={step.label} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-9 last:pb-0">
                    {index < PARTNER_CHAIN.length - 1 ? (
                      <span aria-hidden="true" className="absolute bottom-0 left-[3.5px] top-[22px] w-px bg-gradient-to-b from-white/25 to-white/10" />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={`relative mt-[15px] h-2 w-2 rounded-full border ${
                        index === PARTNER_CHAIN.length - 1 ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/40 bg-[var(--section-bg)]"
                      }`}
                    />
                    <div>
                      <p className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">{step.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Section>

        {/* 05 — How we think: technology follows the requirement. */}
        <Section tone="architecture" border="top">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>HOW WE THINK</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Start with the business. Then build the system.
              </Heading>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="lg:h-full">
              <ImageFrame
                src="/images/photography/pexels-divinetechygirl-1181345.jpg"
                alt="A person mapping out a plan on a whiteboard."
                aspect="portrait"
                className="lg:h-full lg:aspect-auto"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <ol className="divide-y divide-white/10 border-y border-white/10">
                  {PRINCIPLES.map((principle, index) => (
                    <li key={principle.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-6">
                      <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-primary)]">{pad(index + 1)}</span>
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">{principle.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{principle.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-10 font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-[1.75rem]">
                  Technology follows the requirement — never the other way around.
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-[var(--text-tertiary)]">
                  <span className="text-white/55">The full model · </span>
                  {FULL_MODEL.map((stage, index) => (
                    <span key={stage}>
                      {index > 0 ? <span aria-hidden="true" className="text-[var(--color-primary)]/60"> → </span> : null}
                      <span className="whitespace-nowrap">{stage}</span>
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 06 — How we operate: the methodology as a vertical progression. */}
        <Section tone="blueprint" border="top" id="how-we-work" className="scroll-mt-[72px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow>HOW WE OPERATE</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Understand. Build. Connect. Optimize.
                </Heading>
                <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                  Four stages, in order, for every engagement — and the fourth feeds back into the first.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ol className="relative">
                <span aria-hidden="true" className="absolute bottom-10 left-[3.5px] top-3 w-px bg-white/15" />
                {METHOD.map((step, index) => (
                  <li key={step.title} className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="relative z-10 mt-3 h-2 w-2 rounded-full border border-[var(--color-primary)] bg-[var(--section-bg)]"
                    />
                    <div className="border-b border-white/10 pb-10 last:border-b-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">Stage {pad(index + 1)}</p>
                      <h3 className="mt-2 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">{step.title}</h3>
                      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex items-center gap-3 pl-[3.25rem] font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                <span aria-hidden="true" className="text-[var(--color-primary)]">↺</span> What the system produces informs the next round of understanding.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* 07 — The work: a curated index, not a services grid. */}
        <Section tone="ink" border="top">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-2xl">
                <Eyebrow>THE WORK</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Six growth capabilities. One connected approach.
                </Heading>
              </div>
              <Link
                href="/solutions"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                Explore Growth Systems
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 border-t border-white/10">
              {SOLUTION_CATEGORIES.map((category, groupIndex) => (
                <div key={category.id} className="grid gap-x-10 border-b border-white/10 lg:grid-cols-[14rem_minmax(0,1fr)]">
                  <p className="pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)] lg:py-7">
                    <span className="text-white/40">{pad(groupIndex + 1)} · </span>
                    {category.title}
                  </p>
                  <ul>
                    {category.items.map((item) => {
                      const number = SOLUTION_CATEGORIES.flatMap((c) => c.items).findIndex((i) => i.id === item.id) + 1;
                      return (
                        <li key={item.id} className="border-white/10 [&:not(:first-child)]:border-t">
                          <Link
                            href={`/solutions/${item.id}`}
                            className="group grid grid-cols-[2.5rem_2rem_minmax(0,1fr)_auto] items-center gap-x-4 py-6 transition-colors sm:grid-cols-[2.5rem_2.25rem_minmax(0,14rem)_minmax(0,1fr)_auto]"
                          >
                            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-primary)]">{pad(number)}</span>
                            <SolutionGlyph id={item.id} />
                            <span className="text-base font-semibold text-white">{item.title}</span>
                            <span className="col-span-4 col-start-3 mt-1 text-sm leading-6 text-[var(--text-secondary)] sm:col-span-1 sm:col-start-auto sm:mt-0">
                              {item.heading}
                            </span>
                            <span
                              aria-hidden="true"
                              className="col-start-4 row-start-1 text-white/40 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)] sm:col-start-auto sm:row-start-auto"
                            >
                              →
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* 08 — Technology: the homepage's own technology layer, framed as support. */}
        <Section tone="technical" border="top">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>THE TECHNOLOGY LAYER</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  Technology should serve the system.
                </Heading>
              </div>
              <div>
                <p className="max-w-md text-base leading-7 text-[var(--text-secondary)] lg:justify-self-end">
                  The technology layer behind the systems we build — chosen to fit each requirement, not
                  applied the same way in every engagement.
                </p>
                <ol aria-label="Where technology sits" className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <li className="text-white/55">Business</li>
                  <li aria-hidden="true" className="h-px w-6 bg-white/20" />
                  <li className="text-white/55">System</li>
                  <li aria-hidden="true" className="h-px w-6 bg-white/20" />
                  <li className="text-[var(--color-primary)]">Technology</li>
                </ol>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 lg:mt-14">
              <TechnologyMatrix items={TECHNOLOGY_PREVIEW} />
            </div>
          </Reveal>
        </Section>

        {/* 09 — The experience: one partner, one shared view of the work. */}
        <Section tone="interface" border="top">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <Reveal>
              <div>
                <Eyebrow>THE EXPERIENCE</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  One partner. One shared view of the work.
                </Heading>
                <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
                  Once an engagement begins, clients work with NairobiX through a dedicated workspace — so the
                  relationship runs on shared visibility rather than scattered emails and calls.
                </p>
                <ul className="mt-9 space-y-6">
                  {EXPERIENCE.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4">
                        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-[var(--color-primary)]">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            <span className="mr-2 font-mono text-[10px] tracking-[0.2em] text-white/40">{pad(index + 1)}</span>
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <PortalPreview preview={WORKSPACE_PREVIEW} />
            </Reveal>
          </div>
        </Section>

        {/* 10 — Who we work with: business contexts, not a claim of every specialism. */}
        <Section tone="acquire" border="top">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-2xl">
                <Eyebrow>WHO WE WORK WITH</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  For businesses ready to build beyond disconnected growth.
                </Heading>
              </div>
              <Link
                href="/industries"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                Explore Industries
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)]">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {BUSINESSES_WE_SERVE.map((business) => {
                const slug = INDUSTRY_SLUGS[business.type];
                const body = (
                  <>
                    <span className="flex items-center justify-between gap-3 text-base font-semibold text-white">
                      {business.type}
                      {slug ? (
                        <span aria-hidden="true" className="text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]">
                          →
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1.5 block text-sm leading-6 text-[var(--text-tertiary)]">Often: {business.problem}.</span>
                  </>
                );
                return (
                  <li key={business.type} className="border-t border-white/10">
                    {slug ? (
                      <Link href={`/industries/${slug}`} className="group block py-5">
                        {body}
                      </Link>
                    ) : (
                      <div className="py-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Section>

        {/* 11 — The NairobiX difference: four principles, no superlatives. */}
        <Section tone="graphite" border="top">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>THE NAIROBIX DIFFERENCE</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Growth works differently when the parts work together.
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-12 grid border-t border-white/10 sm:grid-cols-2">
              {DIFFERENCE.map((item, index) => (
                <li
                  key={item.title}
                  className={`border-b border-white/10 py-8 sm:py-10 ${index % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-primary)]">{pad(index + 1)}</p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-[var(--text-secondary)]">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* 12 — The next step. */}
        <Section tone="focus" border="top" seam="signal">
          <div className="mx-auto max-w-2xl text-center">
            <Heading variant="display-md">Ready to understand what your business needs next?</Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Start with the Business Growth Assessment. We&apos;ll use your business context to identify the
              areas creating the most friction and the opportunities worth addressing next.
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

/**
 * Small custom line glyphs for the six solutions — drawn for this index,
 * not an icon set: reach, measure, connect, loop, reason, frame.
 */
function SolutionGlyph({ id }: { id: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    className: "text-white/45 transition-colors duration-300 group-hover:text-[var(--color-primary)]",
    "aria-hidden": true,
  };
  switch (id) {
    case "digital-marketing":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="1.5" />
          <path d="M10 8.5a5 5 0 0 1 0 7M13.5 6a8.5 8.5 0 0 1 0 12M17 3.5a12 12 0 0 1 0 17" />
        </svg>
      );
    case "growth-strategy":
      return (
        <svg {...common}>
          <path d="M4 20h16M7 16v-4M12 16V8M17 16V5" />
        </svg>
      );
    case "crm-sales":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 11l10-4M7 13l10 4" />
        </svg>
      );
    case "business-automation":
      return (
        <svg {...common}>
          <path d="M5 12a7 7 0 0 1 12-4.9M19 12a7 7 0 0 1-12 4.9" />
          <path d="M17 3.5v3.6h-3.6M7 20.5v-3.6h3.6" />
        </svg>
      );
    case "ai-solutions":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="8" height="8" rx="1.5" />
          <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
          <path d="M3.5 9h17M7 7h.01" />
        </svg>
      );
  }
}
