import { FC, memo } from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const ExpandPanelIcon: FC<Props> = memo(
  ({ width = 16, height = 16, color = "white" }) => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.85359 1.85344C1.75982 1.94721 1.70714 2.07439 1.70714 2.207L1.70714 5.20678C1.70714 5.48292 1.931 5.70678 2.20714 5.70678C2.48328 5.70678 2.70714 5.48292 2.70714 5.20678L2.70714 2.707L5.20692 2.707C5.48306 2.707 5.70692 2.48314 5.70692 2.207C5.70692 1.93086 5.48306 1.707 5.20692 1.707L2.20714 1.707C2.07453 1.707 1.94735 1.75968 1.85359 1.85344Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.93168 1.93111C2.12694 1.73585 2.44352 1.73585 2.63879 1.93111L6.63879 5.93111C6.83405 6.12638 6.83405 6.44296 6.63879 6.63822C6.44352 6.83348 6.12694 6.83348 5.93168 6.63822L1.93168 2.63822C1.73642 2.44296 1.73642 2.12638 1.93168 1.93111Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1386 14.1383C14.2324 14.0445 14.285 13.9173 14.285 13.7847L14.285 10.7849C14.285 10.5088 14.0612 10.2849 13.785 10.2849C13.5089 10.2849 13.285 10.5088 13.285 10.7849L13.285 13.2847L10.7853 13.2847C10.5091 13.2847 10.2853 13.5086 10.2853 13.7847C10.2853 14.0608 10.5091 14.2847 10.7853 14.2847L13.785 14.2847C13.9177 14.2847 14.0448 14.232 14.1386 14.1383Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0605 14.0606C13.8652 14.2558 13.5487 14.2558 13.3534 14.0606L9.3534 10.0606C9.15814 9.86532 9.15814 9.54874 9.3534 9.35348C9.54866 9.15822 9.86525 9.15822 10.0605 9.35348L14.0605 13.3535C14.2558 13.5487 14.2558 13.8653 14.0605 14.0606Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C10 1.72386 10.2239 1.5 10.5 1.5H12C13.3807 1.5 14.5 2.61929 14.5 4V5.5C14.5 5.77614 14.2761 6 14 6C13.7239 6 13.5 5.77614 13.5 5.5V4C13.5 3.17157 12.8284 2.5 12 2.5H10.5C10.2239 2.5 10 2.27614 10 2Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 14C6 14.2761 5.77614 14.5 5.5 14.5L4 14.5C2.61929 14.5 1.5 13.3807 1.5 12L1.5 10.5C1.5 10.2239 1.72386 10 2 10C2.27614 10 2.5 10.2239 2.5 10.5L2.5 12C2.5 12.8284 3.17157 13.5 4 13.5L5.5 13.5C5.77614 13.5 6 13.7239 6 14Z"
        fill="black"
      />
    </svg>
  )
);
