import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coinPricesKey, ICoinPricesState } from './coin-prices.state';

export const selectCoinPricesState = createFeatureSelector<ICoinPricesState>(
  coinPricesKey,
);

export const selectCoinPricesIsLoading = createSelector(
  selectCoinPricesState,
  (state: ICoinPricesState) => state.loading,
);

export const selectExchangeRates = createSelector(
  selectCoinPricesState,
  (state: ICoinPricesState) => state.exchangeRates,
);
