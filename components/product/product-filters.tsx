'use client';

import { CATEGORY_LABELS_FA } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  categories: string[];
  selectedCategory?: string;
  minRating?: number;
  onCategoryChange: (category?: string) => void;
  onRatingChange: (rating?: number) => void;
  onPriceChange: (min?: number, max?: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

export function ProductFiltersPanel({
  categories,
  selectedCategory,
  minRating,
  onCategoryChange,
  onRatingChange,
  onPriceChange,
  minPrice,
  maxPrice,
}: Props) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="font-medium mb-3">دسته‌بندی</h3>
        <div className="space-y-2 text-sm">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={cn('block hover:text-primary', !selectedCategory && 'text-primary font-medium')}
          >
            همه محصولات
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn('block hover:text-primary', selectedCategory === cat && 'text-primary font-medium')}
            >
              {CATEGORY_LABELS_FA[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">محدوده قیمت (دلار)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="از"
            value={minPrice ?? ''}
            onChange={(e) => onPriceChange(e.target.value ? Number(e.target.value) : undefined, maxPrice)}
            className="w-full h-9 rounded-lg border border-input bg-card px-2 text-sm"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            placeholder="تا"
            value={maxPrice ?? ''}
            onChange={(e) => onPriceChange(minPrice, e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-9 rounded-lg border border-input bg-card px-2 text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">حداقل امتیاز</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(minRating === r ? undefined : r)}
              className={cn(
                'h-8 w-8 rounded-lg border border-border text-xs flex items-center justify-center hover:bg-secondary',
                minRating === r && 'bg-primary text-primary-foreground border-primary'
              )}
            >
              {r}+
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
