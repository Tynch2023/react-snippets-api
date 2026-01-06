/**
 * ESTRUCTURA POR FEATURES (por funcionalidad)
 * ===========================================
 * Organiza el código por dominios o características del negocio.
 * Ideal para aplicaciones medianas/grandes con equipos por feature.
 * 
 * Ventajas:
 * - Alta cohesión: todo lo relacionado a un feature está junto
 * - Escalable: fácil añadir nuevos features
 * - Equipos independientes: cada equipo puede trabajar en su feature
 * 
 * Desventajas:
 * - Puede generar duplicación de código (utils, components compartidos)
 * - Requiere disciplina para evitar acoplamiento entre features
 */

src/
├── components/          # Componentes compartidos globales
│   ├── Button/
│   ├── Modal/
│   └── Input/
├── features/            # Features con todo su código relacionado
│   ├── auth/
│   │   ├── components/     # Componentes específicos de auth
│   │   ├── hooks/          # Hooks específicos de auth
│   │   ├── pages/          # Páginas de auth
│   │   ├── services/       # API calls de auth
│   │   ├── store/          # Estado local de auth
│   │   └── index.js        # Exports públicos
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── index.js
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── index.js
├── hooks/               # Hooks compartidos
├── services/            # Servicios compartidos (API config, axios)
├── utils/               # Funciones utilitarias
├── styles/              # Estilos globales
└── App.js
