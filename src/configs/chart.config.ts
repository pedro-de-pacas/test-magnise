import { ChartConfiguration } from 'chart.js';

export const chartConfig: ChartConfiguration['options'] = {
  responsive: true,
  animation: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      grid: {
        drawTicks: true,
        color: 'grey',
      },
      alignToPixels: true,
      time: {
        unit: 'second',
        tooltipFormat: 'hh:mm:ss a',
        displayFormats: {
          minute: 'hh:mm:ss a',
        },
        round: 'second',
      },
    },
    y: {
      grid: {
        drawTicks: false,
        color: 'grey',
      },
      alignToPixels: true,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
};
