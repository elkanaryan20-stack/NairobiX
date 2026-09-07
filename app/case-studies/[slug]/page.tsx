import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = CASE_STUDIES.find((item) => item.slug === slug);
    if (!study) {
      return {
        title: "Case Study | NairobiX",
        description: "Illustrative growth system scenario by NairobiX.",
      };
    }

    return {
      title: `${study.title} | NairobiX`,
      description: study.description,
    };
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const narrative = [
    {
      stage: "Context",
      number: "01",
      body: `A ${study.label.toLowerCase()} business trying to turn inconsistent demand into a more reliable growth engine — the starting point for this illustrative scenario.`,
    },
    {
      stage: "Challenge",
      number: "02",
      body: "Growth opportunity: create a more connected system across acquisition, qualification, conversion and retention, instead of treating each stage as a separate problem.",
    },
    {
      stage: "Strategy",
      number: "03",
      body: "Marketing, CRM, sales workflows, automation and digital experience are designed to work as one operating system — a blended stack of CRM, automation, landing pages, analytics and digital workflows aligned to business process.",
    },
    {
      stage: "Execution",
      number: "04",
      body: "The business attracts the right audience, captures strong demand, follows up consistently and improves visibility across the customer journey: prospect → enquiry → qualification → follow-up → conversion → retention and referral.",
    },
    {
      stage: "Outcome",
      number: "05",
      body: "Illustrative expected outcomes: better lead quality, more consistent sales follow-up, improved customer experience and a stronger growth foundation.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20 sm:py-24">
            <div className="max-w-3xl">
              <Eyebrow>{study.label} · Illustrative Scenario</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                {study.title}
              </Heading>
              <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                An illustrative look at how a connected growth system could transform{" "}
                {study.label.toLowerCase()} operations and customer experience — not documented
                results from a named client.
              </p>
            </div>
          </Container>
        </section>

        <Section spacing="compact">
          <ImageFrame src={study.image} alt={study.imageAlt} aspect="wide" preload />
        </Section>

        <Section border="top" spacing="compact">
          <div className="divide-y divide-white/10">
            {narrative.map((item) => (
              <div key={item.stage} className="grid gap-4 py-12 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10">
                <div className="flex items-baseline gap-3 sm:block">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {item.number}
                  </span>
                  <Heading variant="heading-lg" as="h2">
                    {item.stage}
                  </Heading>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section border="top" tone="surface">
          <div className="max-w-2xl">
            <Eyebrow>NEXT STEP</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Build a Similar Growth System
            </Heading>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              If this challenge sounds familiar, we can map the right growth system for your
              business and identify the most valuable opportunities to act on.
            </p>
            <Button href="/request-solution" variant="primary" className="mt-8">
              Request Solution →
            </Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
