import type { Metadata } from 'next';
import { api } from '@/services/api';
import { ProductDetailClient } from '@/features/product-detail/product-detail-client';

interface Props {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await api.getProduct(params.id);
    return {
      title: product.title,
      description: product.description.slice(0, 150),
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 150),
        images: [{ url: product.image }],
      },
    };
  } catch {
    return { title: 'فروشگاه پرشین' };
  }
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient id={params.id} />;
}
