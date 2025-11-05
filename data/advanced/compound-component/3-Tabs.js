//! App
// import "./App.css";
// import Tabs from "./components/Tabs";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-100 text-slate-800 p-6 font-sans">
//       <div className="mx-auto max-w-3xl">
//         <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
//           Dashboard de Simulación Agrícola
//         </h2>

//         <Tabs defaultTab="pellets">
//           <Tabs.List>
//             <Tabs.Tab name="pellets">
//               <button>Pellets</button>
//             </Tabs.Tab>

//             <Tabs.Tab name="biochar">
//               <button>Biochar</button>
//             </Tabs.Tab>

//             <Tabs.Tab name="paja">
//               <button>Paja</button>
//             </Tabs.Tab>

//             <Tabs.Tab name="planta">
//               <button>Planta</button>
//             </Tabs.Tab>
//           </Tabs.List>

//           <Tabs.Panel name="pellets">
//             <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="text-slate-700">
//                 ✅ Pellets almacenados: <span className="font-semibold">305 t</span> 📦 Volumen: <span className="font-semibold">1200 m³</span>
//               </div>
//             </div>
//           </Tabs.Panel>

//           <Tabs.Panel name="biochar">
//             <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="text-slate-700">
//                 ✅ Biochar producido: <span className="font-semibold">75 t</span> 🔥 Volumen: <span className="font-semibold">300 m³</span>
//               </div>
//             </div>
//           </Tabs.Panel>

//           <Tabs.Panel name="paja">
//             <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="text-slate-700">
//                 🌾 Paja recolectada hoy: <span className="font-semibold">472 t</span> 🏗️ Pendiente de procesar: <span className="font-semibold">72 t</span>
//               </div>
//             </div>
//           </Tabs.Panel>

//           <Tabs.Panel name="planta">
//             <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
//               <div className="text-slate-700">
//                 ⚙️ Uso planta: <span className="font-semibold">85%</span> 🕒 Turnos activos: <span className="font-semibold">2</span>
//               </div>
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

import {
  createContext,
  useContext,
  useState,
  cloneElement,
  Children,
} from "react";

const TabsContext = createContext();

export default function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Cambiar tab con teclas de flecha
  const handleKeyDown = (e) => {
    const tabs = Children.toArray(children).find(
      (child) => child.type.displayName === "TabsList"
    )?.props.children;

    const names = Children.map(tabs, (tab) => tab.props.name);
    const idx = names.indexOf(activeTab);

    if (e.key === "ArrowRight") {
      setActiveTab(names[(idx + 1) % names.length]);
    }
    if (e.key === "ArrowLeft") {
      setActiveTab(names[(idx - 1 + names.length) % names.length]);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div tabIndex={0} onKeyDown={handleKeyDown} className="outline-none">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ---------- Tabs List (lista de pestañas) ---------- */

function TabsList({ children }) {
  return (
    <div className="flex gap-2 border-b border-slate-200 mb-4">{children}</div>
  );
}
TabsList.displayName = "TabsList";
Tabs.List = TabsList;

/* ---------- Tab individual ---------- */

function Tab({ children, name }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === name;

  const baseClasses =
    "px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px";
  const activeClasses = "border-sky-500 text-slate-900";
  const inactiveClasses =
    "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300";

  const mergedClassName = [
    baseClasses,
    isActive ? activeClasses : inactiveClasses,
    children.props.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return cloneElement(children, {
    onClick: () => setActiveTab(name),
    className: mergedClassName,
  });
}
Tabs.Tab = Tab;

/* ---------- Panel de contenido ---------- */

function Panel({ children, name }) {
  const { activeTab } = useContext(TabsContext);

  return activeTab === name ? <div className="py-4">{children}</div> : null;
}
Tabs.Panel = Panel;
