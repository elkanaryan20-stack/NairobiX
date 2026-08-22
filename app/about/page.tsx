import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About | NairobiX",
  description: "Learn how NairobiX helps ambitious businesses grow through connected strategy, systems, technology, and execution.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section
          className="border-b border-white/10"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(11,11,13,0.84), rgba(11,11,13,0.66)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">NAIROBIX · ABOUT</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A long-term growth partner for ambitious businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                NairobiX helps businesses grow through connected systems, not disconnected tactics. We work at the intersection of strategy, technology, automation and execution so growth feels more structured, measurable and sustainable.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">What we believe</p>
              <p className="mt-5 text-base leading-8 text-slate-200">
                Growth is not a single campaign or one-off tactic. It is a connected system that links acquisition, sales, automation, digital experiences and business intelligence.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
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
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">0{(item.title === "Strategy" ? 1 : item.title === "Technology" ? 2 : 3)}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">WHY CONNECTED GROWTH</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">When marketing, sales and operations are disconnected, growth slows down.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              NairobiX helps businesses connect the parts that drive growth so teams can make smarter decisions, improve customer experiences and build a clearer path to scale.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/business-growth-audit" className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ea6a16]">
                Get Your Free Business Growth Assessment →
              </Link>
              <Link href="https://nairobix.zohobookings.com/4940054000000039045" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                Book a Consultation →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
