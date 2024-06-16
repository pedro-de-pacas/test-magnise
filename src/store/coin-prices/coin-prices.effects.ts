import { inject } from '@angular/core';
import { Actions, FunctionalEffect, createEffect, ofType } from '@ngrx/effects';
import {
  addRealtimeData,
  coinPricesError,
  getHistoricalData,
  getHistoricalDataSuccess,
  startWebsocket,
} from './coin-prices.actions';
import { catchError, map, of, switchMap, throttleTime } from 'rxjs';
import { ExchangeRateApiService } from '../../api/services/exchange-rate-api.service';
import { CoinApiWebsocketService } from '../../api/services/coin-api-websocket.service';
import { periodNumbers } from '../../configs/api-periods.config';

export const getHistoricalData$: FunctionalEffect = createEffect((
  actions$: Actions = inject(Actions),
  exchangeRateApiServiceService: ExchangeRateApiService = inject(ExchangeRateApiService),
) => {
  return actions$.pipe(
    ofType(getHistoricalData),
    switchMap(({ exchangePair, period }) =>
      exchangeRateApiServiceService.getHistoricalData(exchangePair, period).pipe(
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
) => {
  return actions$.pipe(
    ofType(startWebsocket),
    switchMap(({ exchangePair, period }) =>
      coinApiWebsocketService.getCoinWebSocketObservable(exchangePair, period).pipe(
        throttleTime(periodNumbers[period]! - 999),
        map((exchangeRate) => exchangeRate.message
          ? coinPricesError({ error: exchangeRate.message })
          : addRealtimeData({ exchangeRate: { date: exchangeRate.time, value: exchangeRate.rate } })
        ),
      ),
    ),
  );
}, { functional: true });
