import { useReducer } from "react";
import "./App.css";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispach] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Contador: {state.count}</h1>
      <button onClick={() => dispach({ type: "decrement" })}>-</button>
      <button onClick={() => dispach({ type: "reset" })}>Reset counter</button>
      <button onClick={() => dispach({ type: "increment" })}>+</button>
    </div>
  );
}
