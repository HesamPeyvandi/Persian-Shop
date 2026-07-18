import { api } from '@/services/api';
import { HeroSection } from '@/features/home/hero-section';
import { CategoriesSection } from '@/features/home/categories-section';
import { ProductGrid } from '@/components/product/product-grid';
import {
  WhyChooseUsSection,
  TestimonialsSection,
  FaqSection,
  NewsletterSection,
  BrandLogosSection,
} from '@/features/home/info-sections';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [productsResult, categoriesResult] = await Promise.allSettled([
    api.getProducts(),
    api.getCategories(),
  ]);

  const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];

  const featured = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8);
  const latest = [...products].sort((a, b) => b.id - a.id).slice(0, 8);

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />

      {products.length === 0 && (
        <div className="container py-6">
          <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            در حال حاضر امکان بارگذاری محصولات وجود ندارد. لطفاً چند لحظه دیگر صفحه را رفرش کنید.
          </div>
        </div>
      )}

      <section className="container py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">محصولات ویژه</h2>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="container py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">جدیدترین محصولات</h2>
        </div>
        <ProductGrid products={latest} />
      </section>

      <WhyChooseUsSection />
      <TestimonialsSection />
      <BrandLogosSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
