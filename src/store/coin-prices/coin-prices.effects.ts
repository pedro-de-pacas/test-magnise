import { inject } from '@angular/core';
import { Actions, FunctionalEffect, createEffect, ofType } from '@ngrx/effects';
import {
  addRealtimeData,
  coinPricesError,
  getHistoricalData,
  getHistoricalDataSuccess,
  startWebsocket,
} from './coin-prices.actions';
import { catchError, map, Observer, of, switchMap, tap } from 'rxjs';
import { ExchangeRateApiService } from '../../api/services/exchange-rate-api.service';
import { CoinApiWebsocketService } from '../../api/services/coin-api-websocket.service';
import { periodKeys } from '../../configs/api-periods.config';
import { IWebSocketExchangeRate } from '../../api/models/coin-api.models';
import { Store } from '@ngrx/store';

export const getHistoricalData$: FunctionalEffect = createEffect((
  actions$: Actions = inject(Actions),
  exchangeRateApiServiceService: ExchangeRateApiService = inject(ExchangeRateApiService),
) => {
  return actions$.pipe(
    ofType(getHistoricalData),
    switchMap(({ exchangePair, period }) =>
      exchangeRateApiServiceService.getHistoricalData(exchangePair, periodKeys[period]).pipe(
        map((data) => getHistoricalDataSuccess({
          data: data.map(({ rate_close: value, time_close: date }) => ({ value, date })),
          exchangePair, period
        })),
        catchError(({ error }) => of(coinPricesError({ error: error.error }))),
      ),
    ),
  );
}, { functional: true });

export const startWebsocketOnGetHistoricalDataSuccess$: FunctionalEffect = createEffect((
  actions$: Actions = inject(Actions),
) => {
  return actions$.pipe(
    ofType(getHistoricalDataSuccess),
    map(({ exchangePair, period }) => startWebsocket({ exchangePair, period })),
  )
}, { functional: true });

export const startWebsocket$: FunctionalEffect = createEffect((
  actions$: Actions = inject(Actions),
  coinApiWebsocketService: CoinApiWebsocketService = inject(CoinApiWebsocketService),
  store: Store = inject(Store),
) => {
  const observer: Observer<IWebSocketExchangeRate> = {
    next: (exchangeRate) => {
      if (exchangeRate.message) {
        store.dispatch(coinPricesError({ error: exchangeRate.message }));

        return;
      }
      store.dispatch(addRealtimeData({ exchangeRate: { date: exchangeRate.time, value: exchangeRate.rate } }));
    },
    error: ({ error }) => store.dispatch(coinPricesError({ error })),
    complete: () => store.dispatch(coinPricesError({ error: 'Websocket completed' })),
  };

  return actions$.pipe(
    ofType(startWebsocket),
    tap(({ exchangePair, period }) =>
      coinApiWebsocketService.subscribeToCoinWebSocket(exchangePair, period, observer)),
  );
}, { functional: true, dispatch: false });
