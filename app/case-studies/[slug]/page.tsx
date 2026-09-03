import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
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

  const sections = [
    { title: "Industry", body: study.label },
    { title: "Business challenge", body: "A business trying to turn inconsistent demand into a more reliable growth engine." },
    { title: "Growth opportunity", body: "Create a more connected system across acquisition, qualification, conversion and retention." },
    { title: "Connected growth system", body: "Marketing, CRM, sales workflows, automation and digital experience are designed to work as one operating system." },
    { title: "How the system works", body: "The business attracts the right audience, captures strong demand, follows up consistently and improves visibility across the customer journey." },
    { title: "Customer journey", body: "Prospect → enquiry → qualification → follow-up → conversion → retention and referral." },
    { title: "Technology / implementation", body: "A blended stack of CRM, automation, landing pages, analytics and digital workflows aligned to business process." },
    { title: "Expected outcomes", body: "Better lead quality, more consistent sales follow-up, improved customer experience and a stronger growth foundation." },
  ];

  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20">
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

        <Section>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02]">
            <ImageFrame src={study.image} alt={study.imageAlt} aspect="wide" />
            <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
              {sections.map((section) => (
                <Card key={section.title} variant="surface" className="p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{section.body}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <Eyebrow>NEXT STEP</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Build a Similar Growth System
            </Heading>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              If this challenge sounds familiar, we can map the right growth system for your
              business and identify the most valuable opportunities to act on.
            </p>
            <Button href="/request-solution" variant="primary" className="mt-6">
              Request Solution →
            </Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
