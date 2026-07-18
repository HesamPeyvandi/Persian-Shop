import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-11 max-w-md w-full mb-8" />
      <Skeleton className="h-9 w-52 mb-8" />
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <Skeleton className="hidden lg:block h-96 w-full" />
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
}
