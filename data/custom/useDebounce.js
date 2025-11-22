import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * 
 * Retrasa la actualización de un valor hasta que haya pasado un tiempo específico
 * desde la última vez que cambió. Útil para búsquedas en tiempo real.
 * 
 * @param {any} value - El valor a debouncar
 * @param {number} delay - El retraso en milisegundos
 * @returns {any} - El valor debouncado
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configurar un timer para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer si el valor cambia (o si el componente se desmonta)
    // antes de que termine el delay.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Ejemplo de uso:
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
