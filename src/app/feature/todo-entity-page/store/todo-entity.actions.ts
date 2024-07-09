import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TodoItem } from "../../../shared/model/todo.model";
import { Update } from "@ngrx/entity";

export const TodoEntityActions = createActionGroup({
  source: 'Todo Entity',
  events: {
    'Post Todo': props<{ data: TodoItem }>(),
    'Post Todo Success': props<{ data: TodoItem }>(),
    'Post Todo Error': props<{ error: Error }>(),

    'Put Todo': props<{ data: TodoItem }>(),
    'Put Todo Success': props<{ data: Update<TodoItem> }>(),
    'Put Todo Error': props<{ error: Error }>(),

    'Delete Todo': props<{ data: TodoItem }>(),
    'Delete Todo Success': props<{ data: TodoItem }>(),
    'Delete Todo Error': props<{ error: Error }>(),
    
    'Reset List': emptyProps(),
  }
});