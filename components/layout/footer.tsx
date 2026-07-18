import Link from 'next/link';
import { Instagram, Send, Twitter } from 'lucide-react';

const COLUMNS = [
  {
    title: 'درباره ما',
    links: [
      { href: '/about', label: 'درباره پرشین‌شاپ' },
      { href: '/contact', label: 'تماس با ما' },
      { href: '/faq', label: 'سوالات متداول' },
    ],
  },
  {
    title: 'قوانین',
    links: [
      { href: '/privacy', label: 'حریم خصوصی' },
      { href: '/terms', label: 'قوانین و مقررات' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-secondary/40">
      <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h3 className="font-bold text-lg mb-3">پرشین‌شاپ</h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-7">
            فروشگاه آنلاین پرشین‌شاپ با هدف ارائه تجربه‌ای مدرن، ساده و لذت‌بخش از خرید اینترنتی طراحی شده است.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" aria-label="اینستاگرام" className="p-2 rounded-full bg-card border border-border hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="توییتر" className="p-2 rounded-full bg-card border border-border hover:text-primary">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="تلگرام" className="p-2 rounded-full bg-card border border-border hover:text-primary">
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-medium mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} پرشین‌شاپ. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
