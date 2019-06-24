import {createAction, props} from '@ngrx/store';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

export const loadAllTodos = createAction('[Todos API] Load All Todos');
export const loadAllTodosSuccess = createAction('[Todos API] Load All Todos Success', props<{ todos: Todo[] }>());
export const loadAllTodosFail = createAction('[Todos API] Load All Todos Fail', props<{ todos: Todo[] }>());
export const toggleCompleteTodo = createAction('[Todo] Toggle Complete Todo', props<{ todoToToggle: Update<Todo> }>());
export const toggleCompleteAllTodos = createAction('[Todo] Toggle Complete All Todos', props<{ todosToToggle: Update<Todo>[] }>());
export const loadTodoById = createAction('[Todo] Load Todo By Id', props<{ todoId: number }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ todoToAdd: Todo }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ todoToUpdate: Update<Todo> }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ todoToDelete: Todo }>());
export const deleteAllTodos = createAction('[Todo] Delete All Todos');
