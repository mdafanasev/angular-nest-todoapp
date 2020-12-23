import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.entity';
import { TODOS_GATEWAY } from './todos-gateway.token';
import { TodosGateway } from './todos-gateway.interface';
import { TodosFilter } from './todos-filter';
import { TodosCreator } from './todos-creator';
import { TodosToggler } from './todos-toggler';
import { TodosStore } from './todos-store';
import { TodosFilterState } from './todos-filter-state.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosInteractor {
  public todos$: Observable<Todo[]>;
  public filterState$: Observable<TodosFilterState>;

  constructor(
    private readonly todosStore: TodosStore,
    private readonly todosFilter: TodosFilter,
    private readonly todosCreator: TodosCreator,
    private readonly todosToggler: TodosToggler,
    @Inject(TODOS_GATEWAY) private readonly todosGateway: TodosGateway
  ) {
    this.todos$ = this.todosStore.data$;
    this.filterState$ = this.todosFilter.state$;
  }

  public createNew(subject: string): void {
    this.todosCreator.create(subject);
  }

  public makeActive(id: number): void {
    this.todosToggler.makeActive(id);
  }

  public makeDone(id: number): void {
    this.todosToggler.makeDone(id);
  }

  public applyFilter(value: TodosFilterState): void {
    this.todosFilter.setFilterState(value);
  }
}
