import { memo } from "react";
import EmptyImage from "../../assets/potted-plant.png";

export const EmptyScreen = memo(() => {
  return (
    <div className="empty_screen_container">
      <img
        src={EmptyImage}
        alt="potted plant"
        className="empty_state_image"
        width={120}
        height={120}
      />
      <p className="empty_state_text">
        Looks like you have no tasks.&nbsp;
        <br />
        How about starting a new project?
      </p>
    </div>
  );
});
