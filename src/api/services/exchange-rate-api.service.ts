import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestExchangeRate } from '../models/coin-api.models';
import { pageSize } from '../../configs/pagination.config';
import { PeriodsEnum } from '../enum/api-periods.enum';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getHistoricalData(exchangePair: string, period: PeriodsEnum): Observable<IRestExchangeRate[]> {
    return this.httpClient.get<IRestExchangeRate[]>(
      `https://rest.coinapi.io/v1/exchangerate/${exchangePair}/history`,
      {
        params: {
          period_id: period,
          limit: pageSize,
        }
      }
    );
  }
}
