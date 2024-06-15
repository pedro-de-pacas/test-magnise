import { inject } from '@angular/core';
import { Actions, FunctionalEffect, createEffect, ofType } from '@ngrx/effects';
import { getHistoricalData, getHistoricalDataSuccess } from './coin-prices.actions';
import { map, switchMap } from 'rxjs';
import { ExchangeRateApiServiceService } from '../../api/services/exchange-rate-api-service.service';

export const getHistoricalData$: FunctionalEffect = createEffect((
  actions$: Actions = inject(Actions),
  exchangeRateApiServiceService: ExchangeRateApiServiceService = inject(ExchangeRateApiServiceService),
) => {
  return actions$.pipe(
    ofType(getHistoricalData),
    switchMap(({ exchangePair }) =>
      exchangeRateApiServiceService.getHistoricalData(exchangePair).pipe(
        map((data) => getHistoricalDataSuccess({ data }))
      )
    )
  )
}, { functional: true });
