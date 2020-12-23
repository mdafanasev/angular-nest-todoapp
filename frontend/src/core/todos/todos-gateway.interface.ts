import { Todo } from './todo.entity';
import { Observable } from 'rxjs';

export interface TodosGateway {
  getAll(): Observable<Todo[]>;

  getActive(): Observable<Todo[]>;

  getDone(): Observable<Todo[]>;

  getById(id: number): Observable<Todo>;

  makeActive(id: number): Observable<Todo>;

  makeDone(id: number): Observable<Todo>;

  createNew(subject: string): Observable<Todo>;

  remove(id: number): Observable<boolean>;
}
