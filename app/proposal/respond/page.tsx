import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProposalResponseClient } from "@/components/proposal/ProposalResponseClient";

// Transactional/private — never indexed. See also app/robots.ts.
export const metadata: Metadata = {
  title: "Proposal Response",
  robots: { index: false, follow: false },
};

export default async function ProposalRespondPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const action = typeof params.action === "string" ? params.action : "";

  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <ProposalResponseClient token={token} action={action} />
      </main>
      <SiteFooter />
    </>
  );
}
