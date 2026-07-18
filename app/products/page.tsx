'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { ProductFiltersPanel } from '@/components/product/product-filters';
import { SortSelect } from '@/components/product/sort-select';
import { filterAndSortProducts } from '@/utils/filter-products';
import { SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const debouncedSearch = useDebounce(searchInput, 350);
  const { addTerm } = useSearchHistory();

  const { data: products, isLoading, isError } = useProducts();
  const { data: categories } = useCategories();

  const filters = useMemo(
    () => ({
      category: searchParams.get('category') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
      sort: (searchParams.get('sort') as SortOption) ?? 'newest',
    }),
    [searchParams]
  );

  function updateParams(patch: Record<string, string | number | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined || value === '') params.delete(key);
      else params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const current = searchParams.get('search') ?? '';
    if (debouncedSearch === current) return;
    updateParams({ search: debouncedSearch || undefined });
    if (debouncedSearch) addTerm(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const filteredProducts = useMemo(
    () => (products ? filterAndSortProducts(products, filters) : []),
    [products, filters]
  );

  return (
    <div className="container py-10">
      <div className="relative max-w-md mb-8">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="جستجو در محصولات..."
          className="ps-9"
          aria-label="جستجوی محصولات"
        />
      </div>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">همه محصولات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? 'در حال بارگذاری...' : `${filteredProducts.length} محصول یافت شد`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            فیلترها
          </Button>
          <SortSelect value={filters.sort} onChange={(sort) => updateParams({ sort })} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <div className={mobileFiltersOpen ? 'block' : 'hidden lg:block'}>
          {mobileFiltersOpen && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <span className="font-medium">فیلترها</span>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="بستن فیلترها">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <ProductFiltersPanel
            categories={categories ?? []}
            selectedCategory={filters.category}
            minRating={filters.minRating}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onCategoryChange={(category) => updateParams({ category })}
            onRatingChange={(minRating) => updateParams({ minRating })}
            onPriceChange={(minPrice, maxPrice) => updateParams({ minPrice, maxPrice })}
          />
        </div>

        <div>
          {isLoading && <ProductGridSkeleton count={9} />}
          {isError && <p className="text-destructive">خطا در دریافت محصولات. لطفا دوباره تلاش کنید.</p>}
          {!isLoading && !isError && <ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </div>
  );
}
