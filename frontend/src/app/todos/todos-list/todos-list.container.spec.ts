import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoStatus } from '@tda/core/todos/todo-status.enum';
import { Todo } from '@tda/core/todos/todo.entity';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TodosListContainer } from './todos-list.container';

@Component({ selector: 'tda-todo-list-ui', template: '' })
class MockChildComponent {
  @Input('todos') public todos: Todo[] = [];
  @Output('makeActive') public makeActive = new EventEmitter<number>();
  @Output('makeDone') public makeDone = new EventEmitter<number>();
}

describe('TodosListContainer', () => {
  let fixture: ComponentFixture<TodosListContainer>;
  let container: TodosListContainer;
  let child: MockChildComponent;
  let todos$: BehaviorSubject<Todo[]>;
  let interactor: {
    todos$: Observable<Todo[]>;
    makeDone: jest.Mock;
    makeActive: jest.Mock;
  };
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

  beforeEach(async () => {
    todos$ = new BehaviorSubject<Todo[]>([TODO_ONE, TODO_TWO, TODO_THREE]);
    interactor = {
      todos$: todos$.asObservable(),
      makeActive: jest.fn(),
      makeDone: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TodosListContainer, MockChildComponent],
      providers: [{ provide: TodosInteractor, useValue: interactor }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListContainer);
    container = fixture.componentInstance;
    fixture.detectChanges();
    child = fixture.debugElement.query(By.directive(MockChildComponent))
      ?.componentInstance;
  });

  it('should create', () => {
    expect(container).toBeTruthy();
  });

  it('should render child', () => {
    expect(child).toBeTruthy();
  });

  it('should pass todos to child', () => {
    fixture.detectChanges();
    expect(child.todos).toHaveLength(3);
    expect(child.todos.find((item) => item.id === TODO_ONE.id)).toBeTruthy();
    expect(child.todos.find((item) => item.id === TODO_TWO.id)).toBeTruthy();
    expect(child.todos.find((item) => item.id === TODO_THREE.id)).toBeTruthy();
  });

  it('should make todo done', () => {
    child.makeDone.emit(3);
    expect(interactor.makeDone).toHaveBeenCalledWith(3);
  });

  it('should make todo active', () => {
    child.makeActive.emit(2);
    expect(interactor.makeActive).toHaveBeenCalledWith(2);
  });
});
