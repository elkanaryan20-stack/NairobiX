import Image from "next/image";
import Link from "next/link";
import { OpenChatButton } from "@/components/open-chat-button";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/site-data";

function SocialIcon({ name }: { name: string }) {
  const sharedClass = "h-4 w-4 fill-current";

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
        <path d="M13.5 22v-8h2.7l.5-3h-3.2V7.7c0-.9.3-1.5 1.7-1.5H17V3.3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.4V11H7v3h2.9v8h3.6Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.5A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h10A3.5 3.5 0 0 0 20.5 17V7A3.5 3.5 0 0 0 17 3.5H7Zm10.75 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.5A4 4 0 1 0 16 12a4 4 0 0 0-4-4Z" />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
        <path d="M18.9 2h3.3l-7.2 8.3L22.9 22h-6.5l-5.1-7.4L5.3 22H2l7.7-8.9L1.5 2h6.6l4.6 6.9L18.9 2Zm-1.2 18.1h1.8L7.3 3.8H5.4l12.3 16.3Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.9 5.4a1.56 1.56 0 0 1 .04 3.1ZM5.5 9.8h2.8v9.7H5.5V9.8Zm5.1 0h2.7v1.3h.1c.4-.7 1.3-1.6 2.8-1.6 3 0 3.6 2 3.6 4.6v5.4h-2.8v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v5.1H10.6V9.8Z" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
        <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 2.083.57 4.096 1.65 5.835L.392 23.608a.75.75 0 0 0 .96.96l5.773-1.258A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 17.789c-.244.61-.816 1.06-1.496 1.165-.472.072-.97.104-1.523.104-1.87 0-3.617-.528-5.128-1.52-.983-.638-1.848-1.472-2.54-2.415-.776-1.063-1.34-2.27-1.643-3.56-.27-1.119-.412-2.291-.412-3.48 0-.557.031-1.053.104-1.521.107-.68.558-1.252 1.168-1.496.18-.071.38-.107.59-.107.253 0 .457.11.58.295l1.328 1.771c.132.176.2.4.2.642 0 .34-.16.67-.44.87l-.765.574c.22.458.54.91.96 1.35.42.44.89.758 1.35.976l.574-.764c.2-.28.53-.44.87-.44.242 0 .466.068.642.2l1.77 1.328c.186.123.295.327.295.58 0 .21-.036.41-.107.59z" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={sharedClass}>
      <path d="M12 2.25C6.35 2.25 1.75 6.46 1.75 11.5c0 2.12.7 4.08 1.9 5.7l-1.18 3.95a.75.75 0 0 0 .93.93l3.9-1.2A9.2 9.2 0 0 0 12 20.75c5.65 0 10.25-4.21 10.25-9.25S17.65 2.25 12 2.25Zm0 1.5c4.76 0 8.75 3.48 8.75 7.75S16.76 19.25 12 19.25c-1.94 0-3.78-.63-5.29-1.7l-.45-.33-2.3.7.72-2.3-.3-.45A8.15 8.15 0 0 1 3.25 11.5C3.25 7.23 7.24 3.75 12 3.75Zm-2.72 5.1h5.44a.75.75 0 0 1 0 1.5H9.28a.75.75 0 0 1 0-1.5Zm0 2.9h5.44a.75.75 0 0 1 0 1.5H9.28a.75.75 0 0 1 0-1.5Zm0 2.9h3.44a.75.75 0 0 1 0 1.5H9.28a.75.75 0 0 1 0-1.5Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030304]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr_0.9fr_1fr_1.1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <Image
                src="/images/NairobiX-logo.png"
                alt="NairobiX"
                width={32}
                height={32}
                className="h-6 w-auto object-contain sm:h-7"
              />
              <span className="text-lg font-bold sm:text-xl">Nairobi<span className="text-[var(--color-primary)]">X</span></span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-slate-300">
              Intelligent growth systems for ambitious businesses.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Solutions</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {FOOTER_LINKS.solutions.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Company</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Start</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {FOOTER_LINKS.start.map((item) => (
                <li key={item.label}>
                  {item.chat ? (
                    <OpenChatButton className="text-left hover:text-white">{item.label}</OpenChatButton>
                  ) : (
                    <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="hover:text-white">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Social</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-[var(--color-primary)] hover:text-white"
                >
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NairobiX. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
