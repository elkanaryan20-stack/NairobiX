import type { Metadata } from "next";
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
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { ALL_SOLUTIONS, BOOKING_URL, CASE_STUDIES } from "@/lib/site-data";
import { SystemTransformation } from "@/components/solutions/SystemTransformation";
import { ProcessTimeline } from "@/components/solutions/ProcessTimeline";
import { TechnologyEcosystem } from "@/components/solutions/TechnologyEcosystem";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import { OutcomeMetrics } from "@/components/solutions/OutcomeMetrics";
import { SectionRail } from "@/components/solutions/SectionRail";

export function generateStaticParams() {
  return ALL_SOLUTIONS.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = ALL_SOLUTIONS.find((item) => item.id === slug);

  if (!solution) {
    return pageMetadata({
      title: "Solution",
      description: "A NairobiX business growth solution.",
      path: `/solutions/${slug}`,
    });
  }

  return pageMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solutions/${solution.id}`,
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = ALL_SOLUTIONS.find((item) => item.id === slug);

  if (!solution) {
    notFound();
  }

  const relatedCaseStudy = CASE_STUDIES.find((study) => study.slug === solution.relatedCaseStudySlug);

  const railSections = [
    { id: "challenge", label: "Challenge" },
    { id: "what-we-build", label: "What We Build" },
    { id: "process", label: "Process" },
    { id: "technology", label: "Technology" },
    { id: "outcomes", label: "Outcomes" },
    ...(relatedCaseStudy ? [{ id: "scenario", label: "Scenario" }] : []),
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: solution.title, description: solution.description, path: `/solutions/${solution.id}` })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${solution.id}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: solution.title,
          description: solution.description,
          url: `${SITE_URL}/solutions/${solution.id}`,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          areaServed: "Kenya",
        }}
      />
      <JsonLd data={faqPageJsonLd(solution.faqs)} />
      <SiteHeader />
      <SectionRail sections={railSections} />
      <main className="bg-[#0b0b0d] text-white">
        {/* Hero */}
        <section className="border-b border-white/10">
          <Container className="py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Eyebrow>{solution.eyebrow}</Eyebrow>
                <Heading as="h1" variant="display-lg" className="mt-4">
                  {solution.heading}
                </Heading>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                  {solution.description}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="/business-growth-audit" variant="primary">
                    Get Your Growth Assessment →
                  </Button>
                  <Button href={BOOKING_URL} variant="secondary">
                    Book a Consultation →
                  </Button>
                </div>
              </div>
              <ImageFrame src={solution.image} alt={solution.imageAlt} aspect="wide" preload sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Container>
        </section>

        {/* Overview / Business Challenge -> the system transformation */}
        <Section id="challenge" tone="surface" border="top" spacing="compact">
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <Eyebrow>THE BUSINESS CHALLENGE</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                {solution.problem}
              </Heading>
            </div>
            <p className="text-lg leading-8 text-[var(--text-secondary)]">{solution.businessChallenge}</p>
          </div>
          <div className="mt-10">
            <SystemTransformation problemSteps={solution.problemFlow} systemNodes={solution.systemFlow} />
          </div>
        </Section>

        {/* What We Build */}
        <Section id="what-we-build" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHAT WE BUILD</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              The system behind {solution.title.toLowerCase()}.
            </Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {solution.whatWeBuild.map((item) => (
              <Card key={item} variant="outline" className="p-5">
                <p className="text-base leading-7 text-[var(--text-secondary)]">{item}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section id="process" tone="surface" border="top" spacing="compact">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>OUR PROCESS</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Discover, design, implement, integrate, optimize.
            </Heading>
          </div>
          <ProcessTimeline stages={solution.process} />
        </Section>

        {/* Technology ecosystem + Portal preview — how the client experiences it */}
        <Section id="technology" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>TECHNOLOGY</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Real tools, used for a real purpose.
            </Heading>
          </div>
          <TechnologyEcosystem technology={solution.technology} />

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Eyebrow>HOW YOU&apos;LL SEE IT</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                Inside the NairobiX workspace.
              </Heading>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                Once this system is live, you see it here — not scattered across emails, ad
                dashboards and someone&apos;s inbox.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <Eyebrow>TYPICAL TIMELINE</Eyebrow>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{solution.timeline}</p>
              </div>
            </div>
            <PortalPreview preview={solution.portalPreview} />
          </div>
        </Section>

        {/* Expected Outcomes */}
        <Section id="outcomes" tone="surface" border="top" spacing="compact">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>EXPECTED OUTCOMES</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              What a working system changes.
            </Heading>
          </div>
          <OutcomeMetrics metrics={solution.outcomeMetrics} outcomes={solution.outcomes} />
        </Section>

        {/* Related Scenario */}
        {relatedCaseStudy ? (
          <Section id="scenario" border="top" spacing="compact">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <ImageFrame src={relatedCaseStudy.image} alt={relatedCaseStudy.imageAlt} aspect="wide" />
              <div>
                <Eyebrow>RELATED · {relatedCaseStudy.label.toUpperCase()} SCENARIO</Eyebrow>
                <Heading variant="heading-lg" as="h2" className="mt-4">
                  {relatedCaseStudy.title}
                </Heading>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{relatedCaseStudy.description}</p>
                <Button href={`/case-studies/${relatedCaseStudy.slug}`} variant="secondary" className="mt-6">
                  View Scenario →
                </Button>
              </div>
            </div>
          </Section>
        ) : null}

        {/* FAQ */}
        <Section id="faq" border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Questions about {solution.title.toLowerCase()}
            </Heading>
          </div>
          <Faq items={solution.faqs} />
        </Section>

        {/* CTA */}
        <CTASection
          title="Ready to build this into your business?"
          description="The Growth Assessment is the fastest way to find out where this solution fits into your priorities."
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
