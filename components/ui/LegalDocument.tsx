import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export type LegalBlock = { p: string } | { ul: string[] };

export type LegalSection = {
  id: string;
  title: string;
  body: LegalBlock[];
};

function SectionBody({ body }: { body: LegalBlock[] }) {
  return (
    <div className="mt-4 max-w-[var(--max-width-prose)] space-y-4 text-base leading-7 text-[var(--text-secondary)]">
      {body.map((block, index) =>
        "p" in block ? (
          <p key={index}>{block.p}</p>
        ) : (
          <ul key={index} className="list-disc space-y-2 pl-5 marker:text-[var(--color-primary)]">
            {block.ul.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export function LegalDocument({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="border-b border-white/10">
        <Container width="narrow" className="py-20 sm:py-24">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" variant="display-lg" className="mt-4">
            {title}
          </Heading>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-6 max-w-[var(--max-width-prose)] text-lg leading-8 text-[var(--text-secondary)]">
            {intro}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-10 sm:py-12">
        <Container width="narrow">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            On this page
          </p>
          <nav aria-label="Table of contents" className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="text-sm leading-6 text-[var(--text-secondary)] transition hover:text-[var(--color-primary)]"
              >
                <span className="text-[var(--text-tertiary)]">{String(index + 1).padStart(2, "0")}.</span>{" "}
                {section.title}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <section className="py-4 sm:py-6">
        <Container width="narrow">
          <div className="divide-y divide-white/10">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-28 py-10 first:pt-8 sm:py-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <Heading as="h2" variant="heading-lg" className="mt-3">
                  {section.title}
                </Heading>
                <SectionBody body={section.body} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
