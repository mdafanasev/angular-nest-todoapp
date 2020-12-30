import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosFilterComponent } from '@tda/app/todos/todos-filter/filter/todos-filter.component';
import { TodosFilterState } from '@tda/core/todos/todos-filter-state.enum';

describe('TodosFilterComponent', () => {
  let fixture: ComponentFixture<TodosFilterComponent>;
  let component: TodosFilterComponent;
  let el: Element;
  let buttons: HTMLButtonElement[];
  let doneButton: HTMLButtonElement | undefined;
  let activeButton: HTMLButtonElement | undefined;
  let allButton: HTMLButtonElement | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosFilterComponent);
    component = fixture.componentInstance;
    component.value = TodosFilterState.ALL;
    el = fixture.nativeElement;
    fixture.detectChanges();
    buttons = Array.from(el.querySelectorAll('button'));
    doneButton = buttons.find((button) => button.textContent?.includes('Done'));
    activeButton = buttons.find((button) =>
      button.textContent?.includes('Active')
    );
    allButton = buttons.find((button) => button.textContent?.includes('All'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render done button', () => {
    expect(doneButton).toBeTruthy();
  });

  it('should render done state', () => {
    component.value = TodosFilterState.ONLY_DONE;
    fixture.detectChanges();
    expect(doneButton?.classList.contains('active')).toBeTruthy();
    expect(activeButton?.classList.contains('active')).toBeFalsy();
    expect(allButton?.classList.contains('active')).toBeFalsy();
  });

  it('should render active button', () => {
    expect(activeButton).toBeTruthy();
  });

  it('should render active state', () => {
    component.value = TodosFilterState.ONLY_ACTIVE;
    fixture.detectChanges();
    expect(activeButton?.classList.contains('active')).toBeTruthy();
    expect(doneButton?.classList.contains('active')).toBeFalsy();
    expect(allButton?.classList.contains('active')).toBeFalsy();
  });

  it('should render all button', () => {
    expect(allButton).toBeTruthy();
  });

  it('should render all state', () => {
    component.value = TodosFilterState.ALL;
    fixture.detectChanges();
    expect(allButton?.classList.contains('active')).toBeTruthy();
    expect(activeButton?.classList.contains('active')).toBeFalsy();
    expect(doneButton?.classList.contains('active')).toBeFalsy();
  });

  it('should apply all filter', (done) => {
    component.apply.subscribe((value: TodosFilterState) => {
      expect(value).toBe(TodosFilterState.ALL);
      done();
    });
    buttons.find((button) => button.textContent?.includes('All'))?.click();
  });

  it('should apply done filter', (done) => {
    const buttons = Array.from(el.querySelectorAll('button'));
    component.apply.subscribe((value: TodosFilterState) => {
      expect(value).toBe(TodosFilterState.ONLY_DONE);
      done();
    });
    buttons.find((button) => button.textContent?.includes('Done'))?.click();
  });

  it('should apply active filter', (done) => {
    const buttons = Array.from(el.querySelectorAll('button'));
    component.apply.subscribe((value: TodosFilterState) => {
      expect(value).toBe(TodosFilterState.ONLY_ACTIVE);
      done();
    });
    buttons.find((button) => button.textContent?.includes('Active'))?.click();
  });
});
