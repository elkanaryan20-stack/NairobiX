import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { ConsultationInfoPanel } from "@/components/booking/ConsultationInfoPanel";
import { WhatToExpect } from "@/components/booking/WhatToExpect";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Book a Consultation";
const DESCRIPTION =
  "Schedule a 30-minute NairobiX Business Growth Consultation to identify the right growth solution for your business.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/book" });

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  // The only signal this page has that a specific visitor actually completed
  // a Growth Assessment — set when they arrive via AssessmentNextSteps'
  // ?ref=assessment link. Never assumed otherwise (see WhatToExpect).
  const fromAssessment = params.ref === "assessment";

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/book" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/photography/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
              alt="A quiet, light-filled meeting room with floor-to-ceiling windows."
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/88 to-[#030304]/55" />
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
            />
          </div>

          <Container className="relative py-20 sm:py-28">
            <div className="max-w-2xl">
              <Eyebrow>NAIROBIX · CONSULTATION</Eyebrow>
              <Heading as="h1" variant="display-xl" className="mt-4">
                Business Growth Consultation
              </Heading>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                A focused 30-minute conversation about where your business is today, where you want
                it to go, and what systems can help you get there.
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                Available Monday–Friday · 9:00 AM–5:00 PM EAT · 30 minutes
              </p>
            </div>
          </Container>
        </section>

        <Section tone="base">
          <ConsultationInfoPanel />
        </Section>

        <Section tone="surface" border="top">
          <WhatToExpect fromAssessment={fromAssessment} />
        </Section>

        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
