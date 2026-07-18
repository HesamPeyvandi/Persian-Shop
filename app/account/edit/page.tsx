'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { profileSchema, ProfileFormValues } from '@/features/checkout/checkout-schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { IRAN_PROVINCES, IRAN_CITIES_BY_PROVINCE } from '@/constants/iran-locations';

const FIELDS: { name: keyof ProfileFormValues; label: string; placeholder: string }[] = [
  { name: 'fullName', label: 'نام و نام خانوادگی', placeholder: 'مثال: علی رضایی' },
  { name: 'phone', label: 'شماره موبایل', placeholder: '09xxxxxxxxx' },
  { name: 'email', label: 'ایمیل', placeholder: 'example@email.com' },
  { name: 'postalCode', label: 'کد پستی', placeholder: '۱۰ رقمی' },
];

export default function EditAccountPage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: user?.profile,
  });

  useEffect(() => {
    if (user?.profile) reset(user.profile);
  }, [user, reset]);

  const selectedProvince = watch('province');
  const citiesForProvince = selectedProvince ? IRAN_CITIES_BY_PROVINCE[selectedProvince] ?? [] : [];

  function onSubmit(values: ProfileFormValues) {
    updateProfile(values);
    toast.success('اطلاعات کاربری با موفقیت ذخیره شد');
    router.push('/account');
  }

  if (!user) return null;

  return (
    <div className="container py-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">ویرایش اطلاعات کاربری</h1>
      <p className="text-sm text-muted-foreground mb-8">
        این اطلاعات هنگام ثبت سفارش به‌صورت خودکار در فرم تسویه‌حساب پر می‌شود.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {FIELDS.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input id={field.name} placeholder={field.placeholder} {...register(field.name)} />
              {errors[field.name] && <p className="text-xs text-destructive">{errors[field.name]?.message}</p>}
            </div>
          ))}

          <div className="space-y-1.5">
            <Label htmlFor="province">استان</Label>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  id="province"
                  options={IRAN_PROVINCES}
                  value={field.value}
                  onChange={(v) => {
                    field.onChange(v);
                    setValue('city', '');
                  }}
                  placeholder="استان را انتخاب کنید"
                  searchPlaceholder="جستجوی استان..."
                />
              )}
            />
            {errors.province && <p className="text-xs text-destructive">{errors.province.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city">شهر</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  id="city"
                  options={citiesForProvince}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!selectedProvince}
                  placeholder={selectedProvince ? 'شهر را انتخاب کنید' : 'ابتدا استان را انتخاب کنید'}
                  searchPlaceholder="جستجوی شهر..."
                  emptyMessage="شهری یافت نشد"
                />
              )}
            />
            {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address">آدرس کامل</Label>
          <textarea
            id="address"
            rows={3}
            placeholder="آدرس دقیق پستی خود را وارد کنید"
            className="w-full rounded-xl border border-input bg-card px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register('address')}
          />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ذخیره...' : 'ذخیره اطلاعات'}
        </Button>
      </form>
    </div>
  );
}
