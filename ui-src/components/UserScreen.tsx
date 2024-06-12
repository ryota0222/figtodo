import { FC } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { AddButton } from "./AddButton";
import { UserRow } from "./UserRow";

export const UserScreen: FC = () => {
  const { users } = useFetchUser();
  const handleAdd = () => {
    parent.postMessage({ pluginMessage: { type: "add-user" } }, "*");
  };

  return (
    <div className="container">
      <h1 className="title">
        Assignees{users.length ? `（${users.length}）` : ""}
      </h1>
      {users.length === 0 ? (
        <>
          <p className="empty_state_text">
            No Assignees registered yet.&nbsp;
            <br />
            Add a new representative to get.
          </p>
        </>
      ) : (
        <div className="user_container">
          {users.map((user, idx) => (
            <UserRow key={`${user.id}-${idx}`} data={user} />
          ))}
        </div>
      )}
      <div className="add_button_wrapper">
        <AddButton onClick={handleAdd} />
      </div>
    </div>
  );
};
