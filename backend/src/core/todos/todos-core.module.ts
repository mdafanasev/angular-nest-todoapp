import { Module } from '@nestjs/common';
import { TodosInteractor } from './todos.interactor';
import { TodosDbModule } from '../../db/todos/todos-db.module';

@Module({
  providers: [TodosInteractor],
  exports: [TodosInteractor],
  imports: [TodosDbModule],
})
export class TodosCoreModule {}
