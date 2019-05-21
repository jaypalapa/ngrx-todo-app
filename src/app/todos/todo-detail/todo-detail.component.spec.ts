import {TodoListComponent} from '../todo-list/todo-list.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';
import {MatCheckboxModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TodoDetailComponent} from '../todo-detail/todo-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppRoutingModule} from '../../app-routing.module';

describe('TodoDetailComponent', () => {

  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: Store<TodoState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      declarations: [
        TodoListComponent,
        TodoDetailComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load a todo with a given id', () => {
    const action = new fromActions.LoadTodoById(0);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
