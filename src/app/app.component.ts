import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  signal,
  ViewChild
} from '@angular/core';
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
  selectError,
  selectExchangeRates,
  selectExchangeRatesArePresent,
  selectLastExchangeRate,
} from '../store/coin-prices/coin-prices.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { IExchangeRate } from '../interfaces/exchange-rate.interface';
import { MatOption, MatSelect } from '@angular/material/select';
import { PeriodsEnum } from '../api/enum/api-periods.enum';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
    MatProgressSpinner,

    RouterOutlet,
    ReactiveFormsModule,
    AsyncPipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    MatSelect,
    MatOption,
    KeyValuePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  private chart: Chart | null = null;

  public displayDateFormat = 'MMM d, hh:mm:ss a';
  public PeriodsEnum = PeriodsEnum;

  public exchangePairControl = new FormControl('BTC/USD', {
    validators: [
      Validators.required,
      Validators.pattern(/^([a-zA-z]+)\/([a-zA-z]+)$/)
    ], nonNullable: true
  });

  public periodControl = new FormControl<PeriodsEnum>(
    PeriodsEnum.MIN_1, { nonNullable: true },
  );

  public isLoading$ = this.store.select(selectCoinPricesIsLoading);
  public exchangeRatesArePresent$ = this.store.select(selectExchangeRatesArePresent);
  public lastExchangeRate$ = this.store.select(selectLastExchangeRate);

  public exchangePair = signal(this.exchangePairControl.value);
  public currencyCode = computed(() =>
    this.exchangePair().split('/')[1],
  );

  @ViewChild('chartCanvas') public chartCanvas!: ElementRef;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
  ) {
    this.store.select(selectError).pipe(
      takeUntilDestroyed(),
      filter((error): error is string => !!error),
    ).subscribe((error) => window.alert(error));
  }

  public ngAfterViewInit(): void {
    this.store.select(selectExchangeRates).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((exchangeRates): exchangeRates is IExchangeRate[] => !!exchangeRates),
    ).subscribe((exchangeRates) => {
      if (this.chart) {
        this.chart.destroy();
      }

      this.exchangePair.set(this.exchangePairControl.value)

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        options: chartConfig,
        data: {
          datasets: [
            {
              type: 'line',
              data: exchangeRates.map((rates) => ({
                x: new Date(rates.date).valueOf(),
                y: rates.value,
              })),
              fill: false,
              tension: 0.2,
              borderColor: '#005cbb',
            },
          ],
        },
      });
    });
  }

  public subscribeForEvents(): void {
    this.store.dispatch(
      getHistoricalData({
        exchangePair: this.exchangePairControl.value,
        period: this.periodControl.value,
      }));
  }

  public sortPeriodFunc = (): number => 0;
}
