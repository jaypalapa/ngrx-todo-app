import {Action} from '@ngrx/store';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

export enum TodoActionTypes {
  LoadAllTodos = '[Todo] Load All Todos',
  LoadAllTodosSuccess = '[Todo] Load All Todos Success',
  LoadAllTodosFail = '[Todo] Load All Todos Fail',
  ToggleCompleteTodo = '[Todo] Toggle Complete Todo',
  ToggleCompleteAllTodos = '[Todo] Toggle Complete All Todos',
  LoadTodoById = '[Todo] Load Todo By Id',
  AddTodo = '[Todo] Add Todo',
  UpdateTodo = '[Todo] Update Todo',
  DeleteTodo = '[Todo] Delete Todo',
  DeleteAllTodo = '[Todo] Delete All Todo'
}

export class LoadAllTodos implements Action {
  public readonly type = TodoActionTypes.LoadAllTodos;
}

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

export class ToggleCompleteAllTodos implements Action {
  public readonly type = TodoActionTypes.ToggleCompleteAllTodos;
  constructor(public todoList: Update<Todo>[]) {}
}

export class LoadTodoById implements Action {
  public readonly type = TodoActionTypes.LoadTodoById;
  constructor(public todoId: number) {}
}

export class AddTodo implements Action {
  public readonly type = TodoActionTypes.AddTodo;
  constructor(public todo: Todo) {}
}

export class UpdateTodo implements Action {
  public readonly type = TodoActionTypes.UpdateTodo;
  constructor(public todo: Update<Todo>) {}
}

export class DeleteTodo implements Action {
  public readonly type = TodoActionTypes.DeleteTodo;
  constructor(public todo: Todo) {}
}

export class DeleteAllTodo implements Action {
  public readonly type = TodoActionTypes.DeleteAllTodo;
}

export type TodoActions = LoadAllTodos | LoadAllTodosSuccess | LoadAllTodosFail
                          | ToggleCompleteTodo | ToggleCompleteAllTodos | LoadTodoById | AddTodo | UpdateTodo
                          | DeleteTodo | DeleteAllTodo;
