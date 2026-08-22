import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTION_CATEGORIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Solutions | NairobiX",
  description: "Discover NairobiX growth systems for digital marketing, CRM, automation, AI, and web solutions.",
};

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section
          className="border-b border-white/10"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(11,11,13,0.86), rgba(11,11,13,0.68)), url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                NAIROBIX · SOLUTIONS
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Solutions built around how your business grows.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                NairobiX connects strategy, technology, acquisition, sales and automation into practical growth systems that help businesses move with more clarity.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
          {SOLUTION_CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                    {category.title}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{category.title}</h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-slate-300">{category.intro}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {category.items.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <div
                      className="h-56 w-full bg-cover bg-center"
                      style={{ backgroundImage: `linear-gradient(135deg, rgba(11,11,13,0.72), rgba(11,11,13,0.35)), url('${item.image}')` }}
                    />
                    <div className="p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.eyebrow}</p>
                      <h3 className="mt-4 text-2xl font-semibold text-white">{item.heading}</h3>
                      <p className="mt-4 text-base leading-7 text-slate-300">{item.description}</p>

                      <div className="mt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ideal for businesses that want to...</p>
                        <ul className="space-y-2 text-sm text-slate-200">
                          {item.ideal.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={item.href}
                        className="mt-8 inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16]"
                      >
                        {item.cta}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
