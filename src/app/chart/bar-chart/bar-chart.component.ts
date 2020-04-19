import { Component, Input, OnInit } from '@angular/core';
import { ChartModel, CORONAVIRUS_CASES } from 'src/app/model/chart.model';
import { ColorConstants } from '../../model/color';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  multi: any[];
  chartdata = new Array<ChartModel>();
  @Input() chartDataHolder: ChartModel[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = CORONAVIRUS_CASES;

  colorScheme = {
    domain: [ColorConstants.INFECTED_COLOR, ColorConstants.RECOVERED_COLOR, ColorConstants.DEATHS_COLOR]
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

}
