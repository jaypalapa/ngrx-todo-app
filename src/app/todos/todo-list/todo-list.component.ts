import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../model/todo';
import {Store} from '@ngrx/store';
import * as fromActions from '../../store/actions/todo.actions';
import {TodoState} from '../../store/reducers/todo.reducer';
import {selectAllTodos} from '../../store/reducers';

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
}
