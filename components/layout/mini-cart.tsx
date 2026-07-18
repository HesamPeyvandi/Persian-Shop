'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export function MiniCart({ children }: { children: React.ReactNode }) {
  const { items, setQuantity, removeItem, subtotal, totalCount } = useCart();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 animate-in fade-in" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-card p-5 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="font-bold text-lg">
              سبد خرید ({totalCount})
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="بستن">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-muted-foreground">
              <ShoppingBag className="h-12 w-12" />
              <p>سبد خرید شما خالی است</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 border-b border-border pb-4">
                  <div className="relative h-16 w-16 shrink-0 rounded-lg bg-secondary overflow-hidden">
                    <Image src={product.image} alt={product.title} fill className="object-contain p-1" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-1">{product.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="کاهش تعداد"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-4 text-center">{quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="افزایش تعداد"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-xs text-destructive ms-auto hover:underline"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="pt-4 space-y-3">
              <div className="flex justify-between font-medium">
                <span>جمع کل</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Dialog.Close asChild>
                <Button asChild className="w-full">
                  <Link href="/cart">مشاهده سبد خرید</Link>
                </Button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
