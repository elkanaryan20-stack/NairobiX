import type { ComponentProps, ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export function CTASection({
  eyebrow,
  title,
  description,
  children,
  detail,
  tone = "surface",
  spacing = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  /** Optional quiet element beneath the actions (e.g. the homepage system line). */
  detail?: ReactNode;
  tone?: ComponentProps<typeof Section>["tone"];
  spacing?: ComponentProps<typeof Section>["spacing"];
}) {
  return (
    <Section tone={tone} border="top" spacing={spacing}>
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? <Eyebrow className="justify-center">{eyebrow}</Eyebrow> : null}
        <Heading variant="display-md" className={eyebrow ? "mt-4" : ""}>
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">{children}</div>
        {detail}
      </div>
    </Section>
  );
}
