import { cn } from '@/shared/lib/cn';

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};

/** Preformatted code surface for solution snippets. */
export function CodeBlock({ code, language = 'javascript', className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'm-0 overflow-x-auto rounded-xl border border-border-faint bg-bg p-4 font-mono text-sm leading-relaxed text-fg-high',
        className,
      )}
    >
      <code className={`language-${language}`}>{code.trimEnd()}</code>
    </pre>
  );
}
