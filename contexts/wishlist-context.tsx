'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types';

interface WishlistContextValue {
  items: Product[];
  toggle: (product: Product) => void;
  isSaved: (id: number) => boolean;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'persian-shop:wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
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

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      toggle: (product) =>
        setItems((prev) =>
          prev.some((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
        ),
      isSaved: (id) => items.some((p) => p.id === id),
      hydrated,
    }),
    [items, hydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
