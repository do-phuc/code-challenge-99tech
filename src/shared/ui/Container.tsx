import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20', className)}>
      {children}
    </div>
  );
}
