import { TodoStatus } from './todo-status.enum';

export type Todo = {
  id: number;
  subject: string;
  status: TodoStatus;
};
