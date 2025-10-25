// useFetcherFormExample.js
// 📘 Ejemplo completo y comentado del uso de fetcher.Form en React Router

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useFetcher,
} from "react-router-dom";

// ----------------------------------------------------
// 1️⃣ Action simulada: procesa la actualización del pedido
// ----------------------------------------------------
// Las "actions" en React Router manejan solicitudes POST, PATCH, DELETE, etc.
// Aquí simulamos una actualización de estado de pedido.
async function updateOrderAction({ request }) {
  // Extraemos los datos enviados por el formulario
  const formData = await request.formData();
  const isPriority = formData.get("priority");

  // Simulamos una actualización (en un caso real harías un fetch o DB update)
  console.log("📦 Pedido actualizado → prioridad:", isPriority);

  // Retornamos algo que estará disponible en fetcher.data
  return { success: true, priority: isPriority };
}

// ----------------------------------------------------
// 2️⃣ Componente que usa fetcher.Form
// ----------------------------------------------------
function UpdateOrder() {
  // useFetcher permite enviar formularios o ejecutar loaders sin navegar
  const fetcher = useFetcher();

  // Estado del fetcher: "idle" | "submitting" | "loading"
  console.log("Estado del fetcher:", fetcher.state);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h2>🚚 Actualizar pedido</h2>
      <p>Este formulario usa fetcher.Form para enviar datos sin navegar.</p>

      {/* 
        📤 fetcher.Form funciona igual que un <Form> normal,
        pero al usar fetcher, el envío se hace en segundo plano (sin cambio de ruta).
      */}
      <fetcher.Form method="PATCH">
        {/* Campo oculto con el valor que queremos enviar */}
        <input type="hidden" name="priority" value="true" />

        {/* Botón personalizado */}
        <button
          type="submit"
          disabled={fetcher.state === "submitting"}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {fetcher.state === "submitting" ? "Actualizando..." : "Dar prioridad"}
        </button>
      </fetcher.Form>

      {/* Mostramos los datos devueltos por la action */}
      {fetcher.data?.success && (
        <p style={{ marginTop: "1rem", color: "green" }}>
          ✅ Pedido actualizado como prioritario.
        </p>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3️⃣ Definición del router
// ----------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <UpdateOrder />,
    action: updateOrderAction, // La action se ejecuta cuando se envía el formulario
  },
]);

// ----------------------------------------------------
// 4️⃣ App principal
// ----------------------------------------------------
export default function App() {
  return <RouterProvider router={router} />;
}
