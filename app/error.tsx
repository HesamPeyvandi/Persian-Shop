'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-32 text-center">
      <AlertTriangle className="h-14 w-14 text-destructive" />
      <h2 className="text-xl font-bold">مشکلی پیش آمد!</h2>
      <p className="text-muted-foreground max-w-sm">
        متاسفانه در بارگذاری این بخش خطایی رخ داد. لطفا دوباره تلاش کنید.
      </p>
      <Button onClick={() => reset()}>تلاش مجدد</Button>
    </div>
  );
}
