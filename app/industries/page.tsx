import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { IndustryIndex } from "@/components/industries/IndustryIndex";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { CONTEXT_DIMENSIONS, INDUSTRY_CONTEXTS } from "@/lib/industry-contexts";
import { ALL_SOLUTIONS, BOOKING_URL } from "@/lib/site-data";

const TITLE = "Industries";
const DESCRIPTION =
  "How business context changes the growth problem — acquisition, customer journey, sales cycle, constraints and technology — across nine kinds of organisations NairobiX works with.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/industries" });

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

const METHOD = [
  ["Understand the business", "How it acquires, sells, serves and operates today."],
  ["Find the constraint", "The one or two things limiting growth most right now."],
  ["Design the connected system", "Only the parts the business needs, working together."],
  ["Build, measure, improve", "Implemented in stages, and refined from what it shows."],
];

export default function IndustriesPage() {
  const solutions = ALL_SOLUTIONS.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/industries" })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* 01 — Hero: the premise, and nine real contexts as a strip of photographs. */}
        <Section tone="clear" spacing="hero" className="border-b border-white/10">
          <div className="max-w-3xl">
            <Eyebrow>NAIROBIX · INDUSTRIES</Eyebrow>
            <Heading as="h1" variant="display-lg" className="mt-5">
              Growth systems have to fit the business behind them.
            </Heading>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              A clinic, a letting agency and a law firm all want more of the right customers. But they find them
              differently, sell to them differently and are constrained differently. NairobiX applies the same
              connected-system thinking to each — and adapts the system to the business actually in front of us.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="#index" variant="primary" className="min-h-12">
                Find your context →
              </Button>
              <Button href="/business-growth-audit" variant="secondary" className="min-h-12">
                See what your business needs →
              </Button>
            </div>
          </div>
          <ul className="mt-16 grid grid-cols-3 gap-1.5 sm:grid-cols-9 lg:mt-20">
            {INDUSTRY_CONTEXTS.map((industry, i) => (
              <li key={industry.slug}>
                <Link
                  href={`#${industry.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[3px] bg-white/[0.03] sm:aspect-[2/5] lg:aspect-[3/5]"
                >
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 11vw, 33vw"
                    className="object-cover grayscale-[60%] transition duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                  <span className="absolute inset-x-2.5 bottom-2.5">
                    <span className={`${LABEL} block text-[var(--color-primary)]`}>{pad(i + 1)}</span>
                    <span className="mt-1 block text-[12px] font-medium leading-4 text-white">{industry.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* 02 — How context changes the problem. */}
        <Section tone="warmth">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow>WHY CONTEXT MATTERS</Eyebrow>
                <Heading variant="display-md" className="mt-4">
                  The same goal. Different mechanics.
                </Heading>
                <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                  What gets in the way of growth depends on how a business works. Five things change the problem
                  more than the industry label does — and every business sits somewhere different on each.
                </p>
                <p className="mt-5 text-base leading-7 text-white/60">
                  Where does your business sit? The answers shape which systems matter, in what order, and how
                  they need to be designed.
                </p>
              </div>
            </Reveal>
            <ol className="border-t border-white/10">
              {CONTEXT_DIMENSIONS.map((dimension, i) => (
                <li key={dimension.name} className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
                  <div>
                    <p className={`${LABEL} text-[var(--color-primary)]`}>{pad(i + 1)}</p>
                    <p className="mt-2 font-display text-xl font-medium text-white">{dimension.name}</p>
                    <p className="mt-1 text-sm leading-6 text-white/60">{dimension.question}</p>
                  </div>
                  <div className="self-center">
                    <div aria-hidden="true" className="relative h-px bg-gradient-to-r from-white/25 via-white/40 to-white/25">
                      <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full border border-white/50 bg-[var(--section-bg)]" />
                      <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rounded-full border border-white/50 bg-[var(--section-bg)]" />
                    </div>
                    <p className="mt-3 flex justify-between gap-6 text-[13px] leading-5 text-white/70">
                      <span>{dimension.from}</span>
                      <span className="text-right">{dimension.to}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* 03 — The industry index. */}
        <Section tone="ink" id="index" className="scroll-mt-[72px]">
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
            <div>
              <Eyebrow>INDUSTRY INDEX</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Nine contexts, read carefully.
              </Heading>
            </div>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              For each, the patterns that commonly shape growth — and where a connected system tends to help.
              These are starting hypotheses, tested against your business in the Growth Assessment, not
              assumptions about it.
            </p>
          </div>
          <IndustryIndex industries={INDUSTRY_CONTEXTS} solutions={solutions} />
        </Section>

        {/* 04 — What stays the same. */}
        <Section tone="graphite">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div>
              <Eyebrow>WHAT STAYS THE SAME</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                The context changes. The method doesn&apos;t.
              </Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                Whatever the industry, the work starts from the business, not a package — and only the parts that
                matter are built.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/about#how-we-work" className="text-white hover:text-[var(--color-primary)]">
                  How NairobiX works →
                </Link>
                <Link href="/solutions" className="text-white hover:text-[var(--color-primary)]">
                  The six solution areas →
                </Link>
              </div>
            </div>
            <ol className="grid gap-px bg-white/10 sm:grid-cols-2">
              {METHOD.map(([title, text], i) => (
                <li key={title} className="bg-[var(--section-bg)] p-6">
                  <p className={`${LABEL} text-[var(--color-primary)]`}>{pad(i + 1)}</p>
                  <p className="mt-3 font-medium text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* 05 — Next step. */}
        <Section tone="focus" seam="signal">
          <div className="mx-auto max-w-2xl text-center">
            <Heading variant="display-md">Start with your business, not a category.</Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              Whether or not your industry is listed here, the Business Growth Assessment starts from how your
              business actually works, and identifies what is worth addressing first.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/business-growth-audit" variant="primary">
                See what your business needs →
              </Button>
              <Button href={BOOKING_URL} variant="secondary">
                Talk to NairobiX →
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
