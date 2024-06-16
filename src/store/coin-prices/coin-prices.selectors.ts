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

export const selectExchangeRatesArePresent = createSelector(
  selectExchangeRates,
  (rates) => !!rates && rates.length > 0,
);

export const selectLastExchangeRate = createSelector(
  selectExchangeRates,
  (rates) => rates ? rates[0] : null,
);

export const selectError = createSelector(
  selectCoinPricesState,
  (state) => state.error,
);
