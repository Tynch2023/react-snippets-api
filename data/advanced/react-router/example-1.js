import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
      <nav style={{ padding: 12, borderRight: "1px solid #333" }}>
        <h3>Demo Router</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cities">Cities</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>
      </nav>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Pricing() {
  return <h2>Pricing</h2>;
}

function Cities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "https://mocki.io/v1/8a26c1c7-24a6-4441-9d5a-2a2b1c7e9e4e"; // mock

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setCities(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {cities.map((c, i) => (
        <li key={i}>{c.name || String(c)}</li>
      ))}
    </ul>
  );
}

export default function RouterExample() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="cities" element={<Cities />} />
          <Route path="*" element={<h2>Not found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
