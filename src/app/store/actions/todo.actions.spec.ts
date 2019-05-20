import * as fromActions from '../actions/todo.actions';
import {LoadAllTodos, LoadAllTodosFail, LoadAllTodosSuccess, LoadTodoById, ToggleCompleteTodo} from '../actions/todo.actions';
import {Todo} from '../../model/todo';
import {Update} from '@ngrx/entity';

describe('Actions Full Tests', () => {

  describe('LoadAllTodos', () => {
    it('should create an action', () => {
      const action = new fromActions.LoadAllTodos();

      expect(action.type).toEqual(fromActions.TodoActionTypes.LoadAllTodos);
    });
  });

  describe('LoadAllTodosSuccess', () => {
    it('should create an action', () => {
      const todos: Todo[] = [
        {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'},
        {id: 2, done: false, title: 'fake Todo 2', description: 'fake description 2'},
      ];
      const action = new LoadAllTodosSuccess(todos);

      expect({...action}).toEqual({
        type: fromActions.TodoActionTypes.LoadAllTodosSuccess,
        todos,
      });
    });
  });

  describe('LoadAllTodosFail', () => {
    it('should create an action', () => {
      const payload: Todo[] = [
        {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'},
        {id: 2, done: false, title: 'fake Todo 2', description: 'fake description 2'},
      ];
      const action = new LoadAllTodosFail(payload);

      expect({...action}).toEqual({
        type: fromActions.TodoActionTypes.LoadAllTodosFail,
        payload,
      });
    });
  });

  describe('ToggleCompleteTodo', () => {
    it('should create an action', () => {
      const fakeTodo: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const updatedTodo: Update<Todo> = { id: 1, changes: { done : !fakeTodo.done }};
      const action = new ToggleCompleteTodo(updatedTodo);

      expect({...action}).toEqual({
        type: fromActions.TodoActionTypes.ToggleCompleteTodo,
        todo: updatedTodo,
      });
    });
  });

  describe('LoadTodoById', () => {
    it('should create an action', () => {
      const payload: Todo = {id: 1, done: true, title: 'fake Todo 1', description: 'fake description 1'};
      const action = new LoadTodoById(1);

      expect({...action}).toEqual({
        type: fromActions.TodoActionTypes.LoadTodoById,
        todoId: payload.id,
      });
    });

  });

});
