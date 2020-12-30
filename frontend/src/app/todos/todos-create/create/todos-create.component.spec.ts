import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodosCreateComponent } from '@tda/app/todos/todos-create/create/todos-create.component';

describe('TodosCreateComponent', () => {
  let fixture: ComponentFixture<TodosCreateComponent>;
  let component: TodosCreateComponent;
  let el: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodosCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosCreateComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit value', (done) => {
    component.create.subscribe((value: string) => {
      expect(value).toBe('Test todo');
      done();
    });
    const input = el.querySelector('input');
    const button = el.querySelector('button');
    if (input && button) {
      input.value = 'Test todo';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button.click();
    }
  });
});
