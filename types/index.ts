export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface AuthUser {
  token: string;
  username: string;
  profile?: UserProfile;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'alphabetical' | 'best-selling';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sort?: SortOption;
  page?: number;
}

export const CATEGORY_LABELS_FA: Record<string, string> = {
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
  jewelery: 'جواهرات',
  electronics: 'لوازم الکترونیکی',
};

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  username: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: OrderShippingInfo;
  notes?: string;
}

export const ORDER_STATUS_LABELS_FA: Record<OrderStatus, string> = {
  pending: 'در انتظار تایید',
  processing: 'در حال پردازش',
  shipped: 'ارسال شده',
  delivered: 'تحویل داده شده',
};

