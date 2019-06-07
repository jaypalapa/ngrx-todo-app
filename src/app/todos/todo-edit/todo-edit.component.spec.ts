import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { TodoEditComponent } from './todo-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import {AppRoutingModule} from '../../app-routing.module';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import * as fromActions from '../../store/actions/todo.actions';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;
  let store: Store<TodoState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoEditComponent,
        TodoListComponent,
        TodoDetailComponent
      ],
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatInputModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;

    // Mock a full To-do object
    const fakeTodo: Todo = {
      id: 123,
      title: 'Fake title todo',
      description: 'Fake description todo',
      done: true,
    };
    // Define a spy on subscribe method of selectedTodo$ Observable
    spyOn(component.selectedTodo$, 'subscribe').and.returnValue(of(fakeTodo));
    // Set values for selectedTodo object
    component.selectedTodo = fakeTodo;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load a todo with a given id', () => {
    const action = new fromActions.LoadTodoById(0);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    fixture.destroy();
  });

  it('should fill fields with given data - fillFormWithData()', () => {
    expect(component.selectedTodo.id).toEqual(123);
    expect(component.selectedTodo.title).toEqual('Fake title todo');

    component.fillFormWithData();
    expect(component.todoForm.value).toEqual({title: 'Fake title todo', description: 'Fake description todo'});
  });

  it('should dispatch an action to update a todo with a given id - onSubmit()', () => {
    // Fake input value for title and description
    component.todoForm.patchValue({
      title: 'New input title',
      description: 'New Input Description'
    });

    // Build fake Update<To-do> object with fake input values above
    const updatedTodo: Update<Todo> = {
      id: component.selectedTodo.id,
      changes: {
        title: component.todoForm.controls.title.value,
        description: component.todoForm.controls.description.value
      }
    };

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.UpdateTodo(updatedTodo));
  });

});
