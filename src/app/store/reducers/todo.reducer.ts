import * as fromActions from '../actions/todo.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Todo} from '../../model/todo';

// Create the state for To do Entity
export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  selectedTodoId: string | number | null;
}

// Adapter of the above Entity state
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: false
});

// Define the initial state of TodoEntityState
export const initialState: TodoState = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedTodoId: null
});

// REDUCER
export function reducer(state = initialState, action: fromActions.TodoActions) {
  switch (action.type) {

    case fromActions.TodoActionTypes.LoadAllTodos: {
      return adapter.getInitialState({
        ...state,
        loading: true
      });
    }

    case fromActions.TodoActionTypes.LoadAllTodosSuccess: {
      return adapter.addAll(action.todos, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    default: {
      return state;
    }
  }
}

// get the selectors
export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: todosCount
} = adapter.getSelectors();

