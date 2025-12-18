//  * Next.js App Router – API Route Handlers básico
//  * ----------------------------------------------
//  * Muestra:
//  * - Cómo crear un endpoint con Route Handlers en `app/api/*/route.ts`
//  * - Cómo consumirlo desde un Client Component con `fetch`
//  *
//  * ✅ Pensado como snippet educativo en un solo archivo.

/* ============================================================
   API ROUTE HANDLER – app/api/hello/route.ts
   ============================================================ */

// En un proyecto real este código viviría en:
// app/api/hello/route.ts
export async function GET(request) {
  // Podrías leer headers, searchParams, etc desde `request`

  const data = {
    message: "Hola desde la API de Next.js (Route Handler)!",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/* ============================================================
   CLIENT COMPONENT – Consumir el endpoint /api/hello
   ============================================================ */

// En un proyecto real este código viviría, por ejemplo, en:
// app/hello/page.tsx
("use client");

import { useEffect, useState } from "react";

export default function HelloApiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHello() {
      try {
        setLoading(true);
        const res = await fetch("/api/hello");

        if (!res.ok) throw new Error("Error al hacer fetch de /api/hello");

        const body = await res.json();
        setData(body);
      } catch (err) {
        setError(err.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchHello();
  }, []);

  if (loading) return <p className="text-primary-300">Cargando...</p>;
  if (error)
    return (
      <p className="text-red-400">
        Ocurrió un error al llamar a la API: {error}
      </p>
    );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-accent-300">
        Ejemplo básico de Route Handler
      </h1>

      <p className="text-primary-200 text-sm">
        Este componente cliente hace fetch al endpoint{" "}
        <code className="px-1 py-0.5 rounded bg-primary-900/60">
          /api/hello
        </code>{" "}
        implementado con un Route Handler en el App Router.
      </p>

      <pre className="mt-2 p-3 rounded bg-primary-950/70 text-xs md:text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
