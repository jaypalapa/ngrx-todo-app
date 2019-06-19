import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../model/todo';
import {select, Store} from '@ngrx/store';
import * as fromActions from '../../store/actions/todo.actions';
import * as fromReducer from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import {selectAllTodos} from '../../store/reducers';
import {Update} from '@ngrx/entity';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {AddTodo} from '../../store/actions/todo.actions';
import {MatDialog} from '@angular/material';
import {TodoDeleteComponent} from '../todo-delete/todo-delete.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  allTodos$: Observable<Todo[]>;
  newTodoForm: FormGroup;
  allLoaded = false;

  constructor(private store: Store<TodoState>,
              public fb: FormBuilder,
              public dialog: MatDialog) {
    // Select in store all the todos
    this.allTodos$ = this.store.pipe(select(selectAllTodos));

    // Set allLoaded variable to true only if all todos have been loaded.
    // This will also display a mat-spinner if all todos aren't properly and fully loaded
    this.store.pipe(
      select(fromReducer.selectLoadedTodos))
      .subscribe( (hasLoaded: boolean) => {
        if (hasLoaded) { this.allLoaded = true; }
      });

    // Reactive Forms used for addTodo purpose
    this.newTodoForm = fb.group({
      title: fb.control('', Validators.required),
      description: fb.control('')
    });
  }

  /**
   * Retrieve all todos with a 'loaded' state. If present, means that store is already initialized
   * So don't need to retrieve them all because it will cause a store reinitialization onInit of this component
   */
  ngOnInit() {
    this.store.pipe(
      select(fromReducer.selectLoadedTodos),
      take(1))
      .subscribe((hasLoaded: boolean) => {
        if (!hasLoaded) { this.store.dispatch(new fromActions.LoadAllTodos()); }
        }
      );
  }

  /**
   * Method called when a checkbox is checked. Converts the to-do object onto an Update To-Do typed one.
   * This (ngrx) Update interface allows us to update partial part of our To-do object.
   * @param todo: Todo object to toggle
   */
  onToggleTodo(todo: Todo): void {
    const todoUpdate: Update<Todo> = {
      id: todo.id,
      changes: { done: !todo.done }
    };

    this.store.dispatch(new fromActions.ToggleCompleteTodo(todoUpdate));
  }

  /**
   * Method allowing to mark all todos as done with a single click
   */
  toggleAllTodos(): void {
    let todosUpdated: Update<Todo>[];

    // Set todosUpdated by changing the done property (to true) to each todo emitted by source observable
    this.allTodos$.pipe(take(1)).subscribe(todos => {
      todosUpdated = todos.map(todo => {
        return {
          id: todo.id,
          changes: {
            done: true
          }
        };
      });
    });

    this.store.dispatch(new fromActions.ToggleCompleteAllTodos(todosUpdated));
  }

  /**
   * This method creates a Todo Object with the input values from form and dispatch the corresponding action
   * @param title: Title of the todo
   * @param description: Some details about the todo (optional)
   * @param formDirective: Use to reset properly fields after submit of a new todo
   */
  addTodo(formDirective: FormGroupDirective, title: string, description?: string): void {
  title = title.trim();
  if (description) { description = description.trim(); }

  const todo: Todo = {
    id: new Date().valueOf(),
    done: false,
    title,
    description
  };

  this.store.dispatch(new AddTodo(todo));

  // Reset fields after submitting new todo
  formDirective.resetForm();
  }

  /**
   * Remove a to-do from store for a given todo
   * @param todo: Todo object
   */
  deleteTodo(todo: Todo): void {
    this.dialog.open(TodoDeleteComponent, {
      width: '40%',
      data: { todo },
      autoFocus: false
    });
  }

  /**
   * Remove all the todos at once
   */
  deleteAllTodos(): void {
    if (confirm('This action will remove all your todos, are you sure ?')) {
      this.store.dispatch(new fromActions.DeleteAllTodo());
    }
  }

}
