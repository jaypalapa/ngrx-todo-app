import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TodoListComponent} from './todos/todo-list/todo-list.component';
import {TodoService} from './service/todo.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryMock} from './mock/in-memory-mock';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatSnackBarModule
} from '@angular/material';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {reducers} from './store/reducers';
import {TodoEffects} from './store/effects/todo.effects';
import {TodoDetailComponent} from './todos/todo-detail/todo-detail.component';
import {TodosGuard} from './todos/todos.guard';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodoDeleteComponent } from './todos/todo-delete/todo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoEditComponent,
    TodoDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryMock),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    TodoService,
    TodosGuard
  ],
  entryComponents: [TodoDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
