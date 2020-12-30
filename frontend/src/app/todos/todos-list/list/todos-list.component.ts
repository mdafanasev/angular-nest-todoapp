import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@tda/core/todos/todo.entity';

@Component({
  selector: 'tda-todo-list-ui',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent {
  @Input('todos') public todos: Todo[] = [];
  @Output('makeActive') public makeActive = new EventEmitter<number>();
  @Output('makeDone') public makeDone = new EventEmitter<number>();
}
