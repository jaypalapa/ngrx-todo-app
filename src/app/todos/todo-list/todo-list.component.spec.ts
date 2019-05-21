import {TodoListComponent} from './todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {MatCheckboxModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      declarations: [
        TodoListComponent,
        TodoDetailComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load todos when created', () => {
    const action = new fromActions.LoadAllTodos();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of todos after data is loaded - LoadAllTodosSuccess', () => {
    const items: Todo[] = [{id: 1, done: false, title: 'firstTodo'}, {id: 2, done: true, title: 'SecondTodo'}];
    const action = new fromActions.LoadAllTodosSuccess(items);

    store.dispatch(action);

    component.allTodos$.subscribe(todos => {
      expect(todos.length).toBe(items.length);
    });
  });

  it('should dispatch the onToggle todo action when onToggleTodo is called - onToggleTodo', () => {
    // Fake initialized to do with false state
    const initTodo: Todo = {id: 1, done: false, title: 'firstTodo'};
    // Update to do state with a true state and create an Update To do typed object
    const updatedTodoState: Update<Todo> = {
      id: initTodo.id,
      changes: { done: !initTodo.done }
    };
    const action = new fromActions.ToggleCompleteTodo(updatedTodoState);

    component.onToggleTodo(initTodo);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch the add todo action when addTodo is called - addTodo', () => {
    const todo: Todo = {id: 1, done: false, title: 'firstTodo'};
    const action = new fromActions.AddTodo(todo);

    store.dispatch(action);

    component.addTodo(todo.title, todo.description);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
