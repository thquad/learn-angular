[index.md](../index.md) > selector.md

# Selector

The store service executes selectors to retrieve data.
A selector is a function, which consists of two parts:
- feature selector
- "data selector"

```typescript
export const selectSomething = createSelector(
  selectFeature,
  selectData
);
```

The selector first needs to get the correct feature state.
For this example, there are 2 feature states (reducers) in the store.

```typescript
interface AppState {
  todo: TodoState,
  other: OtherState
};

const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
  other: otherReducer
}

StoreModule.forRoot(reducers)
```

Getting the `todo` state requires a feature selector first (`selectTodo`).

Values can then be retrieved from the `TodoState` with another "data selector".

```typescript
export const selectTodo = (state: AppState) => state.todo;

export const selectFeatureCount = createSelector(
  selectTodo,
  (state: TodoState) => state.todoItem
);
```

## featureSelector

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const todoKey = 'todo';

export interface TodoState {
  todoItem: TodoItem;
}

export const selectTodoState = createFeatureSelector<TodoState>(todoKey);

export const selectTodoItem = createSelector(
  selectTodoState,
  (state: TodoState) => state.todoItem
);
```

The only advantage when using the `featureSelector` seems to be, that an `AppState` doesn't need to be defined to ensure type safety.

The `featureKey` is never explained, but it's the key you are using for your reducer. In this case it's `todo`.

```typescript
{
  todo: todoReducer,
  other: otherReducer
}
```
