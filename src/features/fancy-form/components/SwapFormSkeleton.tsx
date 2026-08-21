import { cn } from '@/shared/lib/cn';

type SkeletonBoneProps = {
  className?: string;
};

function SkeletonBone({ className }: SkeletonBoneProps) {
  return <div className={cn('animate-pulse rounded-lux-lg bg-bg-subtle', className)} />;
}

/** Field column: caption + control height matching TokenSelect / AmountField. */
function FieldSkeleton() {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <SkeletonBone className="h-3 w-14" />
      <SkeletonBone className="h-11 w-full" />
    </div>
  );
}

/** Layout-matched skeleton shown while prices.json is loading. */
export function SwapFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading token prices"
    >
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-faint bg-bg/40 p-4 sm:grid-cols-2">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>

      <div className="flex justify-center">
        <SkeletonBone className="h-9 w-24 rounded-full" />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border-faint bg-bg/40 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
      </div>

      <SkeletonBone className="h-11 w-full rounded-full" />

      <span className="h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        Loading token prices…
      </span>
    </div>
  );
}
