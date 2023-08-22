import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { HeatmapModel } from 'src/app/core/models/admin/graphModel';
import { HeatmapDataService } from 'src/app/core/services/data-for-graph/heatmap-data/heatmap-data.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent {
  public chartOptions: any;

  constructor(
    private service: HeatmapDataService,
    private toast: HotToastService
  ) {
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

  // ngOnInit(): void {
  //   this.service.getAllVehicles().subscribe(
  //     (response) => {
  //       this.toast.info(response.message);
  //       console.log(response.data);
  //       let heatmapDataFromAPI: HeatmapModel[] = [];
  //       this.chartOptions = {
  //         series: heatmapDataFromAPI.map((data) => {
  //           return {
  //             name: `${data.vehicleName} (${data.vehicleNo})`,
  //             data: [
  //               {
  //                 x: data.week,
  //                 y: data.activity,
  //               },
  //             ],
  //           };
  //         }),
  //         chart: {
  //           height: 350,
  //           type: 'heatmap',
  //         },
  //         dataLabels: {
  //           enabled: false,
  //         },
  //         colors: ['#008FFB'],
  //         title: {
  //           text: 'HeatMap Chart (Single color)',
  //         },
  //       };
  //     },
  //     (error) => {
  //       this.toast.error('Error fetching heatmap data');
  //       console.error(error);
  //     }
  //   );
  // }
}
