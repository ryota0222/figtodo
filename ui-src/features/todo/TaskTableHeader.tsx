import { FC } from "react";
import { TextIcon } from "../../assets/icon/Text";
import { CalenderIcon } from "../../assets/icon/Calender";
import { PersonIcon } from "../../assets/icon/Person";

export const TaskTableHeader: FC = () => {
  return (
    <div className="todo_th">
      <div className="todo_th__item todo_th__check" />
      <div className="todo_th__item todo_th__text">
        <TextIcon width={16} height={16} />
        <span className="todo_th__item_label">Text</span>
      </div>
      <div className="todo_th__item todo_th__date">
        <CalenderIcon width={16} height={16} />
        <span className="todo_th__item_label">Date</span>
      </div>
      <div className="todo_th__item todo_th__user">
        <PersonIcon width={16} height={16} />
        <span className="todo_th__item_label">Assignee</span>
      </div>
      <div className="todo_th__item todo_th__delete" />
    </div>
  );
};
