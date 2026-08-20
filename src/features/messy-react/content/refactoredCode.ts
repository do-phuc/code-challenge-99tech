/** Display string for the refactored solution (shown next to the live demo). */
export const REFACTORED_WALLET_PAGE = `
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

const BLOCKCHAIN_PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

function getBlockchainPriority(blockchain: string): number {
  return BLOCKCHAIN_PRIORITY[blockchain as Blockchain] ?? -99;
}

type WalletBalance = {
  currency: string;
  amount: number;
  blockchain: string;
};

type PriceMap = Record<string, number>;

function buildWalletRows(balances: WalletBalance[], prices: PriceMap) {
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
        id: \`\${balance.blockchain}:\${balance.currency}\`,
        currency: balance.currency,
        blockchain: balance.blockchain,
        amount: balance.amount,
        formattedAmount: balance.amount.toFixed(2),
        usdValue: price * balance.amount,
      };
    });
}

type WalletPageProps = React.ComponentPropsWithoutRef<'div'>;

function WalletPage({ className, ...rest }: WalletPageProps) {
  const balances = useWalletBalances();
  const prices = usePrices();

  const rows = useMemo(
    () => buildWalletRows(balances, prices),
    [balances, prices],
  );

  return (
    <div className={className} {...rest}>
      {rows.map((row) => (
        <WalletRow
          key={row.id}
          currency={row.currency}
          blockchain={row.blockchain}
          amount={row.amount}
          usdValue={row.usdValue}
          formattedAmount={row.formattedAmount}
        />
      ))}
    </div>
  );
}
`.trim();
