/* eslint-disable */
//! ToggleEvent.js — Ejemplo de Componentes Compuestos en React

// Importamos React y herramientas necesarias
import { createContext, useContext, useState } from "react";

// Creamos el contexto que compartirán los subcomponentes
const ToggleContext = createContext();

// Componente principal: controla el estado "on/off"
export default function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// Subcomponente: Botón que cambia el estado
Toggle.Button = function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);

  return (
    <button onClick={toggle} className="px-3 py-2 text-xl border rounded">
      {on ? "Apagado" : "Encendido"}
    </button>
  );
};

// Subcomponente: Muestra el estado
Toggle.Label = function ToggleLabel() {
  const { on } = useContext(ToggleContext);

  return (
    <p className="mt-2 text-lg">
      Estado actual: {on ? "APAGADO ❌" : "ENCENDIDO ✅"}
    </p>
  );
};

//!APP
// import "./App.css";
// import Toggle from "./components/Toggle";

// const App = () => {
//   return (
//     <div className="p-6">
//       <h2>Ejemplo: Componentes compuestos</h2>

//       <Toggle>
//         <Toggle.Button />
//         <Toggle.Label />
//       </Toggle>
//     </div>
//   );
// };

// export default App;
