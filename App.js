import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const baseUrl = "https://tynch2023.github.io/react-snippets-api";

export default function App() {
  const [snippets, setSnippets] = useState(null);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set());

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

  const filterTree = useCallback((node, q) => {
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
  }, []);

  const filteredSnippets = useMemo(
    () => filterTree(snippets, query),
    [snippets, query, filterTree]
  );

  // Render recursivo del menú
  const renderTree = (obj, parentPath = "") =>
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`group flex w-full items-center gap-2 text-left px-3 py-2 rounded-md transition text-sm border border-transparent hover:border-gray-700 hover:bg-gray-900 ${
              selected === value
                ? "bg-gray-900/80 border-gray-700 text-white"
                : "text-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-cyan-400"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
              <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="3.5"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="3.5"
                transform="rotate(60 12 12)"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="3.5"
                transform="rotate(120 12 12)"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            <span className="truncate">{key}</span>
          </button>
        );
      }

      const folderPath = parentPath ? `${parentPath}/${key}` : key;
      const hasDirectFiles = Object.values(value).some(
        (v) => typeof v === "string"
      );
      const isCollapsed = collapsed.has(folderPath);

      return (
        <div key={folderPath} className="ml-2 mt-2">
          <div className="font-medium text-gray-300 text-sm mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            >
              <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h4.318c.597 0 1.17.237 1.592.659l.682.682c.422.422.995.659 1.592.659H19.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9.75z" />
            </svg>
            <span className="truncate">{key}</span>
            {hasDirectFiles && (
              <button
                type="button"
                aria-label={
                  isCollapsed ? "Expandir carpeta" : "Colapsar carpeta"
                }
                aria-expanded={!isCollapsed}
                onClick={() => {
                  setCollapsed((prev) => {
                    const next = new Set(prev);
                    if (next.has(folderPath)) next.delete(folderPath);
                    else next.add(folderPath);
                    return next;
                  });
                }}
                className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded border border-gray-700 text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {isCollapsed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 4.5a1 1 0 0 1 1 1V11h5.5a1 1 0 1 1 0 2H13v5.5a1 1 0 1 1-2 0V13H5.5a1 1 0 1 1 0-2H11V5.5a1 1 0 0 1 1-1z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5z" />
                  </svg>
                )}
              </button>
            )}
          </div>
          <div className="border-l border-gray-800 pl-3">
            {/*
              Solo las carpetas con archivos directos son colapsables.
              Las carpetas que contienen únicamente subcarpetas siempre se muestran expandidas.
            */}
            {(!hasDirectFiles || !isCollapsed) && renderTree(value, folderPath)}
          </div>
        </div>
      );
    });

  return (
    <div className="flex h-screen bg-[#0b0d12] text-gray-100 antialiased">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-900/80 overflow-auto bg-[linear-gradient(180deg,rgba(19,23,32,0.9),rgba(11,13,18,0.9))]">
        <div className="sticky top-0 z-10 bg-[#0b0d12]/80 backdrop-blur border-b border-gray-900/80 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-indigo-400"
            >
              <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h4.318c.597 0 1.17.237 1.592.659l.682.682c.422.422.995.659 1.592.659H19.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9.75z" />
            </svg>
            <h2>Snippets</h2>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="relative w-full">
              <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-gray-500"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 20l-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrar carpetas o archivos..."
                className="w-full pl-8 pr-3 py-2 rounded-md bg-[#11131a] border border-gray-800 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="px-2 py-2 text-xs rounded-md border border-gray-800 hover:bg-gray-900/70"
                aria-label="Limpiar filtro"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-gray-400"
                >
                  <path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 0 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414z" />
                </svg>
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
      <main className="flex-1 p-6 overflow-auto bg-[radial-gradient(1200px_800px_at_100%_0%,rgba(59,130,246,0.08),transparent_60%)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-200">
            Vista del snippet
          </h1>
          {selected && (
            <span
              className="text-xs text-gray-400 border border-gray-800/80 rounded px-2 py-1 truncate max-w-[50%]"
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
          <div className="rounded-lg border border-gray-900/80 bg-[#0f1117] shadow-[0_0_0_1px_rgba(17,24,39,0.5)]">
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              customStyle={{
                padding: "20px",
                borderRadius: "8px",
                fontSize: "14px",
                background: "#0f1117",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )}

        {!loading && !code && (
          <div className="h-[60vh] grid place-items-center border border-dashed border-gray-900/80 rounded-lg bg-[#0f1117]/30">
            <p className="text-gray-500 text-sm">
              Elige un snippet del panel izquierdo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
