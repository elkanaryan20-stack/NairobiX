import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/ui/CTASection";
import { Button } from "@/components/ui/Button";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { BOOKING_URL, BUSINESSES_WE_SERVE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | NairobiX",
  description: "Learn how NairobiX helps businesses grow through connected strategy, systems, technology, and execution.",
};

const PILLARS = [
  {
    title: "Strategy",
    text: "We identify the opportunities, bottlenecks and systems that matter most before investing more budget or effort.",
  },
  {
    title: "Technology",
    text: "We implement the digital tools, platforms and workflows that make businesses faster, clearer and easier to scale.",
  },
  {
    title: "Execution",
    text: "We turn the strategy into practical delivery, helping teams build systems that work in real business conditions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/photography/nairobi-skyline.webp"
              alt="The Nairobi city skyline under a bright midday sky."
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/80 to-[#030304]/40" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>

          <Container className="relative py-20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Eyebrow>NAIROBIX · ABOUT</Eyebrow>
                <Heading as="h1" variant="display-lg" className="mt-4">
                  A long-term growth partner for ambitious businesses.
                </Heading>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                  NairobiX helps businesses grow through connected systems, not disconnected
                  tactics. The work sits at the intersection of strategy, technology, automation
                  and execution, so growth feels structured, measurable and sustainable rather
                  than dependent on any one campaign.
                </p>
              </div>

              <Card variant="outline" className="p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  What we believe
                </p>
                <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
                  Growth is not a single campaign or one-off tactic. It is a connected system that
                  links acquisition, sales, automation, digital experiences and business intelligence.
                </p>
              </Card>
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((item, index) => (
              <Card key={item.title} variant="outline" className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  0{index + 1}
                </p>
                <Heading as="h2" variant="heading-md" className="mt-4">
                  {item.title}
                </Heading>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{item.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="surface" border="top">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHO WE WORK WITH</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Built for businesses facing a familiar set of growth problems.
            </Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESSES_WE_SERVE.map((item) => (
              <Card key={item.type} variant="outline" className="p-5">
                <p className="text-sm font-semibold text-white">{item.type}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.problem}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--text-tertiary)]">
            And other growth-focused businesses across sectors, wherever a connected system would
            make the biggest difference.
          </p>
        </Section>

        <CTASection
          tone="surface"
          eyebrow="WHY CONNECTED GROWTH"
          title="When marketing, sales and operations are disconnected, growth slows down."
          description="NairobiX helps businesses connect the parts that drive growth so teams can make smarter decisions, improve customer experiences and build a clearer path to scale."
        >
          <Button href="/business-growth-audit" variant="primary">
            Get Your Free Business Growth Assessment →
          </Button>
          <Button href={BOOKING_URL} external variant="secondary">
            Book a Consultation →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
