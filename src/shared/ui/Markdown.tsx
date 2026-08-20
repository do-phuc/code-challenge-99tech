import MarkdownLib from 'react-markdown';
import type { Components } from 'react-markdown';
import { CodeBlock } from '@/shared/ui/CodeBlock';
import { InlineCode } from '@/shared/ui/InlineCode';
import { cn } from '@/shared/lib/cn';

type MarkdownProps = {
  content: string;
  className?: string;
};

const components: Components = {
  h1: ({ children }) => <h3 className="lux-heading m-0 mb-3 text-2xl text-fg">{children}</h3>,
  h2: ({ children }) => <h3 className="lux-heading m-0 mb-3 text-xl text-fg">{children}</h3>,
  h3: ({ children }) => <h4 className="lux-heading m-0 mb-2 text-lg text-fg">{children}</h4>,
  p: ({ children }) => (
    <p className="lux-body m-0 mb-4 last:mb-0 text-base text-fg-med">{children}</p>
  ),
  em: ({ children }) => <em className="text-fg-muted">{children}</em>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  ul: ({ children }) => (
    <ul className="lux-body m-0 mb-4 list-disc space-y-2 pl-5 text-fg-med last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="lux-body m-0 mb-4 list-decimal space-y-2 pl-5 text-fg-med last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ className, children }) => {
    const text = String(children).replace(/\n$/, '');
    const language = /language-(\w+)/.exec(className ?? '')?.[1];

    if (language || text.includes('\n')) {
      return (
        <CodeBlock code={text} language={language ?? 'javascript'} className="mb-4 last:mb-0" />
      );
    }

    return <InlineCode>{text}</InlineCode>;
  },
  pre: ({ children }) => <>{children}</>,
};

/** Renders markdown with shared typography and code components. */
export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn('markdown', className)}>
      <MarkdownLib components={components}>{content}</MarkdownLib>
    </div>
  );
}
