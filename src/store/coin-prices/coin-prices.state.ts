import { IExchangeRate } from '../../api/models/coin-api.models';

export const coinPricesKey = 'coin-prices';

export interface ICoinPricesState {
  loading: boolean,
  exchangeRates: IExchangeRate[] | null,
}

export const initialState: ICoinPricesState = {
  loading: false,
  exchangeRates: null,
}
