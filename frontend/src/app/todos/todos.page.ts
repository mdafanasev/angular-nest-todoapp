import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tda-todos-page',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TodosPage {}
