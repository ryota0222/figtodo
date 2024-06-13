import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TaskItem, UserItem } from "../type";
import { DeleteIcon } from "../assets/icon/Delete";
import Linkify from "linkify-react";
import { TaskLink } from "./TaskLink";

interface Props {
  data: TaskItem;
  users: UserItem[];
}

const options: import("linkifyjs").Opts = {
  formatHref: {
    url: (href: string) => href,
  },
  format: {
    url: (value: string) => value,
  },
  render: {
    url: ({ attributes, content }) => {
      // URLを検知した場合にカスタムボタンを返す
      return <TaskLink content={content} href={attributes.href as string} />;
    },
  },
};

export const PendingTaskTableRow: FC<Props> = ({ data, users }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(data.date);
  const [assignee, setAssignee] = useState(data.assigneeId);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (data.assigneeId !== assignee || data.date !== date) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "update-todo",
            id: data.id,
            text: data.text,
            date,
            assigneeId: assignee,
          },
        },
        "*"
      );
    }
  };

  const handleUpdateText = (text: string) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "update-todo",
          id: data.id,
          text: text,
          date: data.date,
          assigneeId: data.assigneeId,
        },
      },
      "*"
    );
  };

  const handleDelete = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "delete-todo",
          id: data.id,
        },
      },
      "*"
    );
  };

  const handleBlur = () => {
    const div = textRef.current;
    if (div?.innerHTML) {
      // 文字列の1<br>とdivタグを\nに変換
      const formatText = div.innerHTML
        .replace(/<br>/g, "\n")
        .replace(/<div>/g, "")
        .replace(/<\/div>/g, "\n");
      console.log(formatText);
      handleUpdateText(formatText);
    }
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const div = textRef.current;
      if (div) {
        div.blur();
        event.preventDefault();
      }
    }
  };

  const handleCheck = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "check-todo",
          id: data.id,
        },
      },
      "*"
    );
  };

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if ((e.target as HTMLElement).closest(".link")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [date]);

  useEffect(() => {
    handleUpdate();
  }, [assignee]);

  return (
    <div className="todo_tr">
      <div
        role="button"
        className="todo_td__item todo_td__check cursor-pointer"
        onClick={handleCheck}
      >
        <div className="todo_td__check_item" />
      </div>
      <div className="todo_td__item todo_td__text">
        <div
          contentEditable
          className="todo_td_text_wrapper"
          ref={textRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => handleMouseDown(e)}
        >
          {isEditing ? (
            data.text
          ) : (
            <Linkify tagName="div" options={options}>
              {data.text}
            </Linkify>
          )}
        </div>
      </div>
      <div className="todo_td__item todo_td__date">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="todo_input"
        />
      </div>
      <div className="todo_td__item todo_td__user">
        <select
          className="todo_input"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">
            {users.length === 0 ? "Create a user first" : "--"}
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div
        role="button"
        className="todo_td__item todo_td__delete cursor-pointer"
        onClick={handleDelete}
      >
        <DeleteIcon width={16} height={16} />
      </div>
    </div>
  );
};

export const CompletedTaskTableRow: FC<Props> = ({ data, users }) => {
  const user = users.find((user) => user.id === data.assigneeId);
  return (
    <div className="todo_tr completed_todo_tr">
      <div className="todo_td__item todo_td__check"></div>
      <div className="todo_td__item todo_td__text">
        <div className="todo_td_text_wrapper">
          <Linkify tagName="div" options={options}>
            {!data.text?.length ? "--" : data.text}
          </Linkify>
        </div>
      </div>
      <div className="todo_td__item todo_td__date completed">
        {data.date.length ? data.date.replaceAll("-", "/") : "--"}
      </div>
      <div className="todo_td__item todo_td__user completed">
        {user?.name?.length ? user.name : "--"}
      </div>
      <div className="todo_td__item todo_td__delete cursor-pointer"></div>
    </div>
  );
};
