import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">Terms</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Terms & Conditions</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
            <p>This page is a placeholder to support the site architecture and will be replaced with a formal Terms & Conditions document when required.</p>
            <p>By using this website, you agree to interact with NairobiX in a professional and lawful manner. All engagement details and project scope must be confirmed through direct communication and formal agreements.</p>
            <p>NairobiX may update these terms or the content of the site over time. Use of the site is subject to local laws and business practices.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
