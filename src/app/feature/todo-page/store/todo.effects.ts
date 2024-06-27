import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoActions } from "./todo.actions";
import { concatMap, delay, map, of, switchMap } from "rxjs";

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);

  postTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.postTodo),
      concatMap((action) => {
        return of(
            TodoActions.postTodoSuccess({data: action.data})
          ).pipe(
            delay(Math.floor(Math.random()*1000)) //simulate backend
          );
      })
    )
  })

  putTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.putTodo),
      concatMap((action) => {
        return of(
            TodoActions.putTodoSuccess({data: action.data})
          ).pipe(
            delay(Math.floor(Math.random()*1000)) //simulate backend
          );
      })
    )
  })

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      concatMap((action) => {
        return of(
            TodoActions.deleteTodoSuccess({data: action.data})
          ).pipe(
            delay(Math.floor(Math.random()*1000)) //simulate backend
          );
      })
    )
  })
}