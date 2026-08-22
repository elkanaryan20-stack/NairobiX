import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RequestSolutionForm } from "@/components/forms/request-solution-form";

export const metadata = {
  title: "Request a Solution | NairobiX",
  description: "Request the NairobiX solution that best matches your growth priorities and business goals.",
};

export default function RequestSolutionPage() {
  return (
    <>
      <SiteHeader />
      <RequestSolutionForm />
      <SiteFooter />
    </>
  );
}
