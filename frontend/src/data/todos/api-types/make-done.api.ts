import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosMakeDoneResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
};
