import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TODOS_DATA_CONFIG } from './todos-data-config.token';
import { TODOS_GATEWAY } from '../../core/todos/todos-gateway.token';
import { HttpTodosGateway } from './todos.gateway';

export type TodosDataConfig = {
  apiPrefix: string;
};

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [{ provide: TODOS_GATEWAY, useClass: HttpTodosGateway }],
})
export class TodosDataModule {
  public static forRoot(config: TodosDataConfig) {
    return {
      ngModule: TodosDataModule,
      providers: [{ provide: TODOS_DATA_CONFIG, useValue: config }],
    };
  }
}
