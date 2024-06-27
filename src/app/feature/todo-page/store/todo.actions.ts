import { createActionGroup, props } from '@ngrx/store';
import { TodoItem } from '../../../shared/model/todo.model';

// createActionGroup() since NgRx v14
export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Post Todo': props<{ data: TodoItem }>(),
    'Post Todo Success': props<{ data: TodoItem }>(),
    'Post Todo Failure': props<{ error: Error }>(),
    'Delete Todo': props<{ id: string }>(),
    'Delete Todo Success': props<{ data: TodoItem }>(),
    'Delete Todo Failure': props<{ error: Error }>(),
  }
});
