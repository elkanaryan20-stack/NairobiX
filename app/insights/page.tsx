import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { INSIGHTS } from "@/lib/insights";

const TITLE = "NairobiX Insights";
const DESCRIPTION =
  "Practical thinking on growth, sales systems, automation, AI and digital solutions for Kenyan and African businesses.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/insights" });

const DATE_FORMATTER = new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  const articles = [...INSIGHTS].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/insights" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="border-b border-white/10">
          <Container className="py-20">
            <div className="max-w-3xl">
              <Eyebrow>NAIROBIX INSIGHTS</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                Practical thinking on growth, sales systems and AI.
              </Heading>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                Grounded, specific writing on how growth, sales and AI systems actually work for
                Kenyan and African businesses — not generic marketing advice.
              </p>
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group block">
                <Card variant="outline" className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    <span>{article.category}</span>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span className="text-[var(--text-tertiary)]">{DATE_FORMATTER.format(new Date(article.publishedDate))}</span>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span className="text-[var(--text-tertiary)]">{article.readTime}</span>
                  </div>
                  <Heading variant="heading-md" as="h2" className="mt-4 transition group-hover:text-[var(--color-primary)]">
                    {article.title}
                  </Heading>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{article.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-[var(--color-primary)]">
                    Read the article →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
