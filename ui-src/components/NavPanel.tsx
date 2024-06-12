import { memo } from "react";
import { ListIcon } from "../assets/icon/List";
import { PersonIcon } from "../assets/icon/Person";
import { CheckIcon } from "../assets/icon/Check";

interface Props {
  activeScreen: "list" | "user" | "completed";
  setActiveScreen: React.Dispatch<
    React.SetStateAction<"list" | "user" | "completed">
  >;
  completeCount: number;
}

export const NavPanel = memo<Props>(
  ({ activeScreen, setActiveScreen, completeCount }) => {
    return (
      <div className="nav_panel">
        <div
          role="button"
          onClick={() => setActiveScreen("list")}
          className={`nav_link_item cursor-pointer ${activeScreen === "list" ? "active_list_screen" : ""}`}
        >
          <ListIcon width={20} height={20} color="black" />
        </div>
        <div
          role="button"
          onClick={() => setActiveScreen("user")}
          className={`nav_link_item cursor-pointer ${activeScreen === "user" ? "active_user_screen" : ""}`}
        >
          <PersonIcon width={20} height={20} color="black" />
        </div>
        <div
          role="button"
          onClick={() => setActiveScreen("completed")}
          className={`nav_link_item cursor-pointer ${activeScreen === "completed" ? "active_completed_screen" : ""}`}
        >
          <CheckIcon width={20} height={20} color="black" checked />
          {completeCount > 0 && (
            <span className="completed_count">{completeCount}</span>
          )}
        </div>
      </div>
    );
  }
);
