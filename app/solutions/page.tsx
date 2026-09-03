import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTION_CATEGORIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";

export const metadata: Metadata = {
  title: "Solutions | NairobiX",
  description: "Discover NairobiX growth systems for digital marketing, CRM, automation, AI, and web solutions.",
};

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · SOLUTIONS</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                Solutions built around how your business grows.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Each solution below solves a specific, recognizable business problem. Most
                businesses need more than one — that&apos;s where they connect into a single system.
              </p>
            </div>
          </Container>
        </section>

        {SOLUTION_CATEGORIES.map((category, categoryIndex) => (
          <Section
            key={category.id}
            id={category.id}
            tone={categoryIndex % 2 === 1 ? "surface" : "base"}
            border="top"
            className="scroll-mt-24"
          >
            <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>{category.title}</Eyebrow>
                <Heading variant="heading-lg" as="h2" className="mt-3">
                  {category.title}
                </Heading>
              </div>
              <p className="max-w-xl text-base leading-7 text-[var(--text-secondary)]">{category.intro}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {category.items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02]">
                  <ImageFrame
                    src={item.image}
                    alt={item.imageAlt}
                    aspect="wide"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.eyebrow}</p>
                    <Heading variant="heading-md" as="h3" className="mt-4">
                      {item.heading}
                    </Heading>

                    <div className="mt-5 border-l-2 border-[var(--color-primary)]/40 pl-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        The problem
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.problem}</p>
                    </div>

                    <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">{item.description}</p>

                    <div className="mt-6">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        Ideal for businesses that want to...
                      </p>
                      <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        {item.ideal.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button href={item.href} variant="primary" size="md" className="mt-8">
                      {item.cta}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        ))}

        <Section border="top" tone="surface">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">NOT SURE WHERE TO START</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Start with the Business Growth Assessment.
            </Heading>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              It identifies which of these solutions — or which combination of them — matches
              where your business actually is right now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/business-growth-audit" variant="primary">
                Get Your Free Business Growth Assessment →
              </Button>
              <Link href="/case-studies" className="inline-flex items-center text-sm font-semibold text-white hover:text-[var(--color-primary)]">
                See Case Studies →
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
