import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-14 space-y-14">
      <Skeleton className="h-72 w-full rounded-3xl" />
      <ProductGridSkeleton count={8} />
    </div>
  );
}
