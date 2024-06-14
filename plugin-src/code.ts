// import * as dayjs from "../node_modules/dayjs/index";
// NOTE: figmaで "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported" というエラーが出るので、uuid-randomを使う
import uuid from "../node_modules/uuid-random/index";

import * as taskController from "./controller/task";
import * as userController from "./controller/user";
import * as navigateController from "./controller/navigate";

figma.showUI(__html__, { themeColors: true, width: 1000, height: 600 });

async function getFileId(): Promise<string> {
  // ファイルのルートノードからIDを取得または生成
  let fileId = figma.root.getPluginData("fileId");
  if (!fileId) {
    fileId = uuid();
    figma.root.setPluginData("fileId", fileId);
  }
  return fileId.length ? fileId : "no file id on server";
}

figma.ui.onmessage = async (params) => {
  const fileId = await getFileId();
  /**
   * file操作
   */
  if (params.type === "get-file-id") {
    figma.ui.postMessage({ type: "file-id", fileId });
  }
  /**
   * todo操作
   */
  if (params.type === "get-todos") {
    taskController.getTodos(fileId);
  } else if (params.type === "add-todo") {
    taskController.addTodo(fileId, params.text);
  } else if (params.type === "update-todo") {
    taskController.updateTodo(
      fileId,
      params.id,
      params.text,
      params.date,
      params.assigneeId
    );
  } else if (params.type === "delete-todo") {
    taskController.deleteTodo(fileId, params.id);
  } else if (params.type === "check-todo") {
    taskController.checkTodo(fileId, params.id);
  }
  /**
   * user操作
   */
  if (params.type === "get-users") {
    userController.getUsers(fileId);
  } else if (params.type === "add-user") {
    userController.addUser(fileId, params.text);
  } else if (params.type === "delete-user") {
    userController.deleteUser(fileId, params.id);
  } else if (params.type === "update-user") {
    userController.updateUser(fileId, params.id, params.name);
  }
  // その他操作
  if (params.type === "navigate-to-node") {
    navigateController.navigateTo(params.nodeId);
  } else if (params.type === "open-url") {
    figma.openExternal(params.href);
  }
};
