import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodosFilterComponent } from './filter/todos-filter.component';
import { TodosFilterContainer } from './todos-filter.container';

@NgModule({
  declarations: [TodosFilterContainer, TodosFilterComponent],
  exports: [TodosFilterContainer],
  imports: [CommonModule],
})
export class TodosFilterUiModule {}
