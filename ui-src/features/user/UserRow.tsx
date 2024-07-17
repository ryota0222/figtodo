import { FC, useState } from "react";
import { DeleteIcon } from "../../assets/icon/Delete";
import { UserItem } from "../../type";
import { UserEvents } from "../../../plugin-src/event";

interface Props {
  data: UserItem;
  isLast?: boolean;
}

export const UserRow: FC<Props> = ({ data, isLast = false }) => {
  const [name, setName] = useState(data.name);
  const handleDelete = (id: string) => {
    parent.postMessage(
      { pluginMessage: { type: UserEvents.DELETE_USER, id } },
      "*"
    );
  };
  const handleUpdate = (id: string) => {
    if (name !== data.name) {
      parent.postMessage(
        { pluginMessage: { type: UserEvents.UPDATE_USER, id, name } },
        "*"
      );
    }
  };
  return (
    <div className={`user_wrapper ${isLast && "last"}`}>
      {/* <Avatar name={name} /> */}
      <input
        className="user__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => handleUpdate(data.id)}
      />
      <div
        role="button"
        className="user__item user__delete_button cursor-pointer"
        onClick={() => handleDelete(data.id)}
      >
        <DeleteIcon width={16} height={16} />
      </div>
    </div>
  );
};
