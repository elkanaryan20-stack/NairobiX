import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { FAQS } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OpenChatButton } from "@/components/open-chat-button";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | NairobiX",
  description: "Start a conversation with NairobiX about a business growth assessment, consultation, or tailored growth system.",
};

const START_OPTIONS = [
  {
    number: "01",
    title: "Get Your Free Growth Assessment",
    text: "For businesses looking to identify opportunities before committing to anything.",
    cta: "Get Growth Assessment →",
    href: "/business-growth-audit",
    variant: "primary" as const,
  },
  {
    number: "02",
    title: "Request a Solution",
    text: "For businesses ready to discuss a specific challenge or project.",
    cta: "Request a Solution →",
    href: "/request-solution",
    variant: "secondary" as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <Section spacing="compact">
          <div className="max-w-2xl">
            <Eyebrow>NAIROBIX · CONTACT</Eyebrow>
            <Heading as="p" variant="heading-lg" className="mt-4">
              A few ways to reach NairobiX.
            </Heading>
            <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
              Pick the path that matches where you are, or use the general message form below.
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              For general business inquiries, you can also reach us directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-white hover:text-[var(--color-primary)]"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {START_OPTIONS.map((option) => (
              <Card key={option.title} variant="outline" className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  {option.number}
                </p>
                <Heading as="p" variant="heading-md" className="mt-4">
                  {option.title}
                </Heading>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{option.text}</p>
                <Button href={option.href} variant={option.variant} size="md" className="mt-6">
                  {option.cta}
                </Button>
              </Card>
            ))}

            <Card variant="outline" className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">03</p>
              <Heading as="p" variant="heading-md" className="mt-4">
                Talk to Nia
              </Heading>
              <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                For visitors who aren&apos;t sure where to start.
              </p>
              <OpenChatButton className="mt-6 inline-flex items-center rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary)]/20">
                Talk to Nia →
              </OpenChatButton>
            </Card>
          </div>
        </Section>

        <ContactForm />

        <Section tone="surface" border="top">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>NIA · GROWTH ASSISTANT</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                Not sure where to start?
              </Heading>
              <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
                Nia is the NairobiX Growth Assistant, here to help you explore solutions and find
                the right next step for your business.
              </p>
            </div>
            <Card variant="outline" className="p-6">
              <p className="text-base leading-8 text-[var(--text-secondary)]">
                Nia can help visitors understand NairobiX, explore solutions, understand their
                options, start the Growth Assessment and find the right next step.
              </p>
              <OpenChatButton className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                Talk to Nia →
              </OpenChatButton>
            </Card>
          </div>
        </Section>

        <Section border="top">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading as="h2" variant="display-md" className="mt-4">
              Common questions
            </Heading>
          </div>
          <Faq items={FAQS} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
