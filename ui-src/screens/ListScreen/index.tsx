import { FC } from "react";

import { TaskItem } from "../../type";
import { PendingTaskTableRow } from "../../features/todo/TaskTableRow";
import { useFetchUser } from "../../hooks/useFetchUser";
import { AddTodoForm } from "../../features/todo/AddTodoForm";
import { TaskTableHeader } from "../../features/todo/TaskTableHeader";

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
          <p className="empty_state_text">
            Looks like you have no tasks.&nbsp;
            <br />
            How about starting a new project?
          </p>
        </>
      ) : (
        <div className="todo_container">
          <AddTodoForm />
          <TaskTableHeader />
          {todos.map((todo) => (
            <PendingTaskTableRow key={todo.id} data={todo} users={users} />
          ))}
        </div>
      )}
    </div>
  );
};
