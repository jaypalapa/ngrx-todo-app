import {Todo} from '../model/todo';
import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryMock implements InMemoryDbService {

  constructor() { }

  createDb() {

    const todos: Todo[] = [
      { id: 1, done: false, title: 'Learn NgRx' },
      { id: 2, done: false, title: 'Change guitar strings' },
      { id: 3, done: true, title: 'Watch last GoT episode' },
      { id: 4, done: false, title: 'Buy Avengers EndGame tickets' },
    ];

    return {todos};
  }
}
