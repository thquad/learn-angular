import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { TodoItem } from "../../../shared/model/todo.model";
import { ActionState, ActionStateCreator } from "../../../shared/util/action-state";
import { TodoEntityActions } from "./todo-entity.actions";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";


export interface TodoEntityState extends EntityState<TodoItem> {
  todoListActionState: ActionState;
}

export const todoEntityAdapter = createEntityAdapter<TodoItem>();
export const initialState: TodoEntityState = todoEntityAdapter.getInitialState({
  ids: [],
  entities: {},
  todoListActionState: ActionStateCreator.create()
});

// createFeature() since NgRx v12.1
export const todoEntityFeature = createFeature({
  name: 'todo entity',
  reducer: createReducer(
    initialState,

    // ===== POST =====

    on(TodoEntityActions.postTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoEntityActions.postTodoSuccess, (state, action) =>
      todoEntityAdapter.addOne(
        action.data,
        { ...state, todoListActionState: ActionStateCreator.onSuccess() }
      )
    ),
    on(TodoEntityActions.postTodoError, (state, action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),

    // ===== PUT =====

    on(TodoEntityActions.putTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoEntityActions.putTodoSuccess, (state, action) =>
      todoEntityAdapter.updateOne(
        action.data,
        { ...state, todoListActionState: ActionStateCreator.onSuccess() }
      )
    ),
    on(TodoEntityActions.putTodoError, (state, action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),

    // ===== DELETE =====

    on(TodoEntityActions.deleteTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoEntityActions.deleteTodoSuccess, (state, action) =>
      todoEntityAdapter.removeOne(
        action.data.id,
        { ...state, todoListActionState: ActionStateCreator.onSuccess() }
      )
    ),
    on(TodoEntityActions.deleteTodoError, (state, action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),

    // ===== OTHER =====

    on(TodoEntityActions.resetList, (state) =>
      todoEntityAdapter.removeAll(state)
    ),

  ),

  // ===== EXTRA SELECTORS =====

  extraSelectors: ({ selectEntities }) => {
    const selectAllAsSortedArray = createSelector(
      selectEntities,
      (entity) => (Object.values(entity) as TodoItem[])
        .sort((a, b) => -a.id.localeCompare(b.id))
    );

    return { selectAllAsSortedArray };
  }
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = todoEntityAdapter.getSelectors();

export const {
  name,
  reducer,
  selectTodoListActionState,
  selectAllAsSortedArray
} = todoEntityFeature;
