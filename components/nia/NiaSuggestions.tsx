const SUGGESTIONS = [
  "What does NairobiX do?",
  "I need more customers for my business",
  "I want to book a consultation",
  "Tell me about the Business Growth Audit",
];

export function NiaSuggestions({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-left text-xs text-[var(--text-secondary)] transition hover:border-[var(--color-primary)]/40 hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
