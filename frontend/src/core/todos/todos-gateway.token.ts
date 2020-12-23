import { InjectionToken } from '@angular/core';
import { TodosGateway } from './todos-gateway.interface';

export const TODOS_GATEWAY = new InjectionToken<TodosGateway>('todos-gateway');
