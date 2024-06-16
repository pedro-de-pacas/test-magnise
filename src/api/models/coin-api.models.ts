export interface IRestExchangeRate {
  time_period_start: string,
  time_period_end: string,
  time_open: string,
  time_close: string,
  rate_open: number,
  rate_high: number,
  rate_low: number,
  rate_close: number,
}

export interface IWebSocketExchangeRate {
  time: string,
  asset_id_base: string,
  asset_id_quote: string,
  rate_type: string,
  rate: number,
  type: string,
  message?: string,
}
