import type { Metadata } from "next";
import Image from "next/image";
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
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { ALL_SOLUTIONS, BOOKING_URL, CASE_STUDIES, INDUSTRIES } from "@/lib/site-data";
import { TechnologyStack } from "@/components/solutions/TechnologyStack";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((item) => item.slug === slug);

  if (!industry) {
    return pageMetadata({
      title: "Industry",
      description: "A NairobiX industry growth approach.",
      path: `/industries/${slug}`,
    });
  }

  return pageMetadata({
    title: `${industry.name} Growth Systems`,
    description: industry.challenge,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const relevantSolutions = ALL_SOLUTIONS.filter((solution) => industry.relevantSolutionIds.includes(solution.id));
  const caseStudy = CASE_STUDIES.find((study) => study.slug === industry.caseStudySlug);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: `${industry.name} Growth Systems`,
          description: industry.challenge,
          path: `/industries/${industry.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
      <JsonLd data={faqPageJsonLd(industry.faqs)} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* Hero: the industry, and the challenge in its own words */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-10">
            <Image src={industry.heroImage} alt={industry.heroImageAlt} fill preload sizes="100vw" className="object-cover grayscale-[25%]" />
            <div className="absolute inset-0 bg-[#070707]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/85 to-[#070707]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent" />
          </div>
          <Container className="py-12 sm:py-16 lg:py-24">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/industries" className="hover:text-white">Industries</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/85">{industry.name}</li>
              </ol>
            </nav>
            <div className="mt-10 max-w-2xl">
              <Eyebrow>{industry.eyebrow}</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                {industry.heading}
              </Heading>
              <p className="mt-6 text-lg leading-8 text-white/80">{industry.challenge}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href="/business-growth-audit" variant="primary">
                  Start Your Growth Assessment →
                </Button>
                <Button href={BOOKING_URL} variant="secondary">
                  Book a Consultation →
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* How NairobiX would approach it, and where growth is left on the table */}
        <Section tone="warmth">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>THE NAIROBIX APPROACH</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                How we would build this.
              </Heading>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{industry.approach}</p>
            </div>
            <div>
              <p className={`${MONO} text-white/50`}>Where growth is commonly left on the table</p>
              <ol className="mt-5 border-t border-white/10">
                {industry.opportunities.map((item, i) => (
                  <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-white/10 py-5">
                    <span className="font-mono text-xs leading-7 text-[var(--color-primary)]">{pad(i + 1)}</span>
                    <span className="text-[17px] leading-7 text-white/85">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* The solutions involved */}
        <Section tone="ink">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>RELEVANT SOLUTIONS</Eyebrow>
            <Heading variant="display-md" className="mt-4" as="h2">
              The systems behind this approach.
            </Heading>
          </div>
          <ul className="border-t border-white/10">
            {relevantSolutions.map((solution) => (
              <li key={solution.id} className="border-b border-white/10">
                <Link href={`/solutions/${solution.id}`} className="group grid gap-2 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] md:items-center md:gap-8">
                  <span className="font-display text-xl text-white transition-transform duration-300 group-hover:translate-x-1">{solution.title}</span>
                  <span className="text-sm leading-6 text-white/60">{solution.description}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white">
                    Explore {solution.title}
                    <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Technology + designed outcomes */}
        <Section tone="technical">
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Eyebrow>THE TECHNOLOGY LAYER</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                Real tools, chosen for the system.
              </Heading>
            </div>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              Chosen for what the system needs to do, and connected to what the business already uses.
            </p>
          </div>
          <TechnologyStack technology={industry.technology} />
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <Eyebrow>DESIGNED TO IMPROVE</Eyebrow>
              <Heading variant="heading-lg" as="h2" className="mt-4">
                What changes for the business.
              </Heading>
              <p className="mt-4 text-sm leading-6 text-white/50">Objectives the system is built around — not guaranteed results.</p>
            </div>
            <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
              {industry.outcomes.map((outcome, i) => (
                <li key={outcome} className="bg-[var(--section-bg)] p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-primary)]">{pad(i + 1)}</p>
                  <p className="mt-3 text-base leading-7 text-white/90">{outcome}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Related concept case — clearly a concept, not client work */}
        {caseStudy ? (
          <Section tone="core">
            <Link href={`/case-studies/${caseStudy.slug}`} className="group grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <ImageFrame src={caseStudy.image} alt={caseStudy.imageAlt} aspect="wide" sizes="(min-width: 1024px) 40vw, 100vw" />
              <div>
                <p className={`${MONO} flex flex-wrap gap-x-3`}>
                  <span className="text-[var(--color-primary)]">Concept case study</span>
                  <span aria-hidden="true" className="text-white/30">·</span>
                  <span className="text-white/55">Illustrative scenario</span>
                </p>
                <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{caseStudy.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  See the full system design
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          </Section>
        ) : null}

        {/* FAQ */}
        <Section tone="graphite">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <Heading variant="display-md" className="mt-4" as="h2">
                Questions {industry.name} businesses ask
              </Heading>
              <Link href="/industries#index" className="mt-8 inline-flex text-sm font-semibold text-white hover:text-[var(--color-primary)]">
                ← All industries
              </Link>
            </div>
            <Faq items={industry.faqs} single />
          </div>
        </Section>

        {/* Next step */}
        <Section tone="focus" seam="signal">
          <div className="mx-auto max-w-2xl text-center">
            <Heading variant="display-md">See what your business needs first.</Heading>
            <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
              The Growth Assessment starts from how your business actually works, and identifies which systems matter most
              right now.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/business-growth-audit" variant="primary">
                See What Your Business Needs →
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
