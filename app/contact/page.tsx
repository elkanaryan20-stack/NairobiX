import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { BOOKING_URL, CONTACT_EMAIL, FAQS } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OpenChatButton } from "@/components/open-chat-button";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Contact: Start a Conversation";
const DESCRIPTION =
  "Start a conversation with NairobiX: take the Business Growth Assessment, book a consultation, or send a general enquiry.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";

// Conversion hierarchy: Assessment (primary) → Consultation → general enquiry.
const PATHS = [
  {
    number: "01",
    kind: "Recommended first step",
    title: "Business Growth Assessment",
    forWho: "For businesses that want to understand where growth is getting stuck.",
    what: "A structured set of questions about how your business acquires, converts and operates, reviewed by the team to identify what to address first.",
    cta: "Start the Assessment",
    href: "/business-growth-audit",
    primary: true,
  },
  {
    number: "02",
    kind: "Direct conversation",
    title: "Business Growth Consultation",
    forWho: "For businesses ready to discuss a specific challenge or opportunity.",
    what: "Choose a time for a focused conversation with the team about what you're working on.",
    cta: "Book a Consultation",
    href: BOOKING_URL,
    primary: false,
  },
  {
    number: "03",
    kind: "Other",
    title: "General enquiry",
    forWho: "For partnerships, questions or anything else.",
    what: "A short message to the team, routed to the right person.",
    cta: "Send a message",
    href: "#enquiry",
    primary: false,
  },
];

// What happens after a general enquiry — no response time is promised.
const NEXT_STEPS = [
  "We receive your message and its context.",
  "NairobiX reviews the enquiry.",
  "We identify the appropriate next step.",
  "You move to the relevant assessment, consultation or conversation.",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/contact" })} />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* 01 — Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 [--section-bg:#070707]">
          <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-16 lg:py-24">
            <div>
              <Eyebrow>NAIROBIX · CONTACT</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-5 max-w-2xl">
                Tell us what you&apos;re trying to build.
              </Heading>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                Whether growth is slowing, systems are becoming difficult to manage, or you know something needs to
                change but are not sure where to start, give us the context. We&apos;ll help identify the appropriate
                next step.
              </p>
              <dl className="mt-12 grid max-w-xl gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div>
                  <dt className={`${LABEL} text-white/45`}>Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-base font-medium text-white hover:text-[var(--color-primary)]">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={`${LABEL} text-white/45`}>Based in</dt>
                  <dd className="mt-2 text-base font-medium text-white">Nairobi, Kenya</dd>
                </div>
              </dl>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src="/images/photography/pexels-cottonbro-8453801.jpg"
                alt="A quiet, light-filled office with desks and monitors behind a glass wall."
                fill
                preload
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover grayscale-[30%]"
              />
              <div className="absolute inset-0 bg-[#070707]/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
            </div>
          </Container>
        </section>

        {/* 02 — Three ways to start */}
        <Section tone="core" spacing="lead">
          <div className="max-w-2xl">
            <Eyebrow>WAYS TO START</Eyebrow>
            <Heading variant="display-md" className="mt-4">
              Choose the conversation that fits where you are.
            </Heading>
          </div>
          <ol className="mt-10 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {PATHS.map((path) => (
              <li key={path.number} className="relative flex flex-col border-b border-white/10 py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
                {path.primary ? (
                  <span aria-hidden="true" className="absolute -top-px left-0 h-[2px] w-24 bg-[var(--color-primary)] md:w-[calc(100%-2rem)]" />
                ) : null}
                <p className={`${LABEL} ${path.primary ? "text-[var(--color-primary)]" : "text-white/45"}`}>
                  Path {path.number} · {path.kind}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white">{path.title}</h3>
                <p className="mt-2.5 text-base leading-7 text-white/80">{path.forWho}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{path.what}</p>
                <div className="mt-auto pt-6">
                  <Link
                    href={path.href}
                    className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition ${
                      path.primary
                        ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-strong)]"
                        : "border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]"
                    }`}
                  >
                    {path.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                      {path.href.startsWith("#") ? "↓" : "→"}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 03 — General enquiry: what happens next, beside the form */}
        <Section tone="graphite" id="enquiry" className="scroll-mt-[72px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>START A CONVERSATION</Eyebrow>
              <Heading variant="display-md" className="mt-4">
                Send us a message.
              </Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                A few details and a little context are enough. If your question is really about growth, the
                Assessment will give the team much more to work with.
              </p>
              <div className="mt-10">
                <p className={`${LABEL} text-white/50`}>What happens next</p>
                <ol className="mt-5 space-y-5">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3">
                      <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px] leading-6 text-white/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <dl className="mt-10 grid gap-5 border-t border-white/10 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className={`${LABEL} text-white/45`}>Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-white hover:text-[var(--color-primary)]">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={`${LABEL} text-white/45`}>Based in</dt>
                  <dd className="mt-2 font-medium text-white">Nairobi, Kenya</dd>
                </div>
                <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <dt className={`${LABEL} text-white/45`}>Prefer to talk first?</dt>
                  <dd className="mt-2">
                    <OpenChatButton className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[var(--color-primary)]">
                      Talk to Nia <span aria-hidden="true">→</span>
                    </OpenChatButton>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border border-white/10 bg-[#0c0d0e] p-6 sm:p-8 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </Section>

        {/* 04 — Before you reach out: context beside the questions */}
        <Section tone="core" border="top">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>BEFORE YOU REACH OUT</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                Common questions
              </Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                You may already have a specific requirement, or you may simply know that something in the business
                needs to work better. These are some of the questions we hear most often.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-white/60">Still unsure where to start?</p>
                <Link
                  href="/business-growth-audit"
                  className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-white"
                >
                  Start the Business Growth Assessment
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <Faq items={FAQS} single />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
