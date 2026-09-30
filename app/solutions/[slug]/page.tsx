import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { ALL_SOLUTIONS, BOOKING_URL, CASE_STUDIES } from "@/lib/site-data";
import { SystemTransformation } from "@/components/solutions/SystemTransformation";
import { ProcessTimeline } from "@/components/solutions/ProcessTimeline";
import { TechnologyStack } from "@/components/solutions/TechnologyStack";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import { SectionRail } from "@/components/solutions/SectionRail";

export function generateStaticParams() {
  return ALL_SOLUTIONS.map((solution) => ({ slug: solution.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = ALL_SOLUTIONS.find((item) => item.id === slug);
  if (!solution) {
    return pageMetadata({ title: "Solution", description: "A NairobiX business growth solution.", path: `/solutions/${slug}` });
  }
  return pageMetadata({ title: solution.title, description: solution.description, path: `/solutions/${solution.id}` });
}

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = ALL_SOLUTIONS.find((item) => item.id === slug);
  if (!solution) notFound();

  const relatedCaseStudy = CASE_STUDIES.find((study) => study.slug === solution.relatedCaseStudySlug);
  const index = ALL_SOLUTIONS.findIndex((s) => s.id === solution.id);
  const next = ALL_SOLUTIONS[(index + 1) % ALL_SOLUTIONS.length];

  const railSections = [
    { id: "challenge", label: "Challenge" },
    { id: "what-we-build", label: "What we build" },
    { id: "process", label: "Process" },
    { id: "technology", label: "Technology" },
    { id: "outcomes", label: "Designed to improve" },
    ...(relatedCaseStudy ? [{ id: "scenario", label: "Concept case" }] : []),
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: solution.title, description: solution.description, path: `/solutions/${solution.id}` })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${solution.id}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: solution.title,
          description: solution.description,
          url: `${SITE_URL}/solutions/${solution.id}`,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          areaServed: "Kenya",
        }}
      />
      <JsonLd data={faqPageJsonLd(solution.faqs)} />
      <SiteHeader />
      <SectionRail sections={railSections} />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* Hero */}
        <section className="border-b border-white/10 [--section-bg:#070707]">
          <Container className="py-12 sm:py-16 lg:py-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/55">
                <li>
                  <Link href="/solutions" className="hover:text-white">Solutions</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/80">{solution.title}</li>
              </ol>
            </nav>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch lg:gap-14">
              <div>
                <p className={`${MONO} text-[var(--color-primary)]`}>
                  Solution {pad(index + 1)} · {solution.title}
                </p>
                <Heading as="h1" variant="display-lg" className="mt-4">
                  {solution.heading}
                </Heading>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">{solution.description}</p>
                <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-2 border-t border-white/10 pt-6 sm:grid-cols-2">
                  {solution.ideal.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/75">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 bg-[var(--color-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Button href="/business-growth-audit" variant="primary">
                    Start Your Growth Assessment →
                  </Button>
                  <Button href={BOOKING_URL} variant="secondary">
                    Book a Consultation →
                  </Button>
                </div>
              </div>
              <ImageFrame
                src={solution.image}
                alt={solution.imageAlt}
                aspect="wide"
                preload
                className="lg:h-full lg:min-h-[380px] lg:aspect-auto"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </Container>
        </section>

        {/* The business challenge → the system */}
        <Section id="challenge" tone="friction" className="scroll-mt-[72px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <Eyebrow>THE BUSINESS CHALLENGE</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                {solution.problem}
              </Heading>
            </div>
            <p className="text-lg leading-8 text-[var(--text-secondary)]">{solution.businessChallenge}</p>
          </div>
          <div className="mt-12">
            <SystemTransformation problemSteps={solution.problemFlow} systemNodes={solution.systemFlow} />
          </div>
        </Section>

        {/* What we build */}
        <Section id="what-we-build" tone="architecture" className="scroll-mt-[72px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <Eyebrow>WHAT WE BUILD</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                The parts of the system.
              </Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                Each part is built for how your business actually works — and connected to the rest.
              </p>
            </div>
            <ol className="border-t border-white/10">
              {solution.whatWeBuild.map((item, i) => (
                <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-white/10 py-5">
                  <span className="font-mono text-xs leading-7 text-[var(--color-primary)]">{pad(i + 1)}</span>
                  <span className="text-[17px] leading-7 text-white/85">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Process */}
        <Section id="process" tone="blueprint" className="scroll-mt-[72px]">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>HOW IT GETS BUILT</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              Discover, design, implement, integrate, optimize.
            </Heading>
          </div>
          <ProcessTimeline stages={solution.process} />
        </Section>

        {/* Technology + workspace */}
        <Section id="technology" tone="technical" className="scroll-mt-[72px]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Eyebrow>THE TECHNOLOGY LAYER</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                Real tools, chosen for the system.
              </Heading>
            </div>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Technology comes after the requirement. These are the tools typically involved, and the role each one plays.
            </p>
          </div>
          <TechnologyStack technology={solution.technology} />

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
            <div>
              <Eyebrow>HOW YOU&apos;LL SEE IT</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                Inside the NairobiX workspace.
              </Heading>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                Once the system is live, progress is visible in one place — not scattered across emails, ad dashboards and
                someone&apos;s inbox.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className={`${MONO} text-white/50`}>Typical timeline</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{solution.timeline}</p>
              </div>
            </div>
            <PortalPreview preview={solution.portalPreview} />
          </div>
        </Section>

        {/* Designed outcomes */}
        <Section id="outcomes" tone="core" className="scroll-mt-[72px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <Eyebrow>DESIGNED TO IMPROVE</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                What a working system changes.
              </Heading>
              <p className="mt-5 text-sm leading-6 text-white/50">
                The objectives the system is built around. Results depend on each business and are measured against a plan
                agreed at the start.
              </p>
            </div>
            <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
              {solution.outcomes.map((outcome, i) => (
                <li key={outcome} className="bg-[var(--section-bg)] p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-primary)]">{pad(i + 1)}</p>
                  <p className="mt-3 text-base leading-7 text-white/90">{outcome}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Related concept case */}
        {relatedCaseStudy ? (
          <Section id="scenario" tone="ink" className="scroll-mt-[72px]">
            <Link href={`/case-studies/${relatedCaseStudy.slug}`} className="group grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <ImageFrame src={relatedCaseStudy.image} alt={relatedCaseStudy.imageAlt} aspect="wide" sizes="(min-width: 1024px) 40vw, 100vw" />
              <div>
                <p className={`${MONO} flex flex-wrap gap-x-3`}>
                  <span className="text-[var(--color-primary)]">Concept case study</span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <span className="text-white/55">{relatedCaseStudy.label}</span>
                </p>
                <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                  {relatedCaseStudy.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{relatedCaseStudy.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  See the full system design
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          </Section>
        ) : null}

        {/* FAQ */}
        <Section id="faq" tone="graphite" className="scroll-mt-[72px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                Questions about {solution.title}
              </Heading>
              <Link href={`/solutions/${next.id}`} className="group mt-8 inline-flex flex-col border-t border-white/10 pt-5">
                <span className={`${MONO} text-white/45`}>Next solution</span>
                <span className="mt-1.5 inline-flex items-center gap-2 font-display text-lg text-white">
                  {next.title}
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
            <Faq items={solution.faqs} single />
          </div>
        </Section>

        {/* Next step */}
        <Section tone="focus" seam="signal">
          <div className="mx-auto max-w-2xl text-center">
            <Heading variant="display-md">See where {solution.title} fits in your business.</Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The Growth Assessment looks at your business as a whole, so this solution is recommended only where it
              belongs in your priorities.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/business-growth-audit" variant="primary">
                Start Your Growth Assessment →
              </Button>
              <Button href={BOOKING_URL} variant="secondary">
                Book a Consultation →
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
