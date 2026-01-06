/**
 * ESTRUCTURA PARA NEXT.JS (APP ROUTER)
 * =====================================
 * Utiliza la convención de Next.js App Router.
 * Cada route es una carpeta con page.js, layout.js, etc.
 * 
 * Ventajas:
 * - Server Components por defecto
 * - Layouts anidados automáticos
 * - Optimización de código
 * - Streaming incorporado
 */

src/
├── app/                     # App Router (Next.js 13+)
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page (/)
│   ├── globals.css          # CSS global
│   ├── (auth)/              # Route group (no afecta URL)
│   │   ├── layout.js        # Auth layout (sin header/sidebar)
│   │   ├── login/
│   │   │   └── page.js
│   │   └── register/
│   │       └── page.js
│   ├── (dashboard)/         # Route group
│   │   ├── layout.js        # Dashboard layout
│   │   ├── page.js          # /dashboard
│   │   ├── analytics/
│   │   │   └── page.js
│   │   └── settings/
│   │       └── page.js
│   ├── products/
│   │   ├── page.js          # /products (Server Component)
│   │   ├── [id]/
│   │   │   └── page.js      # /products/:id
│   │   └── _components/     # Componentes locales
│   │       ├── ProductCard.js
│   │       └── ProductGrid.js
│   └── api/                  # API Routes
│       ├── route.js
│       └── products/
│           └── route.js
├── components/              # Componentes compartidos
│   ├── ui/                  # shadcn/ui style
│   ├── forms/
│   └── providers/
├── lib/                     # Utilidades
│   ├── db.js                # Database client
│   ├── auth.js              # Auth utilities
│   └── utils.js
├── hooks/                   # Custom hooks
├── services/                # Business logic
├── types/                   # TypeScript
├── public/                  # Static assets
└── .env                     # Environment vars
