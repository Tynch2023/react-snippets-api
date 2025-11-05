// ---------------------------- 1 ----------------------------------
//! src/features/counter/counterSlice.js
// --------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

// Acciones automáticas generadas por el slice
export const { increment, decrement } = counterSlice.actions;
// Reducer principal exportado por defecto
export default counterSlice.reducer;

// ----------------------------- 2 ---------------------------------
//! src/app/store.js
// --------------------------------------------------------------

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // nombre del slice → reducer correspondiente
  },
});

// ----------------------------- 3 ---------------------------------
//! src/main.jsx
// --------------------------------------------------------------

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

// ------------------------------ 4 --------------------------------
//! src/components/Counter.js
// --------------------------------------------------------------

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";

export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-row items-center justify-center gap-6 p-7 rounded-2xl bg-zinc-800 text-white">
      <button
        onClick={() => dispatch(decrement())}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
        ➖
      </button>

      <h1>Counter: {value}</h1>

      <button
        onClick={() => dispatch(increment())}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded"
        >
        ➕
      </button>
    </div>
  );
}

// ----------------------------- 5 ---------------------------------
//! src/App.jsx
// --------------------------------------------------------------

import Counter from "./components/Counter";

export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <Counter />
    </div>
  );
}

// --------------------------------------------------------------
//! 🔁 FLUJO RESUMIDO DE REDUX TOOLKIT
// --------------------------------------------------------------

// 1️⃣ El usuario hace clic en un botón (increment o decrement).
// 2️⃣ El componente ejecuta: dispatch(increment())
// 3️⃣ Redux envía esa acción al slice "counter".
// 4️⃣ El reducer modifica el estado (state.value += 1 o -= 1).
// 5️⃣ La store guarda el nuevo estado global.
// 6️⃣ useSelector detecta el cambio y React vuelve a renderizar el componente.
// --------------------------------------------------------------
