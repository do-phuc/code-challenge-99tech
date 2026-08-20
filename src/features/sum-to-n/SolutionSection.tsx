import { useId, useMemo, useState } from 'react';
import { CodeBlock } from '@/shared/ui/CodeBlock';
import { TextField } from '@/shared/ui/TextField';
import { cn } from '@/shared/lib/cn';
import type { SumToNFn } from '@/features/sum-to-n/sumToN.solutions';

type SolutionSectionProps = {
  id: string;
  title: string;
  description: string;
  code: string;
  run: SumToNFn;
  className?: string;
};

const PLACEHOLDER = 'Enter a positive integer (e.g. 5)';

/** Digits only; strip leading zeros so the value never starts with 0. */
function sanitizePositiveIntegerInput(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.replace(/^0+/, '');
}

function parsePositiveInteger(raw: string): number | null {
  if (raw === '' || raw.startsWith('0')) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 1) return null;
  return value;
}

/** One solution approach: code sample plus a live try-it input and result. */
export function SolutionSection({
  id,
  title,
  description,
  code,
  run,
  className,
}: SolutionSectionProps) {
  const inputId = useId();
  const resultId = `${id}-result`;
  const [raw, setRaw] = useState('');

  const result = useMemo(() => {
    const n = parsePositiveInteger(raw);
    if (n === null) return null;
    try {
      return run(n);
    } catch {
      return 'Error';
    }
  }, [raw, run]);

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border-faint bg-bg/40 p-4',
        className,
      )}
    >
      <header className="flex flex-col gap-1">
        <h3 className="lux-heading m-0 text-lg text-fg">{title}</h3>
        <p className="lux-body m-0 text-sm">{description}</p>
      </header>

      <CodeBlock code={code} />

      <div className="flex flex-wrap items-end gap-4">
        <TextField
          id={inputId}
          label="n"
          type="text"
          inputMode="numeric"
          pattern="[1-9][0-9]*"
          value={raw}
          placeholder={PLACEHOLDER}
          onChange={(value) => setRaw(sanitizePositiveIntegerInput(value))}
          className="w-56 sm:w-64"
        />
        <p id={resultId} className="lux-body m-0 pb-2 text-sm text-fg-high" aria-live="polite">
          Result:{' '}
          <span className="font-mono text-champagne">{result === null ? '—' : String(result)}</span>
        </p>
      </div>
    </article>
  );
}
