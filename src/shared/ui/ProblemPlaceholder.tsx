type ProblemPlaceholderProps = {
  label: string;
};

/** Empty region for a problem page. Replace this with the real solution later. */
export function ProblemPlaceholder({ label }: ProblemPlaceholderProps) {
  return <section aria-label={label} />;
}
