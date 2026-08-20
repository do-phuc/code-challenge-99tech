import { Markdown } from '@/shared/ui/Markdown';
import { Panel } from '@/shared/ui/Panel';
import { SplitLayout } from '@/shared/ui/SplitLayout';
import { SumToNSolution } from '@/features/sum-to-n/SumToNSolution';
import problemMd from '@/features/sum-to-n/content/problem.md?raw';

/** Problem 1: task brief (left) and interactive solutions (right). */
export function SumToNView() {
  return (
    <SplitLayout
      left={
        <Panel title="Problem">
          <Markdown content={problemMd} />
        </Panel>
      }
      right={<SumToNSolution />}
    />
  );
}
