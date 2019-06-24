import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {Store} from '@ngrx/store';
import {Todo} from '../../model/todo';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
})
export class TodoDeleteComponent  {

  constructor(private store: Store<TodoState>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  /**
   * Delete the todo by calling its corresponding action with given todo object in dialog
   */
  delete(): void {
    const todoToDelete: Todo = this.data.todo;
    this.store.dispatch(fromActions.deleteTodo({todoToDelete}));
  }

}
