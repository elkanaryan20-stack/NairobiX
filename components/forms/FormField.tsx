import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useId, useRef } from "react";

export function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  // An icon as well as colour, so the error doesn't depend on seeing red.
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm leading-5 text-red-300">
      <span
        aria-hidden="true"
        className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-red-300/70 text-[10px] font-bold leading-none"
      >
        !
      </span>
      <span>{message}</span>
    </p>
  );
}

export function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{number}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{description}</p> : null}
    </div>
  );
}

export function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  helperText,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric";
}) {
  const errorId = useId();
  return (
    <label className="block text-sm font-medium text-[var(--text-secondary)]">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="mt-2 w-full rounded-[var(--radius-card)] border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      />
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} id={errorId} />
    </label>
  );
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  rows = 5,
  error,
  helperText,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  helperText?: string;
}) {
  const errorId = useId();
  return (
    <label className="block text-sm font-medium text-[var(--text-secondary)]">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <textarea
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[var(--radius-card)] border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      />
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} id={errorId} />
    </label>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string }>;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block text-sm font-medium text-[var(--text-secondary)]">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-[var(--radius-card)] border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      >
        <option value="" className="text-[var(--text-tertiary)]">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-white bg-[#121417]">
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </label>
  );
}

export function ChipGroup({
  label,
  name,
  options,
  selected,
  onSelect,
  error,
  helperText,
  allowSingleSelection = false,
}: {
  label: string;
  name: string;
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  error?: string;
  helperText?: string;
  allowSingleSelection?: boolean;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;

    if (next !== null) {
      event.preventDefault();
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="block text-sm font-medium text-[var(--text-secondary)]">
      <span className="flex items-center gap-2">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label={name}>
        {options.map((option, index) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              onClick={() => onSelect(option)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-full border px-4 py-3 text-sm transition ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-[0_0_0_1px_rgba(249,115,22,0.2)]"
                  : "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/[0.04]"
              } ${allowSingleSelection ? "min-w-[184px]" : ""}`}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} />
    </div>
  );
}

export function FormFooter({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">{children}</div>;
}
