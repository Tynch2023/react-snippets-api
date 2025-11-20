// App.jsx — Rutas protegidas + login con Supabase (versión corta)

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import supabase from "./supabase"; // tu instancia

/* ------------------------------
   Hook simple: obtener usuario
--------------------------------*/
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    }
    loadUser();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}

/* ------------------------------
   Ruta protegida
--------------------------------*/
function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login");
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <p>Cargando usuario...</p>;
  if (!isAuthenticated) return null; // redirige luego
  return children;
}

/* ------------------------------
   Página de login (simple)
--------------------------------*/
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) navigate("/");
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Entrar</button>
    </form>
  );
}

/* ------------------------------
   Página protegida (dashboard)
--------------------------------*/
function Dashboard() {
  return <h1>Dashboard privado</h1>;
}

/* ------------------------------
   App principal
--------------------------------*/
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta privada */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Cualquier otra ruta → dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
