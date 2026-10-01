/**
 * The short line Nia offers beside the launcher (see lib/nia/presence.ts).
 * Attached to Nia — it moves with her — and decorative to assistive tech:
 * the button's own label already says what she does, and an unprompted
 * announcement every so often would only interrupt.
 */
export function NiaNote({ text, visible }: { text: string; visible: boolean }) {
  if (!text) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2">
      <div className={`nia-note relative w-max max-w-[calc(100vw-6.5rem)] ${visible ? "nia-note-visible" : ""}`}>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#121214] px-3 py-2 text-[12px] font-medium leading-snug text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.42)] sm:px-3.5 sm:text-[13px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
          <span>{text}</span>
        </div>
        {/* A small tab joining the note to Nia. */}
        <span className="absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-[#121214]" />
      </div>
    </div>
  );
}
