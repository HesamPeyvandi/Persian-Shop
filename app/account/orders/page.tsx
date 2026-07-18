'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PackageSearch } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useOrders } from '@/contexts/orders-context';
import { ORDER_STATUS_LABELS_FA, OrderStatus } from '@/types';
import { formatPrice, formatJalaliDate, estimateOrderStatus, toPersianDigits } from '@/lib/utils';

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-secondary text-secondary-foreground',
  processing: 'bg-accent/15 text-accent',
  shipped: 'bg-primary/15 text-primary',
  delivered: 'bg-emerald-500/15 text-emerald-600',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const { getOrdersByUsername, hydrated } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;

  const orders = getOrdersByUsername(user.username);

  return (
    <div className="container py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">پیگیری سفارشات</h1>
        <Link href="/account" className="text-sm text-primary hover:underline">
          بازگشت به پروفایل
        </Link>
      </div>

      {hydrated && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <PackageSearch className="h-10 w-10" />
          <p>هنوز سفارشی ثبت نکرده‌اید.</p>
          <Link href="/products" className="text-sm text-primary hover:underline">
            مشاهده محصولات
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const status = estimateOrderStatus(order.createdAt);
          return (
            <div key={order.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <p className="text-sm font-medium">
                    شماره سفارش: {toPersianDigits(order.id.replace('ORD-', ''))}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatJalaliDate(order.createdAt, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
                  {ORDER_STATUS_LABELS_FA[status]}
                </span>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm text-muted-foreground">
                    <span className="line-clamp-1">
                      {item.title} × {toPersianDigits(item.quantity)}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-border mt-4 pt-4 font-bold text-sm">
                <span>جمع کل</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                ارسال به: {order.shipping.city}، {order.shipping.province}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
