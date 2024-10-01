[index.md](../index.md) > NgRx.md

- [NgRx](#ngrx)
- [Rough overview on how to use](#rough-overview-on-how-to-use)
- [How the store works](#how-the-store-works)
  - [1. Create a state inside the reducer](#1-create-a-state-inside-the-reducer)
  - [2. Adding more reducers to the store service](#2-adding-more-reducers-to-the-store-service)
  - [3. Trigger actions to change the state](#3-trigger-actions-to-change-the-state)
  - [4. React to triggered actions within the reducer](#4-react-to-triggered-actions-within-the-reducer)
  - [5. Retrieving data with selectors](#5-retrieving-data-with-selectors)
  - [6. Summary](#6-summary)


# NgRx

> This text explaines NgRx v7 to reduce confusion. Changes from previous and to later versions will be described later.

Redux is a store library. NgRx (Ng = angular, Rx = redux), is an implementation of Redux for Angular.

"A 'store' is basically a container that holds your application **state**."

Save data inside the store, access it later on a different page. It's like a cache for the app.

![NgRx overview diagram](../assets/ngrx-overview.svg)

Quick overview:
- [Actions](./actions.md) are events. You trigger an action, if you want to change data in the state.
- [Selectors](./selector.md) retrieve data from the state.
- [Reducers](./reducers.md) contain the actual data / state. Reducer also listen for triggered actions to manipulate the state.
- Effects are for asynchronous operations. Effects listen for triggered actions to execute.

The store is accessed through a store service. The store service can be injected into components like this: `store = inject(Store);`

The single store service is the mediator between actions, selectors, reducers and effects.

The reducers and effects inside the store service will be notified via the store service, when an action is triggered.

The selector retrieves data from the state within the store service.

# Rough overview on how to use

```typescript
export class UserComponent {
  // A
  store = inject(Store);

  // B
  user$ = this.store.select(selectUser);

  onLogin(data: UserData): void {
    // C
    this.store.dispatch({
      type: "[User] login",
      user: data
    });
  }
}
```

A) The store service is injected.

B) Get data with `select()`. Pass a "selector". `selectUser` is a pure function and does nothing else than select a property from the store object.

Imagine the store as an object:

```typescript
{
  user: "Michael",
  password: "1234"
}
```

A selector to retrieve the username would then be something like this:

```typescript
selectUser = (state) => state.user
```

C) Change data with `dispatch()`. Pass an "action". Actions are events. An action is just a POJO (plain old javascript object), describes what is happening and holds data.

# How the store works

This example uses NgRx v7.

The purpose of this section is to give you an understanding of what the individual parts do and how they interact with each other. Try to not get hung up by the syntax. All the parts are explained in detail in their own chapters.

## 1. Create a state inside the reducer

Inside a reducer, the actual data (state) is stored.

```typescript
export interface TodoState {
  todoItem: TodoItem;
}

export const initialState: TodoState = {
  todoItem: null,
};

export const todoReducer = createReducer(
  initialState
);
```

The state management is all handled through the store service.
The store service is initialized in the module with:

```typescript
StoreModule.forRoot({todo: todoReducer})
```

There can be more than one reducer. Each state within different reducers are called "feature states", because they contain data for different features.

## 2. Adding more reducers to the store service

A store usually contains multiple feature states (multiple reducers).

To reference the whole state later on for type safety, all reducers are defined within an `AppState`.

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

And like in [1. Create a state](#1-create-a-state), the dictionary of reducers is passed to the store service.

```typescript
StoreModule.forRoot(reducers)
```

## 3. Trigger actions to change the state

Actions are triggered events, they contain only data and no logic. In other words, actions are POJO (plain old javascript object) and defined via a simple interface.

```typescript
interface Action {
  type: string;
}
```

More data can be added to the action with additional properties, e.g.

```typescript
let createTodo: Action = {
  type: "[Todo] Create Todo",
  todoItem: {
    text: "clean house"
  }
};
```

To create and reference actions with less code, NgRx provides a function called `createAction`. This function returns another function, with which actions can be easily created.

```typescript
export const CreateTodo = createAction(
  '[Todo] Create Todo',
  props<{ todoItem: TodoItem }>()
);
```

```typescript
// executing
CreateTodo({todoItem:{text:"clean house"}})
// returns
{
  type: "[Todo] Create Todo",
  todoItem: {
    text: "clean house"
  }
}
```

To trigger an action, use `dispatch()`.

```typescript
this.store.dispatch(CreateTodo);
```

The store service will then inform the reducer (and effects), that an action with the given object has been triggered.

## 4. React to triggered actions within the reducer

To react to the action inside the reducer, a reducer function is added.

```typescript
export const todoReducer = createReducer(
  initialState,
  // added reducer function to listen for CreateTodo
  on(CreateTodo, (state, action) => ({
    ...state,
    todoItem: action.todoItem
  }))
);
```

The reducer function listens for `CreateTodo` with each triggered action.
It then receives the current state and action object.
To change the state, a new state must be returned (with deep copies).

This reducer functions first of all spreads the current state in a new object and replaces the old values with the data given in the action-object.

## 5. Retrieving data with selectors

To execute a selector, use `select()` and **pass the selector to the store**.
An `Observable` with the data is returned and updates automatically on state changes.

```typescript
this.store.select(selectTodo);
```

A selector is a function, which returns specific data from a feature state.

```typescript
export const selectTodo = createSelector(
  // A) get the feature state
  (state: AppState) => state.todo, 
  // B) get the data from the given feature state
  (state: TodoState) => state.todoItem 
);
```

A) returns the specific feature state from the `AppState`.

B) uses the state given by A and returns the `todoItem`.

In the current example, the store service would pass the `AppState` to `selectTodo`, so the store is doing something like this internally:

```typescript
return selectTodo({
  todo: todoReducer,
  other: otherReducer
});
```

Usually the feature state is written as a separate function, because then it can be reused accross different selectors.

```typescript
export const selectTodoState = (state: AppState) => state.todo;

export const selectTodo = createSelector(
  selectTodoState,
  (state) => state.todoItem
);
```

## 6. Summary

Full example code:


```typescript
// todo.model.ts

export type TodoItem = {
  text: string
}
```
```typescript
// todo.actions.ts

export const CreateTodo = createAction(
  '[Todo] Create Todo',
  props<{ todoItem: TodoItem }>()
);
```
```typescript
// todo.reducer.ts

export interface TodoState {
  todoItem: TodoItem;
}

export const initialState: TodoState = {
  todoItem: null,
};

export const todoReducer = createReducer(
  initialState,
  on(CreateTodo, (state, action) => ({
    ...state,
    todoItem: action.todoItem
  }))
);
```
```typescript
// app.reducer.ts

interface AppState {
  todo: TodoState
};

const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
}
```
```typescript
// todo.selector.ts

export const selectTodoState = (state: AppState) => state.todo;

export const selectTodo = createSelector(
  selectTodoState,
  (state) => state.todoItem
);
```
```typescript
// inside app.module.ts

StoreModule.forRoot(reducers)
```
```typescript
// using the store inside a component

store: Store = inject(Store);

this.store.dispatch(
  CreateTodo({todoItem: {text: 'clean house'}})
);

todo: Observable = this.store.select(selectTodo);
```

The state is usually also defined in the `*.reducer.ts` instead of a `*.state.ts`.
