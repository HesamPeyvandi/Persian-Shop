'use client';

import * as React from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchableSelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'انتخاب کنید...',
  searchPlaceholder = 'جستجو...',
  emptyMessage = 'موردی یافت نشد',
  disabled,
  id,
  ...rest
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    const q = search.trim();
    if (!q) return options;
    return options.filter((o) => o.includes(q));
  }, [options, search]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (open) {
      // به‌محض باز شدن، فوکوس روی فیلد جستجو قرار می‌گیرد
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open]);

  function handleSelect(option: string) {
    onChange(option);
    setOpen(false);
    setSearch('');
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-label={rest['aria-label']}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-xl border border-input bg-card px-4 py-2 text-sm shadow-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-muted-foreground'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="relative border-b border-border">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={searchInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent py-2.5 ps-9 pe-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-3 text-center text-sm text-muted-foreground">{emptyMessage}</p>
            ) : (
              filtered.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary',
                    option === value && 'bg-secondary'
                  )}
                >
                  {option}
                  {option === value && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
