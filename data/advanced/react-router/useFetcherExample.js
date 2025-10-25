// useFetcherExample.js
// Ejemplo completo y comentado del uso de useFetcher() en React Router

import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useFetcher,
} from "react-router-dom";

// -------------------------------
// 1️⃣ Loader simulado
// -------------------------------
// Un loader devuelve datos cuando una ruta o fetcher lo llama.
// Aquí simulamos una API que devuelve un "menú" de pizzas.
export async function menuLoader() {
  // En un proyecto real podrías hacer:
  // const res = await fetch("/api/menu");
  // return res.json();

  // Datos simulados:
  return [
    { id: 1, name: "Margarita", price: 10 },
    { id: 2, name: "Pepperoni", price: 12 },
    { id: 3, name: "Cuatro Quesos", price: 11 },
  ];
}

// -------------------------------
// 2️⃣ Componente que usa useFetcher()
// -------------------------------
function Home() {
  // useFetcher() nos permite ejecutar loaders o actions sin navegar
  const fetcher = useFetcher();

  // useEffect para cargar los datos automáticamente al montar el componente
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      // Ejecuta el loader de la ruta "/menu"
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>🍕 Ejemplo useFetcher</h1>
      <p>Este componente carga el menú sin cambiar de ruta.</p>

      {/* Mostramos el estado del fetcher */}
      <p>
        Estado actual: <strong>{fetcher.state}</strong>
      </p>

      {/* Si aún no hay datos, mostramos un mensaje */}
      {!fetcher.data && <p>Cargando menú...</p>}

      {/* Cuando hay datos, los renderizamos */}
      {fetcher.data && (
        <ul>
          {fetcher.data.map((pizza) => (
            <li key={pizza.id}>
              {pizza.name} — ${pizza.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// -------------------------------
// 3️⃣ Configuración del router
// -------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    // Ruta a la que llama fetcher.load("/menu")
    path: "/menu",
    loader: menuLoader,
  },
]);

// -------------------------------
// 4️⃣ App principal
// -------------------------------
export default function App() {
  return <RouterProvider router={router} />;
}
