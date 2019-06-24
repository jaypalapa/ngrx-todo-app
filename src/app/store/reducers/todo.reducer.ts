import * as fromActions from '../actions/todo.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Todo} from '../../model/todo';
import {Action, createReducer, on} from '@ngrx/store';

// Create the state for To do Entity
export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  selectedTodoId: string | number | null;
}

// Sort todos by state (done/undone), if state is equal, then it will sort by id
export function sortToggledTodos(a: Todo, b: Todo): number {
  return Number(a.done) - Number(b.done) || b.id - a.id;
}

// Adapter of the above Entity state
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: sortToggledTodos
});

// Define the initial state of TodoEntityState
export const initialState: TodoState = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedTodoId: null
});

export const featureReducer = createReducer(
  initialState,
  on(fromActions.loadAllTodos, state => ({ ...state, loading: true })),
  on(fromActions.loadAllTodosSuccess, (state, { todos }) => {
    return adapter.addAll(todos, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),
  on(fromActions.loadAllTodosFail, state => ({ ...state, loading: false, loaded: false })),
  on(fromActions.toggleCompleteTodo, (state, { todoToToggle }) => {
    return adapter.updateOne(todoToToggle, state);
  }),
  on(fromActions.toggleCompleteAllTodos, (state, { todosToToggle }) => {
    return adapter.updateMany(todosToToggle, state);
  }),
  on(fromActions.loadTodoById, (state, { todoId }) => ({ ...state, selectedTodoId: todoId })),
  on(fromActions.addTodo, (state, { todoToAdd }) => {
    return adapter.addOne(todoToAdd, state);
  }),
  on(fromActions.updateTodo, (state, { todoToUpdate }) => {
    return adapter.updateOne(todoToUpdate, state);
  }),
  on(fromActions.deleteTodo, (state, { todoToDelete }) => {
    return adapter.removeOne(todoToDelete.id, state);
  }),
  on(fromActions.deleteAllTodos, (state) => {
    return adapter.removeAll({...state, selectedTodoId: null});
  }),
);

export function reducer(state: TodoState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getSelectedTodoId = (state: TodoState) => state.selectedTodoId;

// get the selectors
export const {
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos
} = adapter.getSelectors();

