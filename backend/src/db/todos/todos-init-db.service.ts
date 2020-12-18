import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { TodosRepository } from '../../core/todos/todos.repository.interface';
import { TODOS_REPOSITORY } from '../../core/todos/todos.tokens';
import { Todo } from '../../core/todos/todo.entity';
import { TodoStatus } from '../../core/todos/todo-status.enum';

@Injectable()
export class TodosInitDbService implements OnModuleInit {
  constructor(
    @Inject(TODOS_REPOSITORY) private readonly todosRepository: TodosRepository
  ) {}

  onModuleInit(): void {
    this.todosRepository.initWithData([
      new Todo(1, 'One', TodoStatus.ACTIVE, +new Date(), +new Date()),
      new Todo(2, 'Two', TodoStatus.ACTIVE, +new Date(), +new Date()),
      new Todo(3, 'Three', TodoStatus.DONE, +new Date(), +new Date()),
      new Todo(4, 'Four', TodoStatus.DONE, +new Date(), +new Date()),
      new Todo(5, 'Five', TodoStatus.DONE, +new Date(), +new Date()),
    ]);
  }
}
