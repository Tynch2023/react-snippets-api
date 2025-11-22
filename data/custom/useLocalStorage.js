import { useState } from "react";

/**
 * useLocalStorage Hook
 * 
 * Sincroniza el estado con localStorage para persistencia de datos.
 * 
 * @param {string} key - La clave para localStorage
 * @param {any} initialValue - El valor inicial si no hay nada en localStorage
 * @returns {[any, Function]} - El valor almacenado y una función para actualizarlo
 */
export function useLocalStorage(key, initialValue) {
  // Estado para almacenar nuestro valor
  // Pasamos una función a useState para que la lógica solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en el estado y en localStorage
  const setValue = (value) => {
    try {
      // Permitir que el valor sea una función para tener la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
