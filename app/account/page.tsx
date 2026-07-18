'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Pencil, PackageSearch } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;

  const profile = user.profile;

  function handleLogout() {
    logout();
    router.push('/');
  }

  const rows: { label: string; value?: string }[] = [
    { label: 'نام کاربری', value: user.username },
    { label: 'نام و نام خانوادگی', value: profile?.fullName },
    { label: 'شماره موبایل', value: profile?.phone },
    { label: 'ایمیل', value: profile?.email },
    { label: 'استان', value: profile?.province },
    { label: 'شهر', value: profile?.city },
    { label: 'کد پستی', value: profile?.postalCode },
    { label: 'آدرس', value: profile?.address },
  ];

  return (
    <div className="container py-10 max-w-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">پروفایل من</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          خروج
        </Button>
      </div>

      {!profile && (
        <div className="mb-6 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          اطلاعات کاربری شما هنوز تکمیل نشده است. برای استفاده سریع‌تر از تسویه‌حساب، لطفا اطلاعاتتان را تکمیل کنید.
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5 text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value || '—'}</span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <Button asChild variant="outline">
          <Link href="/account/edit">
            <Pencil className="h-4 w-4" />
            ویرایش اطلاعات کاربری
          </Link>
        </Button>
        <Button asChild>
          <Link href="/account/orders">
            <PackageSearch className="h-4 w-4" />
            پیگیری سفارشات
          </Link>
        </Button>
      </div>
    </div>
  );
}
