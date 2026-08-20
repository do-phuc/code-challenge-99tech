import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type InlineCodeProps = {
  children: ReactNode;
  className?: string;
};

/** Inline monospace token used inside prose. */
export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'rounded-lux-md bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.875em] text-champagne',
        className,
      )}
    >
      {children}
    </code>
  );
}
