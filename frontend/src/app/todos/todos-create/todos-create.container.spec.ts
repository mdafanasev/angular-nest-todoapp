import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodosCreateContainer } from '@tda/app/todos/todos-create/todos-create.container';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';

@Component({ selector: 'tda-todos-create-ui', template: '' })
class MockChildComponent {
  @Output('create') public create = new EventEmitter<string>();
}

describe('TodosCreateContainer', () => {
  let fixture: ComponentFixture<TodosCreateContainer>;
  let container: TodosCreateContainer;
  let child: MockChildComponent;
  let interactor: {
    createNew: jest.Mock;
  };

  beforeEach(async () => {
    interactor = { createNew: jest.fn() };
    await TestBed.configureTestingModule({
      declarations: [TodosCreateContainer, MockChildComponent],
      providers: [
        {
          provide: TodosInteractor,
          useValue: interactor,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosCreateContainer);
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

  it('should create todo', () => {
    child.create.emit('Test todo');
    expect(interactor.createNew).toHaveBeenCalledWith('Test todo');
  });
});
