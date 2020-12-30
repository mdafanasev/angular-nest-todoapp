import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodosFilterState } from '@tda/core/todos/todos-filter-state.enum';

@Component({
  selector: 'tda-todos-filter-ui',
  templateUrl: './todos-filter.component.html',
  styleUrls: ['./todos-filter.component.css'],
})
export class TodosFilterComponent {
  @Input('value') public value?: TodosFilterState;
  @Output('apply') public apply = new EventEmitter<TodosFilterState>();

  public get isAll(): boolean {
    return this.value === TodosFilterState.ALL;
  }

  public get isOnlyDone(): boolean {
    return this.value === TodosFilterState.ONLY_DONE;
  }

  public get isOnlyActive(): boolean {
    return this.value === TodosFilterState.ONLY_ACTIVE;
  }

  public setAll(): void {
    this.apply.emit(TodosFilterState.ALL);
  }

  public setOnlyDone(): void {
    this.apply.emit(TodosFilterState.ONLY_DONE);
  }

  public setOnlyActive(): void {
    this.apply.emit(TodosFilterState.ONLY_ACTIVE);
  }
}
