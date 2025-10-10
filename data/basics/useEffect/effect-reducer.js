import { useEffect, useReducer } from "react";

/*
 * Estado inicial del temporizador.
 * count: valor actual del contador
 * speed: velocidad de incremento (cuánto aumenta el contador por tick)
 * isRunning: indica si el temporizador está activo o en pausa
 */
const initialState = {
  count: 0,
  speed: 1,
  isRunning: false,
};

/*
 * Reducer: función pura que describe cómo cambia el estado
 * según el tipo de acción recibida.
 */
function reducer(state, action) {
  switch (action.type) {
    // Alterna entre iniciar o pausar el temporizador
    case "TOGGLE":
      return { ...state, isRunning: !state.isRunning };

    // Incrementa el contador en función de la velocidad actual
    case "INCREMENT":
      return { ...state, count: state.count + state.speed };

    // Aumenta la velocidad del temporizador en +1
    case "INCREASE_SPEED":
      return { ...state, speed: state.speed + 1 };

    // Retorna el estado actual por defecto si la acción no coincide
    default:
      return state;
  }
}

/*
 * Componente Timer
 * ----------------
 * Ejemplo de uso de useReducer + useEffect para manejar un temporizador
 * con múltiples estados relacionados (count, speed, isRunning).
 */
export default function Timer() {
  // useReducer reemplaza varios useState relacionados
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
   * Efecto que se activa cuando el temporizador está corriendo.
   * Cada segundo dispara la acción INCREMENT.
   */
  useEffect(() => {
    if (!state.isRunning) return; // si está pausado, no hace nada

    const id = setInterval(() => {
      dispatch({ type: "INCREMENT" });
    }, 1000);

    // Limpieza del intervalo al pausar o desmontar el componente
    return () => clearInterval(id);
  }, [state.isRunning, state.speed]); // dependencias necesarias

  // Render del componente
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Speed: {state.speed}</p>

      {/* Botón para iniciar o pausar el temporizador */}
      <button onClick={() => dispatch({ type: "TOGGLE" })}>
        {state.isRunning ? "Pause" : "Start"}
      </button>

      {/* Botón para aumentar la velocidad */}
      <button onClick={() => dispatch({ type: "INCREASE_SPEED" })}>
        Speed +
      </button>
    </div>
  );
}
