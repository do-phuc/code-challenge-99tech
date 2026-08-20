import { Markdown } from '@/shared/ui/Markdown';
import { Panel } from '@/shared/ui/Panel';
import { SplitLayout } from '@/shared/ui/SplitLayout';
import { FancyFormSolution } from '@/features/fancy-form/FancyFormSolution';
import problemMd from '@/features/fancy-form/content/problem.md?raw';

/** Problem 2: task brief (left) and interactive swap form (right). */
export function FancyFormView() {
  return (
    <SplitLayout
      left={
        <Panel title="Task">
          <Markdown content={problemMd} />
        </Panel>
      }
      right={<FancyFormSolution />}
    />
  );
}
