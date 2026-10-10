import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { OnThisPage } from "@/components/insights/OnThisPage";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data";
import { INSIGHTS, getInsight } from "@/lib/insights";
import { ALL_SOLUTIONS, BOOKING_URL } from "@/lib/site-data";

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) {
    return pageMetadata({ title: "Insight", description: "A NairobiX Insights article.", path: `/insights/${slug}` });
  }
  return pageMetadata({ title: article.seoTitle ?? article.title, description: article.description, path: `/insights/${article.slug}` });
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const solutions = article.relatedSolutionIds
    .map((id) => ALL_SOLUTIONS.find((solution) => solution.id === id))
    .filter((solution) => solution !== undefined);
  const related = article.related
    .map((relatedSlug) => getInsight(relatedSlug))
    .filter((item) => item !== undefined)
    .slice(0, 3);
  const toc = [
    ...article.sections.map(({ id, heading }) => ({ id, heading })),
    { id: "key-takeaways", heading: "Key takeaways" },
    { id: "sources", heading: "Sources" },
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: article.title, description: article.description, path })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path },
        ])}
      />
      <JsonLd data={articleJsonLd({ title: article.title, description: article.description, path, datePublished: article.publishedDate, image: article.heroImage })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#0a0a0b] text-white [--section-bg:#0a0a0b]">
        <article>
          {/* Header */}
          <header className="border-b border-white/10">
            <Container className="pb-12 pt-12 sm:pt-16 lg:pb-16">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-white/55">
                  <li>
                    <Link href="/" className="hover:text-white">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/insights" className="hover:text-white">Insights</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/80">{article.category}</li>
                </ol>
              </nav>
              <div className="mt-10 max-w-4xl">
                <p className={`${LABEL} text-[var(--color-primary)]`}>{article.category}</p>
                <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">{article.dek}</p>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-5 text-sm">
                <div>
                  <dt className={`${LABEL} text-white/45`}>By</dt>
                  <dd className="mt-1.5 text-white/85">NairobiX Editorial</dd>
                </div>
                <div>
                  <dt className={`${LABEL} text-white/45`}>Published</dt>
                  <dd className="mt-1.5 text-white/85">
                    <time dateTime={article.publishedDate}>{DATE_FORMATTER.format(new Date(article.publishedDate))}</time>
                  </dd>
                </div>
                <div>
                  <dt className={`${LABEL} text-white/45`}>Reading time</dt>
                  <dd className="mt-1.5 text-white/85">{article.readTime}</dd>
                </div>
                {article.reviewedNote ? (
                  <div className="basis-full sm:basis-auto">
                    <dt className={`${LABEL} text-white/45`}>Reviewed</dt>
                    <dd className="mt-1.5 text-white/70">{article.reviewedNote}</dd>
                  </div>
                ) : null}
              </dl>
            </Container>
          </header>

          {/* Hero photograph */}
          <Container className="pt-10 sm:pt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03] sm:aspect-[21/9]">
              <Image
                src={article.heroImage}
                alt={article.heroImageAlt}
                fill
                preload
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
            </div>
          </Container>

          {/* Body + navigation */}
          <Container className="py-14 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_260px]">
              <div className="min-w-0 max-w-[740px]">
                {/* Mobile: a collapsible contents list — nothing sticky. */}
                <details className="group mb-12 border border-white/10 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                    On this page
                    <span aria-hidden="true" className="text-white/50 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ol className="space-y-2 border-t border-white/10 px-5 py-4">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="flex gap-3 text-sm leading-6 text-white/70 hover:text-white">
                          <span className="font-mono text-[10px] leading-6 text-white/40">{String(i + 1).padStart(2, "0")}</span>
                          {item.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                <ArticleBody sections={article.sections} />

                {/* Key takeaways */}
                <section id="key-takeaways" aria-labelledby="key-takeaways-heading" className="mt-20 scroll-mt-28 border-t-2 border-[var(--color-primary)] pt-8">
                  <h2 id="key-takeaways-heading" className="font-display text-2xl font-medium tracking-tight text-white">
                    Key takeaways
                  </h2>
                  <ol className="mt-6 space-y-4">
                    {article.takeaways.map((point, i) => (
                      <li key={i} className="flex gap-4 text-[17px] leading-8 text-white/85">
                        <span className="font-mono text-xs leading-8 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
                        {point}
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Related NairobiX solutions — only those genuinely relevant. */}
                {solutions.length > 0 ? (
                  <div className="mt-14 border border-white/10 p-6 sm:p-8">
                    <p className={`${LABEL} text-white/50`}>Where NairobiX works on this</p>
                    <ul className="mt-4 divide-y divide-white/10">
                      {solutions.map((solution) => (
                        <li key={solution.id}>
                          <Link
                            href={`/solutions/${solution.id}`}
                            className="group flex items-center justify-between gap-4 py-3 text-white/85 hover:text-white"
                          >
                            <span className="text-base font-medium">{solution.title}</span>
                            <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Sources */}
                <section id="sources" aria-labelledby="sources-heading" className="mt-14 scroll-mt-28 border-t border-white/10 pt-8">
                  <h2 id="sources-heading" className="font-display text-xl font-medium tracking-tight text-white">
                    Sources
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
                    Numbered references in the text point to the sources below. Frameworks, examples and passages marked
                    “Analysis” are NairobiX&apos;s own reasoning; examples are composites, not real clients.
                  </p>
                  <ol className="mt-6 space-y-4">
                    {article.sources.map((source, i) => (
                      <li key={source.url} id={`source-${i + 1}`} className="flex scroll-mt-28 gap-4 text-sm leading-6">
                        <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">[{i + 1}]</span>
                        <span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-[var(--color-primary)]"
                          >
                            {source.title}
                          </a>
                          <span className="text-white/60"> — {source.publisher}</span>
                          {source.note ? <span className="block text-[var(--text-tertiary)]">{source.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <OnThisPage items={toc} />
                  <div className="mt-10 border-t border-white/10 pt-6">
                    <p className="text-sm leading-6 text-white/60">See where this applies to your business.</p>
                    <Link
                      href="/business-growth-audit"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-white"
                    >
                      Find Your Growth Leak <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </article>

        {/* Related reading */}
        {related.length > 0 ? (
          <Section tone="graphite" border="top" spacing="compact">
            <p className={`${LABEL} text-white/50`}>Related reading</p>
            <ul className="mt-6 grid gap-px bg-white/10 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="bg-[var(--section-bg)]">
                  <Link href={`/insights/${item.slug}`} className="group flex h-full flex-col p-6 md:p-7">
                    <span className={`${LABEL} text-[var(--color-primary)]`}>{item.category}</span>
                    <span className="mt-3 font-display text-xl font-medium leading-snug text-white group-hover:text-white/85">
                      {item.title}
                    </span>
                    <span className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">{item.description}</span>
                    <span className="mt-auto pt-5 font-mono text-[11px] text-white/45">{item.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <CTASection
          tone="focus"
          eyebrow="FROM READING TO DOING"
          title="See where this applies to your business."
          description="The Business Growth Assessment looks at how your business actually acquires, converts and serves customers, and identifies the areas worth addressing first."
        >
          <Button href="/business-growth-audit" variant="primary">
            Apply This to Your Business →
          </Button>
          <Button href={BOOKING_URL} variant="secondary">
            Talk to Us →
          </Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
