import { IExchangeRate } from '../../interfaces/exchange-rate.interface';

export const coinPricesKey = 'coin-prices';

export interface ICoinPricesState {
  loading: boolean,
  exchangeRates: IExchangeRate[] | null,
  error: string | null,
}

export const initialState: ICoinPricesState = {
  loading: false,
  exchangeRates: null,
  error: null,
}
