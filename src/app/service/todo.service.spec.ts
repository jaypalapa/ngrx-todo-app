import {TodoService} from './todo.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Todo} from '../model/todo';

describe('Todo-List Service', () => {
  let injector: TestBed;
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    injector = getTestBed();
    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should instantiate a TodoService object', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable array of Todo', () => {
    const fakeTodos: Todo[] = [
      { id: 1, title: 'fakeTodoNum1', done: true },
      { id: 2, title: 'fakeTodoNum2', done: false }
    ];

    service.getAllTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(fakeTodos);
    });

    // Mock request
    // Ensure that single request is made with the given URL
    const req = httpMock.expectOne('api/todos');
    // Check that request method is GET
    expect(req.request.method).toBe('GET');
    // Provide fake values as responses
    req.flush(fakeTodos);
  });

});
