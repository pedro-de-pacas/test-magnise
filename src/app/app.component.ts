import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { chartConfig } from '../configs/chart.config';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  private chart: Chart | null = null;

  @ViewChild('chartCanvas') public chartCanvas!: ElementRef;

  public ngAfterViewInit(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      options: chartConfig,
      data: {
        datasets: [
          {
            type: 'line',
            data: [], /*historicalBorrowData.map((borrowData) => ({
              x: this.dateService.date(borrowData.updated).valueOf(),
              y: borrowData.availableShares,
            })),*/
            backgroundColor: '#00FF00',
            yAxisID: 'y',
            order: 1,
          },
        ],
      },
    });
  }
}
