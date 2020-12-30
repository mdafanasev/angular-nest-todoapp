import { TodoStatus } from '../../../core/todos/todo-status.enum';

export type TodosCreateNewResponse = {
  id: number;
  subject: string;
  status: TodoStatus;
};

export type TodosCreateNewRequest = {
  todo: {
    subject: string;
  };
};
