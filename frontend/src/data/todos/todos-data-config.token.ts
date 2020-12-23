import { InjectionToken } from '@angular/core';
import { TodosDataConfig } from './todos-data.module';

export const TODOS_DATA_CONFIG = new InjectionToken<TodosDataConfig>(
  'todos-data-config'
);
