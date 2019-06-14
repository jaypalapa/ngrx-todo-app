import {Todo} from '../model/todo';
import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryMock implements InMemoryDbService {

  constructor() { }

  createDb() {

    const todos: Todo[] = [
      { id: 1, done: false, title: 'Learn NgRx', description: 'Learn store, effects & entities' },
      { id: 2, done: false, title: 'Change guitar strings' },
      { id: 3, done: true, title: 'Watch last GoT episode', description: 'Avoid spoilers !' },
      { id: 4, done: false, title: 'Buy Avengers EndGame tickets before it\'s too late\n'},
    ];

    return {todos};
  }
}
