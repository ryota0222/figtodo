import { FC } from "react";
import { AddIcon } from "../assets/icon/Add";

interface Props {
  onClick: () => void;
}

export const AddButton: FC<Props> = ({ onClick }) => {
  return (
    <button className="add_button" onClick={onClick}>
      <AddIcon width={20} height={20} color="white" />
      <span className="add_button__text">Add Item</span>
    </button>
  );
};
