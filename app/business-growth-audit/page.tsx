import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BusinessGrowthAuditForm } from "@/components/forms/business-growth-audit-form";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ENGAGEMENT_PROCESS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Business Growth Assessment | NairobiX",
  description:
    "A structured review of your acquisition, sales process and operational systems, used to identify the highest-impact next step for your business.",
};

export default function BusinessGrowthAuditPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <Section spacing="compact">
          <div className="max-w-2xl">
            <Eyebrow>WHAT HAPPENS AFTER YOU SUBMIT</Eyebrow>
            <Heading variant="heading-lg" as="p" className="mt-4">
              Reviewed against your industry, not filed into an inbox.
            </Heading>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              Your answers below are reviewed against your industry and current growth stage. What
              you get back shapes a real conversation about priorities — not a generic sales pitch.
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_PROCESS.map((item) => (
              <div key={item.number}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {item.number}
                </div>
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
        <BusinessGrowthAuditForm />
      </main>
      <SiteFooter />
    </>
  );
}
