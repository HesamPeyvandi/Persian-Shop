'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Product, CATEGORY_LABELS_FA } from '@/types';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/product/rating-stars';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { cn, formatPrice, truncate } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <button
        onClick={() => toggle(product)}
        aria-label={saved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        className="absolute top-6 end-6 z-10 p-2 rounded-full bg-background/80 backdrop-blur hover:scale-110 transition-transform"
      >
        <Heart className={cn('h-4 w-4', saved ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
      </button>

      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-44 w-full mb-4 rounded-xl bg-secondary/60 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 45vw, 220px"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <p className="text-xs text-muted-foreground mb-1">
          {CATEGORY_LABELS_FA[product.category] ?? product.category}
        </p>
        <h3 className="text-sm font-medium leading-6 line-clamp-2 min-h-[3rem]">{truncate(product.title, 60)}</h3>
        <div className="mt-2">
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
        </div>
        <p className="mt-2 font-bold">{formatPrice(product.price)}</p>
      </Link>

      <div className="mt-3 flex items-center gap-2">
        <QuantitySelector value={quantity} onChange={setQuantity} size="sm" />
        <Button
          size="sm"
          className="flex-1"
          onClick={() => {
            addItem(product, quantity);
            toast.success('به سبد خرید اضافه شد', { description: truncate(product.title, 40) });
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          افزودن
        </Button>
      </div>
    </motion.div>
  );
}
