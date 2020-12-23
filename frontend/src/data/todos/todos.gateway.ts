import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodosGetAllResponse } from './api-types/get-all.api';
import { Todo } from '../../core/todos/todo.entity';
import { TodosGateway } from '../../core/todos/todos-gateway.interface';
import { TodosGetDoneResponse } from './api-types/get-done.api';
import { TodosGetActiveResponse } from './api-types/get-active.api';
import {
  TodosCreateNewRequest,
  TodosCreateNewResponse,
} from './api-types/create-new.api';
import { TodosMakeActiveResponse } from './api-types/make-active.api';
import { TodosMakeDoneResponse } from './api-types/make-done.api';
import { TodosRemoveResponse } from './api-types/remove.api';
import { map } from 'rxjs/operators';
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
      `${this.config.apiPrefix}?active=true`
    );
  }

  getActive(): Observable<Todo[]> {
    return this.http.get<TodosGetActiveResponse>(
      `${this.config.apiPrefix}?active=true`
    );
  }

  createNew(subject: string): Observable<Todo> {
    const body: TodosCreateNewRequest = { subject };
    return this.http.post<TodosCreateNewResponse>(this.config.apiPrefix, {
      body,
    });
  }

  makeActive(id: number): Observable<Todo> {
    return this.http.post<TodosMakeActiveResponse>(
      `${this.config.apiPrefix} /${id}/make-active`,
      {}
    );
  }

  makeDone(id: number): Observable<Todo> {
    return this.http.post<TodosMakeDoneResponse>(
      `${this.config.apiPrefix}/${id}/make-active`,
      {}
    );
  }

  remove(id: number): Observable<boolean> {
    return this.http
      .delete<TodosRemoveResponse>(`${this.config.apiPrefix}/${id}`)
      .pipe(map(() => true));
  }
}
