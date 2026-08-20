import { Markdown } from '@/shared/ui/Markdown';
import { Panel } from '@/shared/ui/Panel';
import { SplitLayout } from '@/shared/ui/SplitLayout';
import { MessyReactSolution } from '@/features/messy-react/MessyReactSolution';
import problemMd from '@/features/messy-react/content/problem.md?raw';

/** Problem 3: original messy code (left) and analysis + refactor (right). */
export function MessyReactView() {
  return (
    <SplitLayout
      left={
        <Panel title="Task">
          <Markdown content={problemMd} />
        </Panel>
      }
      right={<MessyReactSolution />}
    />
  );
}
