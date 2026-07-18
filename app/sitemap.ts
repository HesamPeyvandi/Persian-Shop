import type { MetadataRoute } from 'next';
import { api } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://persian-shop.example.com';
  const products = await api.getProducts().catch(() => []);

  const staticRoutes = ['', '/products', '/cart', '/wishlist', '/login', '/register', '/about', '/contact', '/faq', '/privacy', '/terms'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
