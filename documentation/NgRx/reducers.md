[index.md](../index.md) > reducers.md

- [Reducers](#reducers)
- [Adding reducers to the store in different versions](#adding-reducers-to-the-store-in-different-versions)
  - [Reducers with modules](#reducers-with-modules)
  - [Reducers with standalone API](#reducers-with-standalone-api)
- [Creating reducers in different versions](#creating-reducers-in-different-versions)
  - [Old NgRx](#old-ngrx)
  - [NgRx v8](#ngrx-v8)
  - [NgRx v12.1](#ngrx-v121)

# Reducers

![NgRx reducer diagram](../assets/ngrx-reducer.svg)

A reducer is a function, which consists of two parts:
- The state, or actual data of the store.
- Reducer-functions, which are executed when specific actions are triggered.

> Reducers are actually `ActionReducer`, NgRx loves confusing syntax.

```typescript
export interface TodoState {
  todoItem: TodoItem;
}

export const initialState: TodoState = {
  todoItem: null,
};

export const todoReducer = createReducer(
  // state
  initialState,
  // reducer function
  on(PostTodo, (state, action) => ({
    ...state,
    todoItem: action.todoItem
  }))
);
```

The reducers need to be registered to the store service.

```typescript
// app.module.ts

@NgModule({
  imports: [
    StoreModule.forRoot({
      todo: todoReducer,
      somethingElse: somethingElseReducer
    }),
  ]
})
```

`forRoot()` doesn't mean that these initial reducers are the first elements in a tree structure, but that they are the first reducers added to the store at the "root of the app".

Additional reducers can be added throughout the code with `forFeature()`.

```typescript
StoreModule.forFeature('todo', todoReducer);
```

> There doesn't seem to be a reason why `forRoot()` and `forFeature()` are not just one combined function. I assume it's because `forRoot()` creates the initial instance of the store service, but then it should have been called something less confusing like `createStore()`. NgRx loves confusing syntax.
> 
> Luckily NgRx gets rid of this syntax with the introduction of the Standalone API.

# Adding reducers to the store in different versions

## Reducers with modules

Adding reducers to the store can be done like described above, in a simple object.

```typescript
StoreModule.forRoot({
  todo: todoReducer,
  somethingElse: somethingElseReducer
}),
```

Adding multiple reducers to the store service is usually done by defining an `AppState` and adding all the reducers to a `ActionReducerMap`.

```typescript
interface AppState {
  todo: TodoState,
  other: OtherState
};

const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
  other: otherReducer
}
```

The interface `AppState` can be referenced by the selector later.

The `ActionReducerMap` is an object (also called dictionary or map) that is passed to the store.

```typescript
StoreModule.forRoot(reducers),
```

## Reducers with standalone API

The syntax is simplified with Standalone API.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState('todo', todoReducer),
  ]
};
```

> Why `provideState` instead of `provideReducer`? NgRx loves confusing syntax.

The method with `ActionReducerMap` like in [Reducers with modules](#reducers-with-modules) works here as well.

```typescript
provideState(reducers),
```

# Creating reducers in different versions

## Old NgRx

```typescript
export function reducer(
  state = initialState,
  action: TodoActions
): State {
  switch (action.type) {
    case POST_TODO: {
      return {
        ...state,
        todoListActionState: ActionStateCreator.onStart()
      };
    }
 
    case POST_TODO_SUCCESS: {
      return {
        ...state,
        todoList: [...state.todoList, action.data],
        todoListActionState: ActionStateCreator.onSuccess()
      };
    }
 
    case POST_TODO_ERROR: {
      return {
        ...state,
        todoListActionState: ActionStateCreator.onError(action.error)
      }
    }
 
    default: {
      return state;
    }
  }
}
```

`POST_TODO`, `POST_TODO_SUCCESS` and `POST_TODO_ERROR` are action types:

```typescript
export const POST_TODO = '[Todo] Post Todo';
export const POST_TODO_SUCCESS = '[Todo] Post Todo Success';
export const POST_TODO_ERROR = '[Todo] Post Todo Error';
```

## NgRx v8

```typescript
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

## NgRx v12.1

See [feature](./features.md) page.

