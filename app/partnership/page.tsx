import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { PARTNER_PORTAL_NOTE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Partnership | NairobiX",
  description: "Partner with NairobiX to deliver growth systems, digital transformation, and strategic solutions to more businesses.",
};

const BENEFITS = [
  { title: "Refer", text: "Introduce businesses that could benefit from a stronger growth system." },
  { title: "Collaborate", text: "Work with NairobiX on strategy, implementation and customer journeys." },
  { title: "Earn", text: "Create additional value through trusted referrals and partnership opportunities." },
  { title: "Grow", text: "Expand your reach with a growth partner network behind you." },
];

const WHO_ITS_FOR = [
  "Business consultants helping clients improve growth and operations.",
  "Marketing agencies that need a strategic delivery partner.",
  "Business centres and service providers with a strong client network.",
];

const APPLICATION_STEPS = [
  { number: "01", title: "Apply", text: "Tell us about your business, network and partnership interests." },
  { number: "02", title: "Review", text: "NairobiX reviews the application and evaluates partnership fit." },
  { number: "03", title: "Connect", text: "Qualified partners are contacted for a conversation." },
  { number: "04", title: "Activate", text: "Approved partners receive the information and support required to begin working with NairobiX." },
];

export default function PartnershipPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/photography/systems-pattern.webp"
              alt="Geometric shadows from architectural pillars forming a repeating pattern."
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/85 to-[#030304]/50" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>
          <Container className="relative py-20">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX · PARTNERSHIP</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                Grow With NairobiX
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Partner with NairobiX to bring connected growth systems and digital transformation
                to more businesses.
              </p>
              <div className="mt-8">
                <Button href="/partner" variant="primary">
                  Become a NairobiX Partner →
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHY PARTNER WITH NAIROBIX</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              A partnership built for long-term growth.
            </Heading>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {BENEFITS.map((step, index) => (
              <Card key={step.title} variant="outline" className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  0{index + 1}
                </p>
                <Heading as="h3" variant="heading-md" className="mt-4">
                  {step.title}
                </Heading>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{step.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="surface" border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>WHO IT IS FOR</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Built for trusted business professionals and growth-focused organisations.
            </Heading>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHO_ITS_FOR.map((item) => (
              <Card key={item} variant="outline" className="p-6 text-base leading-7 text-[var(--text-secondary)]">
                {item}
              </Card>
            ))}
          </div>
        </Section>

        <Section border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>APPLICATION PROCESS</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              A simple and thoughtful partnership flow.
            </Heading>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {APPLICATION_STEPS.map((step) => (
              <Card key={step.number} variant="outline" className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  {step.number} — {step.title}
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{step.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-[var(--text-tertiary)]">{PARTNER_PORTAL_NOTE}</p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
