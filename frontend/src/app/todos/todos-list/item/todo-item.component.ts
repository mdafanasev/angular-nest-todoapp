import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoStatus } from '@tda/core/todos/todo-status.enum';
import { Todo } from '@tda/core/todos/todo.entity';

@Component({
  selector: 'tda-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') public todo?: Todo;
  @Output('makeActive') public makeActive = new EventEmitter<void>();
  @Output('makeDone') public makeDone = new EventEmitter<void>();

  public get isActive(): boolean {
    return this.todo?.status === TodoStatus.ACTIVE;
  }

  public get isDone(): boolean {
    return this.todo?.status === TodoStatus.DONE;
  }

  public toggle() {
    if (!this.todo) return;
    if (this.todo.status === TodoStatus.ACTIVE) {
      this.makeDone.emit();
    } else {
      this.makeActive.emit();
    }
  }
}
