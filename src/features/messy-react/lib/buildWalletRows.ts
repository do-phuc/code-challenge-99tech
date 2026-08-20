import { getBlockchainPriority } from '@/features/messy-react/lib/blockchainPriority';

export type WalletBalance = {
  currency: string;
  amount: number;
  blockchain: string;
};

export type PriceMap = Record<string, number>;

export type WalletRowViewModel = {
  id: string;
  currency: string;
  blockchain: string;
  amount: number;
  formattedAmount: string;
  usdValue: number;
  priority: number;
};

/**
 * Filter known chains with positive balances, sort by priority desc,
 * and build display rows in one pass over the sorted result.
 */
export function buildWalletRows(
  balances: WalletBalance[],
  prices: PriceMap,
): WalletRowViewModel[] {
  return balances
    .map((balance) => ({
      ...balance,
      priority: getBlockchainPriority(balance.blockchain),
    }))
    .filter((balance) => balance.priority > -99 && balance.amount > 0)
    .sort((lhs, rhs) => rhs.priority - lhs.priority)
    .map((balance) => {
      const price = prices[balance.currency] ?? 0;
      return {
        id: `${balance.blockchain}:${balance.currency}`,
        currency: balance.currency,
        blockchain: balance.blockchain,
        amount: balance.amount,
        formattedAmount: balance.amount.toFixed(2),
        usdValue: price * balance.amount,
        priority: balance.priority,
      };
    });
}
