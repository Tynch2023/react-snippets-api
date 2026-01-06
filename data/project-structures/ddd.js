/**
 * ESTRUCTURA CON DOMAIN-DRIVEN DESIGN (DDD)
 * ==========================================
 * Para aplicaciones enterprise con lógica de negocio compleja.
 * Separa claramente las capas: domain, application, infrastructure, interfaces.
 * 
 * Ventajas:
 * - Separación clara de responsabilidades
 * - Muy testable (easy to mock layers)
 * - Favorece arquitectura limpia
 * 
 * Desventajas:
 * - Curva de aprendizaje alta
 * - Overhead para proyectos pequeños
 * - Mucho boilerplate
 */

src/
├── domain/              # Reglas de negocio puras (modelos, entidades)
│   ├── entities/        # Objetos del dominio
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── value-objects/   # Valores inmutables
│   │   ├── Email.js
│   │   └── Money.js
│   ├── repositories/    # Interfaces (contratos) para repositorios
│   │   ├── UserRepository.js
│   │   └── ProductRepository.js
│   └── services/        # Servicios de dominio (lógica pura)
│       ├── PricingService.js
│       └── InventoryService.js
├── application/         # Casos de uso (interactúan con el dominio)
│   ├── use-cases/       # Un archivo por caso de uso
│   │   ├── CreateUser.js
│   │   ├── ProcessOrder.js
│   │   └── CalculateDiscount.js
│   └── dto/             # Data Transfer Objects
│       ├── UserDTO.js
│       └── OrderDTO.js
├── infrastructure/      # Implementaciones técnicas
│   ├── persistence/     # Database implementations
│   │   ├── repositories/
│   │   │   ├── UserRepositoryImpl.js
│   │   │   └── ProductRepositoryImpl.js
│   │   └── database/
│   │       └── PrismaClient.js
│   ├── external/        # APIs externas
│   │   ├── payment/
│   │   │   └── StripeClient.js
│   │   └── email/
│   │       └── SendGridClient.js
│   └── frameworks/      # Configuraciones de frameworks
│       └── express/
├── interfaces/          # Controladores, adapters
│   ├── controllers/     # HTTP controllers
│   │   ├── UserController.js
│   │   └── OrderController.js
│   ├── presenters/      # Formateadores de respuesta
│   │   └── UserPresenter.js
│   └── middleware/      # Express/Next.js middleware
├── shared/              # Código compartido
│   ├── config/
│   ├── utils/
│   └── constants/
├── components/          # Componentes UI (React)
│   └── ...
└── App.js
