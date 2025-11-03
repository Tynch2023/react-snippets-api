/* eslint-disable */
// 👆 Ignora warnings de ESLint para trabajar todo en un archivo mientras practicás 🙂

import { createContext, useState, useContext } from "react";

// -----------------------------------------------------------------------------
// ✅ 1) Crear el Context
// -----------------------------------------------------------------------------
const TabsContext = createContext();

// -----------------------------------------------------------------------------
// ✅ 2) Componente principal <Tabs>
//    - Maneja estado de qué tab está activa
//    - Provee el contexto a los hijos
// -----------------------------------------------------------------------------
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// ✅ 3) Subcomponentes
// -----------------------------------------------------------------------------

// Contenedor de botones de pestañas
function List({ children }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
      {children}
    </div>
  );
}

// Botón de tab
function Button({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = index === activeIndex;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{
        padding: "8px 14px",
        cursor: "pointer",
        border: "none",
        borderBottom: isActive ? "2px solid black" : "2px solid transparent",
        fontWeight: isActive ? "bold" : "normal",
        background: "none",
      }}
    >
      {children}
    </button>
  );
}

// Panel de contenido
function Panel({ children, index }) {
  const { activeIndex } = useContext(TabsContext);

  return activeIndex === index ? (
    <div style={{ marginTop: "10px", padding: "10px 0" }}>{children}</div>
  ) : null;
}

// -----------------------------------------------------------------------------
// ✅ 4) Asignar subcomponentes como propiedades del componente padre
// -----------------------------------------------------------------------------
Tabs.List = List;
Tabs.Button = Button;
Tabs.Panel = Panel;

// -----------------------------------------------------------------------------
// ✅ 5) App Demo — Uso del patrón compuesto
// -----------------------------------------------------------------------------
export default function App() {
  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>Compound Component Pattern — Tabs</h1>

      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Button index={0}>Home</Tabs.Button>
          <Tabs.Button index={1}>Perfil</Tabs.Button>
          <Tabs.Button index={2}>Ajustes</Tabs.Button>
        </Tabs.List>

        <Tabs.Panel index={0}>
          <p>🏠 Bienvenido a la página de inicio.</p>
        </Tabs.Panel>

        <Tabs.Panel index={1}>
          <p>👤 Aquí va la información del perfil.</p>
        </Tabs.Panel>

        <Tabs.Panel index={2}>
          <p>⚙️ Configuraciones y ajustes.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
