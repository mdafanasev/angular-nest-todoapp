import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosCoreModule } from '../src/core/todos/todos-core.module';
import { TodosWebModule } from '../src/web/todos/todos-web.module';
import { TodosDbModule } from '../src/db/todos/todos-db.module';
import { TodosRepository } from '../src/core/todos/todos.repository.interface';
import { TODOS_REPOSITORY } from '../src/core/todos/todos.tokens';
import {
  TODO_FIVE,
  TODO_FOUR,
  TODO_ONE,
  TODO_THREE,
  TODO_TWO,
} from './todos.fixture';
import * as supertest from 'supertest';
import { SuperTest, Test as _Test } from 'supertest';
import { TodoStatus } from '../src/core/todos/todo-status.enum';

describe('Todos API', () => {
  let app: INestApplication;
  let module: TestingModule;
  let todosRepo: TodosRepository;
  let api: SuperTest<_Test>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TodosCoreModule, TodosWebModule, TodosDbModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    api = supertest(app.getHttpServer());
  });

  beforeEach(() => {
    todosRepo = module.get<TodosRepository>(TODOS_REPOSITORY);
    todosRepo.initWithData([
      TODO_ONE,
      TODO_TWO,
      TODO_THREE,
      TODO_FOUR,
      TODO_FIVE,
    ]);
  });

  it('should return all not deleted todos', () => {
    return api
      .get('/todos')
      .expect(200)
      .expect([
        {
          id: TODO_ONE.id,
          subject: TODO_ONE.subject,
          status: TODO_ONE.status,
        },
        {
          id: TODO_TWO.id,
          subject: TODO_TWO.subject,
          status: TODO_TWO.status,
        },
        {
          id: TODO_THREE.id,
          subject: TODO_THREE.subject,
          status: TODO_THREE.status,
        },
        {
          id: TODO_FOUR.id,
          subject: TODO_FOUR.subject,
          status: TODO_FOUR.status,
        },
      ]);
  });

  it('should filter active todos', () => {
    return api
      .get('/todos?active=true')
      .expect(200)
      .expect([
        {
          id: TODO_ONE.id,
          subject: TODO_ONE.subject,
          status: TODO_ONE.status,
        },
        {
          id: TODO_TWO.id,
          subject: TODO_TWO.subject,
          status: TODO_TWO.status,
        },
      ]);
  });

  it('should filter done todos', () => {
    return api
      .get('/todos?done=true')
      .expect(200)
      .expect([
        {
          id: TODO_THREE.id,
          subject: TODO_THREE.subject,
          status: TODO_THREE.status,
        },
        {
          id: TODO_FOUR.id,
          subject: TODO_FOUR.subject,
          status: TODO_FOUR.status,
        },
      ]);
  });

  it('should return todo by id', () => {
    return api.get('/todos/3').expect(200).expect({
      id: TODO_THREE.id,
      subject: TODO_THREE.subject,
      status: TODO_THREE.status,
    });
  });

  it('should not return removed todo by id', () => {
    return api.get('/todos/5').expect(404);
  });

  it('should make todo active', async () => {
    await api.post('/todos/3/make-active');
    return api.get('/todos/3').expect(200).expect({
      id: TODO_THREE.id,
      subject: TODO_THREE.subject,
      status: TodoStatus.ACTIVE,
    });
  });

  it('should make todo done', async () => {
    await api.post('/todos/1/make-done');
    return api.get('/todos/1').expect(200).expect({
      id: TODO_ONE.id,
      subject: TODO_ONE.subject,
      status: TodoStatus.DONE,
    });
  });

  it('should delete todo', async () => {
    await api.delete('/todos/2');
    return api.get('/todos/2').expect(404);
  });

  it('should create new todo', async () => {
    await api
      .post('/todos')
      .send({ todo: { subject: 'Hello' } })
      .expect(201);
    return api.get('/todos/6').expect(200).expect({
      id: 6,
      subject: 'Hello',
      status: TodoStatus.ACTIVE,
    });
  });
});
