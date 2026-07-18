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

export const revalidate = 3600;

export default async function HomePage() {
  const [products, categories] = await Promise.all([api.getProducts(), api.getCategories()]);

  const featured = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8);
  const latest = [...products].sort((a, b) => b.id - a.id).slice(0, 8);

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />

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
