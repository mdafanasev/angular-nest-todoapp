import { Todo } from '../src/core/todos/todo.entity';
import { TodoStatus } from '../src/core/todos/todo-status.enum';

export const TODO_ONE = new Todo(
  1,
  'One',
  TodoStatus.ACTIVE,
  +new Date(),
  +new Date()
);
export const TODO_TWO = new Todo(
  2,
  'Two',
  TodoStatus.ACTIVE,
  +new Date(),
  +new Date()
);
export const TODO_THREE = new Todo(
  3,
  'Three',
  TodoStatus.DONE,
  +new Date(),
  +new Date()
);
export const TODO_FOUR = new Todo(
  4,
  'Four',
  TodoStatus.DONE,
  +new Date(),
  +new Date()
);
export const TODO_FIVE = new Todo(
  5,
  'Five',
  TodoStatus.DELETED,
  +new Date(),
  +new Date()
);
