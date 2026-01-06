/**
 * ESTRUCTURA PARA MONOREPO (Turborepo)
 * =====================================
 * Varios paquetes/packages en un solo repositorio.
 * Cada package puede ser una aplicación o una librería.
 * 
 * Ventajas:
 * - Código compartido entre apps
 * - Visibilidad de cambios cross-repo
 * - Herramientas como Turborepo aceleran builds
 * 
 * Desventajas:
 * - Complejidad adicional
 * - Requiere configuración inicial
 * - Puede crecer mucho el repo
 */

├── apps/
│   ├── web/                    # Aplicación Next.js
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   └── ...
│   │   ├── package.json
│   │   └── next.config.js
│   ├── mobile/                 # App React Native
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   └── ...
│   │   └── package.json
│   └── admin/                  # Panel de admin
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/                     # Paquete de componentes UI
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── eslint-config/          # Configuración de ESLint
│   │   ├── index.js
│   │   └── package.json
│   ├── ts-config/              # Configuración TypeScript
│   │   ├── base.json
│   │   └── package.json
│   └── utils/                  # Utilidades compartidas
│       ├── src/
│       │   ├── format.ts
│       │   └── index.ts
│       └── package.json
├── packages.json               # Root package.json
├── turbo.json                  # Turborepo config
├── tsconfig.json               # TypeScript root config
├── .eslintrc.js
└── .gitignore
