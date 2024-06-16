import {
   HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from '../configs/api-key.config';

export function apiKeyInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(
    request.clone({
      headers: request.headers.set('X-CoinAPI-Key', apiKey),
    })
  )
}
