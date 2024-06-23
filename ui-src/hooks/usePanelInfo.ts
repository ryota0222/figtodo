import { useEffect, useState } from "react";
import { TodoEvents } from "../../plugin-src/event";

export const usePanelInfo = () => {
  const [panelInfo, setPanelInfo] = useState<{
    size: "minimize" | "maximize";
  }>({
    size: "maximize",
  });

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: TodoEvents.GET_TODOS } }, "*");

    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "panel") {
        setPanelInfo({
          size: pluginMessage.size,
        });
      }
    };

    addEventListener("message", handleMessage);

    return () => {
      removeEventListener("message", handleMessage);
    };
  }, []);

  return { panelInfo };
};
