import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TodoStatus } from './todo-status.enum';
import { TODOS_GATEWAY } from './todos-gateway.token';
import { TodosGateway } from './todos-gateway.interface';

export type TodosToggleEvent = {
  id: number;
  newStatus: TodoStatus;
};

@Injectable({ providedIn: 'root' })
export class TodosToggler {
  public events$: Observable<TodosToggleEvent>;
  private _events$: Subject<TodosToggleEvent>;

  constructor(
    @Inject(TODOS_GATEWAY) private readonly todosGateway: TodosGateway
  ) {
    this._events$ = new Subject<TodosToggleEvent>();
    this.events$ = this._events$.asObservable();
  }

  public makeActive(id: number) {
    this.todosGateway
      .makeActive(id)
      .subscribe(() =>
        this._events$.next({ id, newStatus: TodoStatus.ACTIVE })
      );
  }

  public makeDone(id: number) {
    this.todosGateway
      .makeDone(id)
      .subscribe(() =>
        this._events$.next({ id, newStatus: TodoStatus.ACTIVE })
      );
  }
}
