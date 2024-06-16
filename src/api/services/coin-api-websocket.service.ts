import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { apiKey } from '../../configs/api-key.config';
import { periodNumbers } from '../../configs/api-periods.config';
import { PeriodsEnum } from '../enum/api-periods.enum';
import { Observer, Subscription, throttleTime } from 'rxjs';
import { IWebSocketExchangeRate } from '../models/coin-api.models';

@Injectable({
  providedIn: 'root'
})
export class CoinApiWebsocketService {

  private coinApiWebsocket: WebSocketSubject<any> | null = null
  private subscription: Subscription | null = null;

  public subscribeToCoinWebSocket(
    assetId: string,
    period: PeriodsEnum,
    observer: Observer<IWebSocketExchangeRate>
  ) {

    if (this.coinApiWebsocket) {
      this.subscription?.unsubscribe();
      this.coinApiWebsocket.unsubscribe();
    }

    this.coinApiWebsocket = webSocket('ws://ws.coinapi.io/v1/');

    this.subscription = this.coinApiWebsocket.pipe(
      throttleTime(periodNumbers[period]! - 999),
    ).subscribe(observer);

    this.coinApiWebsocket.next({
      type: 'hello',
      apikey: apiKey,
      heartbeat: false,
      subscribe_data_type: ['exrate'],
      subscribe_filter_asset_id: [assetId],
      subscribe_update_limit_ms_exrate: periodNumbers[period]!,
    });
  }
}
