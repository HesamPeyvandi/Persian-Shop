# پرشین‌شاپ (Persian Shop)

فروشگاه آنلاین نمونه، ساخته‌شده با Next.js 14 (App Router) و TypeScript، به‌عنوان یک پروژه پرتفولیو RTL فارسی.

## Technologies Used

- **Next.js 14** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS** + custom design tokens (light/dark)
- **shadcn/ui**-style primitives (Radix UI under the hood)
- **Lucide React** icons
- **Framer Motion** animations
- **next-themes** for dark/light mode
- **TanStack Query** for client-side data fetching/caching
- **React Hook Form + Zod** for form validation
- **Sonner** for toast notifications
- **Fake Store API** (https://fakestoreapi.com) as the only data source

## Folder Structure

```
app/            # App Router routes, layouts, loading/error/not-found states
components/     # Reusable UI (ui/, layout/, product/, shared/)
features/       # Feature-scoped modules (home sections, product-detail, checkout)
services/       # API layer (Fake Store API client)
hooks/          # Reusable hooks (useDebounce, useLocalStorage, useProducts, ...)
contexts/       # React Context providers (cart, wishlist, auth, recently-viewed)
types/          # Shared TypeScript types
utils/          # Pure utility functions (filtering/sorting)
lib/            # cn() and formatting helpers
```

## Installation

```bash
npm install
```

## Environment Variables

None required — the app talks directly to the public Fake Store API
(`https://fakestoreapi.com`) from the browser and from Server Components.

## Running the Project

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Implemented Features

- RTL Persian layout with the Vazirmatn font, light/dark theme (persisted)
- Sticky header, mobile nav, real-time debounced search with history
- Homepage: hero, categories, featured/latest products, why-us, testimonials
  (mock), brand logos, FAQ, newsletter
- Product listing with category / price / rating filters + sorting, all
  synced to the URL query string (`?category=...&sort=...&page=...`)
- Product detail page with dynamic metadata, JSON-LD Product schema,
  breadcrumb, mock reviews, related products, recently-viewed tracking
- Cart with quantity controls, mock shipping + discount code, persisted to
  `localStorage`
- Checkout form fully validated with Zod
- Login / Register wired to the real Fake Store API auth endpoints
- Wishlist, recently-viewed, and search-history, all `localStorage`-persisted
- Skeleton loading states, custom Persian 404, error boundary
- `sitemap.ts` / `robots.ts`, Open Graph & Twitter metadata per page

## Known Limitations / Future Improvements

Fake Store API has no cart, review, or "best seller" endpoints, so those are
UI-only / mocked, as scoped in the original brief. Also left as good next
steps for a real product:

- Wire the mini-cart / cart / checkout into a real backend or serverless
  checkout endpoint
- Replace the mocked review data with a real reviews service
- Add pagination (currently all Fake Store products are filtered client-side
  since the API has no server-side pagination)
- Expand automated tests (unit + e2e) and add CI
- Swap the mock USD→Toman conversion in `lib/utils.ts` with a real pricing
  source if this goes into production
