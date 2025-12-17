/**
 * Next.js App Router demo – Server/Client/Suspense
 * ------------------------------------------------
 * Muestra:
 * - Server Components (por defecto)
 * - Client Components ("use client")
 * - Suspense para carga async
 * - Filtros usando searchParams
 * - Simulación de una API (getCabins)
 *
 * ✅ Pensado como snippet educativo en un solo archivo.
 */

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/* ============================================================
   SIMULATED API (Server-side)
   ============================================================ */

// Simula una llamada a una API o base de datos (lado servidor)
async function getCabins() {
  await new Promise((res) => setTimeout(res, 800)); // latencia fake

  return [
    { id: 1, name: "Dolomite Retreat", max_capacity: 2 },
    { id: 2, name: "Alpine Escape", max_capacity: 4 },
    { id: 3, name: "Forest Lodge", max_capacity: 6 },
    { id: 4, name: "Mountain Palace", max_capacity: 10 },
  ];
}

/* ============================================================
   SERVER COMPONENT – CabinList
   ============================================================ */

// Server Component async que recibe el filtro desde la Page
async function CabinList({ filter }) {
  const cabins = await getCabins();

  let displayedCabins = cabins;

  if (filter === "small")
    displayedCabins = cabins.filter((c) => c.max_capacity <= 3);

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (c) => c.max_capacity >= 4 && c.max_capacity <= 7
    );

  if (filter === "large")
    displayedCabins = cabins.filter((c) => c.max_capacity >= 8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayedCabins.map((cabin) => (
        <article
          key={cabin.id}
          className="border border-primary-800/60 bg-primary-900/20 p-5 rounded-lg space-y-1"
        >
          <h3 className="text-xl font-semibold">{cabin.name}</h3>
          <p className="text-primary-300 text-sm">
            Max capacity: {cabin.max_capacity} guests
          </p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   CLIENT COMPONENT – Filter
   ============================================================ */

/**
 * Client Component:
 * - Usa hooks de navegación de Next.js
 * - Manipula la URL (searchParams)
 * - No hace fetch de datos
 *
 * En un proyecto real viviría en su propio archivo con "use client"
 * en la primera línea del archivo.
 */
function FilterClient() {
  "use client";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(value) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") params.delete("capacity");
    else params.set("capacity", value);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const currentFilter = searchParams.get("capacity") ?? "all";

  const baseBtn =
    "px-4 py-2 text-xs md:text-sm border-r border-primary-800/70 last:border-r-0 transition-colors";

  const activeClasses = "bg-primary-900/60 text-accent-200";
  const inactiveClasses = "text-primary-200 hover:bg-primary-900/40";

  return (
    <div className="inline-flex border border-primary-800 rounded-md overflow-hidden bg-primary-950/60">
      <button
        onClick={() => handleFilter("all")}
        className={`${baseBtn} ${
          currentFilter === "all" ? activeClasses : inactiveClasses
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`${baseBtn} ${
          currentFilter === "small" ? activeClasses : inactiveClasses
        }`}
      >
        1–3
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`${baseBtn} ${
          currentFilter === "medium" ? activeClasses : inactiveClasses
        }`}
      >
        4–7
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`${baseBtn} ${
          currentFilter === "large" ? activeClasses : inactiveClasses
        }`}
      >
        8+
      </button>
    </div>
  );
}

/* ============================================================
   LOADING STATE
   ============================================================ */

function Spinner() {
  return <p className="text-primary-300 text-sm">Loading cabins...</p>;
}

/* ============================================================
   PAGE COMPONENT (Server)
   ============================================================ */

export const metadata = {
  title: "Server/Client/Suspense – Cabins",
};

// Page Server Component: lee searchParams y orquesta todo
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-medium text-accent-400">
          Our Luxury Cabins
        </h1>
        <p className="text-primary-200 text-sm md:text-base max-w-2xl">
          Example page showing how to combine Server Components, a small Client
          Component and React Suspense using the Next.js App Router.
        </p>
      </header>

      <div className="flex justify-end">
        <FilterClient />
      </div>

      {/* Suspense maneja el loading del Server Component async */}
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </section>
  );
}


