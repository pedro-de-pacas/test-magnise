import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  Chart,
  TimeScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { keyInterceptor } from '../auth/interceprors/key-interceptor';
import { coinPricesKey } from '../store/coin-prices/coin-prices.state';
import { coinPricesReducer } from '../store/coin-prices/coin-prices.reducer';
import * as coinPricesEffects from '../store/coin-prices/coin-prices.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([keyInterceptor]),
    ),
    provideState({ name: coinPricesKey, reducer: coinPricesReducer }),
    provideEffects(
      coinPricesEffects,
    ),
  ],
};

Chart.register(
  TimeScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
);
