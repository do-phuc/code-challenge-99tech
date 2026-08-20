import { useQuery } from '@tanstack/react-query';
import { pricesKeys } from '@/features/fancy-form/api/prices.keys';
import { fetchTokenPrices } from '@/features/fancy-form/api/prices.service';

/** Server-state query for priced tokens used by the swap form. */
export function usePricesQuery() {
  return useQuery({
    queryKey: pricesKeys.list(),
    queryFn: ({ signal }) => fetchTokenPrices(signal),
  });
}
