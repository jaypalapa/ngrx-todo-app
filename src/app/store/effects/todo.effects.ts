import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {TodoService} from '../../service/todo.service';
import * as fromActions from '../actions/todo.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Todo} from '../../model/todo';

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions,
              private todoService: TodoService) {}

  @Effect()
  loadAllTodos$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.TodoActionTypes.LoadAllTodos),
    switchMap(() => this.todoService.getAllTodos().pipe(
      map((todos: Todo[]) => new fromActions.LoadAllTodosSuccess(todos)),
      catchError((err) => of(new fromActions.LoadAllTodosFail(err)))
      )
    )
  );

}
