import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const baseUrl = "https://tynch2023.github.io/react-snippets-api";

export default function App() {
  const [snippets, setSnippets] = useState(null);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Cargar index.json
  useEffect(() => {
    const loadIndex = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/data/index.json?nocache=${Date.now()}`
        );
        if (!res.ok) throw new Error("Error al cargar index.json");
        const data = await res.json();
        setSnippets(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadIndex();
  }, []);

  // 2. Cargar snippet cuando seleccionamos uno
  useEffect(() => {
    if (!selected) return;
    const loadSnippet = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/${selected}?nocache=${Date.now()}`);
        if (!res.ok) throw new Error("Error al obtener snippet");
        const data = await res.text();
        setCode(data);
      } catch (err) {
        console.error(err);
        setCode("// Error al cargar snippet");
      } finally {
        setLoading(false);
      }
    };
    loadSnippet();
  }, [selected]);

  // 3. Render
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Sidebar con lista de snippets */}
      <div style={{ minWidth: "250px" }}>
        <h2>Snippets disponibles</h2>
        {!snippets && <p>Cargando lista...</p>}
        {snippets && (
          <ul>
            <li>
              <button
                onClick={() => setSelected(snippets.basics.useState.main)}
              >
                basics/useState.js
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSelected(snippets.basics.useState.filter.filterTasks)
                }
              >
                basics/useState/filter/filterTasks.js
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelected(snippets.basics.useEffect.main)}
              >
                basics/useEffect.js
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Vista de código */}
      <div style={{ flex: 1 }}>
        <h1>Vista de snippet</h1>
        {loading && <p>Cargando snippet...</p>}
        {!loading && code && (
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
