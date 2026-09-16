// Shared timing helpers for the multi-phase submission sequences used by
// the Business Growth Assessment and Consultation booking flows — both fire
// their real request immediately and only ever wait on it, using these to
// add a brief, skippable "hold" so the transition never feels like a jump
// cut, never to simulate work that isn't happening.

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
