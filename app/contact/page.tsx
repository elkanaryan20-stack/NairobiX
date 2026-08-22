import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { FAQS } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OpenChatButton } from "@/components/open-chat-button";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact | NairobiX",
  description: "Start a conversation with NairobiX about a business growth assessment, consultation, or tailored growth system.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section
          className="border-b border-white/10"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(11,11,13,0.82), rgba(11,11,13,0.68)), url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">NAIROBIX · CONTACT</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let&apos;s build your next growth system.
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">01</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Get Your Free Growth Assessment</h2>
                <p className="mt-3 text-base leading-7 text-slate-300">For businesses looking to identify opportunities.</p>
                <Link href="/business-growth-audit" className="mt-6 inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[#ea6a16]">
                  Get Growth Assessment →
                </Link>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">02</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Request a Solution</h2>
                <p className="mt-3 text-base leading-7 text-slate-300">For businesses ready to discuss a specific challenge or project.</p>
                <Link href="/request-solution" className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                  Request a Solution →
                </Link>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">03</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Talk to Nia</h2>
                <p className="mt-3 text-base leading-7 text-slate-300">For visitors who aren&apos;t sure where to start.</p>
                <OpenChatButton className="mt-6 inline-flex items-center rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary)]/20">
                  Talk to Nia →
                </OpenChatButton>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">NIA · GROWTH ASSISTANT</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Not sure where to start?</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">Nia is the NairobiX Growth Assistant, here to help you explore our solutions and find the right next step for your business.</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
              <p className="text-base leading-8 text-slate-200">
                Nia can help visitors understand NairobiX, explore solutions, understand their options, start the Growth Assessment and find the right next step.
              </p>
              <OpenChatButton className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                Talk to Nia →
              </OpenChatButton>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Common questions</h2>
          </div>
          <Faq items={FAQS} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
