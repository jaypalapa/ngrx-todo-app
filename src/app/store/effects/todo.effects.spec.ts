import {TodoEffects} from './todo.effects';
import {ReplaySubject} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as fromActions from '../actions/todo.actions';

describe('Todo Effects', () => {
  let effects: TodoEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoEffects,
        TodoService,
        provideMockActions(() => actions),
      ]
    });

    effects = TestBed.get(TodoEffects);
    actions = new ReplaySubject(1);
  });

  it('should return success action after load all todos', () => {
    const todos: Todo[] = [
      { id: 1, title: 'fakeTodoNum1', done: true },
      { id: 2, title: 'fakeTodoNum2', done: false }
    ];

    actions.next(fromActions.loadAllTodos);

    effects.loadAllTodos$.subscribe( todoList => {
      expect(todoList).toEqual(fromActions.loadAllTodosSuccess({todos}));
    });
  });

});
