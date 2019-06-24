import {TodoListComponent} from './todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';
import {FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule, By} from '@angular/platform-browser';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {TodoDeleteComponent} from '../todo-delete/todo-delete.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForbiddenPageComponent} from '../../containers/forbidden-page';

describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<TodoState>;
  let debugEl: DebugElement;
  let htmlEl: HTMLElement;
  let addBtn: DebugElement;

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
        ForbiddenPageComponent,
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
    debugEl = fixture.debugElement.query(By.css('form'));
    htmlEl = debugEl.nativeElement;
    addBtn = fixture.debugElement.query(By.css('input[type=submit]'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load todos when created', () => {
    expect(store.dispatch).toHaveBeenCalledWith(fromActions.loadAllTodos());
  });

  it('should display a list of todos after data is loaded - LoadAllTodosSuccess', () => {
    const todos: Todo[] = [{id: 1, done: false, title: 'firstTodo'}, {id: 2, done: true, title: 'SecondTodo'}];

    store.dispatch(fromActions.loadAllTodosSuccess({todos}));

    component.allTodos$.subscribe(todoList => {
      expect(todoList.length).toBe(todos.length);
    });
  });

  it('should dispatch the onToggle todo action when onToggleTodo is called - onToggleTodo', () => {
    // Fake initialized to do with false state
    const initTodo: Todo = {id: 1, done: false, title: 'firstTodo'};
    // Update to do state with a true state and create an Update To do typed object
    const todoToToggle: Update<Todo> = {
      id: initTodo.id,
      changes: { done: !initTodo.done }
    };

    component.onToggleTodo(initTodo);

    expect(store.dispatch).toHaveBeenCalledWith(fromActions.toggleCompleteTodo({todoToToggle}));
  });

  it('should dispatch the add todo action when addTodo is called - addTodo', () => {
    const todoToAdd: Todo = {id: 1, done: false, title: 'firstTodo', description: 'firstDescription'};
    // Mock the formGroup in order to set the form property with the FormGroupDirective
    const formGroup: FormGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = formGroup;

    component.addTodo(todoToAdd.title, todoToAdd.description, formGroupDirective);

    store.dispatch(fromActions.addTodo({todoToAdd}));
    expect(store.dispatch).toHaveBeenCalledWith(fromActions.addTodo({todoToAdd}));
  });

  it('should dispatch the toggleAllTodos action when clicked - toggleAllTodos', () => {
    const todosToToggle: Update<Todo>[] = [
      {id: 1, changes: {done: true}},
      {id: 2, changes: {done: true}}
    ];

    component.toggleAllTodos();
    store.dispatch(fromActions.toggleCompleteAllTodos({todosToToggle}));

    expect(store.dispatch).toHaveBeenCalledWith(fromActions.toggleCompleteAllTodos({todosToToggle}));
  });

  it('should dispatch the deleteAllTodos action when clicked', () => {
    component.deleteAllTodos();
    store.dispatch(fromActions.deleteAllTodos());

    expect(store.dispatch).toHaveBeenCalledWith(fromActions.deleteAllTodos());
  });

  describe('Form HTML Tests', () => {
    it('should call the addTodo method on click', () => {
      spyOn(component, 'addTodo');
      htmlEl = fixture.debugElement.query(By.css('button')).nativeElement;
      htmlEl.click();

      expect(component.addTodo).toHaveBeenCalledTimes(0);
    });

    it('should check initial input and form to be invalid', () => {
      expect(component.newTodoForm.controls.title.value).toBe('');
      expect(component.newTodoForm.controls.description.value).toBe('');
      expect(component.newTodoForm.valid).toBeFalsy();
    });

    it('should be a valid form', () => {
      component.newTodoForm.controls.title.setValue('Fake Title');
      expect(component.newTodoForm.valid).toBeTruthy();
    });

    it('should check that add button is disabled initially', ()  => {
      fixture.whenStable().then(() => {
        expect(addBtn.nativeElement.disabled).toBe(true);
      }).catch(() => 'error');
    });

  });

});
