import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodosInteractor } from '../../core/todos/todos.interactor';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosInteractor: TodosInteractor) {}

  @Get('')
  public getAll(
    @Query('active') onlyActive: boolean,
    @Query('done') onlyDone: boolean
  ): TodoDto[] {
    if (onlyActive && !onlyDone) {
      return this.todosInteractor
        .getActiveTodos()
        .map((item) => TodoDto.fromEntity(item));
    }
    if (onlyDone && !onlyActive) {
      return this.todosInteractor
        .getCompletedTodos()
        .map((item) => TodoDto.fromEntity(item));
    }
    return this.todosInteractor
      .getAll()
      .map((item) => TodoDto.fromEntity(item));
  }

  @Get(':id')
  public getById(@Param('id', ParseIntPipe) id: number): TodoDto {
    const todo = this.todosInteractor.getById(id);
    if (!todo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Todo with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return TodoDto.fromEntity(todo);
  }

  @Post(':id/make-active')
  public makeActive(@Param('id', ParseIntPipe) id: number): TodoDto {
    const todo = this.todosInteractor.makeActive(id);
    if (!todo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Todo with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return TodoDto.fromEntity(todo);
  }

  @Post(':id/make-done')
  public makeDone(@Param('id', ParseIntPipe) id: number): TodoDto {
    const todo = this.todosInteractor.makeDone(id);
    if (!todo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Todo with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND
      );
    }
    return TodoDto.fromEntity(todo);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): void {
    this.todosInteractor.remove(id);
  }

  @Post()
  public create(@Body('todo') todo: CreateTodoDto): TodoDto {
    return TodoDto.fromEntity(this.todosInteractor.createNew(todo.subject));
  }
}
