import { Module } from '@nestjs/common';
import { TodosCoreModule } from './core/todos/todos-core.module';
import { TodosWebModule } from './web/todos/todos-web.module';
import { TodosDbModule } from './db/todos/todos-db.module';

@Module({
  imports: [TodosCoreModule, TodosWebModule, TodosDbModule],
})
export class RootModule {}
