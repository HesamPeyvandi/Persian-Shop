'use client';

import { Minus, Plus } from 'lucide-react';
import { toPersianDigits } from '@/lib/utils';

export function QuantitySelector({
  value,
  onChange,
  size = 'default',
}: {
  value: number;
  onChange: (value: number) => void;
  size?: 'default' | 'sm';
}) {
  const height = size === 'sm' ? 'h-8' : 'h-11';
  return (
    <div className={`inline-flex items-center ${height} rounded-xl border border-border overflow-hidden`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-full px-3 hover:bg-secondary transition-colors"
        aria-label="کاهش تعداد"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="px-3 min-w-[2.5rem] text-center text-sm">{toPersianDigits(value)}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="h-full px-3 hover:bg-secondary transition-colors"
        aria-label="افزایش تعداد"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
