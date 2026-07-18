'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number }
  | { type: 'REMOVE'; productId: number }
  | { type: 'SET_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items };
    case 'ADD': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + action.quantity } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'SET_QUANTITY':
      return {
        items: state.items
          .map((i) => (i.product.id === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  totalCount: number;
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'persian-shop:cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return {
      items: state.items,
      addItem: (product, quantity = 1) => dispatch({ type: 'ADD', product, quantity }),
      removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
      setQuantity: (productId, quantity) => dispatch({ type: 'SET_QUANTITY', productId, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
      subtotal,
      totalCount,
      hydrated,
    };
  }, [state.items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
