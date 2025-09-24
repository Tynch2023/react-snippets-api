import { useEffect, useReducer } from "react";
import "./App.css";

// Estado inicial
const initialState = "RED";

// Reducer: define cómo avanza el semáforo
function reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      if (state === "RED") return "YELLOW";
      if (state === "YELLOW") return "GREEN";
      return "RED"; // desde YELLOW vuelve a RED
    case "SET_RED":
      return "RED";
    case "SET_GREEN":
      return "GREEN";
    case "SET_YELLOW":
      return "YELLOW";
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Efecto: cambiar automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT" });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <h1>Simulador de Semáforo</h1>
      <Semaforo state={state} />

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => dispatch({ type: "NEXT" })}>Siguiente</button>
        <button onClick={() => dispatch({ type: "SET_RED" })}>Rojo</button>
        <button onClick={() => dispatch({ type: "SET_GREEN" })}>Verde</button>
        <button onClick={() => dispatch({ type: "SET_YELLOW" })}>
          Amarillo
        </button>
        <button onClick={() => dispatch({ type: "RESET" })}>Resetear</button>
      </div>
    </div>
  );
}

function Semaforo({ state }) {
  return (
    <div className="semaforo">
      <div className={`light red ${state === "RED" ? "active" : ""}`}></div>
      <div
        className={`light yellow ${state === "YELLOW" ? "active" : ""}`}
      ></div>
      <div className={`light green ${state === "GREEN" ? "active" : ""}`}></div>
    </div>
  );
}
