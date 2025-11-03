/* eslint-disable */
// 👆 Esta línea hace que ignore los warnings de ESLint SOLO en este archivo

import { createContext, useState, useContext } from "react";

// -----------------------------------------------------------------------------
// ✅ CONTEXTO (parte clave del patrón compuesto)
// -----------------------------------------------------------------------------
const CounterContext = createContext();

// -----------------------------------------------------------------------------
// ✅ COMPONENTE PADRE (provee estado + lógica)
// -----------------------------------------------------------------------------
function Counter({ children }) {
  const [count, setCount] = useState(0);

  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {children}
      </div>
    </CounterContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// ✅ SUB-COMPONENTES (consumen el contexto)
// -----------------------------------------------------------------------------

// Muestra el número
function Count() {
  const { count } = useContext(CounterContext);
  return <span style={{ fontSize: "1.5rem" }}>{count}</span>;
}

// Muestra un texto que describe el contador
function Label({ children }) {
  return (
    <span style={{ marginRight: "4px", fontWeight: "bold" }}>{children}</span>
  );
}

// Botón para sumar
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return (
    <button onClick={increase} style={{ padding: "6px 10px" }}>
      {icon}
    </button>
  );
}

// Botón para restar
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return (
    <button onClick={decrease} style={{ padding: "6px 10px" }}>
      {icon}
    </button>
  );
}

// -----------------------------------------------------------------------------
// ✅ Asignamos los sub-componentes como propiedades del componente principal
// -----------------------------------------------------------------------------
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

// -----------------------------------------------------------------------------
// ✅ APP PRINCIPAL — Ejemplo de uso
// -----------------------------------------------------------------------------
export default function App() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Compound Component Pattern</h1>

      <Counter>
        <Counter.Label>Mi contador:</Counter.Label>
        <Counter.Decrease icon="−" />
        <Counter.Count />
        <Counter.Increase icon="+" />
      </Counter>
    </div>
  );
}
