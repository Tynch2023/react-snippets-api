import { useEffect } from "react";

/**
 * useOnClickOutside Hook
 * 
 * Detecta clics fuera de un elemento especificado (ref) y ejecuta un handler.
 * Útil para cerrar modales, menús desplegables, etc.
 * 
 * @param {React.RefObject} ref - Referencia al elemento que queremos "proteger"
 * @param {Function} handler - Función a ejecutar al hacer clic fuera
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // No hacer nada si el clic fue dentro del elemento ref o si no hay ref
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
