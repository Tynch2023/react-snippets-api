// Example: Preventing heavy re-renders with React.memo
// ---------------------------------------------------------------------------
// This example demonstrates how to use React.memo() to prevent unnecessary
// re-renders of a component that contains expensive data creation or rendering.

import { memo, useState } from "react";
import { faker } from "@faker-js/faker";

// Utility function to generate fake posts
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// ---------------------------------------------------------------------------
// Archive Component (memoized)
// ---------------------------------------------------------------------------
// 🧠 The Archive component is wrapped in React.memo(). This means that React
// will only re-render it if its props change (in this case, the "show" prop).
//
// Because Archive generates 10,000 fake posts, re-rendering it unnecessarily
// would cause major performance issues. React.memo avoids this.
//
// Even though parent components (like App or Main) might re-render frequently,
// the Archive component stays stable and keeps its previous render output
// unless its input props change.
const Archive = memo(function Archive({ show }) {
  // The following state initialization uses a lazy initializer function.
  // This ensures that the 10,000 posts are generated only ONCE on the first render,
  // not on every re-render.
  const [posts] = useState(() =>
    Array.from({ length: 10_000 }, () => createRandomPost())
  );

  // Local state to toggle archive visibility
  const [showArchive, setShowArchive] = useState(show);

  return (
    <aside>
      <h2>Post archive</h2>

      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {/* The archive list only renders when showArchive is true */}
      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
});

export default Archive;
