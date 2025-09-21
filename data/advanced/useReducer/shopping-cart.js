import { useReducer } from "react";
import "./App.css";

const initialState = {
  cart: [],
  discount: 0, // porcentaje de descuento (0 o 10)
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
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

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "CLEAR_CART":
      return { ...state, cart: [], discount: 0 };

    case "APPLY_DISCOUNT":
      return { ...state, discount: 10 };

    default:
      return state;
  }
}

export default function App() {
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
    <div>
      <h1>🛒 Carrito de Compras</h1>

      <h2>Productos</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => dispatch({ type: "ADD_ITEM", product: p })}>
            Agregar
          </button>
        </div>
      ))}

      <h2>Carrito</h2>
      {state.cart.length === 0 && <p>Vacío</p>}
      <ul>
        {state.cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} × {item.quantity} = $
            {item.price * item.quantity}
            <button
              onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      {state.cart.length > 0 && (
        <>
          <h3>Total: ${totalConDescuento.toFixed(2)}</h3>
          {state.discount > 0 && (
            <p>(Incluye {state.discount}% de descuento)</p>
          )}
          <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
            Vaciar carrito
          </button>
          <button onClick={() => dispatch({ type: "APPLY_DISCOUNT" })}>
            Aplicar 10% descuento
          </button>
        </>
      )}
    </div>
  );
}
