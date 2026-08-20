import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type PanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** Labeled content panel used for Problem / Solution columns. */
export function Panel({ title, children, className }: PanelProps) {
  return (
    <section
      className={cn(
        'flex h-full flex-col gap-5 rounded-2xl border border-border-faint bg-bg-elevated/60 p-5 sm:p-6',
        className,
      )}
    >
      <h2 className="lux-heading m-0 text-2xl text-fg">{title}</h2>
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
