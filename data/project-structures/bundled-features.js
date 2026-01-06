/**
 * ESTRUCTURA CON PATTERN: BUNDLED FEATURES
 * =========================================
 * Cada feature tiene su propio "mini-món" autocontenido.
 * Similar a "by feature" pero más estricto con los límites.
 * 
 * Ventajas:
 * - Máximo aislamiento entre features
 * - Features pueden removerse fácilmente
 * - Favorece el principio de responsabilidad única
 * 
 * Desventajas:
 * - Duplicación inevitable entre features
 * - Requiere "core" o "shared" bien definido
 */

src/
├── core/                  # Núcleo compartido y configuración
│   ├── components/        # Componentes base (Button, Input...)
│   ├── hooks/
│   ├── services/          # API base, auth service
│   ├── utils/
│   ├── config/
│   └── index.ts           # Exports públicos del core
├── features/              # Features autocontenidos
│   ├── auth/
│   │   ├── index.ts       # Exports: useAuth, AuthProvider, LoginForm
│   │   ├── types.ts
│   │   ├── auth.config.ts
│   │   ├── components/    # Solo componentes de auth
│   │   ├── hooks/         # Solo hooks de auth
│   │   ├── services/      # Solo servicios de auth
│   │   ├── store/         # State management local
│   │   └── tests/
│   ├── products/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── tests/
│   ├── orders/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── tests/
│   └── users/
│       ├── index.ts
│       ├── types.ts
│       └── ...
├── components/            # Componentes globales (composition root)
│   └── App/
│       ├── App.tsx
│       ├── providers.tsx
│       └── routes.tsx
├── styles/
├── utils/
└── main.tsx
