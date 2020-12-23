import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosGetDoneResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
}[];
