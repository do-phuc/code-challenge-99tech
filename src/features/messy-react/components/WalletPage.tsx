import { useMemo } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { usePrices } from '@/features/messy-react/api/usePrices';
import { useWalletBalances } from '@/features/messy-react/api/useWalletBalances';
import { WalletRow } from '@/features/messy-react/components/WalletRow';
import { buildWalletRows } from '@/features/messy-react/lib/buildWalletRows';
import { cn } from '@/shared/lib/cn';

type WalletPageProps = ComponentPropsWithoutRef<'div'>;

/** Refactored wallet balances page: typed, filtered, sorted, single derived list. */
export function WalletPage({ className, ...rest }: WalletPageProps) {
  const balances = useWalletBalances();
  const prices = usePrices();

  const rows = useMemo(
    () => buildWalletRows(balances, prices),
    [balances, prices],
  );

  return (
    <div className={cn('flex flex-col gap-2', className)} {...rest}>
      {rows.length === 0 ? (
        <p className="lux-caption m-0">No positive balances on supported chains.</p>
      ) : (
        rows.map((row) => (
          <WalletRow
            key={row.id}
            currency={row.currency}
            blockchain={row.blockchain}
            amount={row.amount}
            usdValue={row.usdValue}
            formattedAmount={row.formattedAmount}
          />
        ))
      )}
    </div>
  );
}
