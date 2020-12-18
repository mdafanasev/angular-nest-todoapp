import { TodoStatus } from '../../core/todos/todo-status.enum';
import { Todo } from '../../core/todos/todo.entity';

export class TodoDto {
  constructor(
    public readonly id: number,
    public readonly subject: string,
    public readonly status: TodoStatus
  ) {}

  public static fromEntity(todo: Todo) {
    return new TodoDto(todo.id, todo.subject, todo.status);
  }
}
