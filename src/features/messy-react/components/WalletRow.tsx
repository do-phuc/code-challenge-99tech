import { cn } from '@/shared/lib/cn';

type WalletRowProps = {
  currency: string;
  blockchain: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
};

/** Single wallet balance row for the refactored list. */
export function WalletRow({
  currency,
  blockchain,
  usdValue,
  formattedAmount,
  className,
}: WalletRowProps) {
  const usdLabel = usdValue.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_auto] items-center gap-3 rounded-lux-lg border border-border-faint bg-bg/40 px-3 py-2.5',
        className,
      )}
    >
      <div className="min-w-0">
        <p className="m-0 text-sm font-medium text-fg">
          {currency}{' '}
          <span className="font-normal text-fg-muted">· {blockchain}</span>
        </p>
        <p className="lux-caption m-0 mt-0.5">{formattedAmount}</p>
      </div>
      <p className="m-0 font-mono text-sm text-champagne">{usdLabel}</p>
    </div>
  );
}
