import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type SplitLayoutProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
};

/** Responsive two-column layout: stacks on small screens, side-by-side from `lg`. */
export function SplitLayout({ left, right, className }: SplitLayoutProps) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-2 lg:gap-10', className)}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  );
}
