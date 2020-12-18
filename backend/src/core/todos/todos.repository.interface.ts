import { TodoStatus } from './todo-status.enum';
import { Todo } from './todo.entity';

export interface TodosRepository {
  initWithData(data: Todo[]): void;

  getAll(): Todo[];

  findById(id: number): Todo;

  findDeletedById(id: number): Todo;

  findByStatus(status: TodoStatus): Todo[];

  createNew(subject: string, status: TodoStatus): Todo;

  save(todo: Todo): Todo;
}
