import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './share/route/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { todoFeature } from './share/store/todo/todo.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(todoFeature),
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
