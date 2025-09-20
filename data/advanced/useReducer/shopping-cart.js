import { useReducer } from "react";
import "./App.css";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.product];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export default function App() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const products = [
    { id: 1, name: "Manzanas", price: 3 },
    { id: 2, name: "Naranjas", price: 2 },
    { id: 3, name: "Peras", price: 4 },
  ];

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
      {cart.length === 0 && <p>Vacío</p>}
      <ul>
        {cart.map((item, i) => (
          <li key={i}>
            {item.name} - ${item.price}{" "}
            <button
              onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Vaciar carrito
        </button>
      )}
    </div>
  );
}
