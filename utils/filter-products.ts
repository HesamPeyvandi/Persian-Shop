import { Product, ProductFilters } from '@/types';

export function filterAndSortProducts(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (typeof filters.minPrice === 'number') {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === 'number') {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (typeof filters.minRating === 'number') {
    result = result.filter((p) => p.rating.rate >= filters.minRating!);
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case 'alphabetical':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'best-selling':
      result.sort((a, b) => b.rating.count - a.rating.count);
      break;
    case 'newest':
    default:
      result.sort((a, b) => b.id - a.id);
      break;
  }

  return result;
}
