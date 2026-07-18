import { Product, AuthUser } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    throw new Error(`درخواست با خطا مواجه شد (${res.status})`);
  }
  return res.json();
}

export const api = {
  getProducts: () => request<Product[]>('/products'),
  getProduct: (id: number | string) => request<Product>(`/products/${id}`),
  getCategories: () => request<string[]>('/products/categories'),
  getProductsByCategory: (category: string) =>
    request<Product[]>(`/products/category/${encodeURIComponent(category)}`),
  login: (username: string, password: string) =>
    request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (payload: { email: string; username: string; password: string }) =>
    request<{ id: number }>('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

export function buildAuthUser(username: string, token: string): AuthUser {
  return { username, token };
}
