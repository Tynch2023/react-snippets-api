/**
 * Zustand - Contador básico
 * -------------------------
 * Muestra:
 * - Creación de un store simple con Zustand
 * - Uso del hook useStore para leer y actualizar estado
 * - Acciones inline en el store
 *
 * ✅ Zustand es más simple que Redux: no necesitas Provider ni dispatch
 */

import { create } from "zustand";

/* ============================================================
   STORE - Definición del estado y acciones
   ============================================================ */

// En un proyecto real este código viviría en:
// src/store/counterStore.js

const useCounterStore = create((set) => ({
  // Estado inicial
  count: 0,

  // Acciones (funciones que actualizan el estado)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

/* ============================================================
   COMPONENTE - Usar el store
   ============================================================ */

// En un proyecto real este código viviría en:
// src/components/Counter.js

export default function Counter() {
  // Leer el estado y las acciones del store
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl bg-zinc-800 text-white">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>

      <div className="flex gap-4">
        <button
          onClick={decrement}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          ➖ Decrement
        </button>

        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          🔄 Reset
        </button>

        <button
          onClick={increment}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          ➕ Increment
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ALTERNATIVA - Seleccionar múltiples valores a la vez
   ============================================================ */

// Puedes seleccionar múltiples valores del store de una vez:
// const { count, increment, decrement } = useCounterStore();

// O usar un selector para evitar re-renders innecesarios:
// const count = useCounterStore((state) => state.count);

// --------------------------------------------------------------
// 🔁 FLUJO RESUMIDO DE ZUSTAND
// --------------------------------------------------------------
//
// 1️⃣ Creas el store con create() y defines estado + acciones
// 2️⃣ En el componente, usas useCounterStore() para acceder al estado
// 3️⃣ Las acciones modifican el estado directamente con set()
// 4️⃣ Los componentes que usan ese estado se re-renderizan automáticamente
// 5️⃣ No necesitas Provider (a menos que quieras inicializar con valores)
//
// --------------------------------------------------------------
