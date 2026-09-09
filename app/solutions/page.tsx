import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTION_CATEGORIES, ALL_SOLUTIONS } from "@/lib/site-data";
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
import { webPageJsonLd, serviceListJsonLd } from "@/lib/structured-data";

const TITLE = "Solutions";
const DESCRIPTION =
  "NairobiX designs connected growth systems across digital marketing, CRM and sales, automation, AI, web and analytics — not six services sold separately.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/solutions" });

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/solutions" })} />
      <JsonLd data={serviceListJsonLd(SOLUTION_CATEGORIES)} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        {/* Intro / positioning */}
        <section className="border-b border-white/10">
          <Container className="py-20 sm:py-24">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · SOLUTIONS</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                NairobiX designs connected growth systems.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Strategy, marketing, CRM and sales, automation, AI, web platforms and analytics are
                built as one body of work — because in practice, each discipline determines how
                well the others perform. The six solutions below are where that system gets built,
                one working part at a time.
              </p>
            </div>

            {/* Lightweight framework legend, not another set of boxes */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8">
              {SOLUTION_CATEGORIES.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--color-primary)]"
                >
                  {category.title} →
                </a>
              ))}
            </div>
          </Container>
        </section>

        {SOLUTION_CATEGORIES.map((category) => (
          <div key={category.id} id={category.id} className="scroll-mt-24">
            <Section spacing="compact" border="top">
              <div className="max-w-2xl">
                <Eyebrow>{category.title}</Eyebrow>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{category.intro}</p>
              </div>
            </Section>

            {category.items.map((item) => {
              const solutionIndex = ALL_SOLUTIONS.findIndex((solution) => solution.id === item.id) + 1;
              const isEven = solutionIndex % 2 === 0;

              return (
                <Section key={item.id} tone={isEven ? "surface" : "base"} spacing="compact">
                  <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                    <div className={isEven ? "lg:order-2" : ""}>
                      <ImageFrame
                        src={item.image}
                        alt={item.imageAlt}
                        aspect="wide"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                    <div className={isEven ? "lg:order-1" : ""}>
                      <span className="font-display text-sm font-medium text-[var(--color-primary)]">
                        {String(solutionIndex).padStart(2, "0")}
                      </span>
                      <Heading variant="heading-lg" as="h2" className="mt-3">
                        {item.heading}
                      </Heading>
                      <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                        <span className="text-white">{item.problem}</span> {item.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                        {item.ideal.slice(0, 3).map((point) => (
                          <span key={point} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                            {point}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/solutions/${item.id}`}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--color-primary)]"
                      >
                        Learn More
                        <span className="transition">→</span>
                      </Link>
                    </div>
                  </div>
                </Section>
              );
            })}
          </div>
        ))}

        <Section border="top" tone="surface">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">NOT SURE WHERE TO START</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Start with the Business Growth Assessment.
            </Heading>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              It identifies which of these {ALL_SOLUTIONS.length} solutions — or which combination
              of them — matches where your business actually is right now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/business-growth-audit" variant="primary">
                Get Your Free Business Growth Assessment →
              </Button>
              <Link href="/case-studies" className="inline-flex items-center px-2 py-3 text-sm font-semibold text-white hover:text-[var(--color-primary)]">
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
