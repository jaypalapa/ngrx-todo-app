import {TodoEffects} from './todo.effects';
import {ReplaySubject} from 'rxjs';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {LoadAllTodos, LoadAllTodosSuccess} from '../actions/todo.actions';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
    const mockState: Todo[] = [
      { id: 1, title: 'fakeTodoNum1', done: true },
      { id: 2, title: 'fakeTodoNum2', done: false }
    ];

    actions.next(new LoadAllTodos());

    effects.loadAllTodos$.subscribe( todos => {
      expect(todos).toEqual(new LoadAllTodosSuccess(mockState));
    });
  });

});
