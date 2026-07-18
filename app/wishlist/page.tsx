'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/wishlist-context';
import { ProductGrid } from '@/components/product/product-grid';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { items, hydrated } = useWishlist();

  if (!hydrated) return null;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-8">علاقه‌مندی‌های من</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-16">
          <Heart className="h-14 w-14 text-muted-foreground" />
          <p className="text-muted-foreground">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
          <Button asChild>
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
