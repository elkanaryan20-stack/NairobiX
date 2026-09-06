import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Consultation | NairobiX",
  description:
    "Schedule a 30-minute NairobiX Business Growth Consultation to identify the right growth solution for your business.",
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#0b0b0d] text-white">
        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
