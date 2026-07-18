'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { checkoutSchema, CheckoutFormValues } from '@/features/checkout/checkout-schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useOrders } from '@/contexts/orders-context';
import { formatPrice } from '@/lib/utils';
import { IRAN_PROVINCES, IRAN_CITIES_BY_PROVINCE } from '@/constants/iran-locations';
import { Order } from '@/types';

const FIELDS: { name: keyof CheckoutFormValues; label: string; placeholder: string }[] = [
  { name: 'fullName', label: 'نام و نام خانوادگی', placeholder: 'مثال: علی رضایی' },
  { name: 'phone', label: 'شماره موبایل', placeholder: '09xxxxxxxxx' },
  { name: 'email', label: 'ایمیل', placeholder: 'example@email.com' },
  { name: 'postalCode', label: 'کد پستی', placeholder: '۱۰ رقمی' },
];

export default function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: user?.profile,
  });

  // به‌محض در دسترس بودن اطلاعات کاربری ذخیره‌شده، فرم را با همان مقادیر پر می‌کنیم
  useEffect(() => {
    if (user?.profile) reset(user.profile);
  }, [user, reset]);

  const selectedProvince = watch('province');
  const citiesForProvince = selectedProvince ? IRAN_CITIES_BY_PROVINCE[selectedProvince] ?? [] : [];

  function onSubmit(values: CheckoutFormValues) {
    if (user) {
      const order: Order = {
        id: `ORD-${Date.now()}`,
        username: user.username,
        createdAt: new Date().toISOString(),
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity,
        })),
        subtotal,
        shipping: {
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          province: values.province,
          city: values.city,
          address: values.address,
          postalCode: values.postalCode,
        },
        notes: values.notes,
      };
      addOrder(order);
    }
    toast.success('سفارش شما با موفقیت ثبت شد');
    clear();
    router.push(user ? '/account/orders' : '/');
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-8">تکمیل خرید</h1>
      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {FIELDS.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input id={field.name} placeholder={field.placeholder} {...register(field.name)} />
                {errors[field.name] && (
                  <p className="text-xs text-destructive">{errors[field.name]?.message}</p>
                )}
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
                      // با تغییر استان، شهر انتخابی قبلی معتبر نیست
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

          <div className="space-y-1.5">
            <Label htmlFor="notes">توضیحات سفارش (اختیاری)</Label>
            <textarea
              id="notes"
              rows={2}
              placeholder="توضیحات تکمیلی برای سفارش"
              className="w-full rounded-xl border border-input bg-card px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...register('notes')}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ثبت سفارش...' : 'ثبت نهایی سفارش'}
          </Button>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit space-y-4">
          <h2 className="font-bold">خلاصه سفارش</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm text-muted-foreground">
              <span className="line-clamp-1">
                {product.title} × {quantity}
              </span>
              <span>{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-4 flex justify-between font-bold">
            <span>جمع کل</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
