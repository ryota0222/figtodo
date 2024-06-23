import { memo } from "react";
import { ListIcon } from "../assets/icon/List";
import { PersonIcon } from "../assets/icon/Person";
import { CheckIcon } from "../assets/icon/Check";
import { ClosePanelIcon } from "../assets/icon/ClosePanel";
import { OtherEvents } from "../../plugin-src/event";

interface Props {
  activeScreen: "list" | "user" | "completed";
  setActiveScreen: React.Dispatch<
    React.SetStateAction<"list" | "user" | "completed">
  >;
  completeCount: number;
}

export const NavPanel = memo<Props>(
  ({ activeScreen, setActiveScreen, completeCount }) => {
    const minimizePanel = () => {
      parent.postMessage(
        { pluginMessage: { type: OtherEvents.MINIMIZE_PLUGIN } },
        "*"
      );
    };
    return (
      <div className="nav_panel">
        <div>
          <p className="nav_panel_title">action</p>
          <div
            role="button"
            onClick={minimizePanel}
            className={`nav_link_item cursor-pointer`}
          >
            <ClosePanelIcon width={16} height={16} color="black" />
            <span className="nav_link_item_label">Minimize</span>
          </div>
        </div>

        <p className="nav_panel_title">page</p>
        <div className="nav_panel_link_wrapper">
          <div
            role="button"
            onClick={() => setActiveScreen("list")}
            className={`nav_link_item cursor-pointer ${activeScreen === "list" ? "active_screen" : ""}`}
          >
            <ListIcon width={16} height={16} color="black" />
            <span className="nav_link_item_label">Task</span>
          </div>
          <div
            role="button"
            onClick={() => setActiveScreen("user")}
            className={`nav_link_item cursor-pointer ${activeScreen === "user" ? "active_screen" : ""}`}
          >
            <PersonIcon width={16} height={16} color="black" />
            <span className="nav_link_item_label">Assignee</span>
          </div>
          <div
            role="button"
            onClick={() => setActiveScreen("completed")}
            className={`nav_link_item cursor-pointer ${activeScreen === "completed" ? "active_screen" : ""}`}
          >
            <CheckIcon width={16} height={16} color="black" checked />
            <span className="nav_link_item_label">Completed</span>
            {completeCount > 0 && (
              <span className="completed_count">{completeCount}</span>
            )}
          </div>
        </div>
        <p className="nav_version">version 3</p>
      </div>
    );
  }
);
