import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import type { AppPath } from '@/shared/lib/routes';

type CardProps = {
  id: string;
  to: AppPath;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Navigational card. Always a real link so open-in-new-tab and keyboard nav work.
 */
export const Card = memo(function Card({ id, to, eyebrow, title, children, className }: CardProps) {
  return (
    <Link
      id={id}
      to={to}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-[rgba(240,199,94,0.28)] p-6',
        'bg-[linear-gradient(165deg,rgba(12,47,38,0.96)_0%,rgba(8,28,22,0.98)_100%)]',
        'shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,249,240,0.08)]',
        'transition-[border-color,transform,box-shadow] duration-300 ease-in-out',
        'hover:-translate-y-0.5 hover:border-[rgba(240,199,94,0.55)]',
        className,
      )}
    >
      <p className="lux-mono m-0">{eyebrow}</p>
      <h2 className="lux-heading m-0 text-xl text-fg">{title}</h2>
      <p className="lux-body m-0 text-sm">{children}</p>
    </Link>
  );
});
