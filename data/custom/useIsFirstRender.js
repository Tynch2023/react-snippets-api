import { useRef } from "react";

/**
 * useIsFirstRender Hook
 * 
 * Retorna true solo en el primer renderizado.
 * Útil para evitar ejecutar efectos o lógicas en el montaje inicial si no se desea.
 * 
 * @returns {boolean}
 */
export function useIsFirstRender() {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
}
