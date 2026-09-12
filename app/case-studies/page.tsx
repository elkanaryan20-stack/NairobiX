import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Case Studies";
const DESCRIPTION =
  "Illustrative growth system scenarios across industries, showing how NairobiX approaches a connected system for a given business.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/case-studies" });

export default function CaseStudiesPage() {
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

        {/* Scenarios — full-width alternating editorial rows, matching the Solutions page grammar */}
        {CASE_STUDIES.map((study, index) => {
          const position = index + 1;
          const isEven = position % 2 === 0;
          const highlights = study.outcomeMetrics.slice(0, 3).map((metric) => metric.label);

          return (
            <Section
              key={study.slug}
              tone={isEven ? "surface" : "base"}
              border={index === 0 ? "none" : "top"}
              spacing="default"
            >
              <div className="group grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={`overflow-hidden rounded-[var(--radius-image)] ${isEven ? "lg:order-2" : ""}`}>
                  <div className="transition duration-700 ease-out group-hover:scale-[1.03]">
                    <ImageFrame
                      src={study.image}
                      alt={study.imageAlt}
                      aspect="wide"
                      preload={index === 0}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>
                <div className={isEven ? "lg:order-1" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                    {String(position).padStart(2, "0")} · {study.label} · Illustrative Scenario
                  </p>
                  <Heading as="h2" variant="display-md" className="mt-4">
                    {study.title}
                  </Heading>
                  <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
                    {study.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {highlights.map((highlight) => (
                      <span key={highlight} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group/cta mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--color-primary)]"
                  >
                    View Scenario
                    <span className="transition group-hover/cta:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </Section>
          );
        })}

        <Section border="top" tone="surface">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">NOT SURE WHICH SCENARIO FITS</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Start with the Business Growth Assessment.
            </Heading>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              It identifies which systems matter most for your specific business — the fastest way
              to see whether a scenario like these applies to you.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/business-growth-audit" variant="primary">
                Get Your Free Business Growth Assessment →
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
