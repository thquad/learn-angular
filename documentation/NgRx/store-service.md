[↩ index.md](../index.md)

## Store Service

The store can be used after injecting it inside the component:

```typescript
store = inject(Store);
// or
store = inject(Store<TodoState>);
```

Setting a type during injection does nothing functionally, except provide type safety.
The whole store is always injected.
