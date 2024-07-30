import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TaskItem, UserItem } from "../../type";
import { DeleteIcon } from "../../assets/icon/Delete";
import Linkify from "linkify-react";
import { TaskLink } from "./TaskLink";
import { CheckIcon } from "../../assets/icon/Check";
import { TodoEvents } from "../../../plugin-src/event";
import { PersonIcon } from "../../assets/icon/Person";
import { CalenderIcon } from "../../assets/icon/Calender";
import { AddIcon } from "../../assets/icon/Add";
import { CloseIcon } from "../../assets/icon/Close";

interface Props {
  data: TaskItem;
  users: UserItem[];
  isLast?: boolean;
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

export const PendingTaskTableRow: FC<Props> = ({
  data,
  users,
  isLast = false,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(data.date);
  const [assignee, setAssignee] = useState(data.assigneeId);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (data.assigneeId !== assignee || data.date !== date) {
      parent.postMessage(
        {
          pluginMessage: {
            type: TodoEvents.UPDATE_TODO,
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
          type: TodoEvents.UPDATE_TODO,
          id: data.id,
          text: text,
          date: data.date,
          assigneeId: data.assigneeId,
          subTasks: JSON.stringify(data.subTasks),
        },
      },
      "*"
    );
  };

  const handleUpdateSubTask = (subTaskIdx: number, text: string) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: TodoEvents.UPDATE_TODO,
          id: data.id,
          text: data.text,
          date: data.date,
          assigneeId: data.assigneeId,
          subTasks: JSON.stringify(
            data.subTasks.map((subTask, idx) => {
              if (idx === subTaskIdx) {
                return {
                  text,
                  completedAt: subTask.completedAt,
                  deletedAt: subTask.deletedAt,
                };
              }
              return subTask;
            })
          ),
        },
      },
      "*"
    );
  };

  const handleDelete = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: TodoEvents.DELETE_TODO,
          id: data.id,
        },
      },
      "*"
    );
  };

  const handleBlurTask = () => {
    const div = textRef.current;
    if (div?.innerHTML) {
      // 文字列の1<br>とdivタグを\nに変換
      const formatText = div.innerHTML
        .replace(/<br>/g, "\n")
        .replace(/<div>/g, "")
        .replace(/<\/div>/g, "\n");
      handleUpdateText(formatText);
    }
    setIsEditing(false);
  };

  const handleFocusTask = () => {
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
          type: TodoEvents.COMPLETE_TODO,
          id: data.id,
        },
      },
      "*"
    );
  };

  const handleAddSubTask = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: TodoEvents.ADD_SUB_TASK,
          id: data.id,
        },
      },
      "*"
    );
  };

  const handleDeleteSubTask = (subTaskIdx: number) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: TodoEvents.DELETE_SUB_TASK,
          projectId: data.id,
          subTaskIdx,
        },
      },
      "*"
    );
  };

  const toggleSubTask = (idx: number, checked: boolean) => {
    if (checked) {
      parent.postMessage(
        {
          pluginMessage: {
            type: TodoEvents.COMPLETE_SUB_TASK,
            projectId: data.id,
            subTaskIdx: idx,
          },
        },
        "*"
      );
    } else {
      parent.postMessage(
        {
          pluginMessage: {
            type: TodoEvents.UNCOMPLETE_SUB_TASK,
            projectId: data.id,
            subTaskIdx: idx,
          },
        },
        "*"
      );
    }
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
    <div className="todo_tr_container">
      <div className={`todo_tr ${isLast && "last"}`}>
        <div
          role="button"
          className="todo_td__item todo_td__check cursor-pointer"
          onClick={handleCheck}
        >
          <div className="todo_td__check_item" />
        </div>
        <div className="todo_td__item todo_td__text">
          <div
            contentEditable={isEditing}
            className="todo_td_text_wrapper"
            ref={textRef}
            onBlur={handleBlurTask}
            onFocus={handleFocusTask}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => handleMouseDown(e)}
            role={isEditing ? "textbox" : undefined}
            aria-multiline={isEditing ? true : undefined}
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
        <div className="todo_td__item todo_td__date cursor-pointer">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="todo_input"
          />
        </div>
        <div className="todo_td__item todo_td__user cursor-pointer">
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
                <p>{user.name}</p>
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
      {/* サブタスク */}
      <div className="sub_task_wrapper">
        <div className="sub_task_wrapper_divider"></div>
        {data.subTasks.map((subTask, idx) => {
          if (subTask.deletedAt) return null;
          return (
            <div key={`sub_task_${idx}`} className="sub_task_tr">
              <div className="sub_task_td__item sub_task_td__check">
                <input
                  type="checkbox"
                  className="sub_task_td_checkbox"
                  checked={Boolean(subTask.completedAt.length)}
                  onChange={(event) => toggleSubTask(idx, event.target.checked)}
                />
              </div>
              <div className="sub_task_td__item sub_task_td__text">
                {subTask.completedAt ? (
                  <span className="completed">{subTask.text}</span>
                ) : (
                  <input
                    type="text"
                    value={subTask.text}
                    onChange={(e) => {
                      handleUpdateSubTask(idx, e.target.value);
                    }}
                  />
                )}
              </div>
              <div
                role="button"
                className="sub_task_td__item sub_task_td__delete"
                onClick={() => handleDeleteSubTask(idx)}
              >
                <CloseIcon width={16} height={16} />
              </div>
            </div>
          );
        })}
        <div
          className="add_sub_task_container"
          role="button"
          onClick={handleAddSubTask}
        >
          <span className="add_sub_task_icon">
            <AddIcon width={18} height={18} />
          </span>
          <span className="add_sub_task_label">Add Sub task...</span>
        </div>
        <div className="sub_task_wrapper_divider"></div>
      </div>
    </div>
  );
};

