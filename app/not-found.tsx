import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-5 py-32 text-center">
      <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center">
        <Compass className="h-14 w-14 text-primary" />
      </div>
      <h1 className="text-5xl font-extrabold">۴۰۴</h1>
      <h2 className="text-xl font-bold">صفحه مورد نظر پیدا نشد</h2>
      <p className="text-muted-foreground max-w-sm">
        متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
      </p>
      <Button asChild>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </Button>
    </div>
  );
}
