import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

/** A numbered, editorial section wrapper for the Scenario page (01 BUSINESS CONTEXT, 02 THE GROWTH PROBLEM, ...). */
export function ScenarioSection({
  number,
  title,
  eyebrow,
  tone = "base",
  border = "top",
  children,
}: {
  number: string;
  title: string;
  eyebrow?: string;
  tone?: "base" | "surface";
  border?: "none" | "top";
  children: ReactNode;
}) {
  return (
    <Section tone={tone} border={border} spacing="compact">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-display text-sm font-medium text-[var(--color-primary)]">{number}</span>
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Heading variant="display-md" as="h2" className={eyebrow ? "mt-2" : ""}>
            {title}
          </Heading>
        </div>
      </div>
      {children}
    </Section>
  );
}
