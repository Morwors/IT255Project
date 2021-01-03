import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

import {IStatistics} from '../models/statistics.model';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnInit {
  @Input() statistics: Observable<IStatistics>;
  public lineChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Checkins'},
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];


  constructor() {
  }

  ngOnInit(): void {
    let count = 1;
    this.statistics.pipe(take(1)).subscribe(value => {
      while (count !== 13) {
        this.lineChartData[0].data[count - 1] = value.statisticsArray[0].statistics[count];
        count++;
      }
    });
    console.log('First month data: ', this.lineChartData[0].data[0]);
    // console.log(this.statistics.statisticsArray[0].statistics[0], ' statistic of the month');
    // for (let i = 0; this.lineChartData[0].data; i++) {
    //   this.lineChartData[0].data[i] = this.statistics.statisticsArray[0].statistics[i];
    // }
  }

}
