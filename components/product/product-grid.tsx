import { Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';
import { PackageSearch } from 'lucide-react';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-muted-foreground">
        <PackageSearch className="h-14 w-14" />
        <p className="font-medium">محصولی با این مشخصات پیدا نشد</p>
        <p className="text-sm">فیلترها یا عبارت جستجو را تغییر دهید.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
