import type { NiaChatMessage } from "@/lib/nia/types";

export function NiaMessage({ message }: { message: NiaChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-6 ${
          isUser
            ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
            : "border border-white/10 bg-white/[0.03] text-[var(--text-secondary)]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function NiaTypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Nia is typing">
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-tertiary)] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-tertiary)] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-tertiary)]" />
      </div>
    </div>
  );
}
