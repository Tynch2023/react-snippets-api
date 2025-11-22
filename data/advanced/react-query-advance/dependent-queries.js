import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Simulación de APIs
const fetchUser = async (email) => {
  // Retorna usuario con un ID
  return { id: 123, name: "John Doe", email };
};

const fetchProjectsByUser = async (userId) => {
  // Retorna proyectos basados en el ID del usuario
  return [
    { id: 1, title: "Proyecto A" },
    { id: 2, title: "Proyecto B" },
  ];
};

export default function DependentQueries() {
  const [email, setEmail] = useState("john@example.com");

  // 1. Primera query: Obtener usuario
  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email),
  });

  const userId = user?.id;

  // 2. Segunda query: Depende de que userId exista
  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["projects", userId],
    queryFn: () => fetchProjectsByUser(userId),
    // La query no se ejecutará hasta que userId tenga valor (sea truthy)
    enabled: !!userId,
  });

  if (loadingUser) return <div>Buscando usuario...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dependent Queries</h2>
      <p>Usuario encontrado: <strong>{user.name}</strong> (ID: {user.id})</p>
      
      <h3>Sus Proyectos:</h3>
      {loadingProjects ? (
        <div>Cargando proyectos...</div>
      ) : (
        <ul>
          {projects?.map((project) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
      )}
      
      {!userId && <p>Esperando ID de usuario...</p>}
    </div>
  );
}
