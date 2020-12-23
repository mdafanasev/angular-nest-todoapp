import { TestBed } from '@angular/core/testing';

import { TodosInteractor } from './todos.interactor';
import { TODOS_GATEWAY } from './todos-gateway.token';
import { of, Subject } from 'rxjs';
import { TodoStatus } from './todo-status.enum';
import { Todo } from './todo.entity';
import { TodosFilterState } from './todos-filter-state.enum';

describe('TodosInteractorService', () => {
  const TODO_ONE = {
    id: 1,
    subject: 'One',
    status: TodoStatus.ACTIVE,
  };
  const TODO_TWO = {
    id: 2,
    subject: 'Two',
    status: TodoStatus.ACTIVE,
  };
  const TODO_THREE = {
    id: 3,
    subject: 'Three',
    status: TodoStatus.DONE,
  };
  const gateway = {
    getAll: jest.fn(),
    getActive: jest.fn(),
    getDone: jest.fn(),
    makeActive: jest.fn(),
    makeDone: jest.fn(),
    createNew: jest.fn(),
    remove: jest.fn(),
  };
  let resp$: Subject<Todo[]>;
  let service: TodosInteractor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TODOS_GATEWAY,
          useValue: gateway,
        },
      ],
    });
    service = TestBed.inject(TodosInteractor);
    resp$ = new Subject<Todo[]>();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todos', (done) => {
    gateway.getAll.mockReturnValue(resp$.asObservable());
    service.todos$.subscribe((todos) => {
      expect(todos).toHaveLength(3);
      expect(
        todos.find((todo) => todo.subject === TODO_ONE.subject)
      ).toBeTruthy();
      expect(
        todos.find((todo) => todo.subject === TODO_TWO.subject)
      ).toBeTruthy();
      expect(
        todos.find((todo) => todo.subject === TODO_THREE.subject)
      ).toBeTruthy();
      done();
    });
    resp$.next([TODO_ONE, TODO_TWO, TODO_THREE]);
  });

  it('should create new todo', (done) => {
    const NEW_TODO = {
      id: 4,
      subject: 'NEW TODO',
      status: TodoStatus.ACTIVE,
    };
    gateway.getAll.mockReturnValue(resp$.asObservable());
    gateway.createNew.mockReturnValue(of(NEW_TODO));
    service.createNew(NEW_TODO.subject);
    service.todos$.subscribe((todos) => {
      expect(todos).toHaveLength(4);
      expect(
        todos.find((todo) => todo.subject === NEW_TODO.subject)
      ).toBeTruthy();
      done();
    });
    resp$.next([TODO_ONE, TODO_TWO, TODO_THREE, NEW_TODO]);
  });

  it('should make todo done', (done) => {
    gateway.makeDone.mockReturnValue(
      of({
        ...TODO_ONE,
        status: TodoStatus.DONE,
      })
    );
    gateway.getAll.mockReturnValue(resp$.asObservable());
    service.makeDone(1);
    service.todos$.subscribe((todos) => {
      expect(todos.find((todo) => todo.id === 1)?.status).toBe(TodoStatus.DONE);
      done();
    });
    resp$.next([
      {
        ...TODO_ONE,
        status: TodoStatus.DONE,
      },
      TODO_TWO,
      TODO_THREE,
    ]);
  });

  it('should make todo active', (done) => {
    gateway.makeActive.mockReturnValue(
      of({
        ...TODO_THREE,
        status: TodoStatus.ACTIVE,
      })
    );
    gateway.getAll.mockReturnValue(resp$.asObservable());
    service.makeDone(3);
    service.todos$.subscribe((todos) => {
      expect(todos.find((todo) => todo.id === 3)?.status).toBe(
        TodoStatus.ACTIVE
      );
      done();
    });
    resp$.next([
      TODO_ONE,
      TODO_TWO,
      {
        ...TODO_THREE,
        status: TodoStatus.ACTIVE,
      },
    ]);
  });

  it('should apply active filter', (done) => {
    gateway.getActive.mockReturnValue(resp$);
    service.applyFilter(TodosFilterState.ONLY_ACTIVE);
    service.todos$.subscribe((todos) => {
      expect(todos).toHaveLength(2);
      expect(todos[0]?.status).toBe(TodoStatus.ACTIVE);
      expect(todos[1]?.status).toBe(TodoStatus.ACTIVE);
      done();
    });
    resp$.next([TODO_ONE, TODO_TWO]);
  });

  it('should apply done filter', (done) => {
    gateway.getDone.mockReturnValue(resp$);
    service.applyFilter(TodosFilterState.ONLY_DONE);
    service.todos$.subscribe((todos) => {
      expect(todos).toHaveLength(1);
      expect(todos[0]?.status).toBe(TodoStatus.DONE);
      done();
    });
    resp$.next([TODO_THREE]);
  });
});
