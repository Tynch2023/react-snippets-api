import { useState, useEffect } from "react";

/**
 * useWindowSize Hook
 * 
 * Devuelve las dimensiones actuales de la ventana y se actualiza al redimensionar.
 * 
 * @returns {{width: number, height: number}} - Objeto con width y height
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Función para actualizar el estado con el tamaño de la ventana
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Agregar event listener
    window.addEventListener("resize", handleResize);
    
    // Llamar a la función inmediatamente para obtener el tamaño inicial
    handleResize();

    // Limpiar event listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
