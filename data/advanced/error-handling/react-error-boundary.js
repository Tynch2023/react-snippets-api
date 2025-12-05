// Ejemplo completo: Manejo de errores con react-error-boundary
// ================================================================
// Requisitos: npm install react-error-boundary
//
// Este ejemplo muestra cómo capturar y manejar errores de React
// usando ErrorBoundary para errores síncronos y useErrorHandler
// para errores asíncronos.

import { ErrorBoundary } from "react-error-boundary";
import { useErrorHandler } from "react-error-boundary";
import { useState, useEffect } from "react";

// ================================================================
// 1. Componente Fallback personalizado
// ================================================================
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        padding: "20px",
        border: "1px solid #ef4444",
        borderRadius: "8px",
        backgroundColor: "#fef2f2",
        color: "#991b1b",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Algo salió mal:</h2>
      <pre style={{ whiteSpace: "pre-wrap", marginBottom: "16px" }}>
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

// ================================================================
// 2. Componente que puede lanzar errores síncronos
// ================================================================
function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("¡Error intencional desde BuggyComponent!");
  }
  return <div>Componente funcionando correctamente ✅</div>;
}

// ================================================================
// 3. Componente con manejo de errores asíncronos
// ================================================================
function AsyncComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Simular un error aleatorio
        if (Math.random() > 0.5) {
          throw new Error("Error al cargar datos desde la API");
        }
        // Simular datos exitosos
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData({ message: "Datos cargados exitosamente" });
      } catch (error) {
        // Pasar el error al ErrorBoundary usando useErrorHandler
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [handleError]);

  if (loading) return <div>Cargando...</div>;
  return <div>{data?.message}</div>;
}

// ================================================================
// 4. Hook personalizado para manejar errores en funciones async
// ================================================================
function useAsyncError() {
  const handleError = useErrorHandler();
  return (error) => {
    handleError(error);
  };
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const throwError = useAsyncError();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Usuario no encontrado`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        throwError(error);
      }
    }
    loadUser();
  }, [userId, throwError]);

  if (!user) return <div>Cargando usuario...</div>;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ================================================================
// 5. Función para loggear errores (opcional)
// ================================================================
function logErrorToService(error, errorInfo) {
  console.error("Error capturado:", error);
  console.error("Información adicional:", errorInfo);
  // Aquí podrías enviar el error a un servicio como Sentry, LogRocket, etc.
  // Ejemplo: Sentry.captureException(error, { extra: errorInfo });
}

// ================================================================
// 6. Componente principal con múltiples ErrorBoundaries
// ================================================================
export default function ErrorHandlingExample() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Ejemplos de Manejo de Errores</h1>

      {/* ErrorBoundary para errores síncronos */}
      <section style={{ marginBottom: "40px" }}>
        <h2>1. Error Síncrono</h2>
        <button
          onClick={() => setShouldThrow(!shouldThrow)}
          style={{
            padding: "8px 16px",
            marginBottom: "16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {shouldThrow ? "Arreglar componente" : "Lanzar error"}
        </button>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logErrorToService}
          onReset={() => setShouldThrow(false)}
          resetKeys={[shouldThrow]}
        >
          <BuggyComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
      </section>

      {/* ErrorBoundary para errores asíncronos */}
      <section style={{ marginBottom: "40px" }}>
        <h2>2. Error Asíncrono (useErrorHandler)</h2>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AsyncComponent />
        </ErrorBoundary>
      </section>

      {/* ErrorBoundary para fetch de datos */}
      <section style={{ marginBottom: "40px" }}>
        <h2>3. Error en Fetch de Datos</h2>
        <div style={{ marginBottom: "16px" }}>
          <label>
            ID de Usuario:{" "}
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              min="1"
              max="10"
              style={{ padding: "4px", marginLeft: "8px" }}
            />
          </label>
        </div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setUserId(1)}
          resetKeys={[userId]}
        >
          <UserProfile userId={userId} />
        </ErrorBoundary>
      </section>

      {/* Información adicional */}
      <section
        style={{
          marginTop: "40px",
          padding: "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h3>Notas importantes:</h3>
        <ul>
          <li>
            <strong>ErrorBoundary</strong> solo captura errores en el árbol de
            componentes React (errores síncronos).
          </li>
          <li>
            Para errores asíncronos (fetch, promises, etc.), usa{" "}
            <strong>useErrorHandler</strong>.
          </li>
          <li>
            <strong>resetKeys</strong> permite resetear el ErrorBoundary cuando
            cambian ciertos valores.
          </li>
          <li>
            <strong>onError</strong> es útil para logging o reportes de
            errores.
          </li>
        </ul>
      </section>
    </div>
  );
}

