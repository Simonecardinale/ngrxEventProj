import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as EventiEffects from "../app/store/eventi/eventi.effects"
import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {provideHttpClient} from '@angular/common/http';
import {eventiFeatures} from './store/eventi/eventi.features';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {modalAddEventFeatures} from './store/modalAddEvent/modalAddEvent.features';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({}, {
        runtimeChecks: {
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionTypeUniqueness: true
        }
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([EventiEffects]),
    provideState(eventiFeatures),
    provideState(modalAddEventFeatures),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),

  ]
};
