import { Component } from '@angular/core';
import { Todo } from '@tda/core/todos/todo.entity';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';
import { Observable } from 'rxjs';

@Component({
  selector: 'tda-todo-list',
  templateUrl: './todos-list.container.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TodosListContainer {
  public readonly todos$: Observable<Todo[]>;

  constructor(private readonly todosInteractor: TodosInteractor) {
    this.todos$ = todosInteractor.todos$;
  }

  public makeActive(id: number) {
    this.todosInteractor.makeActive(id);
  }

  public makeDone(id: number) {
    this.todosInteractor.makeDone(id);
  }
}
