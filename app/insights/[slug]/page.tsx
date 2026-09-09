import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { INSIGHTS } from "@/lib/insights";
import { ALL_SOLUTIONS, BOOKING_URL, INDUSTRIES } from "@/lib/site-data";

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS.find((item) => item.slug === slug);

  if (!article) {
    return pageMetadata({
      title: "Insight",
      description: "A NairobiX Insights article.",
      path: `/insights/${slug}`,
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = INSIGHTS.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedSolution = ALL_SOLUTIONS.find((solution) => solution.id === article.relatedSolutionId);
  const relatedIndustry = INDUSTRIES.find((industry) => industry.slug === article.relatedIndustrySlug);

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: article.title, description: article.description, path: `/insights/${article.slug}` })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path: `/insights/${article.slug}`,
          datePublished: article.publishedDate,
        })}
      />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container width="prose" className="py-16 sm:py-20">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              <span>{article.category}</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span className="text-[var(--text-tertiary)]">{DATE_FORMATTER.format(new Date(article.publishedDate))}</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span className="text-[var(--text-tertiary)]">{article.readTime}</span>
            </div>
            <Heading as="h1" variant="display-lg" className="mt-5">
              {article.title}
            </Heading>
            <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">{article.description}</p>
          </Container>
        </section>

        {article.heroImage ? (
          <Section containerWidth="prose" spacing="compact">
            <ImageFrame src={article.heroImage} alt={article.heroImageAlt ?? ""} aspect="wide" preload />
          </Section>
        ) : null}

        <Section containerWidth="prose" spacing="compact">
          <div className="space-y-12">
            {article.sections.map((section) => (
              <div key={section.heading}>
                <Heading variant="heading-lg" as="h2">
                  {section.heading}
                </Heading>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base leading-8 text-[var(--text-secondary)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {relatedSolution || relatedIndustry ? (
            <div className="mt-14 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {relatedSolution ? (
                <Button href={`/solutions/${relatedSolution.id}`} variant="secondary" size="md">
                  Related solution: {relatedSolution.title} →
                </Button>
              ) : null}
              {relatedIndustry ? (
                <Button href={`/industries/${relatedIndustry.slug}`} variant="secondary" size="md">
                  Related industry: {relatedIndustry.name} →
                </Button>
              ) : null}
            </div>
          ) : null}
        </Section>

        <CTASection
          eyebrow="ASSESS YOUR BUSINESS"
          title="See where this applies to your business."
          description="The Business Growth Assessment identifies the specific priorities and systems that matter most for where your business is right now."
        >
          <Button href="/business-growth-audit" variant="primary">
            Get Your Growth Assessment →
          </Button>
          <Button href={BOOKING_URL} variant="secondary">
            Book a Consultation →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
