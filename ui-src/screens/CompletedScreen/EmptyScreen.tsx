import { memo } from "react";
import EmptyImage from "../../assets/bullseye.png";

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
        You haven't finished any tasks yet.&nbsp;
        <br />
        Keep up the good work!
      </p>
    </div>
  );
});
