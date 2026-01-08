ecommerce/
├─ app/                     # App Router (Next)
│  ├─ layout.tsx
│  ├─ page.tsx              # Home
│  ├─ products/
│  │  └─ [id]/
│  │     └─ page.tsx        # Producto individual
│  ├─ cart/
│  │  └─ page.tsx
│  ├─ checkout/
│  │  └─ page.tsx
│  └─ api/
│     └─ stripe/
│        └─ route.ts        # Backend Stripe (server)
│
├─ components/
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  └─ Modal.tsx
│  ├─ ProductCard.tsx
│  └─ Navbar.tsx
│
├─ lib/
│  ├─ stripe.ts             # Cliente Stripe
│  └─ db.ts                 # Mongo / Prisma
│
├─ store/                   # Estado global (Zustand)
│  └─ cart.store.ts
│
├─ types/
│  └─ product.ts
│
├─ public/
│  └─ images/
│
├─ styles/
│  └─ globals.css
│
├─ .env.local               # STRIPE_SECRET_KEY, etc
├─ next.config.js
├─ package.json
└─ tsconfig.json
