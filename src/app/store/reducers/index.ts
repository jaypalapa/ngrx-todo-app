import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodo from './todo.reducer';

export interface AppState {
  todos: fromTodo.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodo.reducer,
};

// Create the state of the To do feature
export const selectTodoState = createFeatureSelector<fromTodo.TodoState>('todos');

// Selectors
export const selectAllTodos = createSelector(selectTodoState, fromTodo.selectAllTodos);
export const selectTodosIds = createSelector(selectTodoState, fromTodo.selectTodoIds);
export const selectTodosEntities = createSelector(selectTodoState, fromTodo.selectTodosEntities);
export const todosCount = createSelector(selectTodoState, fromTodo.todosCount);
