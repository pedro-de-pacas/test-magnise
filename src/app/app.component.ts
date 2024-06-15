import { AfterViewInit, Component, computed, DestroyRef, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { chartConfig } from '../configs/chart.config';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getHistoricalData } from '../store/coin-prices/coin-prices.actions';
import {
  selectCoinPricesIsLoading,
  selectExchangeRates,
  selectExchangeRatesArePresent,
  selectLastExchangeRate,
} from '../store/coin-prices/coin-prices.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { IExchangeRate } from '../api/models/coin-api.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormField,
    MatInput,
    MatError,
    MatCard,
    MatCardContent,
    MatButton,
    MatLabel,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    ReactiveFormsModule,
    AsyncPipe,
    MatProgressSpinner,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  private chart: Chart | null = null;

  public displayDateFormat = 'MMM d, H:m a';

  public exchangePairControl = new FormControl('BTC/USD', {
    validators: [
      Validators.required,
      Validators.pattern(/^([a-zA-z]+)\/([a-zA-z]+)$/)
    ], nonNullable: true
  });

  public isLoading$ = this.store.select(selectCoinPricesIsLoading);
  public exchangeRatesArePresent$ = this.store.select(selectExchangeRatesArePresent);
  public lastExchangeRate$ = this.store.select(selectLastExchangeRate);

  public pair = signal(this.exchangePairControl.value);
  public currency = computed(() =>
    this.pair().split('/')[1],
  );

  @ViewChild('chartCanvas') public chartCanvas!: ElementRef;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
  ) {
  }

  public ngAfterViewInit(): void {
    this.store.select(selectExchangeRates).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((exchangeRates): exchangeRates is IExchangeRate[] => !!exchangeRates),
    ).subscribe((exchangeRates) => {
      if (this.chart) {
        this.chart.destroy();
      }

      this.pair.set(this.exchangePairControl.value);

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        options: chartConfig,
        data: {
          datasets: [
            {
              type: 'line',
              data: exchangeRates.map((rates) => ({
                x: new Date(rates.time_close).valueOf(),
                y: rates.rate_close,
              })),
              backgroundColor: '#00FF00',
              order: 1,
            },
          ],
        },
      });
    });
  }

  public subscribeForEvents(): void {
    this.store.dispatch(getHistoricalData({ exchangePair: this.exchangePairControl.value }))
  }
}
