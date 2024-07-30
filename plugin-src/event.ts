/**
 * イベント名を管理
 */

// todo
export const TodoEvents = {
  GET_TODOS: "get-todos",
  ADD_TODO: "add-todo",
  UPDATE_TODO: "update-todo",
  DELETE_TODO: "delete-todo",
  COMPLETE_TODO: "complete-todo",
  UNCOMPLETE_TODO: "uncomplete-todo",
  ADD_SUB_TASK: "add-sub-task",
  DELETE_SUB_TASK: "delete-sub-task",
  COMPLETE_SUB_TASK: "complete-sub-task",
  UNCOMPLETE_SUB_TASK: "uncomplete-sub-task",
};

// user
export const UserEvents = {
  GET_USERS: "get-users",
  ADD_USER: "add-user",
  UPDATE_USER: "update-user",
  DELETE_USER: "delete-user",
};

// その他
export const OtherEvents = {
  NAVIGATE_TO_NODE: "navigate-to-node",
  OPEN_URL: "open-url",
  GET_FILE_ID: "get-file-id",
  MINIMIZE_PLUGIN: "minimize-plugin",
  MAXIMIZE_PLUGIN: "maximize-plugin",
  GET_PANEL_INFO: "get-panel-info",
};
