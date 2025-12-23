/**
 * Next.js App Router – useFormStatus en formularios con Server Actions
 * -------------------------------------------------------------------
 * Muestra:
 * - Cómo usar `useFormStatus` para deshabilitar/indicar loading en el botón
 * - Cómo conectar un formulario a una Server Action (`action={updateGuest}`)
 * - Buenas prácticas: componentes pequeños y campos inmutables
 *
 * ✅ Pensado como snippet educativo en un solo archivo.
 */

/* ============================================================
   SERVER ACTION (vive en el servidor, p.ej. app/_lib/actions.js)
   ============================================================ */

// En tu proyecto real este código vive en un archivo del servidor.
// Si usas TypeScript, puedes tipar el FormData o el retorno según tu modelo.
export async function updateGuest(formData) {
  "use server";

  // Simulación de persistencia
  await new Promise((res) => setTimeout(res, 900));

  const payload = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    nationality: formData.get("nationality"),
    national_id: formData.get("national_id"),
  };

  // Aquí guardarías en DB; devolvemos algo simbólico
  return { ok: true, updatedAt: new Date().toISOString(), payload };
}

/* ============================================================
   CLIENT COMPONENT – Formulario conectado a la Server Action
   ============================================================ */

"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";

// Componente botón separado para que `useFormStatus` funcione correctamente
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
      type="submit"
    >
      {pending ? "Guardando..." : "Actualizar perfil"}
    </button>
  );
}

// Select control aislado para mantener el formulario legible
function NationalitySelect({ defaultValue, countries }) {
  return (
    <select
      name="nationality"
      defaultValue={defaultValue}
      className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default function UpdateProfileForm({ guest }) {
  const { full_name, email, nationality, national_id, country_flag } = guest;

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
    { code: "ES", name: "Spain" },
    { code: "AR", name: "Argentina" },
  ];

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col rounded-lg"
    >
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-accent-200">
          Actualiza tu perfil
        </h2>
        <p className="text-primary-200 text-sm">
          Los campos de nombre y email son de solo lectura; puedes cambiar tu
          nacionalidad y documento.
        </p>
      </header>

      <div className="space-y-2">
        <label className="text-primary-100">Full name</label>
        <input
          name="full_name"
          disabled
          defaultValue={full_name}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-primary-100">Email address</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="text-primary-100">
            Where are you from?
          </label>
          <Image
            src={country_flag}
            alt="Country flag"
            width={35}
            height={14}
            className="rounded-sm object-cover"
            sizes="20px"
          />
        </div>
        <NationalitySelect defaultValue={nationality} countries={countries} />
      </div>

      <div className="space-y-2">
        <label htmlFor="national_id" className="text-primary-100">
          National ID number
        </label>
        <input
          name="national_id"
          defaultValue={national_id}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        />
      </div>

      <div className="flex justify-end items-center gap-6 pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}


