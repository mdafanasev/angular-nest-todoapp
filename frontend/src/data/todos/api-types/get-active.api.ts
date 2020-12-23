import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosGetActiveResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
}[];
