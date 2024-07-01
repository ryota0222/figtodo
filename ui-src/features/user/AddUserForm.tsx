import { FC, useState } from "react";
import { AddButton } from "../../components/AddButton";
import { UserEvents } from "../../../plugin-src/event";

export const AddUserForm: FC = () => {
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (!text.length) return;
    parent.postMessage(
      { pluginMessage: { type: UserEvents.ADD_USER, text } },
      "*"
    );
    setText("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      handleAdd();
    }
  };
  return (
    <div className="add_user_form_container">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add_user_form_input"
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder={`Add a new user...`}
      />
      <div>
        <AddButton onClick={handleAdd} disabled={!text.length} />
      </div>
    </div>
  );
};
