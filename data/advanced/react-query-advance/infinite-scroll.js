import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"; // Asumiendo que existe esta lib o similar

// Simulación de API paginada
const fetchProjects = async ({ pageParam = 0 }) => {
  const res = await fetch(`https://api.example.com/projects?cursor=${pageParam}`);
  return res.json();
};

export default function InfiniteProjects() {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <p>Cargando...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Proyectos Infinitos</h1>
      {data.pages.map((group, i) => (
        <div key={i} className="page-group">
          {group.data.map((project) => (
            <div
              key={project.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                marginBottom: "10px",
              }}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      ))}
      
      <div ref={ref} style={{ textAlign: "center", padding: "20px" }}>
        {isFetchingNextPage
          ? "Cargando más..."
          : hasNextPage
          ? "Cargar más"
          : "No hay más resultados"}
      </div>
      
      <div>{isFetching && !isFetchingNextPage ? "Actualizando..." : null}</div>
    </div>
  );
}
