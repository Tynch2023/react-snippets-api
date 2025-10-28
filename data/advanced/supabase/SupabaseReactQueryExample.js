// ====================================================================
// 🌾 Ejemplo completo: Supabase + React Query + Renderización de datos
// ====================================================================
//
// 🔧 Requisitos previos:
// npm install @supabase/supabase-js @tanstack/react-query
//
// ====================================================================
// 🧱 Estructura simulada de la base de datos
// ====================================================================
//
// Tabla: pellets
// --------------------------------------------------------------------
// | id | region     | fecha        | volumen_toneladas | tipo    |
// |----|-------------|--------------|-------------------|---------|
// |  1 | Corrientes  | 2025-05-02   | 480               | paja    |
// |  2 | Formosa     | 2025-05-03   | 350               | paja    |
// |  3 | Misiones    | 2025-05-04   | 520               | paja    |
// --------------------------------------------------------------------
//
// ====================================================================

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

// ============================================================
// 🔌 1. Configurar el cliente de Supabase
// ============================================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// 🔍 2. Función fetcher: obtiene los datos desde Supabase
// ============================================================
async function fetchPellets() {
  const { data, error } = await supabase
    .from("pellets")
    .select("region, fecha, volumen_toneladas")
    .order("fecha", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// ============================================================
// 🧩 3. Componente pequeño que mapea y muestra los datos
// ============================================================
function PelletsList({ pellets }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {pellets.map((p, i) => (
        <li
          key={i}
          style={{
            background: "#f5f5f5",
            borderRadius: "8px",
            marginBottom: "6px",
            padding: "8px 12px",
          }}
        >
          <strong>{p.region}</strong> — {p.fecha} —{" "}
          <span>{p.volumen_toneladas} t</span>
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// ⚛️ 4. Componente principal con React Query
// ============================================================
function PelletsViewer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pellets"],
    queryFn: fetchPellets,
  });

  if (isLoading) return <p>⏳ Cargando datos...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>🌾 Datos desde Supabase (React Query)</h2>
      <PelletsList pellets={data} />
    </div>
  );
}

// ============================================================
// ⚙️ 5. Configuración del cliente de React Query
// ============================================================
const queryClient = new QueryClient();

// ============================================================
// 🚀 6. Exportar componente listo para usar
// ============================================================
export default function SupabaseReactQueryExample() {
  // (Opcional) Estado local o configuraciones
  const [enabled, setEnabled] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {enabled ? <PelletsViewer /> : <p>Simulación desactivada</p>}
    </QueryClientProvider>
  );
}

// ====================================================================
// ✅ Uso
// ====================================================================
//
// 1️⃣ Crea un archivo .env con:
//
// VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
// VITE_SUPABASE_ANON_KEY=tu-clave-publica
//
// 2️⃣ Asegurate de tener creada la tabla “pellets” con columnas:
//     id (int), region (text), fecha (date), volumen_toneladas (numeric)
//
// 3️⃣ Importá el componente en tu App principal:
//     import SupabaseReactQueryExample from "./SupabaseReactQueryExample";
//
// 4️⃣ Usalo así:
//     <SupabaseReactQueryExample />
//
// ====================================================================
//
// 💬 Este snippet es modular, reactivo y fácil de expandir.
// Podés reutilizar la función `fetchPellets` o el componente `PelletsList`
// en tu simulador principal de pellets y biochar.
// ====================================================================
