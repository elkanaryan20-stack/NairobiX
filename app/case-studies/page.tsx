import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Case Studies";
const DESCRIPTION =
  "Illustrative growth system scenarios across industries, showing how NairobiX approaches a connected system for a given business.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/case-studies" });

export default function CaseStudiesPage() {
  const [featured, ...rest] = [...CASE_STUDIES].sort((a, b) =>
    a.slug === "customer-acquisition-retention-system" ? -1 : b.slug === "customer-acquisition-retention-system" ? 1 : 0
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/case-studies" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20 sm:py-24">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · SELECTED WORK</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                What a connected growth system looks like, industry by industry.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                These are illustrative scenarios, not documented results from a named client — they
                show how NairobiX approaches the problem in a given industry, not a promise of a
                specific outcome.
              </p>
            </div>
          </Container>
        </section>

        {/* Featured scenario */}
        <Section spacing="default">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-display text-sm font-medium text-[var(--color-primary)]">01</span>
            <Eyebrow>Featured Scenario</Eyebrow>
          </div>
          <Link href={`/case-studies/${featured.slug}`} className="group grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
            <div className="overflow-hidden rounded-[var(--radius-image)]">
              <div className="transition duration-700 ease-out group-hover:scale-[1.03]">
                <ImageFrame src={featured.image} alt={featured.imageAlt} aspect="wide" preload />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                {featured.label} · Illustrative Scenario
              </p>
              <Heading as="h2" variant="display-lg" className="mt-5">
                {featured.title}
              </Heading>
              <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
                {featured.description}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                View Scenario
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Section>

        {/* Secondary scenarios — asymmetric editorial pairing, not repeated cards */}
        <Section tone="surface" border="top" spacing="default">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="font-display text-sm font-medium text-[var(--color-primary)]">
              02–{String(CASE_STUDIES.length).padStart(2, "0")}
            </span>
            <Eyebrow>More Scenarios</Eyebrow>
          </div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {rest.map((study, index) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className={`group block ${index % 2 === 1 ? "md:mt-16" : ""}`}
              >
                <div className="overflow-hidden rounded-[var(--radius-image)]">
                  <div className="transition duration-700 ease-out group-hover:scale-[1.05]">
                    <ImageFrame src={study.image} alt={study.imageAlt} aspect="portrait" sizes="(min-width: 768px) 45vw, 100vw" />
                  </div>
                </div>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                    0{index + 2} · {study.label}
                  </p>
                  <Heading as="h2" variant="heading-lg" className="mt-3">
                    {study.title}
                  </Heading>
                  <p className="mt-3 max-w-md text-base leading-7 text-[var(--text-secondary)]">{study.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                    View Scenario
                    <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
