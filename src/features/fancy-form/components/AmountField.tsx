import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';
import { cn } from '@/shared/lib/cn';

type AmountFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
  readOnly?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
};

/** Decimal amount input with optional validation message. */
export function AmountField({
  id,
  label,
  value,
  onChange,
  onBlur,
  name,
  inputRef,
  readOnly = false,
  error,
  placeholder = '0.0',
  className,
}: AmountFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="lux-caption m-0 text-fg-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        ref={inputRef}
        type="text"
        inputMode="decimal"
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          'h-11 w-full rounded-lux-lg border bg-bg px-3 font-mono text-sm leading-none text-fg',
          'placeholder:text-fg-dim focus-visible:border-champagne',
          error ? 'border-[color:var(--color-danger,#e5484d)]' : 'border-border',
          readOnly && 'cursor-default text-fg-med',
        )}
      />
      {error ? (
        <p
          id={describedBy}
          className="m-0 text-xs text-[color:var(--color-danger,#e5484d)]"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
