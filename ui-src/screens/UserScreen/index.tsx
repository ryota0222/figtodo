import { FC } from "react";
import { useFetchUser } from "../../hooks/useFetchUser";
import { UserRow } from "../../features/user/UserRow";
import { AddUserForm } from "../../features/user/AddUserForm";
import { EmptyScreen } from "./EmptyScreen";

export const UserScreen: FC = () => {
  const { users } = useFetchUser();

  return (
    <div className="container">
      <h1 className="title">
        Assignees{users.length ? `（${users.length}）` : ""}
      </h1>
      {users.length === 0 ? (
        <>
          <div style={{ marginTop: "16px" }}>
            <AddUserForm />
          </div>
          <div className="user_container">
            <EmptyScreen />
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: "16px" }}>
            <AddUserForm />
          </div>
          <div className="user_container">
            {users.map((user, idx) => (
              <UserRow
                key={`${user.id}-${idx}`}
                data={user}
                isLast={idx === users.length - 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
