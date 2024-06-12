import { FC, memo } from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const PersonIcon: FC<Props> = memo(
  ({ width = 120, height = 120, color = "white" }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 60C47.6016 60 36.6797 48.3516 35.625 34.0312C35.0859 26.7656 37.3359 20.0391 41.9531 15.0938C46.5 10.1953 52.9219 7.5 60 7.5C67.0313 7.5 73.4297 10.2187 78 15.1406C82.6407 20.1328 84.8907 26.8359 84.3516 34.0312C83.2969 48.3516 72.375 60 60 60ZM60 15C55.0313 15 50.5547 16.8516 47.4375 20.2031C44.2734 23.6016 42.7265 28.3359 43.1015 33.4922C43.8516 43.8047 51.5859 52.5234 59.9766 52.5234C68.3672 52.5234 76.1016 43.8047 76.8516 33.4922C77.2266 28.4062 75.6797 23.6953 72.4688 20.25C69.375 16.8516 64.9219 15 60 15Z"
        fill={color}
      />
      <path
        d="M101.25 112.5H18.75C16.5 112.5 14.4844 111.562 13.0782 109.898C11.5547 108.07 10.9453 105.585 11.3907 103.078C13.3594 92.1089 19.5469 82.8746 29.25 76.4293C37.875 70.6871 48.7969 67.523 60 67.523C71.2032 67.523 82.125 70.6871 90.75 76.4293C100.453 82.898 106.641 92.1089 108.609 103.078C109.055 105.585 108.445 108.07 106.922 109.898C105.516 111.562 103.5 112.5 101.25 112.5ZM18.7969 105H101.203C101.25 104.882 101.273 104.695 101.227 104.39C97.5938 84.2105 77.2969 74.9996 60 74.9996C42.7032 74.9996 22.4063 84.2105 18.7735 104.39C18.7266 104.695 18.75 104.882 18.7969 105Z"
        fill={color}
      />
    </svg>
  )
);