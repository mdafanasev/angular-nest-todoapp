import { Injectable } from '@nestjs/common';
import { TodosRepository } from '../../core/todos/todos.repository.interface';
import { Todo } from '../../core/todos/todo.entity';
import { TodoStatus } from '../../core/todos/todo-status.enum';

@Injectable()
export class InMemoryTodosRepository implements TodosRepository {
  private _store: Todo[] = [];

  public initWithData(data: Todo[]): void {
    this._store = [...data];
  }

  public createNew(subject: string, status: TodoStatus) {
    const id = this._getNextId();
    const todo = new Todo(id, subject, status, +new Date(), +new Date());
    this._addItem(todo);
    return todo;
  }

  public findById(id: number) {
    return this._store
      .filter((item) => item.status !== TodoStatus.DELETED)
      .find((item) => item.id === id);
  }

  public findDeletedById(id: number) {
    return this._store
      .filter((item) => item.status === TodoStatus.DELETED)
      .find((item) => item.id === id);
  }

  public findByStatus(status: TodoStatus): Todo[] {
    return this._store.filter((item) => item.status === status);
  }

  public getAll(): Todo[] {
    return this._store.filter((item) => item.status !== TodoStatus.DELETED);
  }

  public save(todo): Todo {
    const index = this._store.findIndex((item) => item.id === todo.id);
    if (index >= 0) {
      this._store[index] = todo;
    } else {
      this._addItem(todo);
    }
    return this._store.find((item) => item.id === todo.id);
  }

  private _getNextId(): number {
    const maxId = this._store
      .map((item) => item.id)
      .reduce((max, current) => (current > max ? current : max));
    return maxId + 1;
  }

  private _addItem(item: Todo): void {
    this._store.push(item);
  }
}
