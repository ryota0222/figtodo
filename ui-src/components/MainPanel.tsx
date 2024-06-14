import { memo } from "react";
import { ListScreen } from "../screens/ListScreen";
import { UserScreen } from "../screens/UserScreen";
import { CompletedScreen } from "../screens/CompletedScreen";
import { TaskItem } from "../type";

interface Props {
  activeScreen: "list" | "user" | "completed";
  pendingTodos: TaskItem[];
  completedTodos: TaskItem[];
}

export const MainPanel = memo<Props>(
  ({ activeScreen, pendingTodos, completedTodos }) => {
    return (
      <div className="main_panel">
        {activeScreen === "list" && <ListScreen todos={pendingTodos} />}
        {activeScreen === "user" && <UserScreen />}
        {activeScreen === "completed" && (
          <CompletedScreen todos={completedTodos} />
        )}
      </div>
    );
  }
);
