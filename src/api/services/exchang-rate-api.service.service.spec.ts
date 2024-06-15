import { TestBed } from '@angular/core/testing';

import { ExchangeRateApiServiceService } from './exchange-rate-api-service.service';

describe('ExchangRateApiServiceService', () => {
  let service: ExchangeRateApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
