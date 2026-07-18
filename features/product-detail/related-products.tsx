import { Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-xl font-bold mb-6">محصولات مرتبط</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
