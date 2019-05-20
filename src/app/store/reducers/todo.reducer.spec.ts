import * as fromReducer from '../reducers/todo.reducer';
import * as fromActions from '../actions/todo.actions';
import {Action} from '@ngrx/store';
import {reducers} from './index';
import {Todo} from '../../model/todo';

describe('Reducer Full Tests', () => {

  describe('TodoReducer', () => {
    describe('undefined action', () => {
      it('should return the default state', () => {
        // Fake the dispatch of an action by setting undefined state and blank action
        const { initialState } = fromReducer;
        const action = {};
        const state = reducers.todos(undefined, action as Action);

        expect(state).toBe(initialState);
      });
    });
  });

  describe('TodoReducer - LoadAllTodos Action', () => {
    it('should change the loading properties', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadAllTodos();
      const state = reducers.todos(initialState, action);

      // Ensure reducer is changing loading property to true
      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.selectedTodoId).toEqual(null);
    });
  });

  describe('TodoReducer - LoadAllTodosSuccess Action', () => {
    it('should fill in entities from mocked TodoList', () => {
      // Mock a todolist
      const todos: Todo[] = [
        {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'},
        {id: 2, done: false, title: 'fake Todo 2', description: 'fake description 2'},
      ];
      // Map manually each todos to entities object
      const entities = {
        1: todos[0],
        2: todos[1]
      };
      const { initialState } = fromReducer;
      const action = new fromActions.LoadAllTodosSuccess(todos);
      const state = reducers.todos(initialState, action);

      // Ensure reducer change loaded & loading properties
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('TodoReducer - LoadAllTodosFail Action', () => {
    it('should return the previous state', () => {
      const { initialState } = fromReducer;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadAllTodosFail({});
      const state = reducers.todos(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('TodoReducer - LoadTodoById Action', () => {
    it('should change the bode property for a given todo id', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadTodoById(1);
      const state = reducers.todos(initialState, action);

      // Ensure reducer change loaded & loading properties
      expect(state.selectedTodoId).toEqual(1);
    });
  });

});
