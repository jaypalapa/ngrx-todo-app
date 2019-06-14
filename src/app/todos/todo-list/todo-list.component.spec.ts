import {TodoListComponent} from './todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TodoDeleteComponent} from '../todo-delete/todo-delete.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatCheckboxModule,
        MatDialogModule,
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
        TodoDetailComponent,
        TodoDeleteComponent
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
    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.LoadAllTodos());
  });

  it('should display a list of todos after data is loaded - LoadAllTodosSuccess', () => {
    const items: Todo[] = [{id: 1, done: false, title: 'firstTodo'}, {id: 2, done: true, title: 'SecondTodo'}];

    store.dispatch(new fromActions.LoadAllTodosSuccess(items));

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

    component.onToggleTodo(initTodo);

    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.ToggleCompleteTodo(updatedTodoState));
  });

  it('should dispatch the add todo action when addTodo is called - addTodo', () => {
    const todo: Todo = {id: 1, done: false, title: 'firstTodo', description: 'firstDescription'};

    component.addTodo(todo.title, todo.description);

    store.dispatch(new fromActions.AddTodo(todo));
    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.AddTodo(todo));
  });

  it('should dispatch the toggleAllTodos action when clicked - toggleAllTodos', () => {
    const updatedTodoList: Update<Todo>[] = [
      {id: 1, changes: {done: true}},
      {id: 2, changes: {done: true}}
    ];

    component.toggleAllTodos();
    store.dispatch(new fromActions.ToggleCompleteAllTodos(updatedTodoList));

    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.ToggleCompleteAllTodos(updatedTodoList));
  });

  it('should dispatch the deleteAllTodos action when clicked', () => {
    component.deleteAllTodos();
    store.dispatch(new fromActions.DeleteAllTodo());

    expect(store.dispatch).toHaveBeenCalledWith(new fromActions.DeleteAllTodo());
  });

});
