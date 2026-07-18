'use client';

import { useEffect } from 'react';
import { Product } from '@/types';
import { useRecentlyViewed } from '@/contexts/recently-viewed-context';

export function RecentlyViewedTracker({ product }: { product: Product }) {
  const { add } = useRecentlyViewed();

  useEffect(() => {
    add(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
