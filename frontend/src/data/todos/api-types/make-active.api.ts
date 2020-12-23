import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosMakeActiveResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
};
