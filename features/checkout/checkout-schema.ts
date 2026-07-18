import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد'),
  phone: z
    .string()
    .min(10, 'شماره تلفن معتبر نیست')
    .regex(/^0?9\d{9}$/, 'شماره موبایل باید با فرمت صحیح وارد شود'),
  email: z.string().email('ایمیل معتبر نیست'),
  province: z.string().min(2, 'استان را انتخاب کنید'),
  city: z.string().min(2, 'شهر را وارد کنید'),
  address: z.string().min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد'),
  postalCode: z
    .string()
    .min(10, 'کد پستی باید ۱۰ رقم باشد')
    .max(10, 'کد پستی باید ۱۰ رقم باشد')
    .regex(/^\d{10}$/, 'کد پستی باید فقط شامل عدد باشد'),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// همان فیلدهای فرم تسویه‌حساب، بدون توضیحات سفارش — برای فرم اطلاعات کاربری استفاده می‌شود
export const profileSchema = checkoutSchema.omit({ notes: true });
export type ProfileFormValues = z.infer<typeof profileSchema>;
