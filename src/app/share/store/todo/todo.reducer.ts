import { createFeature, createReducer, on } from "@ngrx/store"
import { TodoItem } from "../../model/todo.model"
import { ActionState, ActionStateCreator } from "../../util/action-state"
import { TodoActions } from "./todo.actions"

const prefillItems: TodoItem[] = [
  {
    id: '0',
    text: 'take out trash'
  },
  {
    id: '1',
    text: 'smile'
  },
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
    on(TodoActions.postTodo, (state,action) => ({
      ...state,
      todoList: [...state.todoList, action.data],
      todoListActionState: ActionStateCreator.onStart()
    })),
    on(TodoActions.postTodoSuccess, (state,action) => ({
      ...state,
      todoList: [...state.todoList, action.data],
      todoListActionState: ActionStateCreator.onSuccess()
    })),
    on(TodoActions.postTodoFailure, (state,action) => ({
      ...state,
      todoListActionState: ActionStateCreator.onError(action.error)
    })),
  )
});

export const {
  name,
  reducer,
  selectTodoState,
  selectTodoList,
  selectTodoListActionState
} = todoFeature;
