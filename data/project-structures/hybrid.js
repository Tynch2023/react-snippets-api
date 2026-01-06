/**
 * ESTRUCTURA HÍBRIDA (RECOMENDADA)
 * =================================
 * Combina lo mejor de ambas mundos: organización por tipo Y por feature.
 * Usa una estructura plana con sub-carpetas por feature cuando es necesario.
 * 
 * Ventajas:
 * - Equilibrio entre organización y flexibilidad
 * - Escala bien para apps medianas
 * - Mantiene componentes compartidos organizados
 * 
 * Desventajas:
 * - Requiere decisiones sobre qué va en "shared" vs "features"
 * - Puede ser confuso si no hay consistencia
 */

src/
├── components/          # Componentes compartidos (reutilizables)
│   ├── ui/              # Componentes base (Button, Input, Card...)
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   └── index.js
│   └── layout/          # Componentes de layout
│       ├── Header.js
│       ├── Sidebar.js
│       └── index.js
├── hooks/               # Hooks compartidos
│   ├── useAuth.js
│   ├── useTheme.js
│   └── index.js
├── services/            # Servicios/API
│   ├── api.js           # Axios instance
│   └── endpoints.js     # URLs base
├── lib/                 # Bibliotecas/Configuraciones
│   ├── firebase.js
│   └── analytics.js
├── features/            # Lógica de negocio encapsulada
│   ├── auth/
│   │   ├── api/         # API calls específicos
│   │   ├── components/  # Componentes específicos
│   │   ├── hooks/       # Hooks específicos
│   │   └── index.js     # Exports públicos
│   ├── products/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.js
│   └── users/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── index.js
├── pages/               # Páginas (entry points de rutas)
│   ├── Home.js
│   ├── Dashboard.js
│   └── ErrorPage.js
├── styles/              # Estilos globales
├── utils/               # Utilidades menores
├── App.jsx
└── main.jsx
