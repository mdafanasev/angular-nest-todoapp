import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoItemComponent } from './item/todo-item.component';
import { TodosListComponent } from './list/todos-list.component';
import { TodosListContainer } from './todos-list.container';

@NgModule({
  declarations: [TodosListComponent, TodosListContainer, TodoItemComponent],
  exports: [TodosListContainer],
  imports: [CommonModule],
})
export class TodosListUiModule {}
