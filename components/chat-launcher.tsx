const BOTPRESS_SHARE_URL =
  "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/08/01/07/20260801073051-QOAXJ859.json";

export function ChatLauncher() {
  return (
    <a
      href={BOTPRESS_SHARE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Talk to Nia"
      className="fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-base font-semibold text-white shadow-[0_18px_50px_rgba(249,115,22,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(249,115,22,0.50)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] md:bottom-6 md:right-6"
    >
      <span className="sr-only">Talk to Nia</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M12 2.75A9.25 9.25 0 0 0 3.25 12c0 1.77.5 3.44 1.38 4.88l-1.17 4.52a.75.75 0 0 0 .96.96l4.6-1.14A9.22 9.22 0 0 0 12 21.75a9.25 9.25 0 1 0 0-19zm0 1.5a7.75 7.75 0 0 1 5.07 13.3l.67.67-1.08 4.18 4.18-1.08.67.67A7.75 7.75 0 1 1 12 4.25zm-2.26 7.35h4.52a.75.75 0 0 1 0 1.5h-4.52a.75.75 0 0 1 0-1.5zm0-2.7h6.52a.75.75 0 0 1 0 1.5H9.74a.75.75 0 0 1 0-1.5zm0 5.4h5.52a.75.75 0 0 1 0 1.5H9.74a.75.75 0 0 1 0-1.5z" />
      </svg>
    </a>
  );
}
