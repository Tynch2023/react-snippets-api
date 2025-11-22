import { useState, useCallback } from "react";

/**
 * useToggle Hook
 * 
 * Maneja un valor booleano y proporciona una función para cambiarlo.
 * 
 * @param {boolean} initialState - Valor inicial (default: false)
 * @returns {[boolean, Function]} - El valor actual y la función toggle
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  // Define toggle function, optionally accepting a specific boolean value
  const toggle = useCallback((value) => {
    setState((current) => 
      typeof value === "boolean" ? value : !current
    );
  }, []);

  return [state, toggle];
}
