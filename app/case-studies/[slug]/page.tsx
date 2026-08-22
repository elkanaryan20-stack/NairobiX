import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = CASE_STUDIES.find((item) => item.slug === slug);
    if (!study) {
      return {
        title: "Case Study | NairobiX",
        description: "Concept growth system case study by NairobiX.",
      };
    }

    return {
      title: `${study.title} | NairobiX`,
      description: study.description,
    };
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const sections = [
    { title: "Industry", body: study.label },
    { title: "Business challenge", body: "A business trying to turn inconsistent demand into a more reliable growth engine." },
    { title: "Growth opportunity", body: "Create a more connected system across acquisition, qualification, conversion and retention." },
    { title: "Connected growth system", body: "Marketing, CRM, sales workflows, automation and digital experience are designed to work as one operating system." },
    { title: "How the system works", body: "The business attracts the right audience, captures strong demand, follows up consistently and improves visibility across the customer journey." },
    { title: "Customer journey", body: "Prospect → enquiry → qualification → follow-up → conversion → retention and referral." },
    { title: "Technology / implementation", body: "A blended stack of CRM, automation, landing pages, analytics and digital workflows aligned to business process." },
    { title: "Expected outcomes", body: "Better lead quality, more consistent sales follow-up, improved customer experience and a stronger growth foundation." },
  ];

  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">{study.label}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{study.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">How a connected growth system could transform {study.label.toLowerCase()} operations and customer experience.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02]">
            <div
              className="h-80 w-full bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(11,11,13,0.15), rgba(11,11,13,0.8)), url('${study.image}')` }}
            />
            <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
              {sections.map((section) => (
                <div key={section.title} className="rounded-[24px] border border-white/10 bg-[#121417] p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{section.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-200">{section.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">NEXT STEP</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Build a Similar Growth System</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              If this challenge sounds familiar, we can map the right growth system for your business and identify the most valuable opportunities to act on.
            </p>
            <Link href="/request-solution" className="mt-6 inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ea6a16]">
              Request Solution →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
