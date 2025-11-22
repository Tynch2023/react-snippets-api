import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// Simulación de API
const updateTodo = async (newTodo) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.8) throw new Error("Error de red simulado");
  return newTodo;
};

export default function OptimisticTodo({ todoId, initialTitle }) {
  const [title, setTitle] = useState(initialTitle);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTodo,
    // Se ejecuta antes de la mutación
    onMutate: async (newTodo) => {
      // Cancelar queries salientes para que no sobrescriban nuestra actualización optimista
      await queryClient.cancelQueries({ queryKey: ["todos", todoId] });

      // Guardar el estado anterior para rollback si falla
      const previousTodo = queryClient.getQueryData(["todos", todoId]);

      // Actualización optimista en caché
      queryClient.setQueryData(["todos", todoId], (old) => ({
        ...old,
        title: newTodo.title,
      }));

      // Retornar contexto con el valor anterior
      return { previousTodo };
    },
    // Si falla, usar el contexto para volver al estado anterior
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos", todoId], context.previousTodo);
      alert("Falló la actualización, revirtiendo cambios...");
    },
    // Siempre refetchear al final para asegurar consistencia
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", todoId] });
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ id: todoId, title });
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Optimistic Update Example</h3>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={mutation.isPending}
        />
        <button onClick={handleUpdate} disabled={mutation.isPending}>
          {mutation.isPending ? "Guardando..." : "Actualizar"}
        </button>
      </div>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        El cambio se refleja instantáneamente. Si falla (20% prob), se revierte.
      </p>
    </div>
  );
}
