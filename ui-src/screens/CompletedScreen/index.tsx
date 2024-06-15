import { FC, Fragment } from "react";
import { TaskItem } from "../../type";
import { CompletedTaskTableRow } from "../../features/todo/TaskTableRow";
import { useFetchUser } from "../../hooks/useFetchUser";
import { TaskTableHeader } from "../../features/todo/TaskTableHeader";
import { EmptyScreen } from "./EmptyScreen";

interface Props {
  todos: TaskItem[];
}

export const CompletedScreen: FC<Props> = ({ todos }) => {
  const { users } = useFetchUser();
  return (
    <div className="container">
      <h1 className="title">
        Completed{todos.length > 0 ? `（${todos.length}）` : ""}
      </h1>
      {todos.length === 0 ? (
        <EmptyScreen />
      ) : (
        <div className="todo_container">
          <TaskTableHeader />
          {todos.map((todo) => (
            <Fragment key={todo.id}>
              <CompletedTaskTableRow data={todo} users={users} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
