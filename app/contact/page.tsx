'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container py-16 max-w-lg">
      <h1 className="text-2xl font-bold mb-8">تماس با ما</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success('پیام شما ارسال شد');
        }}
        className="space-y-5 rounded-2xl border border-border bg-card p-6"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">نام</Label>
          <Input id="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">ایمیل</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">پیام</Label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full rounded-xl border border-input bg-card px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Button type="submit" className="w-full">
          ارسال پیام
        </Button>
        {sent && <p className="text-xs text-primary text-center">پیام شما با موفقیت دریافت شد.</p>}
      </form>
    </div>
  );
}
