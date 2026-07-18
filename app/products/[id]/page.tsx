import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { CATEGORY_LABELS_FA } from '@/types';
import { ProductGallery } from '@/features/product-detail/product-gallery';
import { AddToCartPanel } from '@/features/product-detail/add-to-cart-panel';
import { ReviewsSection } from '@/features/product-detail/reviews-section';
import { RelatedProducts } from '@/features/product-detail/related-products';
import { RecentlyViewedTracker } from '@/features/product-detail/recently-viewed-tracker';
import { RatingStars } from '@/components/product/rating-stars';
import { ChevronLeft } from 'lucide-react';
import { toPersianDigits } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

async function getProductSafe(id: string) {
  try {
    return await api.getProduct(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductSafe(params.id);
  if (!product) return { title: 'محصول یافت نشد' };
  return {
    title: product.title,
    description: product.description.slice(0, 150),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 150),
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductSafe(params.id);
  if (!product) notFound();

  const allProducts = await api.getProducts().catch(() => []);
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

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
