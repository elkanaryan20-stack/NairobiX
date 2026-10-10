// Nia's floating messages — the short lines she offers beside the launcher
// during idle moments and on hover. Kept deliberately small and human:
// curiosity and help first, never a sales prompt, and nothing that implies
// Nia knows something about the visitor that she doesn't.

/** Shown while the pointer (or keyboard focus) rests on Nia. */
export const HOVER_MESSAGES = ["Talk to Nia", "Ask Nia", "Need help?", "Let's talk"];

/** The general pool for idle moments. */
export const IDLE_MESSAGES = [
  "Talk to Nia",
  "Need a hand?",
  "Have a question?",
  "What are you trying to improve?",
  "Want to talk growth?",
  "Need help finding your way?",
];

/** The rare roam: one line before she rolls away, one as she settles back. */
export const ROAM_MESSAGES = {
  signature: { leave: "Still exploring?", back: "I’m still here." },
  gentle: { leave: "Hmm… need a hand?", back: "I’m here if you need me." },
} as const;

// First match wins; checked against the current pathname.
const PAGE_MESSAGES: [test: (path: string) => boolean, message: string][] = [
  [(p) => p === "/", "Exploring NairobiX?"],
  [(p) => p.startsWith("/solutions"), "Looking for the right solution?"],
  [(p) => p.startsWith("/case-studies"), "Want to see how we think?"],
  [(p) => p.startsWith("/insights/"), "Have a question about this?"],
  [(p) => p.startsWith("/business-growth-audit"), "Ready to explore your growth?"],
  [(p) => p.startsWith("/book"), "Need help before booking?"],
  [(p) => p.startsWith("/contact"), "Not sure where to start?"],
];

export function pageMessage(pathname: string): string | null {
  return PAGE_MESSAGES.find(([test]) => test(pathname))?.[1] ?? null;
}

/**
 * Pages where the visitor is in the middle of a task (a form, a booking).
 * Nia may still offer a line here, but never roams across the page.
 */
const TASK_ROUTES = ["/book", "/business-growth-audit", "/contact", "/request-solution", "/partner", "/proposal"];

export function isTaskRoute(pathname: string): boolean {
  return TASK_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/** A random item, never the same as the previous pick when there's a choice. */
export function pickFresh<T>(items: readonly T[], previous: T | null): T {
  const choices = items.length > 1 ? items.filter((item) => item !== previous) : items;
  return choices[Math.floor(Math.random() * choices.length)];
}
