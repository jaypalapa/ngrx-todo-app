import {Action} from '@ngrx/store';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

export enum TodoActionTypes {
  LoadAllTodos = '[Todo] Load All Todos',
  LoadAllTodosSuccess = '[Todo] Load All Todos Success',
  LoadAllTodosFail = '[Todo] Load All Todos Fail',
  ToggleCompleteTodo = '[Todo] Toggle Complete Todo',
}

export class LoadAllTodos implements Action {
  public readonly type = TodoActionTypes.LoadAllTodos;
}

// Action for addAll method
export class LoadAllTodosSuccess implements Action {
  public readonly type = TodoActionTypes.LoadAllTodosSuccess;

  constructor(public todos: Todo[]) {}
}

export class LoadAllTodosFail implements Action {
  public readonly type = TodoActionTypes.LoadAllTodosFail;

  constructor(public payload: any) {}
}

export class ToggleCompleteTodo implements Action {
  public readonly type = TodoActionTypes.ToggleCompleteTodo;

  constructor(public todo: Update<Todo>) {}
}

export type TodoActions = LoadAllTodos | LoadAllTodosSuccess | LoadAllTodosFail | ToggleCompleteTodo;
