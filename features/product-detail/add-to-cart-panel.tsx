'use client';

import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { cn, formatPrice } from '@/lib/utils';

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <div className="mt-6">
      <p className="text-3xl font-extrabold mb-6">{formatPrice(product.price)}</p>
      <div className="flex items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            addItem(product, quantity);
            toast.success('به سبد خرید اضافه شد');
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          افزودن به سبد خرید
        </Button>
        <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => toggle(product)} aria-label="علاقه‌مندی">
          <Heart className={cn('h-5 w-5', saved && 'fill-destructive text-destructive')} />
        </Button>
      </div>
    </div>
  );
}
