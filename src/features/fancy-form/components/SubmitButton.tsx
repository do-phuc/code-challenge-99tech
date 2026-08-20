import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';

type SubmitButtonProps = {
  id: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

/** Primary exchange CTA with loading label. */
export function SubmitButton({
  id,
  loading = false,
  disabled = false,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      id={id}
      type="submit"
      variant="primary"
      size="md"
      disabled={disabled || loading}
      className={cn('w-full normal-case tracking-normal', className)}
      aria-busy={loading}
    >
      {loading ? 'Exchanging…' : 'Exchange'}
    </Button>
  );
}
