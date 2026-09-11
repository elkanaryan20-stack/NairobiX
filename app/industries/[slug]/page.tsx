import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { CTASection } from "@/components/ui/CTASection";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { ALL_SOLUTIONS, BOOKING_URL, CASE_STUDIES, INDUSTRIES } from "@/lib/site-data";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((item) => item.slug === slug);

  if (!industry) {
    return pageMetadata({
      title: "Industry",
      description: "A NairobiX industry growth approach.",
      path: `/industries/${slug}`,
    });
  }

  return pageMetadata({
    title: `${industry.name} Growth Systems`,
    description: industry.challenge,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const relevantSolutions = ALL_SOLUTIONS.filter((solution) => industry.relevantSolutionIds.includes(solution.id));
  const caseStudy = CASE_STUDIES.find((study) => study.slug === industry.caseStudySlug);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: `${industry.name} Growth Systems`,
          description: industry.challenge,
          path: `/industries/${industry.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
      <JsonLd data={faqPageJsonLd(industry.faqs)} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image src={industry.heroImage} alt={industry.heroImageAlt} fill preload sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/80 to-[#030304]/40" />
          </div>
          <Container className="relative py-20 sm:py-24">
            <div className="max-w-2xl">
              <Eyebrow>{industry.eyebrow}</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                {industry.heading}
              </Heading>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/business-growth-audit" variant="primary">
                  Get Your Growth Assessment →
                </Button>
                <Button href={BOOKING_URL} variant="secondary">
                  Book a Consultation →
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Industry Challenge */}
        <Section tone="surface" spacing="compact">
          <div className="max-w-3xl">
            <Eyebrow>THE INDUSTRY CHALLENGE</Eyebrow>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{industry.challenge}</p>
          </div>
        </Section>

        {/* Growth Opportunities */}
        <Section border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>GROWTH OPPORTUNITIES</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Where {industry.name.toLowerCase()} businesses leave growth on the table.
            </Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.opportunities.map((item) => (
              <Card key={item} variant="outline" className="p-5">
                <p className="text-base leading-7 text-[var(--text-secondary)]">{item}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* NairobiX Approach */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <Eyebrow>THE NAIROBIX APPROACH</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                How we build this.
              </Heading>
            </div>
            <p className="text-lg leading-8 text-[var(--text-secondary)]">{industry.approach}</p>
          </div>
        </Section>

        {/* Relevant Solutions */}
        <Section border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>RELEVANT SOLUTIONS</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              The systems behind this approach.
            </Heading>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {relevantSolutions.map((solution) => (
              <a
                key={solution.id}
                href={`/solutions/${solution.id}`}
                className="group block rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02] p-6 transition hover:border-[var(--color-primary)]/40"
              >
                <Heading variant="heading-md" as="h3">
                  {solution.title}
                </Heading>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{solution.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </Section>

        {/* Technology + Outcomes */}
        <Section tone="surface" border="top" spacing="compact">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>TECHNOLOGY</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                Built with the tools that fit.
              </Heading>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {industry.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>EXPECTED OUTCOMES</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                What changes for the business.
              </Heading>
              <ul className="mt-6 space-y-3">
                {industry.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-sm leading-6 text-[var(--text-secondary)]">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Selected Work */}
        {caseStudy ? (
          <Section border="top" spacing="compact">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <ImageFrame src={caseStudy.image} alt={caseStudy.imageAlt} aspect="wide" />
              <div>
                <Eyebrow>SELECTED WORK</Eyebrow>
                <Heading variant="heading-lg" as="h2" className="mt-4">
                  {caseStudy.title}
                </Heading>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{caseStudy.description}</p>
                <Button href={`/case-studies/${caseStudy.slug}`} variant="secondary" className="mt-6">
                  View Scenario →
                </Button>
              </div>
            </div>
          </Section>
        ) : null}

        {/* FAQ */}
        <Section tone="surface" border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Questions {industry.name.toLowerCase()} businesses ask
            </Heading>
          </div>
          <Faq items={industry.faqs} />
        </Section>

        {/* CTA */}
        <CTASection
          title={`Ready to build this into your ${industry.name.toLowerCase()} business?`}
          description="The Growth Assessment identifies which systems matter most for your specific business right now."
        >
          <Button href="/business-growth-audit" variant="primary">
            Get Your Growth Assessment →
          </Button>
          <Button href={BOOKING_URL} variant="secondary">
            Book a Consultation →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
