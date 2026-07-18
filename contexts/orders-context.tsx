'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Order } from '@/types';

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByUsername: (username: string) => Order[];
  hydrated: boolean;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const STORAGE_KEY = 'persian-shop:orders';

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders,
      hydrated,
      addOrder: (order) => {
        setOrders((prev) => {
          const next = [order, ...prev];
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
      },
      getOrdersByUsername: (username) =>
        orders
          .filter((o) => o.username === username)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }),
    [orders, hydrated]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
