import { FC, Fragment } from "react";
import { TaskItem } from "../type";
import { TaskTableHeader } from "./TaskTableHeader";
import { CompletedTaskTableRow } from "./TaskTableRow";
import { useFetchUser } from "../hooks/useFetchUser";

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
        <>
          <p className="empty_state_text">
            You haven't finished any tasks yet.&nbsp;
            <br />
            Keep up the good work!
          </p>
        </>
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
