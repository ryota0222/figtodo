import { useEffect, useState } from "react";
import { UserItem } from "../type";

export const useFetchUser = () => {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-users" } }, "*");

    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "users") {
        setUsers(pluginMessage.users);
      }
    };

    addEventListener("message", handleMessage);

    return () => {
      removeEventListener("message", handleMessage);
    };
  }, []);

  return { users };
};
