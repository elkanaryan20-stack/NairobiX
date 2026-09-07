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
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/case-studies" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20 sm:py-24">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · CASE STUDIES</Eyebrow>
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

        <Section spacing="compact">
          <div className="divide-y divide-white/10">
            {CASE_STUDIES.map((study, index) => (
              <article
                key={study.slug}
                className="grid items-center gap-10 py-16 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:py-24"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <ImageFrame
                    src={study.image}
                    alt={study.imageAlt}
                    aspect="portrait"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                    {study.label} · Illustrative Scenario
                  </p>
                  <Heading as="h2" variant="display-md" className="mt-5">
                    {study.title}
                  </Heading>
                  <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
                    {study.description}
                  </p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-8 inline-flex items-center text-sm font-semibold text-white transition hover:text-[var(--color-primary)]"
                  >
                    View Scenario →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
