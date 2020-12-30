import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from '@tda/core/todos/todo.entity';
import { TodosGateway } from '@tda/core/todos/todos-gateway.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  TodosCreateNewRequest,
  TodosCreateNewResponse,
} from './api-types/create-new.api';
import { TodosGetActiveResponse } from './api-types/get-active.api';
import { TodosGetAllResponse } from './api-types/get-all.api';
import { TodosGetDoneResponse } from './api-types/get-done.api';
import { TodosMakeActiveResponse } from './api-types/make-active.api';
import { TodosMakeDoneResponse } from './api-types/make-done.api';
import { TodosRemoveResponse } from './api-types/remove.api';
import { TODOS_DATA_CONFIG } from './todos-data-config.token';
import { TodosDataConfig } from './todos-data.module';

@Injectable({
  providedIn: 'root',
})
export class HttpTodosGateway implements TodosGateway {
  constructor(
    @Inject(TODOS_DATA_CONFIG) private readonly config: TodosDataConfig,
    readonly http: HttpClient
  ) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<TodosGetAllResponse>(this.config.apiPrefix);
  }

  getDone(): Observable<Todo[]> {
    return this.http.get<TodosGetDoneResponse>(
      `${this.config.apiPrefix}?done=true`
    );
  }

  getActive(): Observable<Todo[]> {
    return this.http.get<TodosGetActiveResponse>(
      `${this.config.apiPrefix}?active=true`
    );
  }

  createNew(subject: string): Observable<Todo> {
    const body: TodosCreateNewRequest = { todo: { subject } };
    return this.http.post<TodosCreateNewResponse>(this.config.apiPrefix, body);
  }

  makeActive(id: number): Observable<Todo> {
    return this.http.post<TodosMakeActiveResponse>(
      `${this.config.apiPrefix}/${id}/make-active`,
      {}
    );
  }

  makeDone(id: number): Observable<Todo> {
    return this.http.post<TodosMakeDoneResponse>(
      `${this.config.apiPrefix}/${id}/make-done`,
      {}
    );
  }

  remove(id: number): Observable<boolean> {
    return this.http
      .delete<TodosRemoveResponse>(`${this.config.apiPrefix}/${id}`)
      .pipe(map(() => true));
  }
}
