import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BusinessGrowthAuditForm } from "@/components/forms/business-growth-audit-form";

export const metadata = {
  title: "Business Growth Assessment | NairobiX",
  description: "Get a premium NairobiX business growth assessment and identify the highest-impact opportunities for your business.",
};

export default function BusinessGrowthAuditPage() {
  return (
    <>
      <SiteHeader />
      <BusinessGrowthAuditForm />
      <SiteFooter />
    </>
  );
}
