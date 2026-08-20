import { Panel } from '@/shared/ui/Panel';
import { Markdown } from '@/shared/ui/Markdown';
import { CodeBlock } from '@/shared/ui/CodeBlock';
import { WalletPage } from '@/features/messy-react/components/WalletPage';
import { REFACTORED_WALLET_PAGE } from '@/features/messy-react/content/refactoredCode';
import issuesMd from '@/features/messy-react/content/issues.md?raw';

/** Solution column: issue list, live demo, and refactored code. */
export function MessyReactSolution() {
  return (
    <Panel title="Analysis & refactor">
      <div className="flex flex-col gap-6">
        <Markdown content={issuesMd} />

        <div className="flex flex-col gap-3">
          <h3 className="lux-heading m-0 text-xl text-fg">Refactored code</h3>
          <CodeBlock code={REFACTORED_WALLET_PAGE} language="tsx" />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="lux-heading m-0 text-xl text-fg">Live refactored list</h3>
          <p className="lux-body m-0 text-base text-fg-med">
            Mock balances are filtered to known chains with amount &gt; 0, sorted by chain
            priority, then priced in USD.
          </p>
          <WalletPage />
        </div>
      </div>
    </Panel>
  );
}
