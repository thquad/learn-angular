import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, delay, map, of, switchMap } from "rxjs";
import { TodoEntityActions } from "./todo-entity.actions";

@Injectable()
export class TodoEntityEffects {
  private actions$ = inject(Actions);

  postTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoEntityActions.postTodo),
      concatMap((action) => {
        return of(
          TodoEntityActions.postTodoSuccess({ data: action.data })
        ).pipe(
          delay(Math.floor(Math.random() * 1000)) //simulate backend
        );
      })
    )
  })

  putTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoEntityActions.putTodo),
      concatMap((action) => {
        return of(
          TodoEntityActions.putTodoSuccess({
            data: {
              id: action.data.id,
              changes: { text: action.data.text }
            }
          })
        ).pipe(
          delay(Math.floor(Math.random() * 1000)) //simulate backend
        );
      })
    )
  })

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoEntityActions.deleteTodo),
      concatMap((action) => {
        return of(
          TodoEntityActions.deleteTodoSuccess({ data: action.data })
        ).pipe(
          delay(Math.floor(Math.random() * 1000)) //simulate backend
        );
      })
    )
  })
}