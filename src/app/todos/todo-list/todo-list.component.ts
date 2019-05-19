import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../model/todo';
import {Store} from '@ngrx/store';
import * as fromActions from '../../store/actions/todo.actions';
import {TodoState} from '../../store/reducers/todo.reducer';
import {selectAllTodos} from '../../store/reducers';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  allTodos$: Observable<Todo[]>;

  // Populate allTodos$ value with mocked todos from the store
  constructor(private store: Store<TodoState>) {
    this.allTodos$ = this.store.select(selectAllTodos);
  }

  // Dispatch the action in charge of loading all todos on init
  ngOnInit() {
    this.store.dispatch(new fromActions.LoadAllTodos());
  }

  /**
   * Method called when a checkbox is checked. Converts the to-do object onto an Update To-Do typed one.
   * This (ngrx) Update interface allows us to update partial part of our To-do object.
   * @param todo
   */
  onToggleTodo(todo: Todo) {
    // Create Update<To do> object with partial data modified, in our case the done property is set to its
    // opposite value
    const todoUpdate: Update<Todo> = {
      id: todo.id,
      changes: { done: !todo.done }
    };

    this.store.dispatch(new fromActions.ToggleCompleteTodo(todoUpdate));
  }

}
