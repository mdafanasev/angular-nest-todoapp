import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodosFilterContainer } from '@tda/app/todos/todos-filter/todos-filter.container';
import { TodosFilterState } from '@tda/core/todos/todos-filter-state.enum';
import { TodosInteractor } from '@tda/core/todos/todos.interactor';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({ selector: 'tda-todos-filter-ui', template: '' })
class MockChildComponent {
  @Input('value') public value?: TodosFilterState;
  @Output('apply') public apply = new EventEmitter<TodosFilterState>();
}

describe('TodosFilterContainer', () => {
  let fixture: ComponentFixture<TodosFilterContainer>;
  let container: TodosFilterContainer;
  let child: MockChildComponent;
  let filterState$: BehaviorSubject<TodosFilterState>;
  let interactor: {
    filterState$: Observable<TodosFilterState>;
    applyFilter: jest.Mock;
  };

  beforeEach(async () => {
    filterState$ = new BehaviorSubject<TodosFilterState>(TodosFilterState.ALL);
    interactor = {
      filterState$: filterState$.asObservable(),
      applyFilter: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [TodosFilterContainer, MockChildComponent],
      providers: [
        {
          provide: TodosInteractor,
          useValue: interactor,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosFilterContainer);
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

  it('should apply filter', () => {
    child.apply.emit(TodosFilterState.ONLY_DONE);
    expect(interactor.applyFilter).toHaveBeenCalledWith(
      TodosFilterState.ONLY_DONE
    );
  });
});
