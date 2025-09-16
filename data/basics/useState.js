import { useState } from "react";

export default function ToggleCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  function increment() {
    setCount(count + 1);
  }

  function reset() {
    setCount(0);
  }

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useState Example</h2>
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide Counter" : "Show Counter"}
      </button>

      {isVisible && (
        <div>
          <h3>Count: {count}</h3>
          <button onClick={increment}>+1</button>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
}
