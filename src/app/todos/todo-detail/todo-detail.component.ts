import {Component, OnInit} from '@angular/core';
import {TodoState} from '../../store/reducers/todo.reducer';
import {Store} from '@ngrx/store';
import {Todo} from '../../model/todo';
import * as fromReducer from '../../store/reducers';
import * as fromActions from '../../store/actions/todo.actions';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: 'todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})

export class TodoDetailComponent implements OnInit {

  selectedTodo$: Observable<Todo>;

  constructor(private store: Store<TodoState>, private route: ActivatedRoute) {
    this.selectedTodo$ = this.store.select(fromReducer.selectCurrentTodo);
  }

  ngOnInit() {
    this.store.dispatch(new fromActions.LoadTodoById(+this.route.snapshot.paramMap.get('id')));
  }
}
