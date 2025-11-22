import { useEffect, useRef } from "react";

/**
 * usePrevious Hook
 * 
 * Almacena el valor anterior de una variable (prop o state).
 * 
 * @param {any} value - El valor a rastrear
 * @returns {any} - El valor anterior
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
