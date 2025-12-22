/**
 * Next.js App Router – "use client" (ejemplo más completo)
 * --------------------------------------------------------
 * Toggle de tema (claro/oscuro) con persistencia en localStorage.
 */

"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "demo-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Cargar tema guardado al montar
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  // Persistir y aplicar el tema
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="inline-flex items-center gap-3 rounded border border-primary-800/60 px-3 py-2">
      <span className="text-sm text-primary-200">Tema actual: {theme}</span>
      <button
        onClick={toggle}
        className="rounded bg-accent-500 px-3 py-1 text-xs font-semibold text-primary-950"
      >
        Cambiar a {theme === "light" ? "oscuro" : "claro"}
      </button>
    </div>
  );
}


