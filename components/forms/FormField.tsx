import type { ChangeEvent, ReactNode } from "react";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-300">{message}</p>;
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
      {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{description}</p> : null}
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
}) {
  return (
    <label className="block text-sm font-medium text-slate-200">
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
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white placeholder:text-slate-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      />
      {helperText ? <span className="mt-2 block text-xs text-slate-400">{helperText}</span> : null}
      <FieldError message={error} />
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
  return (
    <label className="block text-sm font-medium text-slate-200">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white placeholder:text-slate-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      />
      {helperText ? <span className="mt-2 block text-xs text-slate-400">{helperText}</span> : null}
      <FieldError message={error} />
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
    <label className="block text-sm font-medium text-slate-200">
      <span className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121417] px-4 py-3.5 text-base text-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      >
        <option value="" className="text-slate-500">Select an option</option>
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
  return (
    <div className="block text-sm font-medium text-slate-200">
      <span className="flex items-center gap-2">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label={name}>
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-[0_0_0_1px_rgba(249,115,22,0.2)]"
                  : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
              } ${allowSingleSelection ? "min-w-[184px]" : ""}`}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
      {helperText ? <span className="mt-2 block text-xs text-slate-400">{helperText}</span> : null}
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
