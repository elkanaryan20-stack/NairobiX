import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GrowthPartnerForm } from "@/components/forms/growth-partner-form";

export const metadata = {
  title: "Growth Partner Application | NairobiX",
  description: "Apply to become a NairobiX Growth Partner and support businesses with premium growth systems.",
};

export default function PartnerPage() {
  return (
    <>
      <SiteHeader />
      <GrowthPartnerForm />
      <SiteFooter />
    </>
  );
}
