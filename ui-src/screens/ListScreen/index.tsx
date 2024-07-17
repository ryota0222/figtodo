import { FC } from "react";

import { TaskItem } from "../../type";
import { PendingTaskTableRow } from "../../features/todo/TaskTableRow";
import { useFetchUser } from "../../hooks/useFetchUser";
import { AddTodoForm } from "../../features/todo/AddTodoForm";
// import { TaskTableHeader } from "../../features/todo/TaskTableHeader";
import { EmptyScreen } from "./EmptyScreen";

interface Props {
  todos: TaskItem[];
}

export const ListScreen: FC<Props> = ({ todos }) => {
  const { users } = useFetchUser();

  return (
    <div className="container">
      <h1 className="title">
        Tasks{todos.length > 0 ? `（${todos.length}）` : ""}
      </h1>
      {todos.length === 0 ? (
        <>
          <div style={{ marginTop: "16px" }}>
            <AddTodoForm />
          </div>
          <div className="todo_container">
            <EmptyScreen />
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: "16px" }}>
            <AddTodoForm />
          </div>
          <div className="todo_container">
            {/* <TaskTableHeader /> */}
            {todos.map((todo, idx) => (
              <PendingTaskTableRow
                key={todo.id}
                data={todo}
                users={users}
                isLast={idx === todos.length - 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
