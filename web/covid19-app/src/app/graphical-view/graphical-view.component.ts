import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Covid19Service } from '../service/covid19.service';

@Component({
  selector: 'app-graphical-view',
  templateUrl: './graphical-view.component.html',
  styleUrls: ['./graphical-view.component.css']
})
export class GraphicalViewComponent implements OnInit, OnDestroy {

  single = new Array<any>();
  multi: any[];
  view: any[] = [700, 400];
  chartdata = new Array<ChartData>();

// options
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
showXAxisLabel = true;
xAxisLabel = 'Cases';
showYAxisLabel = true;
yAxisLabel = '';

subscription: Subscription;

colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

constructor(private covidService: Covid19Service) {
  // Object.assign(this, { single });
}

ngOnInit() {
  this.subscription = this.covidService.covidSummaryModelSubject.subscribe(model => {

    const totalCases = new ChartData('Infected', model.Global.TotalConfirmed);
    const totalDeaths = new ChartData('Deaths', model.Global.TotalDeaths);
    const totalRecovered = new ChartData('Recovered', model.Global.TotalRecovered);

    console.log('This is total case ' + totalCases.value);


    this.single.push(totalCases);
    this.single.push(totalDeaths);
    this.single.push(totalRecovered);

    Object.assign(this, { single });

  });
  Object.assign(this, { single });
}

onSelect(event) {
  console.log(event);
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}


export var single = [
  {
    "name": "Germany",
    "value": 8940
  },
  {
    "name": "USA",
    "value": 50
  },
  {
    "name": "France",
    "value": 72
  }
];

export class ChartData {
  constructor(public name: string, public value: number) { }
}
