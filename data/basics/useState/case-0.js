import { useState } from "react";

export default function CounterWithStep() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div style={styles.container}>
      <h2>useState: Contador con Pasos</h2>
      
      <button onClick={() => setIsVisible(!isVisible)} style={styles.button}>
        {isVisible ? "Ocultar Contador" : "Mostrar Contador"}
      </button>

      {isVisible && (
        <div style={styles.card}>
          <h3 style={styles.counter}>Cuenta: {count}</h3>
          
          <div style={styles.controls}>
            <button onClick={decrement} style={styles.actionButton}>-{step}</button>
            <button onClick={increment} style={styles.actionButton}>+{step}</button>
          </div>

          <div style={styles.stepControl}>
            <label>
              Paso: 
              <input 
                type="number" 
                value={step} 
                onChange={(e) => setStep(Number(e.target.value))}
                style={styles.input}
              />
            </label>
          </div>

          <button onClick={reset} style={styles.resetButton}>Resetear</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "300px",
    margin: "20px auto",
  },
  counter: {
    fontSize: "2rem",
    margin: "10px 0",
    color: "#333",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  stepControl: {
    marginBottom: "15px",
  },
  input: {
    marginLeft: "10px",
    padding: "5px",
    width: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  actionButton: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.2rem",
  },
  resetButton: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
  }
};
