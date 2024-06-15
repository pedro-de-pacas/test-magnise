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
        unit: 'minute',
        tooltipFormat: 'YYYY-MM-DD HH:mm',
        displayFormats: {
          minute: 'YYYY-MM-DD HH:mm',
        },
        round: 'minute',
      },
      ticks: {
        source: 'data',
        autoSkip: true,
        autoSkipPadding: 10,
        maxRotation: 180,
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
