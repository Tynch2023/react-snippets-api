ecommerce/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                    # Home (cliente)
│
│  ├─ products/
│  │  ├─ page.tsx                 # Listado (cliente)
│  │  └─ [id]/
│  │     └─ page.tsx              # Detalle (cliente)
│
│  ├─ cart/
│  │  └─ page.tsx
│
│  ├─ checkout/
│  │  └─ page.tsx
│
│  ├─ admin/                      # 🔐 ADMIN
│  │  ├─ layout.tsx               # Layout admin
│  │  ├─ page.tsx                 # Dashboard
│  │  └─ products/
│  │     ├─ page.tsx              # Lista / gestión
│  │     └─ new/
│  │        └─ page.tsx           # Crear producto
│
│  └─ api/
│     └─ products/
│        └─ route.ts              # GET (cliente) / POST (admin)
│
├─ components/
│  ├─ ui/
│  ├─ ProductCard.tsx
│  ├─ Navbar.tsx
│  └─ AdminSidebar.tsx
│
├─ lib/
│  ├─ db.ts                       # Mongo
│  ├─ stripe.ts
│  └─ auth.ts                     # Protección admin
│
├─ models/
│  └─ Product.ts
│
├─ store/
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
├─ middleware.ts                  # Protege /admin
├─ .env.local
└─ package.json
