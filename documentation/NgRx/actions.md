[index.md](../index.md) > actions.md

TOC
- [Actions](#actions)
- [Datastructure of actions](#datastructure-of-actions)
- [Creating actions](#creating-actions)
- [Using actions](#using-actions)
- [Creator functions in different versions](#creator-functions-in-different-versions)
  - [Old](#old)
  - [NgRx v7](#ngrx-v7)
  - [NgRx v14](#ngrx-v14)

## Actions

Actions are triggered events.
They often change the state in some way.

## Datastructure of actions

All actions are just plain old javascript objects (POJO). They are defined with the following interface:

```typescript
interface Action {
  type: string;
}
```

`type` is used to describe the action, with the context in square brackets: `"[Source] Event"`.

Some examples:
- "[Users] Create User"
- "[Products] Remove Product Success"
- "[Book] Fetch Library"

To pass any data with an action, add more properties to the object.
The additional properties can have any structure you want.

```typescript
let postTodo: Action = {
  "type": "[Todo] Post Todo",
  "todoItem": {
    "text": "example"
  }
}
```

This datastructure can be obscured by the various creators added to the Angular library, but the underlying datastructure stays the same.

## Creating actions

Instead of rewriting actions every time, a creator function is used. `createAction` returns a function to create actions.

```typescript
export const PostTodo = createAction(
  '[Todo] Post Todo',
  props<{ todoItem: TodoItem }>()
);
```

Executing the function will return a POJO again:

```typescript
PostTodo({todoItem:{text:"example"}})

// output:

{
  "type": "[Todo] Post Todo",
  "todoItem": {
    "text": "example"
  }
}
```

## Using actions

Trigger actions with `dispatch()`.

```typescript
this.store.dispatch(
  PostTodo({todoItem: someItem})
);

// is the same as

this.store.dispatch({
  type: "[Todo] Post Todo",
  todoItem: someItem
});
```

## Creator functions in different versions

All of these implementations will generate the same POJO as described above.

### Old

```typescript
export const POST_TODO = '[Todo] Post Todo';
export const POST_TODO_SUCCESS = '[Todo] Post Todo Success';
export const POST_TODO_ERROR = '[Todo] Post Todo Error';

export class PostTodo implements Action {
  readonly type = POST_TODO;
  constructor(public todoItem: TodoItem) {}
};

export class PostTodoSuccess implements Action {
  readonly type = POST_TODO_SUCCESS;
  constructor(public todoItem: TodoItem) {}
};

export class PostTodoError implements Action {
  readonly type = POST_TODO_ERROR;
  constructor(public error: Error) {}
};
```

This is an old implementation. The type was separately defined, because it was used in the reducer to identify triggered actions.

### NgRx v7

```typescript
export const PostTodo = createAction(
  '[Todo] Post Todo',
  props<{ todoItem: TodoItem }>()
);

export const PostTodoSuccess = createAction(
  '[Todo] Post Todo Success',
  props<{ todoItem: TodoItem }>()
);

export const PostTodoError = createAction(
  '[Todo] Post Todo Error',
  props<{ error: Error }>()
);
```

`createAction` was introduced.

The type doesn't need to be separately defined anymore, since the action itself is used by the reducer for identification.

The data is passed via `props`.

### NgRx v14

```typescript
export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Post Todo': props<{ todoItem: TodoItem }>(),
    'Post Todo Success': props<{ todoItem: TodoItem }>(),
    'Post Todo Error': props<{ error: Error }>(),
  }
});
```

`createActionGroup` was introduced.

The type syntax becomes important again, since the action name will be generated as lower CamelCase based on the string. The string defined in `source` will be added to the beginning of the type as the context.

Example:

```typescript
TodoActions.postTodo({todoItem: {text: 'example'}});

// output:

{
  "type": "[Todo] Post Todo",
  "todoItem": {
    "text": "example"
  }
}
```

`'Post Todo'` will add a `TodoAction.postTodo` method to `TodoAction`, with a type-string of `'[Todo] Post Todo'`.
