import { InMemoryTodosRepository } from './in-memory-todos.repository';
import { TodoStatus } from '../../core/todos/todo-status.enum';
import { Todo } from '../../core/todos/todo.entity';

describe('InMemoryTodosRepository', () => {
  let service: InMemoryTodosRepository;
  const TODO_ONE = new Todo(
    1,
    'One',
    TodoStatus.ACTIVE,
    +new Date(),
    +new Date()
  );
  const TODO_TWO = new Todo(
    2,
    'Two',
    TodoStatus.ACTIVE,
    +new Date(),
    +new Date()
  );
  const TODO_THREE = new Todo(
    3,
    'Three',
    TodoStatus.DONE,
    +new Date(),
    +new Date()
  );

  beforeEach(async () => {
    service = new InMemoryTodosRepository();
    service.initWithData([TODO_ONE, TODO_TWO, TODO_THREE]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize storage', () => {
    expect(service.getAll()).toHaveLength(3);
  });

  it('should create new todo with correct id', () => {
    expect(service.createNew('New todo', TodoStatus.DONE).id).toBe(4);
  });

  it('should create new todo with passed subject', () => {
    const id = service.createNew('New todo', TodoStatus.DONE).id;
    expect(service.findById(id).subject).toBe('New todo');
  });

  it('should create new todo with passed status', () => {
    const id = service.createNew('New todo', TodoStatus.DONE).id;
    expect(service.findById(id).status).toBe(TodoStatus.DONE);
  });

  it('should create new todo with correct createdAt field', () => {
    const timestamp = +new Date();
    const id = service.createNew('New todo', TodoStatus.DONE).id;
    expect(service.findById(id).createdAt).toBe(timestamp);
  });

  it('should find by id', () => {
    expect(service.findById(2).subject).toBe(TODO_TWO.subject);
    expect(service.findById(2).status).toBe(TODO_TWO.status);
    expect(service.findById(2).createdAt).toBe(TODO_TWO.createdAt);
    expect(service.findById(2).updatedAt).toBe(TODO_TWO.updatedAt);
  });

  it('should find by status correctly', () => {
    expect(service.findByStatus(TodoStatus.ACTIVE)).toHaveLength(2);
  });

  it('should save correctly', () => {
    const todo = new Todo(
      1,
      'Updated One value',
      TodoStatus.DONE,
      12345,
      12348
    );
    service.save(todo);
    const savedTodo = service.findById(1);
    expect(savedTodo.subject).toBe(todo.subject);
    expect(savedTodo.status).toBe(todo.status);
    expect(savedTodo.createdAt).toBe(todo.createdAt);
    expect(savedTodo.updatedAt).toBe(todo.updatedAt);
  });
});
