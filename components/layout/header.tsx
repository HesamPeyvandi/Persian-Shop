'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, Menu, X, Store, UserCircle, Pencil, LogOut, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MiniCart } from '@/components/layout/mini-cart';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { toPersianDigits } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'خانه' },
  { href: '/products', label: 'محصولات' },
];

export function Header() {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount, hydrated } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/products?search=${encodeURIComponent(query.trim())}` : '/products');
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    setMobileOpen(false);
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <Store className="h-6 w-6 text-primary" />
          پرشین‌شاپ
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm shrink-0">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-auto relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی محصولات..."
            className="ps-9"
            aria-label="جستجو"
          />
        </form>

        <div className="flex items-center gap-1 ms-auto shrink-0">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild aria-label="علاقه‌مندی‌ها">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="حساب کاربری" className="hidden sm:inline-flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <UserCircle className="h-4 w-4" />
                    مشاهده پروفایل
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/edit">
                    <Pencil className="h-4 w-4" />
                    ویرایش اطلاعات کاربری
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">
                    <PackageSearch className="h-4 w-4" />
                    پیگیری سفارشات
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4" />
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild aria-label="ورود" className="hidden sm:inline-flex">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <MiniCart>
            <Button variant="ghost" size="icon" className="relative" aria-label="سبد خرید">
              <ShoppingCart className="h-5 w-5" />
              {hydrated && totalCount > 0 && (
                <span className="absolute -top-1 -end-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                  {toPersianDigits(totalCount)}
                </span>
              )}
            </Button>
          </MiniCart>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="منو"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-4 bg-background">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی محصولات..."
              className="ps-9"
            />
          </form>
          <nav className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileOpen(false)}>
                  مشاهده پروفایل
                </Link>
                <Link href="/account/edit" onClick={() => setMobileOpen(false)}>
                  ویرایش اطلاعات کاربری
                </Link>
                <Link href="/account/orders" onClick={() => setMobileOpen(false)}>
                  پیگیری سفارشات
                </Link>
                <button onClick={handleLogout} className="text-start text-destructive">
                  خروج
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                ورود / ثبت‌نام
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
