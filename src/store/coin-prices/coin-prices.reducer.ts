import { createReducer, on } from '@ngrx/store';
import { ICoinPricesState, initialState } from './coin-prices.state';
import { addRealtimeData, coinPricesError, getHistoricalData, getHistoricalDataSuccess } from './coin-prices.actions';
import { pageSize } from '../../configs/pagination.config';

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
      error: null,
    }),
  ),

  on(
    addRealtimeData,
    (state: ICoinPricesState, { exchangeRate }) => ({
      ...state,
      loading: false,
      exchangeRates: [exchangeRate, ...state.exchangeRates!].slice(0, state.exchangeRates!.length > pageSize ? -1 : undefined),
      error: null,
    }),
  ),

  on(
    coinPricesError,
    (state: ICoinPricesState, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
