import { createFeature, createReducer, createSelector, on } from "@ngrx/store"
import { TodoActions } from "./todo.actions"
import { ActionState, ActionStateCreator } from "@shared/util/action-state"
import { TodoItem } from "@shared/model/todo.model"
import { createTodoPrefillItems } from "@shared/util/store-util"

export interface TodoState {
  todoList: TodoItem[];
  todoListActionState: ActionState;
};

export const initialState: TodoState = {
  todoList: createTodoPrefillItems(),
  todoListActionState: ActionStateCreator.create()
};

// createFeature() since NgRx v12.1
export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,

    // ===== POST =====

    on(TodoActions.postTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.postTodoSuccess, (state, { todoItem }) => ({
      ...state,
      todoList: [...state.todoList.map(item => Object.assign({}, item)), todoItem],
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.postTodoError, (state, { error }) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(error)
    })),

    // ===== PUT =====

    on(TodoActions.putTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.putTodoSuccess, (state, { todoItem }) => ({
      ...state,
      todoList: [...state.todoList.map(item => Object.assign({}, item))].map(item => {
        if (item.id === todoItem.id) {
          return todoItem;
        }
        return item;
      }),
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.putTodoError, (state, { error }) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(error)
    })),

    // ===== DELETE =====

    on(TodoActions.deleteTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.deleteTodoSuccess, (state, { todoItem }) => ({
      ...state,
      todoList: [...state.todoList].filter(item => item.id !== todoItem.id),
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.deleteTodoError, (state, { error }) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(error)
    })),

    // ===== OTHER =====

    on(TodoActions.resetList, (state) => ({
      ...state,
      todoList: createTodoPrefillItems()
    })),

  ),

  // ===== EXTRA SELECTORS =====

  extraSelectors: ({ selectTodoList }) => {
    const selectSortedTodoList = createSelector(
      selectTodoList,
      (todoList) => [...todoList].sort((a, b) => -a.id.localeCompare(b.id))
    );

    return { selectSortedTodoList };
  }
});

export const {
  name,
  reducer,
  selectTodoState,
  selectTodoList,
  selectTodoListActionState,
  selectSortedTodoList
} = todoFeature;
