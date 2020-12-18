import { Module } from '@nestjs/common';
import { TODOS_REPOSITORY } from '../../core/todos/todos.tokens';
import { InMemoryTodosRepository } from './in-memory-todos.repository';
import { TodosInitDbService } from './todos-init-db.service';

@Module({
  providers: [
    TodosInitDbService,
    { provide: TODOS_REPOSITORY, useClass: InMemoryTodosRepository },
  ],
  exports: [TODOS_REPOSITORY],
})
export class TodosDbModule {}
