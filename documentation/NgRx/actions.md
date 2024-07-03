[index.md](../index.md) > actions.md

## Actions

https://ngrx.io/guide/store/actions

If you are familiar with CQRS (Command and Query Responsibility Segregation), Actions are like events. An Action represents an event, which has happened.

## Datastructure of Actions

All actions are basically just simple javascript objects:

```typescript
interface Action {
  type: string;
  [key: string]: any;
}
```

This datastructure can be obscured by the various creators added to the Angular library, but the underlying datastructure stays the same.

## Action Creators

```typescript
// Since NgRx v7
export const TodoActions = {
  postTodo: createAction(
    '[Todo] Post Todo',
    props<{data: TodoItem}>()
  ),
  // ...
};

// is the same as

// Since NgRx v14
export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Post Todo': props<{ data: TodoItem }>(),
    // ...
  }
});
```

Both implementation above return the same result!

```typescript
TodoActions.postTodo({data:{text:"example"}})
```
```json
{
  "type": "[Todo] Post Todo",
  "data": {
    "text": "example"
  }
}
```

---

You then use the store service to dispatch an action:

```typescript
this.store.dispatch(TodoActions.postTodo({
  data: todoItem
}));

// is the same as

this.store.dispatch({
  type: "[Todo] Post Todo",
  data: todoItem
});
```
