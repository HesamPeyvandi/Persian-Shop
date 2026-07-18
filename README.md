# 🛍️ Persian Shop

A fully-featured, RTL-first e-commerce storefront built as a portfolio project — demonstrating modern React/Next.js architecture, clean component design, and a polished, production-style user experience from browsing to checkout.

**[🔗 Live Demo](https://persian-shop.vercel.app/)** &nbsp;·&nbsp; **[📂 Source Code]([https://github.com/HesamPeyvandi](https://github.com/HesamPeyvandi/Persian-Shop))**

<!-- Replace the links above with your actual Vercel URL and GitHub repo URL -->

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

Persian Shop is a demo e-commerce application built to showcase full front-end product development skills: a complete shopping flow (browse → cart → checkout), authentication, user account management, and a fully right-to-left (RTL) interface for Persian-speaking users — all built on top of the [Fake Store API](https://fakestoreapi.com).

It's designed to reflect the kind of structure, code quality, and attention to detail expected in a real production codebase, not just a tutorial project.

## Features

- 🛒 **Shopping flow** — product listing with filters & sorting, product detail pages, cart, and a multi-step checkout
- ❤️ **Wishlist** and **recently viewed products**
- 🔐 **Authentication** — login, registration, and protected account pages
- 👤 **Account management** — profile editing and order history
- 🌗 **Light/Dark mode** with persisted theme preference
- 🌍 **Full RTL support** — built natively for Persian (Farsi), including a localized Iranian province/city address picker
- 🔎 **Debounced search** with search history
- 📄 **Static pages** — About, Contact, FAQ, Privacy Policy, Terms of Service
- ⚡ **SEO-ready** — dynamic sitemap and robots.txt
- 🎨 **Polished UI/UX** — smooth animations, loading/skeleton states, toast notifications, and accessible components

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, Server Components) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) with custom design tokens |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) (shadcn/ui-style components) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Forms & Validation | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Data Source | [Fake Store API](https://fakestoreapi.com) |

## Project Structure

```
persian-shop/
├── app/                  # Routes (App Router) — pages, layouts, loading/error states
├── components/
│   ├── layout/           # Header, footer, mini-cart, theme toggle
│   ├── product/          # Product card, filters, grid, sorting
│   ├── shared/           # Context providers
│   └── ui/                # Reusable, accessible UI primitives
├── features/             # Feature-scoped components (home, checkout, product-detail)
├── contexts/             # React Context providers (auth, cart, wishlist, orders)
├── hooks/                # Custom hooks (debounce, local storage, search history)
├── services/             # API layer
├── constants/            # Static data (e.g. Iran provinces/cities)
├── types/                # Shared TypeScript types
└── utils/                # Utility functions
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- npm (or your package manager of choice)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/persian-shop.git
cd persian-shop

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

No environment variables are required — the app runs entirely against the public Fake Store API.

## Deployment

This project is optimized for zero-config deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub
2. Import the project into Vercel
3. Deploy — no environment variables needed

## Roadmap

- [ ] Persist cart/wishlist to a real backend
- [ ] Add automated tests (unit + e2e)
- [ ] Payment gateway integration

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Built by **Hesam Peyvandi** — [GitHub](https://github.com/HesamPeyvandi)
