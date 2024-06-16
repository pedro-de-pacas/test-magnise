import { createAction, props } from '@ngrx/store';
import { PeriodsEnum } from '../../api/enum/api-periods.enum';
import { IExchangeRate } from '../../interfaces/exchange-rate.interface';

export const getHistoricalData = createAction(
  '[Coin Prices] Get historical data',
  props<{ exchangePair: string, period: PeriodsEnum }>(),
);

export const getHistoricalDataSuccess = createAction(
  '[Coin Prices] Get historical data success',
  props<{ data: IExchangeRate[], exchangePair: string, period: PeriodsEnum }>(),
);

export const startWebsocket = createAction(
  '[Coin Prices] Start Websocket',
  props<{ exchangePair: string, period: PeriodsEnum }>(),
);

export const addRealtimeData = createAction(
  '[Coin Prices] Add realtime data',
  props<{ exchangeRate: IExchangeRate }>(),
);

export const coinPricesError = createAction(
  '[Coin Prices] Coin Prices Error',
  props<{ error: string }>(),
);
