'use client';

import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'rating', label: 'بیشترین امتیاز' },
  { value: 'alphabetical', label: 'الفبایی' },
  { value: 'best-selling', label: 'پرفروش‌ترین' },
];

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <Select.Trigger className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border bg-card text-sm">
        <ArrowUpDown className="h-3.5 w-3.5" />
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50" dir="rtl">
          <Select.Viewport className="p-1">
            {OPTIONS.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary cursor-pointer outline-none"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-3.5 w-3.5" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
