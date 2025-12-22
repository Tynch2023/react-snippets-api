/**
 * Next.js App Router – "use client" (ejemplo simple)
 * --------------------------------------------------
 * Botón contador con estado local en un Client Component.
 */

"use client";

import { useState } from "react";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="rounded bg-primary-900/60 px-4 py-2 text-sm font-medium text-primary-50"
      onClick={() => setCount((c) => c + 1)}
    >
      Clicks: {count}
    </button>
  );
}


