import { cn } from '@/shared/lib/cn';
import { TokenIcon } from '@/features/fancy-form/components/TokenIcon';
import type { TokenOption } from '@/features/fancy-form/api/prices.service';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

type TokenSelectProps = {
  id: string;
  label: string;
  value: string | null;
  options: TokenOption[];
  onChange: (currency: string) => void;
  disabled?: boolean;
  className?: string;
};

/** Searchable token picker with icon (prices are not shown in the list). */
export function TokenSelect({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
  className,
}: TokenSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.currency === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.currency.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | PointerEvent) {
      const root = rootRef.current;
      if (!root || !(event.target instanceof Node)) return;
      if (!root.contains(event.target)) {
        setOpen(false);
        setQuery('');
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn('relative flex min-w-0 flex-col gap-1.5', className)}
    >
      <label htmlFor={id} className="lux-caption m-0 text-fg-muted">
        {label}
      </label>

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-11 w-full cursor-pointer items-center gap-2 rounded-lux-lg border border-border bg-bg px-3 text-left text-sm text-fg',
          'hover:border-champagne focus-visible:border-champagne',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {selected ? (
          <>
            <TokenIcon currency={selected.currency} />
            <span className="font-medium">{selected.currency}</span>
          </>
        ) : (
          <span className="text-fg-dim">Select token</span>
        )}
      </button>

      {open ? (
        <div
          className="absolute top-full z-20 mt-1 w-full overflow-hidden rounded-lux-lg border border-border bg-bg-elevated shadow-[0_18px_50px_-22px_rgba(0,0,0,0.55)]"
          role="presentation"
        >
          <input
            type="search"
            value={query}
            placeholder="Search token"
            aria-label={`Search ${label}`}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full border-b border-border-faint bg-transparent px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-dim focus-visible:outline-none"
          />
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-fg-muted">No tokens found</li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.currency === value;
                return (
                  <li key={option.currency} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      id={`${id}-option-${option.currency}`}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm',
                        isSelected ? 'bg-bg-subtle text-champagne' : 'text-fg hover:bg-bg-subtle',
                      )}
                      onClick={() => {
                        onChange(option.currency);
                        setOpen(false);
                        setQuery('');
                      }}
                    >
                      <TokenIcon currency={option.currency} />
                      <span className="font-medium">{option.currency}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
