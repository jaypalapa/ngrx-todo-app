import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../model/todo';

@Injectable()
export class TodoService {

  private url = 'api/todos';

  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieve all todos within the mocked backend
   */
  getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url);
  }

}
