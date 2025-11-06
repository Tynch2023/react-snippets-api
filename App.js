import "./App.css";
import { useState, useEffect, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const baseUrl = "https://tynch2023.github.io/react-snippets-api";

export default function App() {
  const [snippets, setSnippets] = useState(null);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

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

  // Utilidades de filtro
  const normalize = (str) => (str || "").toLowerCase();

  const filterTree = (node, q) => {
    if (!node) return null;
    if (!q) return node;
    const queryLc = normalize(q);

    const result = Object.entries(node).reduce((acc, [key, value]) => {
      const keyMatch = normalize(key).includes(queryLc);

      if (typeof value === "string") {
        const valueMatch = normalize(value).includes(queryLc);
        if (keyMatch || valueMatch) acc[key] = value;
        return acc;
      }

      // value es un objeto (carpeta): filtrar descendientes
      const filteredChild = filterTree(value, q);
      const hasChildren =
        filteredChild && Object.keys(filteredChild).length > 0;
      if (keyMatch || hasChildren) acc[key] = filteredChild;
      return acc;
    }, {});

    return result;
  };

  const filteredSnippets = useMemo(
    () => filterTree(snippets, query),
    [snippets, query]
  );

  // Render recursivo del menú
  const renderTree = (obj) =>
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`block w-full text-left px-3 py-2 rounded transition text-sm border border-transparent hover:border-gray-600 hover:bg-gray-800/60 ${
              selected === value
                ? "bg-gray-800 border-gray-600 text-white"
                : "text-gray-200"
            }`}
          >
            {key}
          </button>
        );
      }

      return (
        <div key={key} className="ml-2 mt-2">
          <div className="font-semibold text-gray-300 text-sm mb-1 flex items-center gap-2">
            <span>📁</span>
            <span>{key}</span>
          </div>
          <div className="border-l border-gray-700 pl-3">
            {renderTree(value)}
          </div>
        </div>
      );
    });

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-800 overflow-auto">
        <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800 p-4">
          <h2 className="text-lg font-bold">📂 Snippets</h2>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar carpetas o archivos..."
              className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="px-2 py-2 text-xs rounded-md border border-gray-700 hover:bg-gray-800"
                aria-label="Limpiar filtro"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="p-4">
          {!snippets && <p className="text-sm text-gray-400">Cargando...</p>}
          {filteredSnippets && Object.keys(filteredSnippets).length > 0 ? (
            <div className="space-y-2 text-sm">
              {renderTree(filteredSnippets)}
            </div>
          ) : (
            snippets && (
              <p className="text-sm text-gray-400">
                {query
                  ? "Sin resultados para ese filtro."
                  : "Selecciona una carpeta para empezar."}
              </p>
            )
          )}
        </div>
      </aside>

      {/* Viewer */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">📄 Vista del snippet</h1>
          {selected && (
            <span
              className="text-xs text-gray-400 border border-gray-800 rounded px-2 py-1 truncate max-w-[50%]"
              title={selected}
            >
              {selected}
            </span>
          )}
        </div>

        {loading && (
          <p className="text-gray-400 text-sm">Cargando snippet...</p>
        )}

        {!loading && code && (
          <div className="rounded-lg border border-gray-800 bg-black/60">
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
          </div>
        )}

        {!loading && !code && (
          <div className="h-[60vh] grid place-items-center border border-dashed border-gray-800 rounded-lg">
            <p className="text-gray-500 text-sm">
              Elige un snippet del panel izquierdo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
