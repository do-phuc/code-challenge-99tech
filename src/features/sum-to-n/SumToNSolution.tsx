import { InlineCode } from '@/shared/ui/InlineCode';
import { Panel } from '@/shared/ui/Panel';
import { SolutionSection } from '@/features/sum-to-n/SolutionSection';
import { SUM_TO_N_SOLUTIONS } from '@/features/sum-to-n/sumToN.solutions';

/** Interactive solution column: one section per implementation. */
export function SumToNSolution() {
  return (
    <Panel title="Solution">
      <div className="flex flex-col gap-5">
        <p className="lux-body m-0 text-base text-fg-med">
          Three unique implementations of <InlineCode>sum_to_n</InlineCode>.
        </p>

        <div className="flex flex-col gap-4">
          {SUM_TO_N_SOLUTIONS.map((solution) => (
            <SolutionSection
              key={solution.id}
              id={solution.id}
              title={solution.title}
              description={solution.description}
              code={solution.code}
              run={solution.run}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
