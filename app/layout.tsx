import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://persian-shop.example.com'),
  title: {
    default: 'پرشین‌شاپ | فروشگاه آنلاین مدرن',
    template: '%s | پرشین‌شاپ',
  },
  description: 'خرید آنلاین محصولات با بهترین قیمت و ارسال سریع در پرشین‌شاپ.',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    title: 'پرشین‌شاپ | فروشگاه آنلاین مدرن',
    description: 'خرید آنلاین محصولات با بهترین قیمت و ارسال سریع.',
    siteName: 'پرشین‌شاپ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پرشین‌شاپ',
    description: 'خرید آنلاین محصولات با بهترین قیمت و ارسال سریع.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
