import { useEffect, useState } from "react";
import { TaskItem } from "../type";

export const useFetchTodo = () => {
  const [todos, setTodos] = useState<TaskItem[]>([]);

  useEffect(() => {
    // parent.postMessage({ pluginMessage: { type: "get-file-id" } }, "*");
    parent.postMessage({ pluginMessage: { type: "get-todos" } }, "*");

    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "todos") {
        setTodos(pluginMessage.todos);
      }
    };

    addEventListener("message", handleMessage);

    return () => {
      removeEventListener("message", handleMessage);
    };
  }, []);

  return { todos };
};
