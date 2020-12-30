import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosFilterState } from '@tda/core/todos/todos-filter-state.enum';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';

@Component({
  selector: 'tda-todos-filter',
  templateUrl: './todos-filter.container.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TodosFilterContainer {
  public readonly value$: Observable<TodosFilterState>;

  constructor(public readonly todosInteractor: TodosInteractor) {
    this.value$ = todosInteractor.filterState$;
  }

  public applyFilter(value: TodosFilterState) {
    this.todosInteractor.applyFilter(value);
  }
}
