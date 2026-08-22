import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">Privacy Policy</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Privacy Policy</h1>
          <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
            <p>NairobiX respects your privacy and is committed to handling your information responsibly. This page is a placeholder to support the site architecture and will be replaced with a formal policy when needed.</p>
            <p>We may collect information you provide through our forms, contact pages, consultation requests and any other direct communication with NairobiX.</p>
            <p>Information is used to respond to enquiries, understand project needs, improve service delivery and maintain a better client experience.</p>
            <p>We do not sell personal information. We may share information with trusted service providers where necessary to deliver the service or where required by law.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
