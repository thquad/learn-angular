import { createSelector } from "@ngrx/store";
import { selectTodoState } from "./todo.feature";

export const oldSelectTodoList = createSelector(
  selectTodoState,
  (state) => state.todoList
);

export const oldSelectTodoListActionState = createSelector(
  selectTodoState,
  (state) => state.todoListActionState
);

export const oldSelectSortedTodoList = createSelector(
  selectTodoState,
  (state) => [...state.todoList].sort((a, b) => -a.id.localeCompare(b.id))
);
