import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartModel, CORONAVIRUS_CASES } from 'src/app/model/chart.model';

@Component({
  selector: 'app-bar-chart-vertical',
  templateUrl: './bar-chart-vertical.component.html',
  styleUrls: ['./bar-chart-vertical.component.css']
})
export class BarChartVerticalComponent implements OnInit {

  multi: any[];
  view: any[] = [700, 400];
  chartdata = new Array<ChartModel>();
  @Input() chartDataHolder: ChartModel[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = CORONAVIRUS_CASES;

  colorScheme = {
    domain: ['#C7B42C', '#5AA454', 'red']
  };

  constructor() { }

  ngOnInit(): void {
    if (this.chartDataHolder) {
      this.create(this.chartDataHolder);
    }
  }

  create(chartDataHolder: ChartModel[]) {
    Object.assign(this, { chartDataHolder });
  }

  onSelect(event) {
    console.log(event);
  }

}
