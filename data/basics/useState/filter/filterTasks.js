import { useState } from "react";

const initialTasks = [
  { id: 1, text: "buy bread", done: true },
  { id: 2, text: "take out the trash", done: false },
  { id: 1, text: "wash the car", done: true },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "done" ? task.done : task.done === "pending" ? !task.done : true
  );

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <h1>Tasks List</h1>

      {/* Filter Control */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={() => setFilter("pending")}>Peending</button>
      </div>

      {/* Filtered List */}

      {filteredTasks.map(({ id, text, done }) => (
        <div key={id}>
          <span style={{ textDecoration: done ? "line-through" : "none" }}>
            {text}
          </span>
          <button onClick={() => toggleTask(id)}>
            {done ? "Uncheck" : "check"}
          </button>
        </div>
      ))}
    </div>
  );
}
