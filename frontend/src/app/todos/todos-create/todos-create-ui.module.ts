import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosCreateComponent } from './create/todos-create.component';
import { TodosCreateContainer } from './todos-create.container';

@NgModule({
  declarations: [TodosCreateContainer, TodosCreateComponent],
  exports: [TodosCreateContainer],
  imports: [CommonModule, FormsModule],
})
export class TodosCreateUiModule {}
