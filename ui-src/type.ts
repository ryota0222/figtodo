export interface TaskItem {
  id: string;
  text: string;
  date: string;
  assigneeId: string;
  completedAt: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserItem {
  id: string;
  name: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
