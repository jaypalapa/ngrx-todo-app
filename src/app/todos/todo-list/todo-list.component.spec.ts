import {TodoListComponent} from './todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {MatDividerModule, MatListModule} from '@angular/material';
import {Todo} from '../../model/todo';

describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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

});
