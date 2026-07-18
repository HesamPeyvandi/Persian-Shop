'use client';

import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WHY_US = [
  { icon: Truck, title: 'ارسال سریع', desc: 'تحویل کالا در سریع‌ترین زمان ممکن به سراسر کشور.' },
  { icon: ShieldCheck, title: 'ضمانت اصالت', desc: 'تمامی کالاها دارای ضمانت اصالت و کیفیت هستند.' },
  { icon: RotateCcw, title: 'بازگشت آسان', desc: 'امکان بازگشت کالا تا ۷ روز پس از خرید.' },
  { icon: Headphones, title: 'پشتیبانی ۲۴ ساعته', desc: 'تیم پشتیبانی همیشه پاسخگوی شماست.' },
];

const TESTIMONIALS = [
  { name: 'سارا احمدی', text: 'کیفیت محصولات فوق‌العاده بود و ارسال هم خیلی سریع انجام شد.', avatar: 'https://i.pravatar.cc/100?img=32' },
  { name: 'علی رضایی', text: 'تجربه خرید بسیار راحت و لذت‌بخشی داشتم، حتما دوباره خرید می‌کنم.', avatar: 'https://i.pravatar.cc/100?img=12' },
  { name: 'مریم کریمی', text: 'پشتیبانی عالی و پاسخگو، از خریدم کاملا راضی هستم.', avatar: 'https://i.pravatar.cc/100?img=45' },
];

const FAQS = [
  { q: 'هزینه ارسال چقدر است؟', a: 'هزینه ارسال بر اساس مقصد محاسبه و در مرحله تسویه‌حساب نمایش داده می‌شود.' },
  { q: 'آیا امکان مرجوعی کالا وجود دارد؟', a: 'بله، تا ۷ روز پس از دریافت کالا امکان مرجوعی وجود دارد.' },
  { q: 'روش‌های پرداخت چیست؟', a: 'پرداخت آنلاین از طریق درگاه‌های معتبر بانکی امکان‌پذیر است.' },
];

const BRANDS = ['نایک', 'اپل', 'سامسونگ', 'آدیداس', 'زارا', 'پوما'];

export function WhyChooseUsSection() {
  return (
    <section className="container py-14">
      <h2 className="text-2xl font-bold mb-10 text-center">چرا پرشین‌شاپ؟</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {WHY_US.map((item) => (
          <div key={item.title} className="text-center p-6 rounded-2xl border border-border bg-card">
            <item.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-6">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="container py-14">
      <h2 className="text-2xl font-bold mb-10 text-center">نظرات مشتریان</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm leading-7 mb-4 text-muted-foreground">«{t.text}»</p>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <span className="text-sm font-medium">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="container py-14 max-w-2xl">
      <h2 className="text-2xl font-bold mb-10 text-center">سوالات متداول</h2>
      <Accordion.Root type="single" collapsible className="space-y-3">
        {FAQS.map((item, i) => (
          <Accordion.Item
            key={i}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <Accordion.Trigger className="group flex w-full items-center justify-between p-5 text-sm font-medium">
              {item.q}
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="px-5 pb-5 text-sm text-muted-foreground leading-7 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              {item.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  return (
    <section className="container py-14">
      <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 text-center">
        <h2 className="text-2xl font-bold mb-3">عضویت در خبرنامه</h2>
        <p className="text-sm opacity-90 mb-6 max-w-md mx-auto">
          از جدیدترین تخفیف‌ها و محصولات باخبر شوید.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success('با موفقیت در خبرنامه عضو شدید');
            setEmail('');
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل شما"
            className="bg-primary-foreground text-foreground"
          />
          <Button type="submit" variant="secondary">
            عضویت
          </Button>
        </form>
      </div>
    </section>
  );
}

export function BrandLogosSection() {
  return (
    <section className="container py-14">
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
        {BRANDS.map((brand) => (
          <span key={brand} className="text-lg font-bold text-muted-foreground">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
