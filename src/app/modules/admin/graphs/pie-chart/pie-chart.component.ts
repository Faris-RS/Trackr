import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [30, 70], // Blocked and Unblocked user percentages
      chart: {
        type: 'pie',
        height: 350,
      },
      dataLabels: {
        enabled: true,
        formatter: function (
          val: any,
          opts: {
            w: { config: { series: { [x: string]: string } } };
            seriesIndex: string | number;
          }
        ) {
          return opts.w.config.series[opts.seriesIndex] + '%';
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
      fill: {
        colors: ['#008FFB', '#9ED4FD'],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'right',
      },
      title: {
        text: 'User Status Distribution',
      },
    };
  }
}
