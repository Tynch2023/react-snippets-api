// App.jsx — Rutas protegidas + login con Supabase (versión corta)

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./supabase"; // tu instancia configurada

/* ------------------------------
   Hook simple: obtener usuario
--------------------------------*/
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!mounted) return;
        if (error) throw error;
        setUser(data.session?.user ?? null);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error, isAuthenticated: !!user };
}

/* ------------------------------
   Ruta protegida
--------------------------------*/
function ProtectedRoute({ children }) {
  const location = useLocation();
  const { loading, isAuthenticated, error } = useUser();

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p style={{ color: "salmon" }}>{error}</p>;
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
}

/* ------------------------------
   Página de login (simple)
--------------------------------*/
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? "/";

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: 360,
        margin: "48px auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2>Iniciar sesión</h2>
      <label>
        Email
        <input
          placeholder="email@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </label>
      <label>
        Contraseña
        <input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </label>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <button disabled={loading}>
        {loading ? "Entrando..." : "Entrar con Supabase"}
      </button>
    </form>
  );
}

/* ------------------------------
   Página protegida (dashboard)
--------------------------------*/
function Dashboard() {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <section style={{ padding: 24 }}>
      <h1>Dashboard privado</h1>
      <p>Esta sección solo se muestra si el usuario está autenticado.</p>
      <button
        onClick={handleLogout}
        disabled={signingOut}
        style={{ marginTop: 16 }}
      >
        {signingOut ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
    </section>
  );
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
