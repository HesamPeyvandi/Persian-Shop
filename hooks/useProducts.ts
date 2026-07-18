'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/types';

export function useProducts() {
  return useQuery<Product[]>({ queryKey: ['products'], queryFn: api.getProducts });
}

export function useProduct(id: string | number) {
  return useQuery<Product>({ queryKey: ['product', id], queryFn: () => api.getProduct(id), enabled: !!id });
}

export function useCategories() {
  return useQuery<string[]>({ queryKey: ['categories'], queryFn: api.getCategories });
}
