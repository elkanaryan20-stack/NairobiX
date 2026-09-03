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

export const metadata: Metadata = {
  title: "Case Studies | NairobiX",
  description: "Illustrative growth system scenarios across industries, showing how NairobiX approaches a connected system for a given business.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20">
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

        <Section>
          <div className="grid gap-8 lg:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <article key={study.slug} className="group overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02]">
                <ImageFrame
                  src={study.image}
                  alt={study.imageAlt}
                  aspect="wide"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {study.label} · Illustrative Scenario
                  </p>
                  <Heading as="h2" variant="heading-md" className="mt-4">
                    {study.title}
                  </Heading>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{study.description}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition hover:text-[#ff8b40]"
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
