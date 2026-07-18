'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-right"
        >
          <span className="inline-block mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
            فروش ویژه تا ۳۰٪ تخفیف
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.3] balance mb-5">
            خرید هوشمند، <span className="text-primary">تجربه‌ای متفاوت</span> از فروشگاه‌های آنلاین
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto md:mx-0 leading-8">
            جدیدترین محصولات با کیفیت برتر و ارسال سریع، همین حالا کشف کنید.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Button size="lg" asChild>
              <Link href="/products">
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products?sort=best-selling">پرفروش‌ترین‌ها</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative order-1 md:order-2 aspect-square max-w-2xl mx-auto flex items-center justify-center"
        >
          <Image
            src="/images/Hero_img.png"
            alt="محصول ویژه"
            width={650}
            height={650}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
