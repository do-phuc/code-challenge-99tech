import { Panel } from '@/shared/ui/Panel';
import { SwapForm } from '@/features/fancy-form/components/SwapForm';

/** Solution column: interactive currency swap form. */
export function FancyFormSolution() {
  return (
    <Panel title="Solution">
      <div className="flex flex-col gap-4">
        <p className="lux-body m-0 text-base text-fg-med">
          Choose the tokens you want to swap, enter an amount, then tap Exchange to see how much
          you receive at the current rate.
        </p>
        <SwapForm />
      </div>
    </Panel>
  );
}
