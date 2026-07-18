import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a USD price (Fake Store API prices are in USD) as Persian Toman-style display. */
export function formatPrice(price: number): string {
  const toman = Math.round(price * 500000); // mock conversion for a Persian-feeling storefront
  return new Intl.NumberFormat('fa-IR').format(toman) + ' تومان';
}

export function toPersianDigits(input: string | number): string {
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/[0-9]/g, (d) => persian[Number(d)]);
}

export function truncate(text: string, length = 80): string {
  return text.length > length ? text.slice(0, length).trim() + '…' : text;
}

/** Formats a date using the Persian (Jalali) calendar with Persian digits, e.g. "۲۲ تیر ۱۴۰۵". */
export function formatJalaliDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    'fa-IR',
    options ?? { year: 'numeric', month: 'long', day: 'numeric' }
  ).format(d);
}

/**
 * از آنجا که این پروژه بک‌اند سفارشی ندارد (Fake Store API)، وضعیت سفارش بر اساس زمان سپری‌شده
 * از ثبت سفارش به‌صورت شبیه‌سازی‌شده محاسبه می‌شود تا صفحه‌ی «پیگیری سفارشات» واقعی به‌نظر برسد.
 */
export function estimateOrderStatus(createdAt: string): import('@/types').OrderStatus {
  const minutesPassed = (Date.now() - new Date(createdAt).getTime()) / 60000;
  if (minutesPassed < 2) return 'pending';
  if (minutesPassed < 60) return 'processing';
  if (minutesPassed < 60 * 24) return 'shipped';
  return 'delivered';
}
