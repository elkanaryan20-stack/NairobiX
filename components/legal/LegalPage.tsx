import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { OnThisPage } from "@/components/insights/OnThisPage";
import { LEGAL_DOCUMENTS, LEGAL_ORDER, type LegalDocumentKey } from "@/lib/legal/documents";

// Shared building blocks for the NairobiX legal documents (Privacy Policy,
// Terms of Service, Cookie Policy): one reading layout, one section style,
// so the three read as one set and match the Insights articles.

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

export type LegalSectionEntry = { id: string; title: string; content: ReactNode };

export function LegalPageLayout({
  document,
  intro,
  sections,
}: {
  document: LegalDocumentKey;
  intro: ReactNode;
  sections: LegalSectionEntry[];
}) {
  const doc = LEGAL_DOCUMENTS[document];
  const toc = sections.map((section, i) => ({ id: section.id, heading: `${pad(i + 1)}  ${section.title}` }));
  const related = LEGAL_ORDER.filter((key) => key !== document);

  return (
    <article>
      <header className="border-b border-white/10">
        <Container className="pb-12 pt-12 sm:pt-16 lg:pb-16">
          <nav aria-label="Legal documents">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/55">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Legal</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">{doc.title}</li>
            </ol>
          </nav>
          <div className="mt-10 max-w-4xl">
            <p className={`${LABEL} text-[var(--color-primary)]`}>NairobiX · Legal</p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              {doc.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">{doc.summary}</p>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <dt className={`${LABEL} text-white/45`}>Last updated</dt>
              <dd className="mt-1.5 text-white/85">
                <time dateTime={doc.lastUpdatedISO}>{doc.lastUpdated}</time>
              </dd>
            </div>
            <div>
              <dt className={`${LABEL} text-white/45`}>Applies to</dt>
              <dd className="mt-1.5 text-white/85">nairobix.com and NairobiX digital services</dd>
            </div>
            <div>
              <dt className={`${LABEL} text-white/45`}>Related</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {related.map((key) => (
                  <Link key={key} href={LEGAL_DOCUMENTS[key].href} className="text-white/85 underline decoration-white/25 underline-offset-4 hover:text-white">
                    {LEGAL_DOCUMENTS[key].title}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pr-2">
              <OnThisPage items={toc} />
            </div>
          </aside>

          <div className="min-w-0 max-w-[740px]">
            {/* Mobile and tablet: a collapsible contents list — nothing sticky. */}
            <details id="contents" className="group mb-12 scroll-mt-28 border border-white/10 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                Contents
                <span aria-hidden="true" className="text-white/50 transition-transform group-open:rotate-45">+</span>
              </summary>
              <ol className="space-y-2 border-t border-white/10 px-5 py-4">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex gap-3 text-sm leading-6 text-white/70 hover:text-white">
                      <span className="font-mono text-[10px] leading-6 text-white/40">{pad(i + 1)}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="text-base leading-7 text-[var(--text-secondary)] [&_p+p]:mt-4">{intro}</div>

            {sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mt-16 scroll-mt-28 border-t border-white/10 pt-10">
                <p className={`${LABEL} text-[var(--color-primary)]`}>{pad(i + 1)}</p>
                <h2 id={`${section.id}-heading`} className="mt-3 font-display text-2xl font-medium tracking-tight text-white sm:text-[1.75rem]">
                  {section.title}
                </h2>
                <div className="legal-prose mt-5">{section.content}</div>
                <a href="#contents" className="mt-6 inline-block text-xs text-white/40 hover:text-white lg:hidden">
                  ↑ Contents
                </a>
              </section>
            ))}

            <LegalRelated current={document} />
          </div>
        </div>
      </Container>
    </article>
  );
}

/** A sub-heading inside a section. */
export function LegalH3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 font-display text-lg font-medium tracking-tight text-white first:mt-0">{children}</h3>;
}

/** A highlighted note: important points a reader shouldn't skim past. */
export function LegalCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-6 border-l-2 border-[var(--color-primary)] bg-white/[0.03] px-5 py-4">
      <p className={`${LABEL} text-[var(--color-primary)]`}>{title}</p>
      <div className="mt-2 text-[15px] leading-7 text-white/80 [&_p+p]:mt-3">{children}</div>
    </aside>
  );
}

/**
 * A compact table. On phones each row becomes a stacked card instead — a
 * sideways-scrolling table is hard to read there. Only one version is ever
 * displayed (the other is display:none), so assistive tech reads it once.
 */
export function LegalTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <>
      <ul aria-label={caption} className="my-6 !list-none divide-y divide-white/10 border border-white/10 !pl-0 sm:hidden">
        {rows.map((row, r) => (
          <li key={r} className="!mt-0 px-4 py-4">
            <p className="font-medium text-white/90">{row[0]}</p>
            <dl className="mt-2 space-y-2 text-sm leading-6">
              {row.slice(1).map((cell, c) => (
                <div key={c}>
                  <dt className={`${LABEL} text-white/45`}>{head[c + 1]}</dt>
                  <dd className="mt-0.5 text-[var(--text-secondary)]">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <LegalTableGrid caption={caption} head={head} rows={rows} />
    </>
  );
}

function LegalTableGrid({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 hidden overflow-x-auto border border-white/10 sm:block">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm leading-6">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-white/[0.04]">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className={`${LABEL} px-4 py-3 align-bottom font-normal text-white/55`}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 align-top font-medium text-white/90">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="px-4 py-3 align-top text-[var(--text-secondary)]">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** An inline link to another page or an external source. */
export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const className = "text-white underline decoration-[var(--color-primary)]/60 underline-offset-4 hover:decoration-[var(--color-primary)]";
  return external ? (
    <a href={href} className={className} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LegalRelated({ current }: { current: LegalDocumentKey }) {
  return (
    <nav aria-label="Other NairobiX legal documents" className="mt-20 border-t-2 border-[var(--color-primary)] pt-8">
      <p className={`${LABEL} text-white/50`}>NairobiX legal documents</p>
      <ul className="mt-5 grid gap-px bg-white/10 sm:grid-cols-3">
        {LEGAL_ORDER.map((key) => {
          const doc = LEGAL_DOCUMENTS[key];
          const isCurrent = key === current;
          return (
            <li key={key} className="bg-[#0a0a0b]">
              {isCurrent ? (
                <div aria-current="page" className="block h-full p-5">
                  <p className="text-sm font-semibold text-white/50">{doc.title}</p>
                  <p className="mt-2 text-[13px] leading-5 text-white/40">You are reading this document.</p>
                </div>
              ) : (
                <Link href={doc.href} className="group block h-full p-5 transition-colors hover:bg-white/[0.03]">
                  <p className="text-sm font-semibold text-white">
                    {doc.title} <span aria-hidden="true" className="inline-block text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
                  </p>
                  <p className="mt-2 text-[13px] leading-5 text-white/55">{doc.summary}</p>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
