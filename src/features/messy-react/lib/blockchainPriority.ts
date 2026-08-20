export type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

/** Higher number = higher list priority. Unknown chains map to -99. */
const BLOCKCHAIN_PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const UNKNOWN_PRIORITY = -99;

/** Priority for sorting; unknown chains sort last / can be filtered out. */
export function getBlockchainPriority(blockchain: string): number {
  return BLOCKCHAIN_PRIORITY[blockchain as Blockchain] ?? UNKNOWN_PRIORITY;
}

export function isKnownBlockchain(blockchain: string): boolean {
  return getBlockchainPriority(blockchain) > UNKNOWN_PRIORITY;
}
