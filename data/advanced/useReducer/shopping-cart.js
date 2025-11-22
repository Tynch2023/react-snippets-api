import { useReducer } from "react";

// Tipos de acciones
const TYPES = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_CART: "CLEAR_CART",
  APPLY_DISCOUNT: "APPLY_DISCOUNT",
};

const initialState = {
  cart: [],
  discount: 0, // porcentaje de descuento (0 o 10)
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_ITEM: {
      const existing = state.cart.find((item) => item.id === action.product.id);

      if (existing) {
        // Si ya existe → aumentar cantidad
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si no existe → agregar con cantidad 1
        return {
          ...state,
          cart: [...state.cart, { ...action.product, quantity: 1 }],
        };
      }
    }

    case TYPES.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case TYPES.CLEAR_CART:
      return { ...state, cart: [], discount: 0 };

    case TYPES.APPLY_DISCOUNT:
      return { ...state, discount: 10 };

    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const products = [
    { id: 1, name: "Manzanas", price: 3 },
    { id: 2, name: "Naranjas", price: 2 },
    { id: 3, name: "Peras", price: 4 },
  ];

  // Calcular total
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalConDescuento = total * (1 - state.discount / 100);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Carrito de Compras</h1>

      <div style={styles.grid}>
        <div style={styles.section}>
          <h2>Productos</h2>
          <div style={styles.productList}>
            {products.map((p) => (
              <div key={p.id} style={styles.productCard}>
                <span>{p.name} - <strong>${p.price}</strong></span>
                <button 
                  onClick={() => dispatch({ type: TYPES.ADD_ITEM, product: p })}
                  style={styles.addButton}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2>Tu Carrito</h2>
          {state.cart.length === 0 ? (
            <p style={{ color: "#888" }}>El carrito está vacío</p>
          ) : (
            <ul style={styles.cartList}>
              {state.cart.map((item) => (
                <li key={item.id} style={styles.cartItem}>
                  <span>
                    {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch({ type: TYPES.REMOVE_ITEM, id: item.id })}
                    style={styles.removeButton}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {state.cart.length > 0 && (
            <div style={styles.summary}>
              <div style={styles.total}>
                Total: ${totalConDescuento.toFixed(2)}
                {state.discount > 0 && (
                  <span style={styles.discountBadge}>-{state.discount}% OFF</span>
                )}
              </div>
              
              <div style={styles.actions}>
                <button 
                  onClick={() => dispatch({ type: TYPES.APPLY_DISCOUNT })}
                  disabled={state.discount > 0}
                  style={state.discount > 0 ? styles.disabledButton : styles.actionButton}
                >
                  {state.discount > 0 ? "Descuento Aplicado" : "Aplicar Cupón (10%)"}
                </button>
                
                <button 
                  onClick={() => dispatch({ type: TYPES.CLEAR_CART })}
                  style={styles.clearButton}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "system-ui, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  section: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  productCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "6px",
    border: "1px solid #eee",
  },
  cartList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "6px",
    borderLeft: "4px solid #007bff",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  summary: {
    marginTop: "20px",
    borderTop: "2px solid #ddd",
    paddingTop: "15px",
  },
  total: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  discountBadge: {
    fontSize: "0.9rem",
    backgroundColor: "#ffc107",
    color: "#333",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "not-allowed",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "transparent",
    color: "#dc3545",
    border: "1px solid #dc3545",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
};
