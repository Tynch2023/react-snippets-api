import { useState, useEffect } from "react";

/**
 * useMediaQuery Hook
 * 
 * Permite usar media queries en JS para renderizado condicional.
 * 
 * @param {string} query - La media query (ej: "(min-width: 768px)")
 * @returns {boolean} - True si la query coincide
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    // Soporte para navegadores modernos y antiguos
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
