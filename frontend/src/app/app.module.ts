import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TodosDataModule } from '@tda/data/todos/todos-data.module';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./todos/todos-ui.module').then((m) => m.TodosUiModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TodosDataModule.forRoot({ apiPrefix: '/api/todos' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
