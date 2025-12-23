/**
 * Zustand - Carrito de compras (ejemplo completo)
 * ------------------------------------------------
 * Muestra:
 * - Store con múltiples propiedades de estado
 * - Acciones complejas (agregar, remover, actualizar cantidad)
 * - Computed values (total del carrito)
 * - Persistencia opcional con localStorage
 * - Selectores para optimizar re-renders
 *
 * ✅ Ejemplo más realista de uso de Zustand en producción
 */

import { create } from "zustand";
import { persist } from "zustand/middleware"; // Opcional: para persistir en localStorage

/* ============================================================
   STORE - Carrito de compras
   ============================================================ */

// En un proyecto real este código viviría en:
// src/store/cartStore.js

const useCartStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      items: [],
      discount: 0, // porcentaje de descuento (0 o 10)

      // Acciones
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Si ya existe, aumentar cantidad
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Si no existe, agregar nuevo item
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], discount: 0 });
      },

      applyDiscount: () => {
        set({ discount: 10 });
      },

      // Computed value (getter)
      getTotal: () => {
        const { items, discount } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return subtotal * (1 - discount / 100);
      },
    }),
    {
      name: "cart-storage", // nombre para localStorage
      partialize: (state) => ({ items: state.items }), // solo persistir items
    }
  )
);

/* ============================================================
   COMPONENTE - Lista de productos
   ============================================================ */

function ProductList() {
  const addItem = useCartStore((state) => state.addItem);

  const products = [
    { id: 1, name: "Manzanas", price: 3 },
    { id: 2, name: "Naranjas", price: 2 },
    { id: 3, name: "Peras", price: 4 },
    { id: 4, name: "Plátanos", price: 2.5 },
  ];

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Productos Disponibles</h2>
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <div>
              <strong>{product.name}</strong>
              <span style={styles.price}>${product.price}</span>
            </div>
            <button
              onClick={() => addItem(product)}
              style={styles.addButton}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTE - Carrito
   ============================================================ */

function Cart() {
  // Seleccionar solo lo que necesitamos para evitar re-renders
  const items = useCartStore((state) => state.items);
  const discount = useCartStore((state) => state.discount);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyDiscount = useCartStore((state) => state.applyDiscount);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Tu Carrito</h2>

      {items.length === 0 ? (
        <p style={styles.emptyCart}>El carrito está vacío</p>
      ) : (
        <>
          <ul style={styles.cartList}>
            {items.map((item) => (
              <li key={item.id} style={styles.cartItem}>
                <div style={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span style={styles.itemPrice}>
                    ${item.price} c/u
                  </span>
                </div>

                <div style={styles.quantityControls}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={styles.quantityButton}
                  >
                    ➖
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    ➕
                  </button>
                </div>

                <div style={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <div style={styles.summary}>
            <div style={styles.totalRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={styles.totalRow}>
                <span>
                  Descuento ({discount}%):
                </span>
                <span style={styles.discount}>
                  -${(subtotal * (discount / 100)).toFixed(2)}
                </span>
              </div>
            )}
            <div style={styles.totalFinal}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={styles.actions}>
              <button
                onClick={applyDiscount}
                disabled={discount > 0}
                style={
                  discount > 0
                    ? styles.disabledButton
                    : styles.discountButton
                }
              >
                {discount > 0
                  ? "Descuento Aplicado"
                  : "Aplicar Cupón (10%)"}
              </button>
              <button onClick={clearCart} style={styles.clearButton}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */

export default function ShoppingCart() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Carrito de Compras con Zustand</h1>
      <div style={styles.grid}>
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

/* ============================================================
   ESTILOS
   ============================================================ */

const styles = {
  container: {
    fontFamily: "system-ui, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
    fontSize: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "30px",
  },
  section: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.5rem",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  productCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  price: {
    marginLeft: "10px",
    color: "#007bff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s",
  },
  cartList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    borderLeft: "4px solid #007bff",
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemPrice: {
    fontSize: "0.9rem",
    color: "#666",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  quantityButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  quantity: {
    minWidth: "30px",
    textAlign: "center",
    fontWeight: "bold",
  },
  itemTotal: {
    fontWeight: "bold",
    color: "#333",
    minWidth: "80px",
    textAlign: "right",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  emptyCart: {
    textAlign: "center",
    color: "#888",
    padding: "40px",
    fontSize: "1.1rem",
  },
  summary: {
    marginTop: "25px",
    borderTop: "2px solid #ddd",
    paddingTop: "20px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#666",
  },
  discount: {
    color: "#28a745",
    fontWeight: "bold",
  },
  totalFinal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "2px solid #ddd",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  discountButton: {
    backgroundColor: "#ffc107",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "not-allowed",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "transparent",
    color: "#dc3545",
    border: "2px solid #dc3545",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
  },
};

// --------------------------------------------------------------
// 🔁 CARACTERÍSTICAS DE ESTE EJEMPLO
// --------------------------------------------------------------
//
// ✅ Store con múltiples propiedades (items, discount)
// ✅ Acciones complejas que usan get() para acceder al estado actual
// ✅ Computed values (getTotal)
// ✅ Persistencia opcional con localStorage (usando persist middleware)
// ✅ Selectores específicos para optimizar re-renders
// ✅ No necesitas Provider, el store es global automáticamente
//
// --------------------------------------------------------------

