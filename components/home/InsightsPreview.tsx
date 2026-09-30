import Image from "next/image";
import Link from "next/link";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import type { InsightArticle } from "@/lib/insights";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "long", year: "numeric" });

// Colour sets for the two surfaces this preview can sit on. On the light
// (Editorial Light) surface, category labels use a deeper orange: brand
// #F97316 on off-white is ~2.6:1 and fails WCAG AA for small text; #C2410C
// is ~4.9:1. The orange hairline accent keeps the brand orange.
const TONES = {
  dark: {
    placeholder: "bg-white/[0.03]",
    frame: "ring-white/10",
    rule: "bg-white/10",
    category: "text-[var(--color-primary)]/80 group-hover:text-[var(--color-primary)] group-focus-visible:text-[var(--color-primary)]",
    meta: "text-[var(--text-tertiary)]",
    divider: "bg-white/20",
    dot: "text-white/25",
    title: "text-white",
    excerpt: "text-[var(--text-secondary)]",
    cue: "text-white/80 group-hover:text-white group-focus-visible:text-white",
  },
  light: {
    placeholder: "bg-black/[0.04]",
    frame: "ring-black/10",
    rule: "bg-black/10",
    category: "text-[#c2410c]/85 group-hover:text-[#c2410c] group-focus-visible:text-[#c2410c]",
    meta: "text-black/55",
    divider: "bg-black/20",
    dot: "text-black/30",
    title: "text-[#141414]",
    excerpt: "text-black/65",
    cue: "text-[#141414]/80 group-hover:text-[#141414] group-focus-visible:text-[#141414]",
  },
} as const;

/**
 * Homepage preview of the three most recent Insights articles as a compact,
 * even three-column editorial row — image, a hairline that draws orange on
 * hover/focus, metadata, title, excerpt. All content comes straight from
 * lib/insights.ts. No autoplay; server-rendered with CSS-only hover.
 */
export function InsightsPreview({ articles, tone = "dark" }: { articles: InsightArticle[]; tone?: keyof typeof TONES }) {
  const t = TONES[tone];
  const latest = [...articles].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1)).slice(0, 3);

  return (
    <ul className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
      {latest.map((article) => (
        <li key={article.slug}>
          <Link
            href={`/insights/${article.slug}`}
            className="group flex h-full flex-col rounded-sm focus-visible:outline-offset-8"
          >
            <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-image)] ${t.placeholder}`}>
              {article.heroImage ? (
                <>
                  <Image
                    src={article.heroImage}
                    alt={article.heroImageAlt ?? ""}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                    style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
                  />
                  <div className={`pointer-events-none absolute inset-0 rounded-[var(--radius-image)] ring-1 ring-inset ${t.frame}`} />
                </>
              ) : null}
            </div>

            <span aria-hidden="true" className={`relative mt-6 block h-px ${t.rule}`}>
              <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-primary)]/70 transition-transform duration-[400ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </span>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className={`transition-colors duration-300 ${t.category}`}>{article.category}</span>
              <span aria-hidden="true" className={`h-px w-3 ${t.divider}`} />
              <time dateTime={article.publishedDate} className={t.meta}>
                {DATE_FORMATTER.format(new Date(article.publishedDate))}
              </time>
              <span aria-hidden="true" className={t.dot}>
                ·
              </span>
              <span className={t.meta}>{article.readTime}</span>
            </p>

            <h3
              className={`mt-4 font-display text-xl font-medium leading-snug tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 ${t.title}`}
            >
              {article.title}
            </h3>
            <p className={`mt-3 line-clamp-3 text-[15px] leading-6 ${t.excerpt}`}>{article.description}</p>

            <span className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold transition-colors duration-300 ${t.cue}`}>
              Read article
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-[var(--color-primary)] group-focus-visible:translate-x-1.5 group-focus-visible:text-[var(--color-primary)]"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
