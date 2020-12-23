import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TODOS_GATEWAY } from './todos-gateway.token';
import { TodosGateway } from './todos-gateway.interface';

export type TodosCreateEvent = {
  subject: string;
};

@Injectable({ providedIn: 'root' })
export class TodosCreator {
  public events$: Observable<TodosCreateEvent>;
  private _events$: Subject<TodosCreateEvent>;

  constructor(
    @Inject(TODOS_GATEWAY) private readonly todosGateway: TodosGateway
  ) {
    this._events$ = new Subject<TodosCreateEvent>();
    this.events$ = this._events$.asObservable();
  }

  public create(subject: string): void {
    this.todosGateway
      .createNew(subject)
      .subscribe(() => this._events$.next({ subject }));
  }
}
