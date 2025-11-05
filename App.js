import "./App.css";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const baseUrl = "https://tynch2023.github.io/react-snippets-api";

export default function App() {
  const [snippets, setSnippets] = useState(null);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar index.json
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

  // Cargar snippet seleccionado
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

  // Render recursivo del menú
  const renderTree = (obj) =>
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition text-sm"
          >
            {key}
          </button>
        );
      }

      return (
        <div key={key} className="ml-2 mt-2">
          <div className="font-semibold text-gray-300 text-sm mb-1">{key}</div>
          <div className="border-l border-gray-600 pl-3">
            {renderTree(value)}
          </div>
        </div>
      );
    });

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-700 p-4 overflow-auto">
        <h2 className="text-lg font-bold mb-3">📂 Snippets</h2>

        {!snippets && <p className="text-sm text-gray-400">Cargando...</p>}

        {snippets && (
          <div className="space-y-2 text-sm">{renderTree(snippets)}</div>
        )}
      </aside>

      {/* Viewer */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-bold mb-4">📄 Vista del snippet</h1>

        {loading && (
          <p className="text-gray-400 text-sm">Cargando snippet...</p>
        )}

        {!loading && code && (
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={{
              padding: "20px",
              borderRadius: "8px",
              fontSize: "14px",
              background: "#0d0d0d",
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </main>
    </div>
  );
}
