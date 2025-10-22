//! Slice
import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [{ name: "Queso", price: 2500, quantity: 20 }],
    errorMessage: "",
  },
  reducers: {
    addProduct: (state, action) => {
      const { name, quantity, price } = action.payload;

      // Evita productos sin nombre
      if (!name) return;

      const existingProduct = state.items.find(
        (product) => product.name === name
      );

      if (existingProduct) {
        // Si ya existe, suma la cantidad
        existingProduct.quantity += Number(quantity);
        state.errorMessage =
          "The product already exists! Quantity has been updated!";
      } else {
        // Si no existe, lo agrega
        state.items.push({ name, price, quantity: quantity });
        state.errorMessage = "";
      }
    },
    sellProduct: (state, action) => {
      const { name } = action.payload;
      // Evita productos sin nombre
      if (!name) return;

      const existingProduct = state.items.find(
        (product) => product.name === name
      );

      if (existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
      }
    },
    removeProduct: (state, action) => {
      const { name } = action.payload;

      // Evita productos sin nombre
      if (!name) return;

      const newList = state.items.filter((product) => product.name !== name);
      state.items = newList;
    },
    resetInventory: (state) => {
      state.items = [{ name: "Queso", price: 2500, quantity: 20 }];
      state.errorMessage = "";
    },
  },
});

export const { addProduct, sellProduct, removeProduct, resetInventory } =
  inventorySlice.actions;
export default inventorySlice.reducer;

//! Store
import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../features/inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

//! Main
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

//! App
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="flex items-center flex-col space-y-4 bg-zinc-900 p-5 text-white">
      <h1 className="uppercase mb-3">Gestor de inventario</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;

//! Components
import { useState } from "react";
import { addProduct } from "../features/inventory/inventorySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProductForm() {
  const errorMessage = useSelector((state) => state.inventory.errorMessage);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ name: "", price: 0, quantity: 0 });

  function handleChangue(e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" || name === "amount" ? Number(value) : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!product) return;

    dispatch(addProduct(product));
    setProduct({ name: "", price: "", quantity: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="w-[400px] flex flex-col">
      <label>Name:</label>
      <input
        name="name"
        className="bg-gray-300 text-zinc-800"
        type="text"
        value={product.name}
        onChange={handleChangue}
      />

      <label>Price:</label>
      <input
        name="price"
        className="bg-gray-300 text-zinc-80"
        type="text"
        value={product.price}
        onChange={handleChangue}
      />

      <label>Quantity:</label>
      <input
        name="quantity"
        className="bg-gray-300 text-zinc-80"
        type="text"
        value={product.quantity}
        onChange={handleChangue}
      />

      <button className="py-1 px-3 text-gray-100 bg-amber-400 mt-1 hover:bg-amber-600 cursor-pointer">
        Add Product
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
//? -----------------------
import { useSelector, useDispatch } from "react-redux";
import {
  resetInventory,
  sellProduct,
  removeProduct,
} from "../features/inventory/inventorySlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.items);
  const errorMessage = useSelector((state) => state.inventory.errorMessage);

  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-xl font-bold">Product List</h2>
      <button
        onClick={() => dispatch(resetInventory())}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded cursor-pointer"
      >
        Reset inventory
      </button>

      {products.length === 0 ? (
        <p>No hay productos en el inventario.</p>
      ) : (
        products.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-3 bg-gray-800 text-white p-3 rounded-md"
          >
            <span>{product.name}</span>
            <span>💲{product.price} </span>
            <span>📦 {product.quantity}</span>
            <button
              onClick={() => {
                dispatch(removeProduct(product));
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded cursor-pointer"
            >
              Remove
            </button>
            <button
              disabled={product.quantity > 0 ? false : true}
              onClick={() => dispatch(sellProduct(product))}
              className="bg-amber-400 hover:bg-amber-600 text-white font-bold py-1 px-4 rounded cursor-pointer"
            >
              Sell
            </button>
          </div>
        ))
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

