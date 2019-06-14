import * as fromReducer from '../reducers/todo.reducer';
import * as fromActions from '../actions/todo.actions';
import {Action} from '@ngrx/store';
import {reducers} from './index';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

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
      expect(state.entities).toEqual({});
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

  describe('TodoReducer - ToggleCompleteTodo Action', () => {
    it('should update entities properties by calling updateOne() adapter method', () => {
      const fakeTodo: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const { initialState } = fromReducer;
      // First add a fake todo to test its update after
      // Invoke reducer by providing the initial state and a new AddTodo action
      const previousState = reducers.todos(initialState, new fromActions.AddTodo(fakeTodo));

      // Create the updated Todo object with done property changed
      const fakeUpdateTodo: Update<Todo> = {id: 1, changes: {done: !fakeTodo.done}};
      // Invoke reducer again by providing retrieved state from AddTodo action above
      const state = reducers.todos(previousState, new fromActions.ToggleCompleteTodo(fakeUpdateTodo));

      // Assert that ToggleCompleteTodo action match the updated 'done' property
      expect(state).toEqual({
        ...previousState,
        entities: {
          [fakeUpdateTodo.id]: {
            id: 1,
            done: false,
            title: 'fake Todo 1',
            description: 'fake description 1'
          }
        },
        ids: [fakeUpdateTodo.id]
      });
    });
  });

  describe('TodoReducer - ToggleCompleteAllTodos Action', () => {
    it('should update all entities properties by calling updateMany() adapter method', () => {
      const { initialState } = fromReducer;
      const initTodoList: Todo[] = [
        {id: 1, done: false, title: 'fake Todo 1', description: 'fake description 1'},
        {id: 2, done: false, title: 'fake Todo 1', description: 'fake description 1'},
        ];

      // Create the updated TodoList object with done property changed
      const fakeUpdateTodoList: Update<Todo>[] = [
        {id: 1, changes: {done: true}},
        {id: 2, changes: {done: true}},
        ];

      // Mock the list after update to assert that done property has changed
      const updatedTodoList: Todo[] = [
        {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'},
        {id: 2, done: true, title: 'fake Todo 1', description: 'fake description 1'},
      ];

      // Map manually each todos to entities object
      const entitiesUpdated = {
        1: updatedTodoList[0],
        2: updatedTodoList[1],
      };

      // Invoke reducer to load the mocked todoList above
      const previousState = reducers.todos(initialState, new fromActions.LoadAllTodosSuccess(initTodoList));
      // Invoke reducer again by providing retrieved state from LoadAllTodos action above
      const state = reducers.todos(previousState, new fromActions.ToggleCompleteAllTodos(fakeUpdateTodoList));

      // Assert that after invoking reducer, entities and ids will match the newly updated todos
      expect(state.entities).toEqual(entitiesUpdated);
      expect(state.ids).toEqual([entitiesUpdated['2'].id, entitiesUpdated['1'].id]);
      });
    });

  describe('TodoReducer - LoadTodoById Action', () => {
    it('should change the selectedTodoId property for a given todo id', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.LoadTodoById(1);
      const state = reducers.todos(initialState, action);

      expect(state.selectedTodoId).toEqual(1);
    });
  });

  describe('TodoReducer - AddTodo Action', () => {
    it('should get additional entities and ids properties created by addOne() adapter method', () => {
      const fakeTodo: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const { initialState } = fromReducer;
      const action = new fromActions.AddTodo(fakeTodo);
      const state = reducers.todos(initialState, action);
      expect(state).toEqual({
        ...initialState,
        entities: {
          [fakeTodo.id]: fakeTodo
        },
        ids: [fakeTodo.id]
      });
    });
  });

  describe('TodoReducer - UpdateTodo Action', () => {
    it('should update entities properties by calling updateOne() adapter method', () => {
      const fakeTodo: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const { initialState } = fromReducer;
      // Invoke reducer by providing the initial state and a new AddTodo action
      const previousState = reducers.todos(initialState, new fromActions.AddTodo(fakeTodo));

      const fakeUpdateTodo: Update<Todo> = {id: 1, changes: {title: 'Update Todo 1', description: 'Update description 1'}};

      // Invoke reducer again by providing retrieved state from AddTodo action above
      const state = reducers.todos(previousState, new fromActions.UpdateTodo(fakeUpdateTodo));

      // Assert that UpdateTodo action match the updated To-do
      expect(state).toEqual({
        ...previousState,
        entities: {
          [fakeUpdateTodo.id]: {
            id: 1,
            done: true,
            title: fakeUpdateTodo.changes.title,
            description: fakeUpdateTodo.changes.description
          }
        },
        ids: [fakeUpdateTodo.id]
      });
    });
  });

  describe('TodoReducer - DeleteTodo Action', () => {
    it('should delete entities and ids properties by calling removeOne() adapter method', () => {
      const fakeTodo: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const {initialState} = fromReducer;
      const state = reducers.todos(initialState, new fromActions.DeleteTodo(fakeTodo));
      expect(state).toEqual({
        ...initialState,
        entities: {},
        ids: []
      });
    });
  });

  describe('TodoReducer - DeleteAllTodos Action', () => {
    it('should delete all entities and ids by calling removeAll() adapter method', () => {
      const fakeTodoList: Todo[] = [
        {id: 1, done: true, title: 'Fake One', description: 'description One'},
        {id: 2, done: true, title: 'Fake Two', description: 'description Two'},
      ];
      const { initialState } = fromReducer;

      // Invoke reducer to load in collection the mocked list above
      const previousState = reducers.todos(initialState, new fromActions.LoadAllTodosSuccess(fakeTodoList));

      // Invoke reducer with previous state and DeleteAllTodo action
      const state = reducers.todos(previousState, new fromActions.DeleteAllTodo());

      // Assert that after invoking reducer with deleteAllTodos action, the entity collection has been cleared
      expect(state.entities).toEqual({});
      expect(state.ids).toEqual([]);
    });
  });

});
