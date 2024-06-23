import { FC, memo } from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const ClosePanelIcon: FC<Props> = memo(
  ({ width = 16, height = 16, color = "white" }) => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        d="M14 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H14C14.5523 5 15 4.55228 15 4V2C15 1.44772 14.5523 1 14 1Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.59594 7.15621C7.8191 6.94793 8.1809 6.94793 8.40406 7.15621L11.8326 10.3562C12.0558 10.5645 12.0558 10.9022 11.8326 11.1105C11.6095 11.3187 11.2477 11.3187 11.0245 11.1105L8.57143 8.82091V14.4667C8.57143 14.7612 8.31559 15 8 15C7.68441 15 7.42857 14.7612 7.42857 14.4667V8.82091L4.97549 11.1105C4.75233 11.3187 4.39052 11.3187 4.16737 11.1105C3.94421 10.9022 3.94421 10.5645 4.16737 10.3562L7.59594 7.15621Z"
        fill={color}
      />
    </svg>
  )
);
