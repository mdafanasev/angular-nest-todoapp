import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosCoreModule } from '@tda/core/todos/todos-core.module';
import { TodosCreateUiModule } from './todos-create/todos-create-ui.module';
import { TodosFilterUiModule } from './todos-filter/todos-filter-ui.module';
import { TodosListUiModule } from './todos-list/todos-list-ui.module';
import { TodosPage } from './todos.page';

const routes: Routes = [{ path: '', component: TodosPage }];

@NgModule({
  declarations: [TodosPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TodosListUiModule,
    TodosFilterUiModule,
    TodosCreateUiModule,
    TodosCoreModule,
  ],
})
export class TodosUiModule {}
