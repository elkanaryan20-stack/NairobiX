import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GrowthPartnerForm } from "@/components/forms/growth-partner-form";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Growth Partner Application";
const DESCRIPTION = "Apply to become a NairobiX Growth Partner and support businesses with premium growth systems.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/partner" });

export default function PartnerPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/partner" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <GrowthPartnerForm />
      </main>
      <SiteFooter />
    </>
  );
}
