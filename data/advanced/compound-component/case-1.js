//! Tabs.js------------------------------------------------------

import { createContext, useState, useContext } from "react";

const TabsContext = createContext();

function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function List({ children }) {
  return <div className="tabs-list">{children}</div>;
}

function Button({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const active = index === activeIndex;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      style={{
        fontWeight: active ? "bold" : "normal",
        borderBottom: active ? "2px solid black" : "2px solid transparent",
        cursor: "pointer",
        marginRight: "8px"
      }}
    >
      {children}
    </button>
  );
}

function Panel({ children, index }) {
  const { activeIndex } = useContext(TabsContext);
  return activeIndex === index ? <div>{children}</div> : null;
}

Tabs.List = List;
Tabs.Button = Button;
Tabs.Panel = Panel;

export default Tabs;

//! App.js------------------------------------------------------
import Tabs from "./Tabs";

export default function App() {
  return (
    <div>
      <h1>Compound Components — Tabs Example</h1>

      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Button index={0}>Home</Tabs.Button>
          <Tabs.Button index={1}>Profile</Tabs.Button>
          <Tabs.Button index={2}>Settings</Tabs.Button>
        </Tabs.List>

        <Tabs.Panel index={0}>
          <p>🏠 Home content here.</p>
        </Tabs.Panel>

        <Tabs.Panel index={1}>
          <p>👤 Profile info here.</p>
        </Tabs.Panel>

        <Tabs.Panel index={2}>
          <p>⚙️ Settings go here.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
