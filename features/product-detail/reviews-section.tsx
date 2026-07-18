import { RatingStars } from '@/components/product/rating-stars';

const MOCK_REVIEWERS = ['نیما محمدی', 'الهام صادقی', 'حسین یزدانی'];

function mockReviewFor(productId: number, rating: { rate: number; count: number }) {
  const comments = [
    'کیفیت خیلی خوبی داشت و مطابق انتظارم بود.',
    'بسته‌بندی مناسب و ارسال به‌موقع انجام شد.',
    'نسبت به قیمت، محصول رضایت‌بخشی بود.',
  ];
  return MOCK_REVIEWERS.map((name, i) => ({
    name,
    comment: comments[i],
    rate: Math.max(1, Math.min(5, Math.round(rating.rate) - (i % 2))),
  }));
}

export function ReviewsSection({
  productId,
  rating,
}: {
  productId: number;
  rating: { rate: number; count: number };
}) {
  const reviews = mockReviewFor(productId, rating);

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">نظرات کاربران</h2>
        <RatingStars rate={rating.rate} count={rating.count} size={16} />
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-border bg-card p-5">
            <RatingStars rate={review.rate} size={13} />
            <p className="text-sm text-muted-foreground leading-7 mt-3">{review.comment}</p>
            <p className="text-xs font-medium mt-3">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
