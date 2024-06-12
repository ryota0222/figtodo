import { FC, memo } from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const CalenderIcon: FC<Props> = memo(
  ({ width = 80, height = 80, color = "white" }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.5 7.5C22.5 6.11929 21.3807 5 20 5C18.6193 5 17.5 6.11929 17.5 7.5V10H15C9.47715 10 5 14.4772 5 20V25V65C5 70.5229 9.47715 75 15 75H65C70.5229 75 75 70.5229 75 65V25V20C75 14.4772 70.5229 10 65 10H62.5V7.5C62.5 6.11929 61.3807 5 60 5C58.6193 5 57.5 6.11929 57.5 7.5V10H22.5V7.5ZM70 22.5V20C70 17.2386 67.7614 15 65 15H60H20H15C12.2386 15 10 17.2386 10 20V22.5H70ZM10 27.5H70V65C70 67.7614 67.7614 70 65 70H15C12.2386 70 10 67.7614 10 65V27.5Z"
        fill={color}
      />
    </svg>
  )
);
