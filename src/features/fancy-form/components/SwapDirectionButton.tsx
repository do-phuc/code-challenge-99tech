import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { cn } from '@/shared/lib/cn';

type SwapDirectionButtonProps = {
  id: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

/** Flip from/to tokens. */
export function SwapDirectionButton({
  id,
  onClick,
  disabled = false,
  className,
}: SwapDirectionButtonProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <Button
        id={id}
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={onClick}
        aria-label="Swap token direction"
        className="rounded-full px-3 normal-case tracking-normal"
      >
        <Icon src="/icons/swap.svg" className="size-4" />
        Swap
      </Button>
    </div>
  );
}
