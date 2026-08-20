import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { getTokenIconUrl } from '@/features/fancy-form/lib/tokenIconUrl';

type TokenIconProps = {
  currency: string;
  className?: string;
};

/** Token icon from Switcheo CDN with initials fallback if the image fails. */
export function TokenIcon({ currency, className }: TokenIconProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-subtle text-[0.625rem] font-semibold text-champagne',
          className,
        )}
      >
        {currency.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={getTokenIconUrl(currency)}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('size-6 shrink-0 rounded-full bg-bg object-cover', className)}
    />
  );
}
