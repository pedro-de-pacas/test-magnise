import { createAction, props } from '@ngrx/store';
import { IExchangeRate } from '../../api/models/coin-api.models';

export const getHistoricalData = createAction(
  '[Coin Prices] Get historical data',
  props<{ exchangePair: string }>(),
)

export const getHistoricalDataSuccess = createAction(
  '[Coin Prices] Get historical data success',
  props<{ data: IExchangeRate[] }>(),
)
