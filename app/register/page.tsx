'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const schema = z.object({
  username: z.string().min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      await api.register(values);
      toast.success('ثبت‌نام با موفقیت انجام شد. اکنون وارد شوید.');
      router.push('/login');
    } catch {
      toast.error('خطا در ثبت‌نام. لطفا دوباره تلاش کنید.');
    }
  }

  return (
    <div className="container py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-8 text-center">ایجاد حساب کاربری</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="username">نام کاربری</Label>
          <Input id="username" {...register('username')} />
          {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">ایمیل</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">رمز عبور</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground mt-5">
        قبلا ثبت‌نام کرده‌اید؟{' '}
        <Link href="/login" className="text-primary hover:underline">
          وارد شوید
        </Link>
      </p>
    </div>
  );
}
