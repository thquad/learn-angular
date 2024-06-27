[↩ go back](../index.md)

# Reducers

```typescript
// Since NgRx v8
export const todoReducer = createReducer(
  initialState,
  on(TodoActions.postTodo, state => ({
    ...state,
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
```
```typescript
// Since NgRx v12.1
export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(TodoActions.postTodo, state => ({
      ...state,
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
})
```

The benefit of using `createFeature()` is a simplified syntax when providing the state, as well as generated selectors based on the state properties.

```typescript
// with createReducer
provideState({name: 'todo', reducer: todoReducer})
// with createFeature
provideState(todoFeature)
```

Using destructuring, a set of variables can now be exported using the created feature object:

```typescript
export const {
  name,
  reducer,
  selectTodoState,
  selectTodoList,
  selectTodoListActionState
} = todoFeature;
```
