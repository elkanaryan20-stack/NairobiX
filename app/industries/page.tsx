import type { Metadata } from "next";
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
import { INDUSTRIES } from "@/lib/site-data";

const TITLE = "Industries";
const DESCRIPTION =
  "How NairobiX builds growth systems for healthcare, real estate, hospitality, professional services and e-commerce businesses in Kenya.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/industries" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · INDUSTRIES</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                Growth systems designed around your industry&apos;s realities.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                The same underlying systems — CRM, automation, marketing, AI — solve very
                different problems depending on the business. Here&apos;s how that plays out across
                the industries NairobiX works with most.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid gap-8 md:grid-cols-2">
            {INDUSTRIES.map((industry) => (
              <article
                key={industry.slug}
                className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02]"
              >
                <ImageFrame
                  src={industry.heroImage}
                  alt={industry.heroImageAlt}
                  aspect="wide"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                    {industry.eyebrow}
                  </p>
                  <Heading variant="heading-md" as="h2" className="mt-4">
                    {industry.heading}
                  </Heading>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{industry.challenge}</p>
                  <Button href={`/industries/${industry.slug}`} variant="secondary" size="md" className="mt-6">
                    Explore {industry.name} →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section border="top" tone="surface">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">DON&apos;T SEE YOUR INDUSTRY</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              The system adapts to the business, not the other way around.
            </Heading>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              These are the industries where NairobiX has built the most depth, but the same
              underlying systems apply across most growth-focused businesses.
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
