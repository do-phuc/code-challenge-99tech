import type { WalletBalance } from '@/features/messy-react/lib/buildWalletRows';

const MOCK_BALANCES: WalletBalance[] = [
  { currency: 'OSMO', amount: 120.5, blockchain: 'Osmosis' },
  { currency: 'ETH', amount: 1.25, blockchain: 'Ethereum' },
  { currency: 'ETH', amount: 0.4, blockchain: 'Arbitrum' },
  { currency: 'ZIL', amount: 0, blockchain: 'Zilliqa' },
  { currency: 'NEO', amount: 15, blockchain: 'Neo' },
  { currency: 'UNKNOWN', amount: 99, blockchain: 'Solana' },
  { currency: 'USDC', amount: -2, blockchain: 'Ethereum' },
];

/** Mock wallet balances hook (interview sample data). */
export function useWalletBalances(): WalletBalance[] {
  return MOCK_BALANCES;
}
