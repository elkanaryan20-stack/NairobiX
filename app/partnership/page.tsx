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
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "NairobiX Opportunities Network";
const DESCRIPTION =
  "Join the NairobiX Opportunities Network to deliver growth systems, digital transformation, and strategic solutions to more businesses.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/partnership" });

const BENEFITS = [
  { title: "Generate Opportunities", text: "Introduce relevant business opportunities." },
  { title: "Provide Expertise", text: "Contribute specialized knowledge or expertise." },
  { title: "Provide Services", text: "Provide defined services or capabilities." },
  { title: "Collaborate on Projects", text: "Collaborate with NairobiX on approved projects." },
];

const WHO_ITS_FOR = [
  "Business consultants helping clients improve growth and operations.",
  "Marketing agencies that need a strategic delivery partner.",
  "Business centres and service providers with a strong client network.",
];

// The actual controlled admission lifecycle — not a guarantee of admission
// or commercial outcomes (see the disclaimer below the grid).
const APPLICATION_STEPS = [
  { number: "01", title: "Application", text: "Submit your Network application." },
  { number: "02", title: "Review", text: "NairobiX reviews the information provided." },
  { number: "03", title: "Qualification", text: "We assess potential contribution against current Network requirements." },
  { number: "04", title: "Portal Onboarding", text: "Qualified applicants are onboarded to the NairobiX Network Workspace." },
  { number: "05", title: "Verification & Review", text: "Onboarding details are verified before activation." },
  { number: "06", title: "Activation", text: "Activated Network members can begin engaging with NairobiX." },
];

export default function PartnershipPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/partnership" })} />
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
              <Eyebrow>NAIROBIX · OPPORTUNITIES NETWORK</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                NairobiX Opportunities Network
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                A selective network built around capability, relationships and opportunity.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                The NairobiX Opportunities Network connects qualified individuals and organizations with
                NairobiX across referrals, expertise, services and approved project collaboration. This is a
                managed business network, not an open marketplace.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/partner" variant="primary">
                  Apply to the Network →
                </Button>
                <Button href="#how-it-works" variant="secondary">
                  How It Works
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <div className="mb-10 max-w-2xl">
            <Eyebrow>WHY JOIN THE NETWORK</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              A network built for long-term growth.
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
          <p className="mt-8 max-w-2xl text-sm leading-6 text-[var(--text-tertiary)]">
            Applicants may select more than one contribution area.
          </p>
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

        <Section id="how-it-works" border="top">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>ADMISSION PROCESS</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              A controlled, thoughtful admission process.
            </Heading>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPLICATION_STEPS.map((step) => (
              <Card key={step.number} variant="outline" className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  {step.number} — {step.title}
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{step.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 max-w-2xl space-y-2 text-sm leading-6 text-[var(--text-tertiary)]">
            <p>Application does not guarantee admission.</p>
            <p>
              Network participation does not guarantee referrals, assignments, projects, clients, revenue or
              other commercial outcomes.
            </p>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--text-tertiary)]">{PARTNER_PORTAL_NOTE}</p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
