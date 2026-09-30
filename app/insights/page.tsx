import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { FEATURED_INSIGHT_SLUG, INSIGHTS, INSIGHT_TOPICS } from "@/lib/insights";
import { BOOKING_URL } from "@/lib/site-data";

const TITLE = "NairobiX Insights";
const DESCRIPTION =
  "Long-form, sourced explanations of growth, sales systems, CRM, automation, AI and websites — written for business owners deciding what to build next.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/insights" });

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";

const STANDARDS = [
  ["Teaches first", "Each article explains how something works before it says anything about NairobiX."],
  ["Shows its sources", "Facts link to primary documentation and research; our own analysis is labelled as such."],
  ["Honest examples", "Examples are clearly marked composites, never presented as client results."],
];

export default function InsightsPage() {
  const featured = INSIGHTS.find((a) => a.slug === FEATURED_INSIGHT_SLUG) ?? INSIGHTS[0];
  const library = INSIGHTS.filter((a) => a.slug !== featured.slug);
  const figureCount = (slug: string) =>
    INSIGHTS.find((a) => a.slug === slug)?.sections.flatMap((s) => s.blocks).filter((b) => b.type === "figure").length ?? 0;

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/insights" })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* Hero */}
        <Section tone="clear" spacing="hero" className="border-b border-white/10">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>NAIROBIX · INSIGHTS</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-5 max-w-3xl">
                Useful thinking for businesses building what comes next.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Practical, sourced explanations of growth, sales systems, CRM, automation, AI and digital —
                written for business owners who want to understand how these things actually work before
                deciding what to build.
              </p>
            </div>
            <div className="border-t border-white/15 pt-6">
              <p className={`${LABEL} text-white/50`}>The editorial standard</p>
              <dl className="mt-5 space-y-5">
                {STANDARDS.map(([term, text]) => (
                  <div key={term} className="grid grid-cols-[auto_1fr] gap-x-4">
                    <span aria-hidden="true" className="mt-2 h-px w-4 bg-[var(--color-primary)]" />
                    <div>
                      <dt className="text-sm font-medium text-white">{term}</dt>
                      <dd className="mt-1 text-sm leading-6 text-white/60">{text}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* Featured insight */}
        <Section tone="core">
          <p className={`${LABEL} text-white/50`}>Featured</p>
          <Link href={`/insights/${featured.slug}`} className="group mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03]">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
            </div>
            <div>
              <p className={`${LABEL} text-[var(--color-primary)]`}>{featured.category}</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{featured.dek}</p>
              <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-white/50">
                <span>{DATE_FORMATTER.format(new Date(featured.publishedDate))}</span>
                <span aria-hidden="true">·</span>
                <span>{featured.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{figureCount(featured.slug)} figures</span>
                <span aria-hidden="true">·</span>
                <span>Sourced</span>
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Read the article
                <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Section>

        {/* The library — a publication index on the one light editorial surface. */}
        <Section tone="editorial">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c2410c]">LATEST INSIGHTS</p>
              <h2 id="library-heading" className="mt-4 font-display text-3xl font-medium tracking-tight text-[#141414] sm:text-4xl">
                The library
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-black/60">
              A small, deliberate set of articles, each written to answer one question properly.
            </p>
          </div>
          <ol className="mt-12 border-t border-black/15">
            {library.map((article, i) => (
              <li key={article.slug} className="border-b border-black/15">
                <Link
                  href={`/insights/${article.slug}`}
                  className="group grid gap-5 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,1fr)_200px] md:gap-8 lg:py-10"
                >
                  <span className="font-mono text-xs text-black/40">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">{article.category}</p>
                    <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-[#141414] underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-[#c2410c]">
                      {article.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-black/65">{article.description}</p>
                    <p className="mt-4 flex gap-3 font-mono text-[11px] text-black/50">
                      <span>{DATE_FORMATTER.format(new Date(article.publishedDate))}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </p>
                  </div>
                  <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] bg-black/[0.05] md:block">
                    <Image
                      src={article.heroImage}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Section>

        {/* Topics */}
        <Section tone="graphite">
          <Eyebrow>TOPICS</Eyebrow>
          <Heading id="topics-heading" variant="display-md" className="mt-4 max-w-2xl">
            Six subjects, one connected system.
          </Heading>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {INSIGHT_TOPICS.map((topic) => {
              const articles = INSIGHTS.filter((a) => a.category === topic.category);
              return (
                <div key={topic.category} className="flex flex-col bg-[var(--section-bg)] p-6 sm:p-7">
                  <h3 className="font-display text-xl font-medium text-white">{topic.category}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{topic.description}</p>
                  <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <Link href={`/insights/${article.slug}`} className="group flex gap-2 text-sm leading-6 text-white/85 hover:text-white">
                          <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-0.5">→</span>
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        <CTASection
          tone="focus"
          eyebrow="APPLY IT"
          title="Reading helps. Knowing where your business stands helps more."
          description="The Business Growth Assessment applies the same thinking to your business, and identifies the areas creating the most friction and the opportunities worth addressing next."
        >
          <Button href="/business-growth-audit" variant="primary">
            Apply This Thinking to Your Business →
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
