export type PriceRow = {
  currency: string;
  date: string;
  price: number;
};

export type TokenOption = {
  currency: string;
  price: number;
  date: string;
};

const PRICES_URL = 'https://interview.switcheo.com/prices.json';

/**
 * Fetch token prices and normalize to a unique currency map.
 * Duplicate currencies keep the latest dated entry; non-finite prices are dropped.
 */
export async function fetchTokenPrices(signal?: AbortSignal): Promise<TokenOption[]> {
  const response = await fetch(PRICES_URL, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load prices (${response.status})`);
  }

  const rows = (await response.json()) as PriceRow[];
  return normalizePriceRows(rows);
}

export function normalizePriceRows(rows: PriceRow[]): TokenOption[] {
  const byCurrency = new Map<string, TokenOption>();

  for (const row of rows) {
    if (!row.currency || !Number.isFinite(row.price)) continue;

    const existing = byCurrency.get(row.currency);
    if (!existing || Date.parse(row.date) >= Date.parse(existing.date)) {
      byCurrency.set(row.currency, {
        currency: row.currency,
        price: row.price,
        date: row.date,
      });
    }
  }

  return [...byCurrency.values()].sort((a, b) => a.currency.localeCompare(b.currency));
}
