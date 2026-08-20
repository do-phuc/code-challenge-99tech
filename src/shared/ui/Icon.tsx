import { cn } from '@/shared/lib/cn';

type IconProps = {
  /** Public path, e.g. `/icons/back.svg`. */
  src: string;
  className?: string;
};

/**
 * Decorative icon loaded from `public/`. Uses a CSS mask so `currentColor` / text color
 * (including hover) still apply — unlike a plain `<img>`.
 */
export function Icon({ src, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
