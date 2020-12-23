import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodosFilterState } from './todos-filter-state.enum';
import { DEFAULT_FILTER_STATE } from './todos.config';

@Injectable({ providedIn: 'root' })
export class TodosFilter {
  public readonly state$: Observable<TodosFilterState>;
  private readonly _state$: BehaviorSubject<TodosFilterState>;

  constructor() {
    this._state$ = new BehaviorSubject<TodosFilterState>(DEFAULT_FILTER_STATE);
    this.state$ = this._state$.asObservable();
  }

  public setFilterState(newState: TodosFilterState): void {
    this._state$.next(newState);
  }
}
