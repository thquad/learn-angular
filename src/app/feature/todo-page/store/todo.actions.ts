import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TodoItem } from '@shared/model/todo.model';

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
    
    'Reset List': emptyProps(),
  }
});

// -------------------------------------------------

/*
// an old NgRx implementation, using createAction()

export const PostTodo = createAction(
  '[Todo] Post Todo',
  props<{ data: TodoItem }>()
);

export const PostTodoSuccess = createAction(
  '[Todo] Post Todo Success',
  props<{ data: TodoItem }>()
);

export const PostTodoError = createAction(
  '[Todo] Post Todo Error',
  props<{ error: Error }>()
);

*/

// -------------------------------------------------

/*
// an old NgRx implementation without any creators

export const POST_TODO = '[Todo] Post Todo';
export const POST_TODO_SUCCESS = '[Todo] Post Todo Success';
export const POST_TODO_ERROR = '[Todo] Post Todo Error';

export class PostTodo implements Action {
  readonly type = POST_TODO;
  constructor(public data: TodoItem) {}
};

export class PostTodoSuccess implements Action {
  readonly type = POST_TODO_SUCCESS;
  constructor(public data: TodoItem) {}
};

export class PostTodoError implements Action {
  readonly type = POST_TODO_ERROR;
  constructor(public error: Error) {}
};

*/