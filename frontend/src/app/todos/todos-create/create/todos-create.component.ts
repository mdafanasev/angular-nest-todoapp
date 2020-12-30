import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tda-todos-create-ui',
  templateUrl: './todos-create.component.html',
  styleUrls: ['./todos-create.component.css'],
})
export class TodosCreateComponent {
  @Output('create') public create = new EventEmitter<string>();
  public subject = '';

  public get canCreate(): boolean {
    return this.subject.length > 3;
  }

  public submit() {
    if (this.canCreate) {
      this.create.emit(this.subject);
      this.reset();
    }
  }

  public reset() {
    this.subject = '';
  }
}
