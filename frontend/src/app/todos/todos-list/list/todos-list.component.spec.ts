import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoStatus } from '@tda/core/todos/todo-status.enum';
import { Todo } from '@tda/core/todos/todo.entity';
import { TodosListComponent } from './todos-list.component';

@Component({ selector: 'tda-todo-item', template: '' })
class MockChildComponent {
  @Input('todo') public todo?: Todo;
  @Output('makeActive') public makeActive = new EventEmitter<number>();
  @Output('makeDone') public makeDone = new EventEmitter<number>();
}

describe('TodosListComponent', () => {
  let fixture: ComponentFixture<TodosListComponent>;
  let component: TodosListComponent;
  let el: Element;

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
    await TestBed.configureTestingModule({
      declarations: [TodosListComponent, MockChildComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    component.todos = [TODO_ONE, TODO_TWO, TODO_THREE];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render todos list', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(MockChildComponent))
    ).toHaveLength(3);
  });
});
