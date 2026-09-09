import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Container } from "@/components/ui/Container";
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

const EXPECTATIONS = [
  {
    title: "No fixed pitch",
    text: "A working conversation about your business, not a scripted sales call.",
  },
  {
    title: "Direct access",
    text: "You speak with the NairobiX team directly — not an intake coordinator.",
  },
  {
    title: "A clear next step",
    text: "You leave knowing what would actually move your business forward, in plain terms.",
  },
];

export default function BookPage() {
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

          <Container className="relative py-20 sm:py-24">
            <div className="max-w-2xl">
              <Eyebrow>NAIROBIX · CONSULTATION</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                A focused conversation about your growth — not a sales pitch.
              </Heading>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                Thirty minutes with the NairobiX team to understand your business, where growth is
                being held back, and which systems — marketing, CRM, automation, AI or web — would
                actually move it forward.
              </p>
            </div>

            <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
              {EXPECTATIONS.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
