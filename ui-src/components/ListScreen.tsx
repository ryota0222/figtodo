import { FC } from "react";

import { TaskItem } from "../type";
import { AddButton } from "./AddButton";
import { TaskTableHeader } from "./TaskTableHeader";
import { PendingTaskTableRow } from "./TaskTableRow";
import { useFetchUser } from "../hooks/useFetchUser";

interface Props {
  todos: TaskItem[];
}

export const ListScreen: FC<Props> = ({ todos }) => {
  const { users } = useFetchUser();

  const handleAdd = () => {
    parent.postMessage({ pluginMessage: { type: "add-todo" } }, "*");
  };

  return (
    <div className="container">
      <h1 className="title">
        Todo Tasks{todos.length > 0 ? `（${todos.length}）` : ""}
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
          <p className="todo_announce">
            The line breaks in the text should be made with ‘Shift + Enter’.
          </p>
          <TaskTableHeader />
          {todos.map((todo) => (
            <PendingTaskTableRow key={todo.id} data={todo} users={users} />
          ))}
        </div>
      )}
      <div className="add_button_wrapper">
        <AddButton onClick={handleAdd} />
      </div>
    </div>
  );
};
