import { Component } from '@angular/core';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';

@Component({
  selector: 'tda-todos-create',
  templateUrl: './todos-create.container.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TodosCreateContainer {
  constructor(private readonly todosInteractor: TodosInteractor) {}

  public create(subject: string) {
    this.todosInteractor.createNew(subject);
  }
}
