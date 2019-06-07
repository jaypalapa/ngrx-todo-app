import { Component, OnInit } from '@angular/core';
import {TodoState} from '../../store/reducers/todo.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Todo} from '../../model/todo';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromActions from '../../store/actions/todo.actions';
import * as fromReducer from '../../store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Update} from '@ngrx/entity';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  selectedTodo$: Observable<Todo>;
  selectedTodo: Todo;
  todoForm: FormGroup;

  constructor(private store: Store<TodoState>,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    // Get the observable of To-do object with a given id
    this.selectedTodo$ = this.store.select(fromReducer.selectCurrentTodo);

    // Init input form fields
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit() {
    this.store.dispatch(new fromActions.LoadTodoById(+this.route.snapshot.paramMap.get('id')));

    this.fillFormWithData();
  }

  /**
   * Get data from observable for current to-do and fill in form fields
   */
  fillFormWithData() {
    this.selectedTodo$.subscribe((todo) => {
      this.selectedTodo = todo;
    });

    this.todoForm.patchValue({
      title: this.selectedTodo.title,
      description: this.selectedTodo.description
    });
  }

  /**
   * Update a specific To-do by giving the user the opportunity to modify title and/or description
   * @param title
   * @param description
   */
  onSubmit(): void {
    let updatedTodo: Update<Todo>;

    // Check if user has filled in the description field
    // If so, build an Update To-do typed object with changes applied on title AND description
    if (this.todoForm.controls.description.value) {
      updatedTodo = {
        id: this.selectedTodo.id,
        changes: {
          title: this.todoForm.controls.title.value,
          description: this.todoForm.controls.description.value
        }
      };
    } else {
      // If not, build the Update To-do object with the updated title
      updatedTodo = {
        id: this.selectedTodo.id,
        changes: {
          title: this.todoForm.controls.title.value,
          description: undefined
        }
      };
    }

    // Dispatch action to update the current to-do
    this.store.dispatch(new fromActions.UpdateTodo(updatedTodo));

    // Redirect to todos list
    this.router.navigate(['/todos']);

    // Open snackbar to inform that to-do has been updated
    // todo : Handle error cases when backend will be plug
    this.snackBar.open('Todo updated successfully !', '', {
      duration: 3000,
      panelClass: ['custom-snackbar-success']
    });
  }
}