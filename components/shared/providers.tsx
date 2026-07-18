'use client';

import { ThemeProvider } from '@/components/shared/theme-provider';
import { QueryProvider } from '@/components/shared/query-provider';
import { CartProvider } from '@/contexts/cart-context';
import { WishlistProvider } from '@/contexts/wishlist-context';
import { AuthProvider } from '@/contexts/auth-context';
import { OrdersProvider } from '@/contexts/orders-context';
import { RecentlyViewedProvider } from '@/contexts/recently-viewed-context';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <QueryProvider>
        <AuthProvider>
          <OrdersProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  {children}
                  <Toaster position="top-center" richColors dir="rtl" />
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </OrdersProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
