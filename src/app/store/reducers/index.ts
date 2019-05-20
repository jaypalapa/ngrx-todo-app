import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodo from './todo.reducer';
import {TodoState} from './todo.reducer';

export interface AppState {
  todos: fromTodo.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodo.reducer,
};

// Create the state of the To do feature
export const selectTodoState = createFeatureSelector<fromTodo.TodoState>('todos');

// Selectors
export const selectTodosEntities = createSelector(selectTodoState, fromTodo.selectTodosEntities);
export const selectAllTodos = createSelector(selectTodoState, fromTodo.selectAllTodos);
export const selectCurrentTodoId = createSelector(selectTodoState, fromTodo.getSelectedTodoId);
export const selectCurrentTodo = createSelector(
  selectTodosEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => todoEntities[todoId]
  );
export const selectLoadedTodos = createSelector(selectTodoState, (state: TodoState) => state.loaded);
