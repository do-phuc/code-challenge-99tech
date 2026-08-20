import type { PriceMap } from '@/features/messy-react/lib/buildWalletRows';

const MOCK_PRICES: PriceMap = {
  OSMO: 0.82,
  ETH: 1645.93,
  ZIL: 0.021,
  NEO: 12.4,
  USDC: 1,
};

/** Mock USD price map hook (interview sample data). */
export function usePrices(): PriceMap {
  return MOCK_PRICES;
}
