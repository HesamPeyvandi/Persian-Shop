'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';

interface RecentlyViewedContextValue {
  items: Product[];
  add: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
const STORAGE_KEY = 'persian-shop:recently-viewed';
const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<RecentlyViewedContextValue>(
    () => ({
      items,
      add: (product) =>
        setItems((prev) => [product, ...prev.filter((p) => p.id !== product.id)].slice(0, MAX_ITEMS)),
    }),
    [items]
  );

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
