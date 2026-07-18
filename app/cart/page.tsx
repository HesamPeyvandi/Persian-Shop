'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice, truncate } from '@/lib/utils';
import { CATEGORY_LABELS_FA } from '@/types';

const SHIPPING_COST = 250000;

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal, hydrated } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="container py-24 flex flex-col items-center text-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-xl font-bold">سبد خرید شما خالی است</h1>
        <p className="text-muted-foreground max-w-sm">هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.</p>
        <Button asChild>
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </div>
    );
  }

  const shipping = SHIPPING_COST;
  const discount = discountApplied ? Math.round(subtotal * 500000 * 0.1) : 0;
  const total = subtotal * 500000 + shipping - discount;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-8">سبد خرید</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <Link href={`/products/${product.id}`} className="relative h-24 w-24 shrink-0 rounded-xl bg-secondary overflow-hidden">
                <Image src={product.image} alt={product.title} fill className="object-contain p-2" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`} className="font-medium text-sm hover:text-primary line-clamp-1">
                  {product.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {CATEGORY_LABELS_FA[product.category] ?? product.category}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <QuantitySelector value={quantity} onChange={(q) => setQuantity(product.id, q)} size="sm" />
                  <span className="font-bold text-sm">{formatPrice(product.price * quantity)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  removeItem(product.id);
                  toast('محصول از سبد خرید حذف شد');
                }}
                aria-label="حذف محصول"
                className="self-start text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit space-y-5">
          <h2 className="font-bold">خلاصه سفارش</h2>

          <div className="flex gap-2">
            <Input
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => {
                if (!discountCode) return;
                setDiscountApplied(true);
                toast.success('کد تخفیف اعمال شد');
              }}
            >
              اعمال
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>جمع کالاها</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>هزینه ارسال</span>
              <span>{new Intl.NumberFormat('fa-IR').format(shipping)} تومان</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-primary">
                <span>تخفیف</span>
                <span>- {new Intl.NumberFormat('fa-IR').format(discount)} تومان</span>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 flex justify-between font-bold">
            <span>مبلغ نهایی</span>
            <span>{new Intl.NumberFormat('fa-IR').format(Math.round(total))} تومان</span>
          </div>

          <Button size="lg" className="w-full" asChild>
            <Link href="/checkout">
              ادامه فرآیند خرید
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
