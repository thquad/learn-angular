import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './core/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoFeature } from './feature/todo-page/store/todo.feature';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './feature/todo-page/store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(todoFeature),
    provideEffects(TodoEffects),
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
    provideStoreDevtools(),
  ]
};