export const CompletedTaskTableRow: FC<Props> = ({
  data,
  users,
  isLast = false,
}) => {
  const user = users.find((user) => user.id === data.assigneeId);
  const handleUncheck = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: TodoEvents.UNCOMPLETE_TODO,
          id: data.id,
        },
      },
      "*"
    );
  };

  return (
    <div className="todo_tr_container">
      <div className={`todo_tr completed_todo_tr ${isLast ? "last" : ""}`}>
        <div
          className="todo_td__item todo_td__check completed cursor-pointer"
          role="button"
          onClick={handleUncheck}
        >
          <CheckIcon checked width={20} height={20} color="#338EF7" />
        </div>
        <div className="todo_td__item todo_td__text">
          <div className="todo_td_text_wrapper completed">
            <Linkify tagName="div" options={options}>
              {!data.text?.length ? "--" : data.text}
            </Linkify>
          </div>
        </div>
        {/* // TODO: カレンダーアイコン */}
        <div className="todo_td__item todo_td__date completed">
          <CalenderIcon width={16} height={16} />
          <span>
            {data.date.length ? data.date.replaceAll("-", "/") : "--"}
          </span>
        </div>
        {/* // TODO: ユーザーアイコン */}
        <div className="todo_td__item todo_td__user completed">
          <PersonIcon width={16} height={16} />
          <span>{user?.name?.length ? user.name : "--"}</span>
        </div>
        <div className="todo_td__item todo_td__delete cursor-pointer"></div>
      </div>
      {/* サブタスク */}
      <div className="sub_task_wrapper">
        <div className="sub_task_wrapper_divider"></div>
        {data.subTasks.map((subTask, idx) => {
          if (subTask.deletedAt) return null;
          return (
            <div key={`sub_task_${idx}`} className="sub_task_tr">
              <div className="sub_task_td__item sub_task_td__text">
                <span className={subTask.completedAt.length ? "completed" : ""}>
                  {subTask.text}
                </span>
              </div>
            </div>
          );
        })}
        {data.subTasks.length > 0 && (
          <div className="sub_task_wrapper_divider"></div>
        )}
      </div>
    </div>
  );
};
