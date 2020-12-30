import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from '@tda/app/todos/todos-list/item/todo-item.component';
import { TodoStatus } from '@tda/core/todos/todo-status.enum';

describe('TodoItemComponent', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  let el: Element;

  const TODO = {
    id: 1,
    subject: 'One',
    status: TodoStatus.ACTIVE,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = TODO;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render subject', () => {
    expect(el.querySelector('h2')?.textContent).toContain(TODO.subject);
  });

  it('should make todo done', (done) => {
    const button = el.querySelector('button');
    component.makeDone.subscribe(() => {
      done();
    });
    button?.click();
  });
});
