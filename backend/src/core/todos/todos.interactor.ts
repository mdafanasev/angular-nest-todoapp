import { Inject, Injectable } from '@nestjs/common';
import { TODOS_REPOSITORY } from './todos.tokens';
import type { TodosRepository } from './todos.repository.interface';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo-status.enum';

@Injectable()
export class TodosInteractor {
  constructor(
    @Inject(TODOS_REPOSITORY) private readonly todosRepository: TodosRepository
  ) {}

  getAll(): Todo[] {
    return this.todosRepository.getAll();
  }

  getById(id: number): Todo | null {
    return this.todosRepository.findById(id);
  }

  createNew(subject: string): Todo {
    return this.todosRepository.createNew(subject, TodoStatus.ACTIVE);
  }

  getActiveTodos(): Todo[] {
    return this.todosRepository.findByStatus(TodoStatus.ACTIVE);
  }

  getCompletedTodos(): Todo[] {
    return this.todosRepository.findByStatus(TodoStatus.DONE);
  }

  getDeletedTodos(): Todo[] {
    return this.todosRepository.findByStatus(TodoStatus.DELETED);
  }

  makeDone(id: number): Todo | null {
    const todo = this.todosRepository.findById(id);
    if (todo) {
      return this.todosRepository.save(todo.makeDone());
    } else {
      return null;
    }
  }

  makeActive(id: number): Todo | null {
    const todo = this.todosRepository.findById(id);
    if (todo) {
      return this.todosRepository.save(todo.makeActive());
    } else {
      return null;
    }
  }

  remove(id: number): void {
    const todo = this.todosRepository.findById(id);
    if (todo) {
      this.todosRepository.save(todo.remove());
    }
  }

  restore(id: number): Todo | null {
    const todo = this.todosRepository.findDeletedById(id);
    if (todo) {
      return this.todosRepository.save(todo.restore());
    } else {
      return null;
    }
  }

  updateSubject(id: number, newSubject: string): Todo | null {
    const todo = this.todosRepository.findById(id);
    if (todo) {
      return this.todosRepository.save(todo.updateSubject(newSubject));
    } else {
      return null;
    }
  }
}
