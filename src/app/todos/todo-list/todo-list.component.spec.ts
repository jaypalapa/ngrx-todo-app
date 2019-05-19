import {TodoListComponent} from './todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {MatCheckboxModule, MatDividerModule, MatListModule} from '@angular/material';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      declarations: [
        TodoListComponent,
      ],
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

  it('should display a list of todos after data is loaded', () => {
    const items: Todo[] = [{id: 1, done: false, title: 'firstTodo'}, {id: 2, done: true, title: 'SecondTodo'}];
    const action = new fromActions.LoadAllTodosSuccess(items);

    store.dispatch(action);

    component.allTodos$.subscribe(todos => {
      expect(todos.length).toBe(items.length);
    });
  });

  it('should dispatch the onToggle todo when onToggleTodo is called', () => {
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

});
