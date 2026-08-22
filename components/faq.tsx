type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left" open={item.question === items[0]?.question}>
          <summary className="cursor-pointer list-none text-base font-medium text-white marker:content-none">
            <span className="flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span className="text-xl text-[var(--color-primary)] transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
