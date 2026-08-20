/**
 * Convert an input amount from `fromPrice` (USD) into the destination token.
 * rate = fromPrice / toPrice → amountOut = amountIn * rate
 */
export function convertAmount(amountIn: number, fromPrice: number, toPrice: number): number {
  if (!Number.isFinite(amountIn) || !Number.isFinite(fromPrice) || !Number.isFinite(toPrice)) {
    return Number.NaN;
  }
  if (toPrice === 0) return Number.NaN;
  return (amountIn * fromPrice) / toPrice;
}

/** Human-readable exchange rate: 1 FROM = X TO. */
export function formatExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  fromPrice: number,
  toPrice: number,
): string {
  const rate = fromPrice / toPrice;
  if (!Number.isFinite(rate)) return '—';
  return `1 ${fromCurrency} ≈ ${formatTokenAmount(rate)} ${toCurrency}`;
}

export function formatTokenAmount(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '0';

  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 6 : 8;
  return value.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}
