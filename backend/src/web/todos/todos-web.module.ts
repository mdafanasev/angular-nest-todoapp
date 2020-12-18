import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosCoreModule } from '../../core/todos/todos-core.module';

@Module({
  controllers: [TodosController],
  imports: [TodosCoreModule],
})
export class TodosWebModule {}
