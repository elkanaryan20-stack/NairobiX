import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Partnership | NairobiX",
  description: "Partner with NairobiX to deliver growth systems, digital transformation, and strategic solutions to more businesses.",
};

const steps = [
  { title: "Refer", text: "Introduce businesses that could benefit from a stronger growth system." },
  { title: "Collaborate", text: "Work with NairobiX on strategy, implementation and customer journeys." },
  { title: "Earn", text: "Create additional value through trusted referrals and partnership opportunities." },
  { title: "Grow", text: "Expand your reach with a premium growth partner network behind you." },
];

export default function PartnershipPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section
          className="border-b border-white/10"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(11,11,13,0.82), rgba(11,11,13,0.68)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">NAIROBIX · PARTNERSHIP</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Grow With NairobiX</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Partner with NairobiX to bring intelligent growth systems and digital transformation solutions to more businesses.
              </p>
              <div className="mt-8">
                <Link href="/partner" className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ea6a16]">
                  Become a NairobiX Partner →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">WHY PARTNER WITH NAIROBIX</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">A partnership built for long-term growth.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  0{index + 1}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{step.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">WHO IT IS FOR</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Built for trusted business professionals and growth-focused organisations.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Business consultants helping clients improve growth and operations.",
                "Marketing agencies that need a strategic delivery partner.",
                "Business centres and service providers with a strong client network.",
              ].map((item) => (
                <div key={item} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 text-base leading-7 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">APPLICATION PROCESS</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">A simple and thoughtful partnership flow.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { number: "01", title: "Apply", text: "Tell us about your business, network and partnership interests." },
              { number: "02", title: "Review", text: "NairobiX reviews the application and evaluates partnership fit." },
              { number: "03", title: "Connect", text: "Qualified partners are contacted for a conversation." },
              { number: "04", title: "Activate", text: "Approved partners receive the information and support required to begin working with NairobiX." },
            ].map((step) => (
              <div key={step.number} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{step.number} — {step.title}</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
