import { useEffect, useRef } from "react";

/**
 * useEventListener Hook
 * 
 * Agrega un event listener a un elemento (window por defecto) y lo limpia automáticamente.
 * 
 * @param {string} eventName - Nombre del evento (ej: "click", "keydown")
 * @param {Function} handler - Función a ejecutar
 * @param {HTMLElement} element - Elemento al que agregar el listener (default: window)
 */
export function useEventListener(eventName, handler, element = window) {
  // Crear una ref que guarde el handler actual
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Asegurarse que el elemento soporta addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Crear event listener que llama a la función guardada
    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
