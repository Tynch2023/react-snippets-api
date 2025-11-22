import { useState, useEffect } from "react";

/**
 * useFetch Hook
 * 
 * Un hook simple para realizar peticiones HTTP.
 * Nota: Para aplicaciones grandes, considera usar React Query o SWR.
 * 
 * @param {string} url - La URL a la que hacer la petición
 * @param {object} options - Opciones para fetch
 * @returns {{data: any, loading: boolean, error: any}}
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { ...options, signal });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]); // Ojo: si 'options' cambia en cada render, esto causará loops infinitos si se incluye en deps.

  return { data, loading, error };
}
