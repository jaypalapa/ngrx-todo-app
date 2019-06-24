import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {TodoService} from '../../service/todo.service';
import * as fromActions from '../actions/todo.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Todo} from '../../model/todo';

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions,
              private todoService: TodoService) {}

  @Effect()
  loadAllTodos$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadAllTodos),
    switchMap(() =>
    this.todoService
      .getAllTodos()
      .pipe(
        map((todos: Todo[]) => fromActions.loadAllTodosSuccess({todos})),
        catchError((err) => of(fromActions.loadAllTodosFail(err)))
      )
    )
  ));

}
