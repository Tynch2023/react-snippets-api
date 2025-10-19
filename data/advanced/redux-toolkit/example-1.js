//! src/app/store.js ----------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

//! src/components/Counter.js ----------------------------------------------
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";

export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center justify-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl bg-zinc-800 text-white">
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

//! src/features/counter/counterSlice.js ----------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
// export default counterSlice.reducer;

//! MAIN ----------------------------------------------
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
