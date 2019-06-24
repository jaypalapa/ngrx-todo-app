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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {reducers} from './store/reducers';
import {TodoEffects} from './store/effects/todo.effects';
import {TodoDetailComponent} from './todos/todo-detail/todo-detail.component';
import {TodosGuard} from './todos/todos.guard';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodoDeleteComponent } from './todos/todo-delete/todo-delete.component';
import {ForbiddenPageComponent} from './containers/forbidden-page';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenPageComponent,
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
    MatProgressSpinnerModule,
    MatToolbarModule,
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
