import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RequestSolutionForm } from "@/components/forms/request-solution-form";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Request a Solution";
const DESCRIPTION = "Request the NairobiX solution that best matches your growth priorities and business goals.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/request-solution" });

export default function RequestSolutionPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/request-solution" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <RequestSolutionForm />
      </main>
      <SiteFooter />
    </>
  );
}
