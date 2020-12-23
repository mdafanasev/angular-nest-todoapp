import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosGetAllResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
}[];
