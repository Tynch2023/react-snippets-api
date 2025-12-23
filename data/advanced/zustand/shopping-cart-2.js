// cartStore.js
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Estado
        items: [],
        isOpen: false,

        // Acciones básicas del carrito
        addItem: (product) => {
          const items = get().items;
          const existingItem = items.find((item) => item.id === product.id);

          if (existingItem) {
            // Si ya existe, incrementar cantidad
            set(
              {
                items: items.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              },
              false,
              "cart/addItem/increment"
            );
          } else {
            // Si no existe, agregar nuevo item
            set(
              { items: [...items, { ...product, quantity: 1 }] },
              false,
              "cart/addItem/new"
            );
          }
        },

        removeItem: (productId) => {
          set(
            { items: get().items.filter((item) => item.id !== productId) },
            false,
            "cart/removeItem"
          );
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }

          set(
            {
              items: get().items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            },
            false,
            "cart/updateQuantity"
          );
        },

        incrementQuantity: (productId) => {
          const item = get().items.find((i) => i.id === productId);
          if (item) {
            get().updateQuantity(productId, item.quantity + 1);
          }
        },

        decrementQuantity: (productId) => {
          const item = get().items.find((i) => i.id === productId);
          if (item) {
            get().updateQuantity(productId, item.quantity - 1);
          }
        },

        clearCart: () => {
          set({ items: [] }, false, "cart/clear");
        },

        // Control de visibilidad del carrito
        toggleCart: () => {
          set({ isOpen: !get().isOpen }, false, "cart/toggle");
        },

        openCart: () => {
          set({ isOpen: true }, false, "cart/open");
        },

        closeCart: () => {
          set({ isOpen: false }, false, "cart/close");
        },

        // Selectores computados (getters)
        getTotal: () => {
          return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },

        getItemCount: () => {
          return get().items.reduce((count, item) => count + item.quantity, 0);
        },

        getItemById: (productId) => {
          return get().items.find((item) => item.id === productId);
        },

        hasItem: (productId) => {
          return get().items.some((item) => item.id === productId);
        },

        // Utilidades
        getTotalByCategory: (category) => {
          return get()
            .items.filter((item) => item.category === category)
            .reduce((total, item) => total + item.price * item.quantity, 0);
        },

        applyDiscount: (discountPercent) => {
          const total = get().getTotal();
          return total - (total * discountPercent) / 100;
        },

        calculateTax: (taxRate = 0.16) => {
          return get().getTotal() * taxRate;
        },

        getFinalTotal: (taxRate = 0.16, discountPercent = 0) => {
          const subtotal = get().getTotal();
          const discount = subtotal * (discountPercent / 100);
          const afterDiscount = subtotal - discount;
          const tax = afterDiscount * taxRate;
          return afterDiscount + tax;
        },
      }),
      {
        name: "shopping-cart-storage", // Nombre en localStorage
        partialize: (state) => ({ items: state.items }), // Solo persiste items
      }
    ),
    { name: "CartStore" } // Nombre en DevTools
  )
);

export default useCartStore;

// ============================================
// EJEMPLO DE USO EN COMPONENTES
// ============================================

/*
// En un componente de producto
import useCartStore from './cartStore';

function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  const hasItem = useCartStore(state => state.hasItem);
  const isInCart = hasItem(product.id);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        {isInCart ? 'Agregar más' : 'Agregar al carrito'}
      </button>
    </div>
  );
}

// En el componente del carrito
function Cart() {
  const items = useCartStore(state => state.items);
  const getTotal = useCartStore(state => state.getTotal);
  const getFinalTotal = useCartStore(state => state.getFinalTotal);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  
  const subtotal = getTotal();
  const total = getFinalTotal(0.16, 10); // 16% impuesto, 10% descuento
  
  return (
    <div>
      <h2>Carrito</h2>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input 
            type="number" 
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <span>${item.price * item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
      ))}
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Total final: ${total.toFixed(2)}</p>
    </div>
  );
}

// Badge del carrito en el header
function CartBadge() {
  const itemCount = useCartStore(state => state.getItemCount());
  const openCart = useCartStore(state => state.openCart);
  
  return (
    <button onClick={openCart}>
      🛒 Carrito ({itemCount})
    </button>
  );
}

// Usando selectores específicos para mejor rendimiento
function CartTotal() {
  // Este componente solo se re-renderiza cuando cambia el total
  const total = useCartStore(state => state.getTotal());
  
  return <div>Total: ${total.toFixed(2)}</div>;
}
*/

// ============================================
// VERSIÓN CON TYPESCRIPT
// ============================================

/*
// cartStore.ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getItemById: (productId: number) => CartItem | undefined;
  hasItem: (productId: number) => boolean;
  getTotalByCategory: (category: string) => number;
  applyDiscount: (discountPercent: number) => number;
  calculateTax: (taxRate?: number) => number;
  getFinalTotal: (taxRate?: number, discountPercent?: number) => number;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        isOpen: false,
        
        addItem: (product) => {
          const items = get().items;
          const existingItem = items.find(item => item.id === product.id);
          
          if (existingItem) {
            set({
              items: items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
          }
        },
        
        // ... resto de las acciones igual que arriba
      }),
      { name: 'shopping-cart-storage' }
    ),
    { name: 'CartStore' }
  )
);

export default useCartStore;
*/
