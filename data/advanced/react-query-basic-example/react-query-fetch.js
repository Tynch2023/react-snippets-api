// src/
// ├─ App.jsx
// ├─ pages/
// │  └─ UserPage.jsx
// ├─ hooks/
// │  └─ useUser.js
// ├─ services/
// │  └─ apiUsers.js

//! App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import UserPage from "./pages/UserPage";

// ✅ Crea un cliente de React Query
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0, // Revalida siempre
//       retry: false, // No reintentar en error
//     },
//   },
// });

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           {/* Ejemplo: /users/1 */}
//           <Route path="/users/:userId" element={<UserPage />} />
//         </Routes>
//       </BrowserRouter>

//       {/* Herramienta para debug */}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// }

// hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../services/apiUsers";

// Hook reutilizable para obtener un usuario por ID
export function useUser() {
  const { userId } = useParams();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user", userId], // Clave dinámica
    queryFn: () => getUser(userId),
  });

  return { isLoading, error, user };
}

// pages/UserPage.jsx
import { useUser } from "../hooks/useUser";

export default function UserPage() {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <p>Cargando usuario...</p>;
  if (error) return <p>❌ Error al cargar: {error.message}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👤 Usuario #{user.id}</h2>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

// services/apiUsers.js

// Ejemplo simple con fetch real o simulado
export async function getUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("No se pudo cargar el usuario");
  return res.json();
}

// Ruta de server Vite: http://localhost:5173/users/1
