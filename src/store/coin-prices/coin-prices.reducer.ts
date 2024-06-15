import { createReducer, on } from '@ngrx/store';
import { ICoinPricesState, initialState } from './coin-prices.state';
import { getHistoricalData, getHistoricalDataSuccess } from './coin-prices.actions';

export const coinPricesReducer = createReducer(
  initialState,

  on(
    getHistoricalData,
    (state: ICoinPricesState) => ({
      ...state,
      loading: true,
    }),
  ),

  on(
    getHistoricalDataSuccess,
    (state: ICoinPricesState, { data: exchangeRates }) => ({
      ...state,
      loading: false,
      exchangeRates,
    }),
  ),
);
