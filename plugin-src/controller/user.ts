// NOTE: figmaで "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported" というエラーが出るので、uuid-randomを使う
import uuid from "../../node_modules/uuid-random/index";
import { UserItem } from "../../ui-src/type";

const _filterAndSortUsers = (users: UserItem[]) => {
  return users
    .filter((user: UserItem) => !user.deletedAt.length)
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return a.createdAt > b.createdAt ? -1 : 1;
      }
      return 0;
    });
};

export const getUsers = (fileId: string) => {
  const storageUsers = figma.root.getPluginData(`${fileId}:users`) || "[]";
  const parsedUsers = JSON.parse(storageUsers) as UserItem[];
  // deletedAtがあるものは削除して、createdAtの降順にソート
  const users = _filterAndSortUsers(parsedUsers);
  figma.ui.postMessage({ type: "users", users });
};

export const addUser = (fileId: string, name: string) => {
  const users = JSON.parse(
    figma.root.getPluginData(`${fileId}:users`) || "[]"
  ) as UserItem[];
  users.push({
    id: uuid(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: "",
  });
  figma.root.setPluginData(`${fileId}:users`, JSON.stringify(users));
  figma.ui.postMessage({
    type: "users",
    users: _filterAndSortUsers(users),
  });
};

export const deleteUser = (fileId: string, id: string) => {
  const users = JSON.parse(
    figma.root.getPluginData(`${fileId}:users`) || "[]"
  ) as UserItem[];
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    const newUsers = users.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          name: user.name,
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
      users: _filterAndSortUsers(newUsers),
    });
  }
};

export const updateUser = (fileId: string, id: string, name: string) => {
  const users = JSON.parse(
    figma.root.getPluginData(`${fileId}:users`) || "[]"
  ) as UserItem[];
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    const newUsers = users.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          name,
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
      users: _filterAndSortUsers(newUsers),
    });
  }
};
