ecommerce/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                    # Home (cliente)
│  ├─ error.tsx                   # Error handler global
│  ├─ loading.tsx                 # Loading global
│  ├─ not-found.tsx               # 404 global
│
│  ├─ products/
│  │  ├─ page.tsx                 # Listado (cliente)
│  │  ├─ loading.tsx
│  │  └─ [id]/
│  │     ├─ page.tsx              # Detalle (cliente)
│  │     └─ loading.tsx
│
│  ├─ cart/
│  │  └─ page.tsx
│
│  ├─ checkout/
│  │  └─ page.tsx
│
│  ├─ orders/
│  │  └─ [id]/
│  │     └─ page.tsx              # Confirmación/tracking cliente
│
│  ├─ admin/                      # 🔐 ADMIN
│  │  ├─ layout.tsx               # Layout admin con sidebar
│  │  ├─ page.tsx                 # Dashboard
│  │  │
│  │  ├─ products/
│  │  │  ├─ page.tsx              # Lista / gestión
│  │  │  ├─ new/
│  │  │  │  └─ page.tsx           # Crear producto
│  │  │  └─ [id]/
│  │  │     └─ edit/
│  │  │        └─ page.tsx        # Editar producto
│  │  │
│  │  └─ orders/
│  │     ├─ page.tsx              # Lista de pedidos admin
│  │     └─ [id]/
│  │        └─ page.tsx           # Detalle pedido admin
│
│  └─ api/
│     ├─ products/
│     │  ├─ route.ts              # GET all, POST
│     │  └─ [id]/
│     │     └─ route.ts           # GET, PUT, DELETE específico
│     │
│     ├─ cart/
│     │  └─ route.ts              # Operaciones de carrito
│     │
│     ├─ checkout/
│     │  └─ route.ts              # Procesamiento de pago
│     │
│     ├─ orders/
│     │  ├─ route.ts              # GET orders (admin)
│     │  └─ [id]/
│     │     └─ route.ts           # GET order específica
│     │
│     └─ webhooks/
│        └─ stripe/
│           └─ route.ts           # Webhook de Stripe
│
├─ components/
│  ├─ ui/                         # shadcn/ui components
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ input.tsx
│  │  └─ ...
│  │
│  ├─ ProductCard.tsx
│  ├─ ProductGrid.tsx
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ CartItem.tsx
│  ├─ AdminSidebar.tsx
│  └─ AdminNavbar.tsx
│
├─ lib/
│  ├─ db.ts                       # MongoDB connection
│  ├─ stripe.ts                   # Stripe config
│  ├─ auth.ts                     # Auth helpers
│  ├─ utils.ts                    # Utility functions (cn, etc)
│  │
│  └─ validations/
│     ├─ product.schema.ts        # Zod schemas para productos
│     ├─ order.schema.ts          # Zod schemas para órdenes
│     └─ auth.schema.ts           # Zod schemas para auth
│
├─ hooks/
│  ├─ useCart.ts
│  ├─ useProducts.ts
│  ├─ useOrders.ts
│  └─ useAuth.ts
│
├─ models/
│  ├─ Product.ts                  # Mongoose model
│  ├─ Order.ts                    # Mongoose model
│  └─ User.ts                     # Mongoose model
│
├─ store/
│  ├─ cart.store.ts               # Zustand para carrito
│  └─ user.store.ts               # Zustand para usuario
│
├─ types/
│  ├─ product.ts
│  ├─ order.ts
│  ├─ cart.ts
│  └─ user.ts
│
├─ constants/
│  ├─ categories.ts               # Categorías de productos
│  ├─ config.ts                   # Configuración general
│  └─ routes.ts                   # Rutas de la app
│
├─ utils/
│  ├─ formatters.ts               # Formateo de precios, fechas, etc
│  ├─ validators.ts               # Validaciones custom
│  └─ api-helpers.ts              # Helpers para API calls
│
├─ public/
│  ├─ images/
│  │  ├─ products/
│  │  ├─ placeholders/
│  │  └─ logo.svg
│  │
│  └─ icons/
│
├─ styles/
│  └─ globals.css
│
├─ __tests__/                     # Tests (opcional)
│  ├─ components/
│  ├─ api/
│  └─ utils/
│
├─ middleware.ts                  # Protege /admin y rate limiting
├─ .env.local
├─ .env.example
├─ .gitignore
├─ next.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json