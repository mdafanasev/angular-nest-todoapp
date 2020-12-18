import { Test, TestingModule } from '@nestjs/testing';
import { TODOS_REPOSITORY } from './todos.tokens';
import { TodosInteractor } from './todos.interactor';
import { TodoStatus } from './todo-status.enum';
import { Todo } from './todo.entity';

describe('DefaultTodosService', () => {
  let service: TodosInteractor;
  let repository: any;
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
  const TODO_DONE = new Todo(
    3,
    'Done',
    TodoStatus.DONE,
    +new Date(),
    +new Date()
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosInteractor,
        {
          provide: TODOS_REPOSITORY,
          useValue: {
            getAll: jest.fn(),
            findById: jest.fn(),
            findByStatus: jest.fn(),
            createNew: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosInteractor>(TodosInteractor);
    repository = module.get(TODOS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all todos', () => {
    repository.getAll.mockReturnValue([TODO_ONE, TODO_TWO]);
    expect(service.getAll()).toEqual([TODO_ONE, TODO_TWO]);
  });

  it('should return todo by id', () => {
    repository.findById.mockReturnValue(TODO_ONE);
    expect(service.getById(1)).toEqual(TODO_ONE);
  });

  it('should create new todo', () => {
    service.createNew('Test subject');
    expect(repository.createNew).toHaveBeenCalledWith(
      'Test subject',
      TodoStatus.ACTIVE
    );
  });

  it('should returns active todos', () => {
    service.getActiveTodos();
    expect(repository.findByStatus).toHaveBeenCalledWith(TodoStatus.ACTIVE);
  });

  it('should returns completed todos', () => {
    service.getCompletedTodos();
    expect(repository.findByStatus).toHaveBeenCalledWith(TodoStatus.DONE);
  });

  it('should returns deleted todos', () => {
    service.getDeletedTodos();
    expect(repository.findByStatus).toHaveBeenCalledWith(TodoStatus.DELETED);
  });

  it('should make todo done', () => {
    repository.findById.mockReturnValue(TODO_TWO);
    service.makeDone(TODO_TWO.id);
    const todo = repository.save.mock.calls[0][0];
    expect(repository.findById).toHaveBeenCalledWith(TODO_TWO.id);
    expect(todo.id).toBe(TODO_TWO.id);
    expect(todo.status).toBe(TodoStatus.DONE);
  });

  it('should make todo active', () => {
    repository.findById.mockReturnValue(TODO_DONE);
    service.makeActive(TODO_DONE.id);
    const todo = repository.save.mock.calls[0][0];
    expect(repository.findById).toHaveBeenCalledWith(TODO_DONE.id);
    expect(todo.id).toBe(TODO_DONE.id);
    expect(todo.status).toBe(TodoStatus.ACTIVE);
  });

  it('should remove todo', () => {
    repository.findById.mockReturnValue(TODO_TWO);
    service.remove(TODO_TWO.id);
    const todo = repository.save.mock.calls[0][0];
    expect(repository.findById).toHaveBeenCalledWith(TODO_TWO.id);
    expect(todo.id).toBe(TODO_TWO.id);
    expect(todo.status).toBe(TodoStatus.DELETED);
  });

  it('should update subject', () => {
    repository.findById.mockReturnValue(TODO_TWO);
    service.updateSubject(TODO_TWO.id, 'Updated subject');
    const todo = repository.save.mock.calls[0][0];
    expect(repository.findById).toHaveBeenCalledWith(TODO_TWO.id);
    expect(todo.id).toBe(TODO_TWO.id);
    expect(todo.subject).toBe('Updated subject');
  });
});
