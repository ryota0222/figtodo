import { useEffect, useState } from "react";
import { TaskItem } from "../type";
import { TodoEvents } from "../../plugin-src/event";

export const useFetchTodo = () => {
  const [todos, setTodos] = useState<TaskItem[]>([]);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: TodoEvents.GET_TODOS } }, "*");

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
