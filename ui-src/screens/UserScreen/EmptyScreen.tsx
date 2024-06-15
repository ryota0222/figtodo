import { memo } from "react";
import EmptyImage from "../../assets/hugging-face.png";

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
        No Assignees registered yet.&nbsp;
        <br />
        Add a new representative to get.
      </p>
    </div>
  );
});
