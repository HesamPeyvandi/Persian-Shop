'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const schema = z.object({
  username: z.string().min(1, 'نام کاربری را وارد کنید'),
  password: z.string().min(1, 'رمز عبور را وارد کنید'),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { username: 'mor_2314', password: '83r5^_' } });

  async function onSubmit(values: FormValues) {
    setServerError('');
    try {
      const authUser = await login(values.username, values.password);
      toast.success('با موفقیت وارد شدید');
      // اگر هنوز اطلاعات کاربری تکمیل نشده، ابتدا آن را از کاربر می‌گیریم
      router.push(authUser.profile ? '/' : '/account/edit');
    } catch {
      setServerError('نام کاربری یا رمز عبور اشتباه است.');
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-2 text-center">ورود به حساب کاربری</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        برای تست، اطلاعات نمونه Fake Store API از پیش پر شده است.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="username">نام کاربری</Label>
          <Input id="username" {...register('username')} />
          {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">رمز عبور</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        {serverError && <p className="text-xs text-destructive">{serverError}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ورود...' : 'ورود'}
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground mt-5">
        حساب کاربری ندارید؟{' '}
        <Link href="/register" className="text-primary hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
}
