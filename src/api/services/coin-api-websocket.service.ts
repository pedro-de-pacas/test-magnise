import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { apiKey } from '../../configs/api-key.config';
import { periodNumbers } from '../../configs/api-periods.config';
import { PeriodsEnum } from '../enum/api-periods.enum';
import { Observable } from 'rxjs';
import { IWebSocketExchangeRate } from '../models/coin-api.models';

@Injectable({
  providedIn: 'root'
})
export class CoinApiWebsocketService {

  private coinApiWebsocket: WebSocketSubject<any> | null = null

  public getCoinWebSocketObservable(
    assetId: string,
    period: PeriodsEnum,
  ): Observable<IWebSocketExchangeRate> {

    if (this.coinApiWebsocket) {
      this.coinApiWebsocket.unsubscribe();
    }

    this.coinApiWebsocket = webSocket('ws://ws.coinapi.io/v1/');

    this.coinApiWebsocket.next({
      type: 'hello',
      apikey: apiKey,
      heartbeat: false,
      subscribe_data_type: ['exrate'],
      subscribe_filter_asset_id: [assetId],
      subscribe_update_limit_ms_exrate: periodNumbers[period]!,
    });

    return this.coinApiWebsocket.asObservable();
  }
}
