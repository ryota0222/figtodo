import { FC, memo } from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const AddIcon: FC<Props> = memo(
  ({ width = 80, height = 80, color = "white" }) => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z"
        fill={color}
      />
    </svg>
  )
);
