/**
 * ESTRUCTURA POR TIPO DE ARCHIVO
 * ==============================
 * Organiza el código por tipo (components, hooks, services, etc.)
 * La forma más simple y tradicional de estructurar React.
 * 
 * Ventajas:
 * - Muy fácil de entender para principiantes
 * - Favorece la reutilización de código
 * - Estándar ampliamente reconocido
 * 
 * Desventajas:
 * - Las carpetas pueden crecer mucho (components/ puede tener 100+ archivos)
 * - Dificulta la navegación cuando la app crece
 * - Bajo acoplamiento pero también baja cohesión por feature
 */

src/
├── components/          # Todos los componentes
│   ├── Button.js
│   ├── Header.js
│   ├── Footer.js
│   ├── UserCard.js
│   ├── ProductList.js
│   └── ...
├── hooks/               # Todos los hooks personalizados
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useLocalStorage.js
│   └── ...
├── services/            # Servicios/API
│   ├── api.js           # Configuración de axios
│   ├── authService.js
│   ├── userService.js
│   └── productService.js
├── context/             # Contextos de React
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   └── CartContext.js
├── pages/               # Componentes de página (routes)
│   ├── Home.js
│   ├── About.js
│   ├── Dashboard.js
│   └── ...
├── utils/               # Funciones utilitarias
│   ├── formatDate.js
│   ├── validateEmail.js
│   └── helpers.js
├── styles/              # Estilos
│   ├── global.css
│   └── variables.css
├── types/               # TypeScript types (si aplica)
└── App.js
