import { Star } from 'lucide-react';
import { toPersianDigits } from '@/lib/utils';

export function RatingStars({ rate, count, size = 14 }: { rate: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`امتیاز ${toPersianDigits(rate)} از ۵`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < Math.round(rate) ? 'fill-accent text-accent' : 'fill-none text-muted-foreground/40'}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-muted-foreground">({toPersianDigits(count)})</span>
      )}
    </div>
  );
}
