import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todos/todo-list/todo-list.component';
import {TodoDetailComponent} from './todos/todo-detail/todo-detail.component';
import {TodosGuard} from './todos/todos.guard';
import {TodoEditComponent} from './todos/todo-edit/todo-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'todoDetail/:id',
    component: TodoDetailComponent,
    canActivate: [TodosGuard]
  },
  {
    path: 'todoEdit/:id',
    component: TodoEditComponent,
    canActivate: [TodosGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
