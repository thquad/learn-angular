> [index.md](../index.md) > selector.md

# Selector

## featureSelector

Difference between selector and featureSelector explained here: https://ngrx.io/guide/store/selectors

The difference is best explained with an actual example:

```typescript
import { createSelector } from '@ngrx/store';

export interface FeatureState {
  counter: number;
}

export interface AppState {
  feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const featureKey = 'feature';

export interface FeatureState {
  counter: number;
}

export const selectFeature = createFeatureSelector<FeatureState>(featureKey);

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```

What is the `featureKey` used for? I have no frikking idea. There is no explanation anywhere, but here is my best guess:

`createFeatureSelector` returns a function, which is then used by the store.
So the featureSelector will then look inside the store, to retrieve the specific reducer.
The reducer is retrieved, by using the `featureKey`, similar to how properties in a javascript object can be retrieved by either using dot or array index: A) `duck.size` B) `duck['size']`

`featureKey` needs to have the same name as the reducer.

Fortunately `featureCreator` makes the featureSelector obsolete and we don't need to think about this anymore.