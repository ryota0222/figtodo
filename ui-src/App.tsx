import { useMemo, useState } from "react";

import "./App.css";
import { useFetchTodo } from "./hooks/useFetchTodo";
import { NavPanel } from "./components/NavPanel";
import { MainPanel } from "./components/MainPanel";

function App() {
  const [activeScreen, setActiveScreen] = useState<
    "list" | "user" | "completed"
  >("list");
  const { todos } = useFetchTodo();

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
    </main>
  );
}

export default App;
