/**
 * Next.js App Router – "use server" inline (ejemplo simple)
 * ---------------------------------------------------------
 * Formulario que llama una Server Action definida inline.
 */

import { redirect } from "next/navigation";

export default function FeedbackForm() {
  async function submitFeedback(formData) {
    "use server";

    const message = formData.get("message");
    if (!message) throw new Error("El mensaje es obligatorio");

    // Aquí podrías guardar en DB. Simulamos log y redirección.
    console.log("[server action] feedback recibido:", message);

    redirect("/gracias");
  }

  return (
    <form action={submitFeedback} className="space-y-3 max-w-md">
      <label className="block space-y-1 text-sm">
        <span className="text-primary-200">Tu mensaje</span>
        <textarea
          name="message"
          className="w-full rounded border border-primary-800 bg-primary-950/60 p-2 text-primary-50"
          rows={3}
          placeholder="Escribe tu feedback"
        />
      </label>

      <button
        type="submit"
        className="rounded bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-950"
      >
        Enviar
      </button>
    </form>
  );
}


