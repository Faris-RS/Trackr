import { Component } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent {
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Metric1',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric2',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric3',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric4',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric5',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric6',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric7',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric8',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric9',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: 'HeatMap Chart (Single color)',
      },
    };
  }

  public generateData(count: number, yrange: { min: any; max: any }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
}
