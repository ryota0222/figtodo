import { memo } from "react";
import BoringAvatar from "boring-avatars";

interface Props {
  name: string;
}

export const Avatar = memo<Props>(({ name }) => {
  return (
    <BoringAvatar
      size={32}
      name={name}
      variant="beam"
      colors={["#FFB3B3", "#FFCF4C", "#EDFF40", "#B5F1FF", "#F0C2FF"]}
    />
  );
});
