import { TodoStatus } from './todo-status.enum';

export class Todo {
  constructor(
    private readonly _id: number,
    private readonly _subject: string,
    private readonly _status: TodoStatus,
    private readonly _createdAt: number,
    private readonly _updatedAt: number
  ) {}

  public get id(): number {
    return this._id;
  }

  public get subject(): string {
    return this._subject;
  }

  public get status(): TodoStatus {
    return this._status;
  }

  public get isActive(): boolean {
    return this._status === TodoStatus.ACTIVE;
  }

  public get isDone(): boolean {
    return this._status === TodoStatus.DONE;
  }

  public get isExist(): boolean {
    return this._status !== TodoStatus.DELETED;
  }

  public get createdAt(): number {
    return this._createdAt;
  }

  public get updatedAt(): number {
    return this._updatedAt;
  }

  public makeDone(): Todo {
    return new Todo(
      this._id,
      this._subject,
      TodoStatus.DONE,
      this._createdAt,
      +new Date()
    );
  }

  public makeActive(): Todo {
    return new Todo(
      this._id,
      this._subject,
      TodoStatus.ACTIVE,
      this._createdAt,
      +new Date()
    );
  }

  public remove(): Todo {
    return new Todo(
      this._id,
      this._subject,
      TodoStatus.DELETED,
      this._createdAt,
      +new Date()
    );
  }

  public restore(): Todo {
    return new Todo(
      this._id,
      this._subject,
      TodoStatus.ACTIVE,
      this._createdAt,
      +new Date()
    );
  }

  public updateSubject(newSubject: string) {
    return new Todo(
      this._id,
      newSubject,
      this._status,
      this._createdAt,
      +new Date()
    );
  }
}
