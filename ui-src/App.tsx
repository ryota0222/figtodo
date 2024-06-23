import { useMemo, useState } from "react";

import "./styles/core.css";
import "./styles/icon.css";
import "./styles/root.css";
import "./styles/task.css";
import "./styles/user.css";
import { useFetchTodo } from "./hooks/useFetchTodo";
import { NavPanel } from "./components/NavPanel";
import { MainPanel } from "./components/MainPanel";
import { usePanelInfo } from "./hooks/usePanelInfo";
import { ExpandPanelIcon } from "./assets/icon/ExpandPanel";
import { OtherEvents } from "../plugin-src/event";

function App() {
  const [activeScreen, setActiveScreen] = useState<
    "list" | "user" | "completed"
  >("list");
  const { todos } = useFetchTodo();
  const { panelInfo } = usePanelInfo();

  const maximizePanel = () => {
    parent.postMessage(
      { pluginMessage: { type: OtherEvents.MAXIMIZE_PLUGIN } },
      "*"
    );
  };

  const pendingTodos = useMemo(
    () => todos.filter((todo) => !todo.completedAt?.length),
    [todos]
  );

  const completedTodos = useMemo(() => {
    // completedAtの順に並び変え
    return todos
      .filter((todo) => todo.completedAt?.length)
      .sort((a, b) => {
        if (a.completedAt && b.completedAt) {
          return a.completedAt > b.completedAt ? -1 : 1;
        }
        return 0;
      });
  }, [todos]);

  return (
    <main>
      {panelInfo.size === "maximize" ? (
        <>
          <NavPanel
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            completeCount={completedTodos.length}
          />
          <MainPanel
            activeScreen={activeScreen}
            pendingTodos={pendingTodos}
            completedTodos={completedTodos}
          />
        </>
      ) : (
        <div
          role="button"
          onClick={maximizePanel}
          style={{ margin: "12px 0" }}
          className={`nav_link_item cursor-pointer`}
        >
          <ExpandPanelIcon width={16} height={16} color="black" />
          <span className="nav_link_item_label">Maximize</span>
        </div>
      )}
    </main>
  );
}

export default App;
