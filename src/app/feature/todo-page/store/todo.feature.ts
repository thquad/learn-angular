import { createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { TodoActions } from "./todo.actions"
import { ActionState, ActionStateCreator } from "../../../shared/util/action-state"
import { TodoItem } from "../../../shared/model/todo.model"

const prefillItems: TodoItem[] = [
  { id: '00', text: 'take out trash' },
  { id: '01', text: 'feed cat' },
  { id: '02', text: 'pay debt' },
  { id: '03', text: 'run for president' },
  { id: '04', text: 'order food' },
]

export interface TodoState {
  todoList: TodoItem[]
  todoListActionState: ActionState
}

export const initialState: TodoState = {
  todoList: prefillItems,
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
    on(TodoActions.postTodoSuccess, (state,action) => ({
      ...state,
      todoList: [...state.todoList.map(item => Object.assign({},item)), action.data],
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.postTodoError, (state,action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),

    // ===== PUT =====

    on(TodoActions.putTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.putTodoSuccess, (state,action) => ({
      ...state,
      todoList: [...state.todoList.map(item => Object.assign({},item))].map(item => {
        if(item.id === action.data.id){
          return action.data;
        }
        return item;
      }),
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.putTodoError, (state,action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),

    // ===== DELETE =====

    on(TodoActions.deleteTodo, (state) => ({
      ...state,
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.deleteTodoSuccess, (state,action) => ({
      ...state,
      todoList: [...state.todoList].filter(item => item.id !== action.data.id),
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.deleteTodoError, (state,action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),
  ),

  // ===== EXTRA SELECTORS =====

  extraSelectors: ({selectTodoList}) => {
    const selectSortedTodoList = createSelector(
      selectTodoList,
      (todoList) => [...todoList].sort((a,b) => -a.id.localeCompare(b.id))
    )

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
