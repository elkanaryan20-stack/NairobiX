import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HOME_SOLUTIONS, CASE_STUDIES, FAQS } from "@/lib/site-data";
import { Faq } from "@/components/faq";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.25),transparent_35%),linear-gradient(120deg,rgba(11,11,13,0.95),rgba(11,11,13,0.7))]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <div className="max-w-2xl self-center">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                NAIROBIX · GROWTH SYSTEMS
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                Build Growth Systems That Elevate Your Business
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                NairobiX helps ambitious businesses attract customers, improve sales, automate operations and build the systems required for sustainable growth.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/business-growth-audit" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ea6a16]">
                  Get Your Free Business Growth Assessment →
                </Link>
                <Link href="/solutions" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10">
                  Explore Solutions →
                </Link>
              </div>
            </div>

            <div className="self-end rounded-[28px] border border-white/10 bg-[#111214]/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Why businesses choose NairobiX</p>
              <div className="mt-6 space-y-5">
                {[
                  "Connected systems instead of disconnected tactics",
                  "Growth strategy grounded in business reality",
                  "Practical implementation across sales, tech and automation",
                  "A partner focused on sustainable business performance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-slate-200">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-base leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">THE NAIROBIX APPROACH</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">One growth system. Built around your business.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              Marketing, sales, technology, automation and strategy should work together rather than live as disconnected services. NairobiX brings those systems into one practical growth engine.
            </p>
          </div>

          <div className="grid gap-4 pb-10 md:grid-cols-4">
            {[
              {
                step: "Understand",
                description: "We identify where your business is today, what's limiting growth and where the strongest opportunities exist.",
              },
              {
                step: "Build",
                description: "We design and implement the systems, digital assets and strategies your business needs to move forward.",
              },
              {
                step: "Connect",
                description: "We connect marketing, sales, customer experience and operations so the business works as one connected growth system.",
              },
              {
                step: "Optimize",
                description: "We measure performance, identify improvements and continuously refine the system for stronger efficiency and growth.",
              },
            ].map((item, index) => (
              <div key={item.step} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">0{index + 1}</div>
                <p className="text-2xl font-semibold text-white">{item.step}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">SOLUTIONS</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Three ways we help businesses grow.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {HOME_SOLUTIONS.map((solution) => (
                <Link key={solution.title} href={solution.href} className="group relative block overflow-hidden rounded-[28px] border border-white/10 text-left min-h-[430px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(11,11,13,0.2), rgba(11,11,13,0.82)), url('${solution.image}')`,
                    }}
                  />
                  <div className="relative flex h-full min-h-[430px] flex-col justify-end p-6 sm:p-8">
                    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{solution.number}</div>
                    <h3 className="text-3xl font-semibold text-white">{solution.title}</h3>
                    <p className="mt-3 max-w-xs text-base leading-7 text-slate-200">{solution.description}</p>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-white">{solution.cta}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">CASE STUDIES</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Selected case studies</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
                <div
                  className="h-64 w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(11,11,13,0.1), rgba(11,11,13,0.75)), url('${study.image}')` }}
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{study.label}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{study.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">{study.description}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary)]">View Case Study →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">GROWTH ASSESSMENT</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Find the opportunities your business is leaving on the table.</h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  Get a free Business Growth Assessment designed to identify gaps, opportunities and practical areas for improvement across your business.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/business-growth-audit" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#ea6a16]">
                    Get Your Free Business Growth Assessment →
                  </Link>
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-300">
                  Qualified businesses may also be considered for the NairobiX Growth Trial.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
                <div className="space-y-5">
                  {[
                    { title: "Identify", text: "Growth opportunities and bottlenecks." },
                    { title: "Prioritize", text: "The systems that matter most." },
                    { title: "Plan", text: "Practical next steps." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#121417] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">{item.title}</p>
                      <p className="mt-3 text-base leading-7 text-slate-200">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 sm:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">PARTNERSHIP</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Grow With NairobiX</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                  Partner with NairobiX to bring intelligent growth systems and digital transformation solutions to more businesses.
                </p>
              </div>
              <Link href="/partnership" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                Explore Partnership Program →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#111214]">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to build a stronger growth system?</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/business-growth-audit" className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#ea6a16]">
                Get Your Free Business Growth Assessment →
              </Link>
              <Link href="https://nairobix.zohobookings.com/4940054000000039045" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10">
                Book a Consultation →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Questions businesses often ask</h2>
          </div>
          <Faq items={FAQS.slice(0, 5)} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
