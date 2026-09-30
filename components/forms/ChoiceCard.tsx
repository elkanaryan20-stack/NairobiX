"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef } from "react";
import { FieldError } from "@/components/forms/FormField";

export type ChoiceOption = { label: string; value: string; description?: string };

function normalizeOptions(options: Array<string | ChoiceOption>): ChoiceOption[] {
  return options.map((option) => (typeof option === "string" ? { label: option, value: option } : option));
}

// Shared arrow-key/Home/End roving navigation for a row of option buttons —
// moving focus always also moves the current selection, matching native
// radiogroup behavior (ARIA APG "radio group" pattern).
function useRovingIndex(count: number, onMove: (index: number) => void) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;

    if (next !== null) {
      event.preventDefault();
      onMove(next);
      refs.current[next]?.focus();
    }
  };

  return { refs, handleKeyDown };
}

const ACTIVE_CLASSES =
  "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-[0_0_0_1px_rgba(249,115,22,0.2)]";
const INACTIVE_CLASSES =
  "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/[0.04]";

/**
 * A real single-choice control (role="radiogroup" + role="radio") built as
 * cards instead of a native <select> — for questions with one right answer
 * where seeing every option at once helps ("Choose one."). Replaces
 * FormSelect wherever a dropdown was only ever hiding a short, fixed list.
 */
export function SingleChoiceCards({
  label,
  name,
  options,
  value,
  onSelect,
  required,
  error,
  helperText,
  columns = 2,
}: {
  label: string;
  name: string;
  options: Array<string | ChoiceOption>;
  value: string;
  onSelect: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  columns?: 1 | 2 | 3;
}) {
  const labelId = useId();
  const normalized = normalizeOptions(options);
  const { refs, handleKeyDown } = useRovingIndex(normalized.length, (index) => onSelect(normalized[index].value));

  const gridCols = columns === 1 ? "grid-cols-1" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="block text-sm font-medium text-[var(--text-secondary)]">
      <span id={labelId} className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <div role="radiogroup" aria-labelledby={labelId} data-name={name} className={`mt-3 grid grid-cols-1 gap-2.5 ${gridCols}`}>
        {normalized.map((option, index) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active || (!value && index === 0) ? 0 : -1}
              onClick={() => onSelect(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-[var(--radius-card)] border px-4 py-3.5 text-left text-sm transition ${active ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
            >
              <span className="block font-medium">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-xs text-[var(--text-tertiary)]">{option.description}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} />
    </div>
  );
}

/**
 * Multi-select cards with room for a one-line description per option (e.g.
 * "Contribution Areas") — for compact option lists with no description, use
 * ChipGroup (components/forms/FormField.tsx) instead. "Select all that
 * apply" is implied by the group itself using toggle buttons
 * (aria-pressed), the correct ARIA pattern for multi-select — not a
 * radiogroup.
 */
export function MultiChoiceCards({
  label,
  name,
  options,
  selected,
  onToggle,
  required,
  error,
  helperText,
  columns = 2,
}: {
  label: string;
  name: string;
  options: Array<string | ChoiceOption>;
  selected: string[];
  onToggle: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  columns?: 1 | 2 | 3;
}) {
  const labelId = useId();
  const normalized = normalizeOptions(options);
  const { refs, handleKeyDown } = useRovingIndex(normalized.length, () => {});

  const gridCols = columns === 1 ? "grid-cols-1" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="block text-sm font-medium text-[var(--text-secondary)]">
      <span id={labelId} className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <div role="group" aria-labelledby={labelId} data-name={name} className={`mt-3 grid grid-cols-1 gap-2.5 ${gridCols}`}>
        {normalized.map((option, index) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-[var(--radius-card)] border px-4 py-3.5 text-left text-sm transition ${active ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
            >
              <span className="block font-medium">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-xs text-[var(--text-tertiary)]">{option.description}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} />
    </div>
  );
}

/**
 * A compact single choice for short, scannable answers (business stage,
 * rough volumes, timing) — a radiogroup of pill segments that wraps on
 * narrow screens rather than shrinking. Same roving-focus behaviour as
 * SingleChoiceCards; every segment is at least 44px tall.
 */
export function SegmentedControl({
  label,
  name,
  options,
  value,
  onSelect,
  required,
  error,
  helperText,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
}) {
  const labelId = useId();
  const { refs, handleKeyDown } = useRovingIndex(options.length, (index) => onSelect(options[index]));

  return (
    <div className="block text-sm font-medium text-[var(--text-secondary)]">
      <span id={labelId} className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <div role="radiogroup" aria-labelledby={labelId} data-name={name} className="mt-3 flex flex-wrap gap-2">
        {options.map((option, index) => {
          const active = value === option;
          return (
            <button
              key={option}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active || (!value && index === 0) ? 0 : -1}
              onClick={() => onSelect(option)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`min-h-11 rounded-full border px-4 text-sm transition duration-200 ${active ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
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

/**
 * Multi-select chips where the stored value can differ from the visible
 * label — e.g. a friendly "WhatsApp" label that must submit Zoho's exact
 * "WhatsApp Business" picklist value. Toggle buttons (aria-pressed), the
 * correct ARIA pattern for multi-select.
 */
export function ChipSelect({
  label,
  name,
  options,
  selected,
  onToggle,
  required,
  error,
  helperText,
}: {
  label: string;
  name: string;
  options: Array<string | { label: string; value: string }>;
  selected: string[];
  onToggle: (value: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
}) {
  const labelId = useId();
  const normalized = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
  const { refs, handleKeyDown } = useRovingIndex(normalized.length, () => {});

  return (
    <div className="block text-sm font-medium text-[var(--text-secondary)]">
      <span id={labelId} className="flex items-center gap-2">
        {label}
        {required ? <span className="text-[var(--color-primary)]">*</span> : null}
      </span>
      <div role="group" aria-labelledby={labelId} data-name={name} className="mt-3 flex flex-wrap gap-2">
        {normalized.map((option, index) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`min-h-11 rounded-full border px-4 text-sm transition duration-200 ${active ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {helperText ? <span className="mt-2 block text-xs text-[var(--text-tertiary)]">{helperText}</span> : null}
      <FieldError message={error} />
    </div>
  );
}
