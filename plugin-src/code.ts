// import * as dayjs from "../node_modules/dayjs/index";
// NOTE: figmaで "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported" というエラーが出るので、uuid-randomを使う
import uuid from "../node_modules/uuid-random/index";

import * as taskController from "./controller/task";
import * as userController from "./controller/user";
import * as navigateController from "./controller/navigate";
import { OtherEvents, TodoEvents, UserEvents } from "./event";

const MAXIMIZE_SIZE = { width: 900, height: 600 };
const MINIMUM_SIZE = { width: 135, height: 60 };

figma.showUI(__html__, {
  themeColors: true,
  width: MAXIMIZE_SIZE.width,
  height: MAXIMIZE_SIZE.height,
});

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
  if (params.type === OtherEvents.GET_FILE_ID) {
    figma.ui.postMessage({ type: "file-id", fileId });
  }
  /**
   * todo操作
   */
  if (params.type === TodoEvents.GET_TODOS) {
    taskController.getTodos(fileId);
  } else if (params.type === TodoEvents.ADD_TODO) {
    taskController.addTodo(fileId, params.text);
  } else if (params.type === TodoEvents.UPDATE_TODO) {
    taskController.updateTodo(
      fileId,
      params.id,
      params.text,
      params.date,
      params.assigneeId
    );
  } else if (params.type === TodoEvents.DELETE_TODO) {
    taskController.deleteTodo(fileId, params.id);
  } else if (params.type === TodoEvents.COMPLETE_TODO) {
    taskController.checkTodo(fileId, params.id);
  } else if (params.type === TodoEvents.UNCOMPLETE_TODO) {
    taskController.uncheckTodo(fileId, params.id);
  } else if (params.type === TodoEvents.ADD_SUB_TASK) {
    taskController.addSubTask(fileId, params.id);
  }
  /**
   * user操作
   */
  if (params.type === UserEvents.GET_USERS) {
    userController.getUsers(fileId);
  } else if (params.type === UserEvents.ADD_USER) {
    userController.addUser(fileId, params.text);
  } else if (params.type === UserEvents.DELETE_USER) {
    userController.deleteUser(fileId, params.id);
  } else if (params.type === UserEvents.UPDATE_USER) {
    userController.updateUser(fileId, params.id, params.name);
  }
  // その他操作
  if (params.type === OtherEvents.NAVIGATE_TO_NODE) {
    navigateController.navigateTo(params.nodeId);
  } else if (params.type === OtherEvents.OPEN_URL) {
    figma.openExternal(params.href);
  } else if (params.type === OtherEvents.MINIMIZE_PLUGIN) {
    figma.ui.resize(MINIMUM_SIZE.width, MINIMUM_SIZE.height);
    figma.ui.postMessage({ type: "panel", size: "minimize" });
  } else if (params.type === OtherEvents.MAXIMIZE_PLUGIN) {
    figma.ui.resize(MAXIMIZE_SIZE.width, MAXIMIZE_SIZE.height);
    figma.ui.postMessage({ type: "panel", size: "maximize" });
  }
};
