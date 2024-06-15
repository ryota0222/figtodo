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
  return (
    <div className="add_todo_form_container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add_todo_form_textarea"
        placeholder={`Add a new task...
💡 Hint: the line breaks in the text should be made with ‘Shift + Enter’`}
      />
      <div>
        <AddButton onClick={handleAdd} disabled={!text.length} />
      </div>
    </div>
  );
};
