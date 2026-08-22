import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Case Studies | NairobiX",
  description: "Explore conceptual growth system case studies across industries, designed around real business challenges.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                NAIROBIX · CASE STUDIES
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Growth systems designed around real business challenges.
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <article key={study.slug} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
                <div
                  className="h-72 w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(11,11,13,0.18), rgba(11,11,13,0.70)), url('${study.image}')` }}
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{study.label}</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{study.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-300">{study.description}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Concept Case Study</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition hover:text-[#ff8b40]"
                  >
                    View Case Study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
