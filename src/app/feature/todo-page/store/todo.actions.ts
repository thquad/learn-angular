import { createActionGroup, props } from '@ngrx/store';
import { TodoItem } from '../../../shared/model/todo.model';

// createActionGroup() since NgRx v14
export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Post Todo': props<{ data: TodoItem }>(),
    'Post Todo Success': props<{ data: TodoItem }>(),
    'Post Todo Error': props<{ error: Error }>(),
    'Put Todo': props<{ data: TodoItem }>(),
    'Put Todo Success': props<{ data: TodoItem }>(),
    'Put Todo Error': props<{ error: Error }>(),
    'Delete Todo': props<{ data: TodoItem }>(),
    'Delete Todo Success': props<{ data: TodoItem }>(),
    'Delete Todo Error': props<{ error: Error }>(),
  }
});
