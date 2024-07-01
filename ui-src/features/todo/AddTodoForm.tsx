import { FC, useState } from "react";
import { AddButton } from "../../components/AddButton";
import { TodoEvents } from "../../../plugin-src/event";

export const AddTodoForm: FC = () => {
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (!text.length) return;
    parent.postMessage(
      { pluginMessage: { type: TodoEvents.ADD_TODO, text } },
      "*"
    );
    setText("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      handleAdd();
    }
  };
  return (
    <div className="add_todo_form_container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add_todo_form_textarea"
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder={`Add a new task...
💡 Hint:  line breaks can be made with Enter. You can submit with Command + Enter.`}
      />
      <div>
        <AddButton onClick={handleAdd} disabled={!text.length} />
      </div>
    </div>
  );
};
