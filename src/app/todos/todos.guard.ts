import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TodoState} from '../store/reducers/todo.reducer';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromReducer from '../store/reducers';
import * as fromActions from '../store/actions/todo.actions';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {TodoService} from '../service/todo.service';

@Injectable()
export class TodosGuard implements CanActivate {

  constructor(private store: Store<TodoState>,
              private router: Router,
              private todoService: TodoService) {}

  /**
   * Check if a To-do already exists in the store with the provided id
   * @param id
   */
  hasTodoInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromReducer.selectTodosEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * Load and Cache in store the searched-by-id to-do from API, return true or false if found
   * @param id
   */
  hasTodoInApi(id: number): Observable<boolean> {
    return this.todoService.getAllTodos().pipe(
      map(todos => new fromActions.LoadAllTodosSuccess(todos)),
      tap(action => this.store.dispatch(action)),
      map(todo => !!todo),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * This method uses the two above methods in order to first check if the to-do is contained within
   * the store, if not, the to-do will be retrieved from API
   * @param id
   */
  hasTodo(id: number): Observable<boolean> {
    return this.hasTodoInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasTodoInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let result: Observable<boolean>;

    if (route.params.id === '') {
      result = of(true);
    } else {
      result = this.hasTodo(route.params.id);
    }

    return result;
  }
}
