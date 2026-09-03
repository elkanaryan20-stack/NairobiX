import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export function CTASection({
  eyebrow,
  title,
  description,
  children,
  tone = "surface",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "base" | "surface";
}) {
  return (
    <Section tone={tone} border="top">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? <Eyebrow className="justify-center">{eyebrow}</Eyebrow> : null}
        <Heading variant="display-md" className={eyebrow ? "mt-4" : ""}>
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">{children}</div>
      </div>
    </Section>
  );
}
