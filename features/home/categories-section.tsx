import Link from 'next/link';
import { Shirt, Gem, Cpu, Sparkles } from 'lucide-react';
import { CATEGORY_LABELS_FA } from '@/types';

const ICONS: Record<string, React.ElementType> = {
  "men's clothing": Shirt,
  "women's clothing": Sparkles,
  jewelery: Gem,
  electronics: Cpu,
};

export function CategoriesSection({ categories }: { categories: string[] }) {
  return (
    <section className="container py-14">
      <h2 className="text-2xl font-bold mb-8 text-center">دسته‌بندی محصولات</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = ICONS[cat] ?? Sparkles;
          return (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center hover:border-primary hover:shadow-md transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <span className="font-medium text-sm">{CATEGORY_LABELS_FA[cat] ?? cat}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
