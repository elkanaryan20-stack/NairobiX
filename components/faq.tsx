import { Card } from "@/components/ui/Card";

type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card
          key={item.question}
          as="details"
          variant="outline"
          className="group p-5 text-left"
          open={index === 0}
        >
          <summary className="cursor-pointer list-none text-base font-medium text-white marker:content-none">
            <span className="flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span className="text-xl text-[var(--color-primary)] transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
        </Card>
      ))}
    </div>
  );
}
