import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionReducerMap, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { routes } from '@core/app.routes';
import { reducer, todoFeature, TodoState } from '@feature/todo-page/store/todo.feature';
import { TodoEffects } from '@feature/todo-page/store/todo.effects';
import { todoEntityFeature } from '@feature/todo-entity-page/store/todo-entity.feature';
import { TodoEntityEffects } from '@feature/todo-entity-page/store/todo-entity.effects';

interface AppState {
  todo: TodoState
};

const reducers: ActionReducerMap<AppState> = {
  todo: reducer
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),

    // ===== STORE =====

    provideStore(reducers),
    provideEffects(TodoEffects),
    provideState(todoEntityFeature),
    provideEffects(TodoEntityEffects),
    provideStoreDevtools(),

    /**
     * Registering states with provideStore ensures that the
     * states are defined upon application startup. In general, you
     * register root states that always need to be available to all
     * areas of your application immediately.
     * 
     * So in other words, all reducers included in the provideStore
     * are immediately initialized. That's good to do if there are any
     * reducers or states necessary accross the app.
     * 
     * It is recommended to use provideState to register feature states
     * instead of provideStore, but the reason why is not explained.
     */
  ]
};
