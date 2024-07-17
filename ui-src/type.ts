export interface SubTaskItem {
  text: string;
  completedAt: string;
  deletedAt: string;
}

export interface TaskItem {
  id: string;
  text: string;
  date: string;
  assigneeId: string;
  completedAt: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  subTasks: SubTaskItem[];
}

export interface UserItem {
  id: string;
  name: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
