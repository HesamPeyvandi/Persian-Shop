'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { CATEGORY_LABELS_FA } from '@/types';
import { ProductGallery } from './product-gallery';
import { AddToCartPanel } from './add-to-cart-panel';
import { ReviewsSection } from './reviews-section';
import { RelatedProducts } from './related-products';
import { RecentlyViewedTracker } from './recently-viewed-tracker';
import { RatingStars } from '@/components/product/rating-stars';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toPersianDigits } from '@/lib/utils';

export function ProductDetailClient({ id }: { id: string }) {
  const { data: product, isLoading, isError, error } = useProduct(id);
  const { data: allProducts } = useProducts();

  if (isLoading) {
    return (
      <div className="container py-10 grid md:grid-cols-2 gap-12">
        <Skeleton className="h-96 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    );
  }

  const isNotFound = error instanceof Error && error.message.includes('404');

  if (isNotFound) {
    return (
      <div className="container py-32 text-center">
        <h2 className="text-xl font-bold mb-3">محصول یافت نشد</h2>
        <p className="text-muted-foreground mb-6">این محصول وجود ندارد یا حذف شده است.</p>
        <Button asChild>
          <Link href="/products">بازگشت به محصولات</Link>
        </Button>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-32 text-center">
        <h2 className="text-xl font-bold mb-3">مشکلی پیش آمد!</h2>
        <p className="text-muted-foreground mb-6">
          متاسفانه در بارگذاری این محصول خطایی رخ داد. لطفاً دوباره تلاش کنید.
        </p>
        <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
      </div>
    );
  }

  const related = (allProducts ?? [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RecentlyViewedTracker product={product} />

      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-8" aria-label="مسیر صفحه">
        <Link href="/" className="hover:text-primary">خانه</Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href="/products" className="hover:text-primary">محصولات</Link>
        <ChevronLeft className="h-3 w-3" />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
          {CATEGORY_LABELS_FA[product.category] ?? product.category}
        </Link>
        <ChevronLeft className="h-3 w-3" />
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <ProductGallery image={product.image} title={product.title} />

        <div>
          <p className="text-sm text-primary mb-2">{CATEGORY_LABELS_FA[product.category] ?? product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold leading-relaxed mb-3">{product.title}</h1>
          <RatingStars rate={product.rating.rate} count={product.rating.count} size={16} />
          <p className="text-muted-foreground leading-8 mt-5">{product.description}</p>

          <AddToCartPanel product={product} />

          <div className="mt-8 rounded-2xl border border-border p-5">
            <h3 className="font-medium mb-3 text-sm">مشخصات محصول</h3>
            <dl className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
              <dt>دسته‌بندی</dt>
              <dd className="text-foreground">{CATEGORY_LABELS_FA[product.category] ?? product.category}</dd>
              <dt>امتیاز</dt>
              <dd className="text-foreground">{toPersianDigits(product.rating.rate)} از {toPersianDigits(5)}</dd>
              <dt>تعداد نظرات</dt>
              <dd className="text-foreground">{toPersianDigits(product.rating.count)}</dd>
            </dl>
          </div>
        </div>
      </div>

      <ReviewsSection productId={product.id} rating={product.rating} />
      <RelatedProducts products={related} />
    </div>
  );
}
