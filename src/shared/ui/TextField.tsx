import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  pattern?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

/** Labeled text/number input used by interactive demos. */
export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  inputMode,
  pattern,
  placeholder,
  className,
  inputClassName,
}: TextFieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="lux-caption m-0 text-fg-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full rounded-lux-lg border border-border bg-bg px-3 py-2 font-mono text-sm text-fg',
          'placeholder:text-fg-dim focus-visible:border-champagne',
          inputClassName,
        )}
      />
    </div>
  );
}
