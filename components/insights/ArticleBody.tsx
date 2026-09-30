import type { ReactNode } from "react";
import type { InsightBlock, InsightSection } from "@/lib/insights";
import { InsightFigure } from "@/components/insights/figures";

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";

/** Renders the two inline markers the content model allows: [n] citations and **bold**. */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\]|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        const cite = /^\[(\d+)\]$/.exec(part);
        if (cite) {
          return (
            <sup key={i} className="ml-0.5 font-mono text-[0.68em]">
              <a
                href={`#source-${cite[1]}`}
                aria-label={`Source ${cite[1]}`}
                className="text-[var(--color-primary)] no-underline hover:underline"
              >
                [{cite[1]}]
              </a>
            </sup>
          );
        }
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

const CALLOUT_LABEL = { definition: "Definition", fact: "Evidence", analysis: "Analysis" } as const;

function Block({ block, figureNumber }: { block: InsightBlock; figureNumber: number }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[17px] leading-8 text-white/80">
          <InlineText text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="pt-4 font-display text-xl font-medium tracking-tight text-white">{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-6 text-[17px] leading-8 text-white/80">
              <span aria-hidden="true" className="absolute left-0 top-[15px] h-px w-3 bg-[var(--color-primary)]" />
              <InlineText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "steps":
      return (
        <ol className="relative my-8 space-y-6 border-l border-white/15 pl-6">
          {block.items.map((item, i) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-[11px] w-[11px] rounded-full border border-[var(--color-primary)] bg-[var(--section-bg)]"
              />
              <p className="flex items-baseline gap-3">
                <span className={`${LABEL} text-[var(--color-primary)]`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold text-white">{item.title}</span>
              </p>
              <p className="mt-1.5 text-base leading-7 text-white/75">
                <InlineText text={item.text} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside
          className={`my-8 border-l-2 py-1 pl-5 ${
            block.kind === "fact" ? "border-[var(--color-primary)]" : block.kind === "analysis" ? "border-white/40" : "border-white/20"
          }`}
        >
          <p className={`${LABEL} ${block.kind === "fact" ? "text-[var(--color-primary)]" : "text-white/55"}`}>
            {CALLOUT_LABEL[block.kind]}
          </p>
          <p className="mt-2 font-display text-lg font-medium text-white">{block.title}</p>
          <p className="mt-2 text-base leading-7 text-white/75">
            <InlineText text={block.text} />
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-y border-white/10 py-6 font-display text-2xl leading-snug text-white">
          <InlineText text={block.text} />
        </blockquote>
      );
    case "table":
      return (
        <figure className="my-10">
          <figcaption className={`${LABEL} mb-3 text-white/55`}>{block.caption}</figcaption>
          <div className="overflow-x-auto border border-white/10" tabIndex={0} role="region" aria-label={block.caption}>
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/[0.04]">
                  {block.columns.map((col, i) => (
                    <th key={i} scope="col" className="border-b border-white/10 px-4 py-3 font-medium text-white">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-t border-white/[0.07] first:border-t-0">
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row" className="px-4 py-3 align-top font-medium text-white/90">
                          {cell}
                        </th>
                      ) : (
                        <td key={c} className="px-4 py-3 align-top leading-6 text-white/70">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note ? (
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
              <InlineText text={block.note} />
            </p>
          ) : null}
        </figure>
      );
    case "figure":
      return <InsightFigure figure={block.figure} number={figureNumber} caption={<InlineText text={block.caption} />} />;
    case "example":
      return (
        <div className="my-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <p className={`${LABEL} text-white/55`}>Illustrative example</p>
          <p className="mt-2 font-display text-lg font-medium text-white">{block.title}</p>
          <div className="mt-4 space-y-4">
            {block.paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-7 text-white/75">
                <InlineText text={para} />
              </p>
            ))}
          </div>
        </div>
      );
    case "checklist":
      return (
        <div className="my-8 border border-white/10 p-6 sm:p-8">
          <p className="font-display text-lg font-medium text-white">{block.title}</p>
          <ul className="mt-5 space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-base leading-7 text-white/80">
                <span aria-hidden="true" className="mt-[7px] h-3.5 w-3.5 shrink-0 rounded-[3px] border border-white/35" />
                <span>
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function ArticleBody({ sections }: { sections: InsightSection[] }) {
  // Figures are numbered in reading order across the whole article.
  const figureNumbers = new Map<InsightBlock, number>();
  sections
    .flatMap((section) => section.blocks)
    .filter((block) => block.type === "figure")
    .forEach((block, i) => figureNumbers.set(block, i + 1));

  return (
    <div className="space-y-16">
      {sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
          <h2 id={`${section.id}-heading`} className="font-display text-2xl font-medium tracking-tight text-white sm:text-[1.9rem] sm:leading-tight">
            {section.heading}
          </h2>
          <div className="mt-6 space-y-6">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} figureNumber={figureNumbers.get(block) ?? 0} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
