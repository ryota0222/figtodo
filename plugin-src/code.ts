// import * as dayjs from "../node_modules/dayjs/index";
// NOTE: figmaで "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported" というエラーが出るので、uuid-randomを使う
import uuid from "../node_modules/uuid-random/index";

import { TaskItem, UserItem } from "../ui-src/type";

figma.showUI(__html__, { themeColors: true, width: 1200, height: 600 });

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
    const storageTodos = figma.root.getPluginData(`${fileId}:todos`) || "[]";
    const todos = JSON.parse(storageTodos) as TaskItem[];
    // deletedAtがあるものは削除
    const filteredTodos = todos.filter(
      (todo: TaskItem) => !todo.deletedAt.length
    );
    figma.ui.postMessage({ type: "todos", todos: filteredTodos });
  } else if (params.type === "add-todo") {
    const todos = JSON.parse(
      figma.root.getPluginData(`${fileId}:todos`) || "[]"
    ) as TaskItem[];
    todos.push({
      id: uuid(),
      text: "",
      date: "",
      assigneeId: "",
      completedAt: "",
      deletedAt: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    figma.root.setPluginData(`${fileId}:todos`, JSON.stringify(todos));
    figma.ui.postMessage({
      type: "todos",
      todos: todos.filter((todo) => !todo.deletedAt.length),
    });
  } else if (params.type === "update-todo") {
    const todos = JSON.parse(
      figma.root.getPluginData(`${fileId}:todos`) || "[]"
    ) as TaskItem[];
    const index = todos.findIndex((todo) => todo.id === params.id);
    if (index >= 0) {
      const newTodos = todos.map((todo) => {
        if (todo.id === params.id) {
          return {
            id: todo.id,
            text: params.text,
            date: params.date,
            assigneeId: params.assigneeId,
            completedAt: todo.completedAt,
            deletedAt: todo.deletedAt,
            createdAt: todo.createdAt,
            updatedAt: new Date().toISOString(),
          };
        }
        return todo;
      });
      figma.root.setPluginData(`${fileId}:todos`, JSON.stringify(newTodos));
      figma.ui.postMessage({
        type: "todos",
        todos: newTodos.filter((todo) => !todo.deletedAt.length),
      });
    }
  } else if (params.type === "delete-todo") {
    const todos = JSON.parse(
      figma.root.getPluginData(`${fileId}:todos`) || "[]"
    ) as TaskItem[];
    const index = todos.findIndex((todo) => todo.id === params.id);
    if (index >= 0) {
      const newTodos = todos.map((todo) => {
        if (todo.id === params.id) {
          return {
            id: todo.id,
            text: todo.text,
            date: todo.date,
            assigneeId: todo.assigneeId,
            completedAt: todo.completedAt,
            deletedAt: new Date().toISOString(),
            createdAt: todo.createdAt,
            updatedAt: new Date().toISOString(),
          };
        }
        return todo;
      });
      figma.root.setPluginData(`${fileId}:todos`, JSON.stringify(newTodos));
      figma.ui.postMessage({
        type: "todos",
        todos: newTodos.filter((todo) => !todo.deletedAt.length),
      });
      figma.notify("Successfully deleted the task");
    }
  } else if (params.type === "check-todo") {
    const todos = JSON.parse(
      figma.root.getPluginData(`${fileId}:todos`) || "[]"
    ) as TaskItem[];
    const index = todos.findIndex((todo) => todo.id === params.id);
    if (index >= 0) {
      const newTodos = todos.map((todo) => {
        if (todo.id === params.id) {
          return {
            id: todo.id,
            text: todo.text,
            date: todo.date,
            assigneeId: todo.assigneeId,
            completedAt: new Date().toISOString(),
            deletedAt: todo.deletedAt,
            createdAt: todo.createdAt,
            updatedAt: new Date().toISOString(),
          };
        }
        return todo;
      });
      figma.root.setPluginData(`${fileId}:todos`, JSON.stringify(newTodos));
      figma.ui.postMessage({
        type: "todos",
        todos: newTodos.filter((todo) => !todo.deletedAt.length),
      });
      figma.notify("Successfully checked the task");
    }
  }
  /**
   * user操作
   */
  if (params.type === "get-users") {
    const storageUsers = figma.root.getPluginData(`${fileId}:users`) || "[]";
    const users = JSON.parse(storageUsers) as UserItem[];
    // deletedAtがあるものは削除
    const filteredUsers = users.filter(
      (user: UserItem) => !user.deletedAt.length
    );
    figma.ui.postMessage({ type: "users", users: filteredUsers });
  } else if (params.type === "add-user") {
    const users = JSON.parse(
      figma.root.getPluginData(`${fileId}:users`) || "[]"
    ) as UserItem[];
    users.push({
      id: uuid(),
      name: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    });
    figma.root.setPluginData(`${fileId}:users`, JSON.stringify(users));
    figma.ui.postMessage({
      type: "users",
      users: users.filter((user) => !user.deletedAt.length),
    });
  } else if (params.type === "delete-user") {
    const users = JSON.parse(
      figma.root.getPluginData(`${fileId}:users`) || "[]"
    ) as UserItem[];
    const index = users.findIndex((user) => user.id === params.id);
    if (index >= 0) {
      const newUsers = users.map((user) => {
        if (user.id === params.id) {
          return {
            id: user.id,
            name: params.name,
            createdAt: user.createdAt,
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
          };
        }
        return user;
      });
      figma.root.setPluginData(`${fileId}:users`, JSON.stringify(newUsers));
      figma.ui.postMessage({
        type: "users",
        users: newUsers.filter((user) => !user.deletedAt.length),
      });
    }
  } else if (params.type === "update-user") {
    const users = JSON.parse(
      figma.root.getPluginData(`${fileId}:users`) || "[]"
    ) as UserItem[];
    const index = users.findIndex((user) => user.id === params.id);
    if (index >= 0) {
      const newUsers = users.map((user) => {
        if (user.id === params.id) {
          return {
            id: user.id,
            name: params.name,
            createdAt: user.createdAt,
            updatedAt: new Date().toISOString(),
            deletedAt: user.deletedAt,
          };
        }
        return user;
      });
      figma.root.setPluginData(`${fileId}:users`, JSON.stringify(newUsers));
      figma.ui.postMessage({
        type: "users",
        users: newUsers.filter((user) => !user.deletedAt.length),
      });
    }
  }
  // その他操作
  if (params.type === "navigate-to-node") {
    // NOTE: nodeを-から:に変換する必要あり
    let success = false;
    const nodeId = params.nodeId;

    for (const page of figma.root.children) {
      await page.loadAsync();
      console.log(JSON.stringify(page.children, null, 2));
      console.log(`Page ${page.name} has ${page.children.length} children`);
      const node = page.findChild((node) => node.id === nodeId);
      if (node) {
        await figma.setCurrentPageAsync(page);
        figma.viewport.scrollAndZoomIntoView([node]);
        success = true;
        break;
      }
    }
    if (!success) {
      figma.notify(
        "Unable to navigate to the link. Please update the link and try again.",
        {
          error: true,
        }
      );
    } else {
      figma.notify("Successfully navigated to the link.");
      figma.closePlugin();
    }
  } else if (params.type === "open-url") {
    figma.openExternal(params.href);
  }
};
