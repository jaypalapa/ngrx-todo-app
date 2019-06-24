import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDeleteComponent } from './todo-delete.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {Store, StoreModule} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {Todo} from '../../model/todo';
import {TodoState} from '../../store/reducers/todo.reducer';
import * as fromActions from '../../store/actions/todo.actions';

describe('TodoDeleteComponent', () => {
  let component: TodoDeleteComponent;
  let fixture: ComponentFixture<TodoDeleteComponent>;
  let store: Store<TodoState>;

  const todoToDelete: Todo = {
    id: 123,
    title: 'title 1',
    description: 'description 1',
    done: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ],
      declarations: [ TodoDeleteComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoDeleteComponent);
    component = fixture.componentInstance;
    component.data.todo = todoToDelete;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the Delete Todo action', () => {
    component.delete();
    expect(store.dispatch).toHaveBeenCalledWith(fromActions.deleteTodo({todoToDelete}));
  });
});
