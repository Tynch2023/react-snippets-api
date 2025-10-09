// Ejemplo: Evitar renders innecesarios en React mediante composición de componentes
// -------------------------------------------------------------------------------
// Este ejemplo muestra cómo un componente muy pesado (SlowComponent)
// puede evitar renderizarse nuevamente al mover el estado a un componente hijo.

// Importamos useState para manejar el estado local
import { useState } from "react";

// -------------------------------------------------------------------------------
// Componente "lento": simula un render costoso (crea 100.000 elementos en un array)
// -------------------------------------------------------------------------------
function SlowComponent() {
  // Este array grande simula un componente que tarda en renderizar
  const words = Array.from({ length: 100_000 }, () => "WORD");

  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// -------------------------------------------------------------------------------
// Componente Counter: contiene su propio estado y recibe children
// -------------------------------------------------------------------------------
// Al mantener el estado `count` aquí, los cambios afectan solo a Counter,
// no al componente padre (Test). Así evitamos volver a renderizar SlowComponent.
function Counter({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Slow counter?!?</h1>

      {/* Cada clic aumenta el contador, lo que re-renderiza SOLO este componente */}
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>

      {/* Renderizamos los hijos pasados desde el componente padre */}
      {children}
    </div>
  );
}

// -------------------------------------------------------------------------------
// Componente principal (Test)
// -------------------------------------------------------------------------------
// Aquí comparamos dos enfoques: uno lento (comentado) y otro optimizado (activo).
export default function Test() {
  // -------------------
  // ❌ Versión lenta
  // -------------------
  // En esta versión, el estado está en el componente Test.
  // Cada vez que cambia el estado, Test se vuelve a renderizar por completo.
  // Esto incluye volver a ejecutar SlowComponent, lo que causa lentitud.
  //
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );

  // -------------------
  // ✅ Versión optimizada
  // -------------------
  // Aquí delegamos el estado al componente Counter.
  // Test solo se renderiza una vez; no tiene estado propio.
  // Por lo tanto, SlowComponent se crea una sola vez y no se vuelve a renderizar
  // cuando cambia el contador.
  //
  // React mantiene la referencia del prop `children` (SlowComponent) sin recrearlo.
  // Así se logra una mejora de rendimiento sin necesidad de usar React.memo.
  return (
    <div>
      <h1>Slow counter?</h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
