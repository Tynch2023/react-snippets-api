import { useEffect, useState } from "react";

/*
 * Ejemplo real de useEffect:
 * carga datos desde una API al montar el componente.
 *
 * Muestra:
 * - Estado de carga (loading)
 * - Manejo de errores
 * - Render condicional según el estado actual
 */

export default function UsersList() {
  const [users, setUsers] = useState([]); // lista de usuarios obtenidos
  const [loading, setLoading] = useState(true); // indica si está cargando
  const [error, setError] = useState(null); // guarda errores del fetch

  useEffect(() => {
    let isMounted = true; // bandera para evitar actualizar si se desmonta

    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) throw new Error("Error al obtener los usuarios");

        const data = await res.json();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUsers();

    // Cleanup: evita actualizaciones si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, []); // [] → se ejecuta solo una vez al montar el componente

  // Renderizado condicional según el estado
  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
