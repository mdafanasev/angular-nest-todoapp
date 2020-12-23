import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Todo } from './todo.entity';
import { TodosFilter } from './todos-filter';
import { TodosCreator } from './todos-creator';
import { TodosToggler } from './todos-toggler';
import { TODOS_GATEWAY } from './todos-gateway.token';
import { TodosGateway } from './todos-gateway.interface';
import { TodosFilterState } from './todos-filter-state.enum';

@Injectable({ providedIn: 'root' })
export class TodosStore {
  public readonly data$: Observable<Todo[]>;

  constructor(
    private readonly todosFilter: TodosFilter,
    private readonly todosCreator: TodosCreator,
    private readonly todosToggler: TodosToggler,
    @Inject(TODOS_GATEWAY) private readonly todosGateway: TodosGateway
  ) {
    this.data$ = combineLatest([
      todosFilter.state$,
      todosCreator.events$.pipe(startWith(null)),
      todosToggler.events$.pipe(startWith(null)),
    ]).pipe(switchMap(([filter]) => this._getTodos(filter)));
  }

  private _getTodos(filter: TodosFilterState): Observable<Todo[]> {
    if (filter === TodosFilterState.ONLY_ACTIVE) {
      return this.todosGateway.getActive();
    }
    if (filter === TodosFilterState.ONLY_DONE) {
      return this.todosGateway.getDone();
    }
    return this.todosGateway.getAll();
  }
}
