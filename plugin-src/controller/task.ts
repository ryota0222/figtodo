// NOTE: figmaで "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported" というエラーが出るので、uuid-randomを使う
import uuid from "../../node_modules/uuid-random/index";
import { TaskItem } from "../../ui-src/type";

const _filterAndSortTodos = (todos: TaskItem[]) => {
  return todos
    .filter((todo: TaskItem) => !todo.deletedAt.length)
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return a.createdAt > b.createdAt ? -1 : 1;
      }
      return 0;
    });
};

export const getTodos = (fileId: string) => {
  const storageTodos = figma.root.getPluginData(`${fileId}:todos`) || "[]";
  const parasedTodos = JSON.parse(storageTodos) as TaskItem[];
  // deletedAtがあるものは削除してcreatedAtの降順に並び替え
  const todos = _filterAndSortTodos(parasedTodos);
  figma.ui.postMessage({ type: "todos", todos });
};

export const addTodo = (fileId: string, text: string) => {
  const todos = JSON.parse(
    figma.root.getPluginData(`${fileId}:todos`) || "[]"
  ) as TaskItem[];
  todos.push({
    id: uuid(),
    text,
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
    todos: _filterAndSortTodos(todos),
  });
};

export const updateTodo = (
  fileId: string,
  id: string,
  text: string,
  date: string,
  assigneeId: string
) => {
  const todos = JSON.parse(
    figma.root.getPluginData(`${fileId}:todos`) || "[]"
  ) as TaskItem[];
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          text: text,
          date: date,
          assigneeId: assigneeId,
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
      todos: _filterAndSortTodos(newTodos),
    });
  }
};

export const deleteTodo = (fileId: string, id: string) => {
  const todos = JSON.parse(
    figma.root.getPluginData(`${fileId}:todos`) || "[]"
  ) as TaskItem[];
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
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
      todos: _filterAndSortTodos(newTodos),
    });
    figma.notify("Successfully deleted the task");
  }
};

export const checkTodo = (fileId: string, id: string) => {
  const todos = JSON.parse(
    figma.root.getPluginData(`${fileId}:todos`) || "[]"
  ) as TaskItem[];
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
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
      todos: _filterAndSortTodos(newTodos),
    });
    figma.notify("Successfully checked the task");
  }
};

// チェックを外す
export const uncheckTodo = (fileId: string, id: string) => {
  const todos = JSON.parse(
    figma.root.getPluginData(`${fileId}:todos`) || "[]"
  ) as TaskItem[];
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          text: todo.text,
          date: todo.date,
          assigneeId: todo.assigneeId,
          completedAt: "",
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
      todos: _filterAndSortTodos(newTodos),
    });
    figma.notify("Successfully unchecked the task");
  }
};
