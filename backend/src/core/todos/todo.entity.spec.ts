import { Todo } from './todo.entity';
import { TodoStatus } from './todo-status.enum';

describe('Todo entity', () => {
  let todo: Todo;
  const createdAt = 12345;

  beforeEach(() => {
    todo = new Todo(1, 'Test subject', TodoStatus.ACTIVE, createdAt, createdAt);
  });

  it('should exist', () => {
    expect(todo).toBeTruthy();
  });

  it('should have correct subject', () => {
    expect(todo.subject).toBe('Test subject');
  });

  it('should be initially active', () => {
    expect(todo.isActive).toBeTruthy();
  });

  it('should not be initially done', () => {
    expect(todo.isDone).toBeFalsy();
  });

  it('should not be initially deleted', () => {
    expect(todo.isExist).toBeTruthy();
  });

  it('should have correct creation timestamp', () => {
    expect(todo.createdAt).toBe(createdAt);
  });

  it('should have correct update timestamp', () => {
    expect(todo.updatedAt).toBe(createdAt);
  });

  it('should make done', () => {
    expect(todo.makeDone().isDone).toBeTruthy();
  });

  it('should make undone', () => {
    expect(todo.makeDone().makeActive().isDone).toBeFalsy();
  });

  it('should remove', () => {
    expect(todo.remove().isExist).toBeFalsy();
  });

  it('should restore', () => {
    expect(todo.remove().restore().isExist).toBeTruthy();
  });

  it('should update subject', () => {
    expect(todo.updateSubject('Updated test subject').subject).toBe(
      'Updated test subject'
    );
  });
});
