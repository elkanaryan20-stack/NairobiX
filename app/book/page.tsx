import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Book a Consultation";
const DESCRIPTION =
  "Schedule a 30-minute NairobiX Business Growth Consultation to identify the right growth solution for your business.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/book" });

export default function BookPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/book" })} />
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#0b0b0d] text-white">
        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
