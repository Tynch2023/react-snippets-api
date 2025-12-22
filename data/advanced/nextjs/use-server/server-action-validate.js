/**
 * Next.js App Router – "use server" (ejemplo más completo)
 * --------------------------------------------------------
 * Server Action con validación, escritura simulada y revalidación.
 */

import { revalidatePath } from "next/cache";

const fakeDB = [];

// Server Action exportada (podrías moverla a un archivo shared)
export async function createNote(formData) {
  "use server";

  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();

  if (!title) throw new Error("El título es obligatorio");
  if (title.length > 80) throw new Error("Título demasiado largo");

  fakeDB.push({
    id: crypto.randomUUID(),
    title,
    body,
    createdAt: Date.now(),
  });

  // Si tuvieras una página que lista notas, la revalidas:
  revalidatePath("/notes");
}

// Server Component que usa la action exportada
export default function NotesPage() {
  return (
    <section className="space-y-4 max-w-lg">
      <header>
        <h1 className="text-2xl font-semibold text-accent-300">
          Crear nota (Server Action)
        </h1>
        <p className="text-primary-200 text-sm">
          Valida campos en el servidor, simula guardado y revalida la ruta.
        </p>
      </header>

      <form action={createNote} className="space-y-3">
        <label className="block space-y-1 text-sm">
          <span className="text-primary-200">Título</span>
          <input
            name="title"
            maxLength={80}
            className="w-full rounded border border-primary-800 bg-primary-950/60 p-2 text-primary-50"
            placeholder="Ej: Aprender Server Actions"
          />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="text-primary-200">Contenido</span>
          <textarea
            name="body"
            rows={4}
            className="w-full rounded border border-primary-800 bg-primary-950/60 p-2 text-primary-50"
            placeholder="Detalles de la nota"
          />
        </label>

        <button
          type="submit"
          className="rounded bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-950"
        >
          Guardar
        </button>
      </form>
    </section>
  );
}


