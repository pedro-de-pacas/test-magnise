import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExchangeRate } from '../models/coin-api.models';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateApiServiceService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getHistoricalData(exchangePair: string): Observable<IExchangeRate[]> {
    return this.httpClient.get<IExchangeRate[]>(
      `https://rest.coinapi.io/v1/exchangerate/${exchangePair}/history?period_id=1HRS`
    )
  }
}
