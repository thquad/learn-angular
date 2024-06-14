## Actions

https://ngrx.io/guide/store/actions

If you are familiar with CQRS (Command and Query Responsibility Segregation), Actions are like events. An Action represents an event, which has happened.

## Datastructure of Actions

It's important to understand, that actions have a very simple datastructure:

```typescript
interface Action {
  type: string;
  [key: string]: any; // not included in the official specification, but added here to show that additional properties can be added to an action
}
```

This datastructure can be obscured by the various creators added to the Angular library, but the underlying datastructure stays the same.

## Action Creators

```typescript
// Since NgRx v8+
export const TodoActions = {
  postTodo: createAction(
    '[Todo] Post Todo',
    props<{data: TodoItem}>()
  )
};
```
```typescript
// Since NgRx v14
export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Post Todo': props<{ data: TodoItem }>()
  }
});
```

Both implementation above return the same result. 

```typescript
TodoActions.postTodo({data:{text:"example"}})
```

returns

```json
{
  "type": "[Todo] Post Todo",
  "data": {
    "text": "example"
  }
}
```
