e-commerce/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   │
│   │   ├── models/
│   │   │   ├── Product.model.ts
│   │   │   ├── User.model.ts
│   │   │   └── Order.model.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── products.routes.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── orders.routes.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── product.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── order.controller.ts
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   │
│   │   └── checkout/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── Navbar.tsx
│   │   └── CartDrawer.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── public/
│   ├── tailwind.config.ts
│   └── package.json
│
├── docker/
│   └── docker-compose.yml
│
├── .gitignore
└── README.md
