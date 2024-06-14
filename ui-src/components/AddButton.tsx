import { FC } from "react";
import { AddIcon } from "../assets/icon/Add";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const AddButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <button className="primary_button" onClick={onClick} disabled={disabled}>
      <AddIcon width={16} height={16} color="#FFFFFF" />
      <span className="primary_button__text">Add</span>
    </button>
  );
};
